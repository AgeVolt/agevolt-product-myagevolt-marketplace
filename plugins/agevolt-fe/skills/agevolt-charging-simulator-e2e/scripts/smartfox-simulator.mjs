#!/usr/bin/env node
import tls from "node:tls";
import crypto from "node:crypto";

const TOKEN_URL =
  "https://identity.smartfox.cloud/realms/smartfox-cloud/protocol/openid-connect/token";
const CLIENT_ID = "smartfox-user";
const DEFAULT_PLC = "evemsimulator1";
const DEFAULT_WS_PATH = "/endpoint/sfoxweb/";

const encoder = new TextEncoder();

function argValue(name, fallback = undefined) {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return fallback;
  return process.argv[idx + 1];
}

function hasArg(name) {
  return process.argv.includes(`--${name}`);
}

function usage() {
  console.log(`Usage:
node smartfox-simulator.mjs --user USER --password PASS --vehicle A --state charging --power 12

Options:
  --user USER           SmartFox identity user, or SMARTFOX_USER env
  --password PASS       SmartFox identity password, or SMARTFOX_PASSWORD env
  --plc NAME            PLC name, default ${DEFAULT_PLC}
  --vehicle A|B         Vehicle slot, default A
  --state disconnected|connected|charging
  --power KW            Set power in kW
  --read                Read /user page after write
`);
}

async function getToken(username, password) {
  const body = new URLSearchParams({
    username,
    password,
    client_id: CLIENT_ID,
    grant_type: "password",
  });
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    cache: "no-store",
    body,
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(`SmartFox token failed: ${response.status}`);
  }
  return data.access_token;
}

function encodeFrame(payloadObject) {
  const payload = encoder.encode(
    typeof payloadObject === "string" ? payloadObject : JSON.stringify(payloadObject),
  );
  const len = payload.length;
  const headerLen = len < 126 ? 2 : len < 65536 ? 4 : 10;
  const frame = new Uint8Array(headerLen + 4 + len);
  frame[0] = 0x81;
  if (len < 126) {
    frame[1] = 0x80 | len;
  } else if (len < 65536) {
    frame[1] = 0x80 | 126;
    frame[2] = (len >> 8) & 255;
    frame[3] = len & 255;
  } else {
    frame[1] = 0x80 | 127;
    const bigLen = BigInt(len);
    for (let i = 0; i < 8; i += 1) {
      frame[2 + i] = Number((bigLen >> BigInt(56 - 8 * i)) & 255n);
    }
  }

  const maskOffset = headerLen;
  const mask = crypto.randomBytes(4);
  frame.set(mask, maskOffset);
  for (let i = 0; i < len; i += 1) {
    frame[maskOffset + 4 + i] = payload[i] ^ mask[i % 4];
  }
  return frame;
}

function createReader(socket, initialBuffer = Buffer.alloc(0)) {
  let buffer = initialBuffer;
  const queue = [];
  const waiters = [];
  let closed = false;

  function flush() {
    while (buffer.length >= 2) {
      const b0 = buffer[0];
      const b1 = buffer[1];
      const opcode = b0 & 0x0f;
      const masked = Boolean(b1 & 0x80);
      let len = b1 & 0x7f;
      let offset = 2;

      if (len === 126) {
        if (buffer.length < 4) return;
        len = buffer.readUInt16BE(2);
        offset = 4;
      } else if (len === 127) {
        if (buffer.length < 10) return;
        const bigLen = buffer.readBigUInt64BE(2);
        if (bigLen > BigInt(Number.MAX_SAFE_INTEGER)) {
          throw new Error("WebSocket frame too large");
        }
        len = Number(bigLen);
        offset = 10;
      }

      let mask = null;
      if (masked) {
        if (buffer.length < offset + 4) return;
        mask = buffer.subarray(offset, offset + 4);
        offset += 4;
      }
      if (buffer.length < offset + len) return;

      const payload = Buffer.from(buffer.subarray(offset, offset + len));
      buffer = buffer.subarray(offset + len);
      if (masked) {
        for (let i = 0; i < payload.length; i += 1) {
          payload[i] ^= mask[i % 4];
        }
      }

      if (opcode === 0x8) {
        closed = true;
        continue;
      }
      if (opcode === 0x9) {
        socket.write(Buffer.from([0x8a, 0x00]));
        continue;
      }
      if (opcode === 0x1 || opcode === 0x2) {
        const text = payload.toString("utf8");
        try {
          queue.push(JSON.parse(text));
        } catch {
          queue.push(text);
        }
      }
    }

    while (queue.length > 0 && waiters.length > 0) {
      waiters.shift().resolve(queue.shift());
    }
  }

  socket.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    flush();
  });
  socket.on("close", () => {
    closed = true;
    while (waiters.length > 0) waiters.shift().reject(new Error("WebSocket closed"));
  });

  return {
    read(timeoutMs = 8000) {
      flush();
      if (queue.length > 0) return Promise.resolve(queue.shift());
      if (closed) return Promise.reject(new Error("WebSocket closed"));
      return new Promise((resolve, reject) => {
        const waiter = {
          resolve: (value) => {
            clearTimeout(timer);
            resolve(value);
          },
          reject: (error) => {
            clearTimeout(timer);
            reject(error);
          },
        };
        const timer = setTimeout(() => {
          const idx = waiters.indexOf(waiter);
          if (idx >= 0) waiters.splice(idx, 1);
          reject(new Error("WebSocket read timeout"));
        }, timeoutMs);
        waiters.push(waiter);
      });
    },
  };
}

async function openWs(path = DEFAULT_WS_PATH) {
  const key = crypto.randomBytes(16).toString("base64");
  const socket = tls.connect({
    host: "smartfox.cloud",
    port: 443,
    servername: "smartfox.cloud",
  });
  await new Promise((resolve, reject) => {
    socket.once("secureConnect", resolve);
    socket.once("error", reject);
  });

  socket.write(
    [
      `GET ${path} HTTP/1.1`,
      "Host: smartfox.cloud",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Key: ${key}`,
      "Sec-WebSocket-Version: 13",
      "Origin: https://app.smartfox.cloud",
      "",
      "",
    ].join("\r\n"),
  );

  const chunks = [];
  let headerBuffer;
  while (true) {
    const chunk = await new Promise((resolve, reject) => {
      socket.once("data", resolve);
      socket.once("error", reject);
    });
    chunks.push(chunk);
    const all = Buffer.concat(chunks);
    if (all.indexOf("\r\n\r\n") >= 0) {
      headerBuffer = all;
      break;
    }
  }

  const headerEnd = headerBuffer.indexOf("\r\n\r\n");
  const header = headerBuffer.subarray(0, headerEnd).toString("utf8");
  if (!header.includes("101")) {
    throw new Error(`WebSocket handshake failed: ${header.split("\r\n")[0]}`);
  }

  const reader = createReader(socket, headerBuffer.subarray(headerEnd + 4));
  return {
    send: (payload) => socket.write(encodeFrame(payload)),
    read: reader.read,
    close: () => socket.end(),
  };
}

function outputFor(vehicle, kind) {
  const normalized = vehicle.toUpperCase();
  if (normalized === "A") return kind === "state" ? "out0" : "out1";
  if (normalized === "B") return kind === "state" ? "out3" : "out4";
  throw new Error(`Unsupported vehicle: ${vehicle}`);
}

function stateValue(state) {
  if (!state) return undefined;
  const normalized = state.toLowerCase();
  if (normalized === "disconnected") return "1";
  if (normalized === "connected") return "2";
  if (normalized === "charging") return "3";
  throw new Error(`Unsupported state: ${state}`);
}

async function drain(ws, timeoutMs = 1200) {
  while (true) {
    try {
      await ws.read(timeoutMs);
    } catch {
      return;
    }
  }
}

async function sendSfoxRequest(ws, plc, url) {
  ws.send({ destPlc: plc, data: { method: "get", url } });
}

async function main() {
  if (hasArg("help")) {
    usage();
    return;
  }

  const username = argValue("user", process.env.SMARTFOX_USER);
  const password = argValue("password", process.env.SMARTFOX_PASSWORD);
  if (!username || !password) {
    usage();
    throw new Error("Missing SmartFox credentials");
  }

  const plc = argValue("plc", DEFAULT_PLC);
  const vehicle = argValue("vehicle", "A");
  const state = argValue("state");
  const power = argValue("power");
  const token = await getToken(username, password);
  const ws = await openWs();
  try {
    ws.send({ type: "control", dataType: "login", data: token });
    await drain(ws);

    const writes = [];
    const desiredState = stateValue(state);
    if (desiredState !== undefined) {
      const out = outputFor(vehicle, "state");
      const url = `/user?${out}=${desiredState}`;
      await sendSfoxRequest(ws, plc, url);
      writes.push(url);
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
    if (power !== undefined) {
      const out = outputFor(vehicle, "power");
      const url = `/user?${out}=${encodeURIComponent(power)}`;
      await sendSfoxRequest(ws, plc, url);
      writes.push(url);
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
    if (hasArg("read")) {
      await sendSfoxRequest(ws, plc, "/user");
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    console.log(JSON.stringify({ ok: true, plc, vehicle, writes }, null, 2));
  } finally {
    ws.close();
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2));
  process.exitCode = 1;
});
