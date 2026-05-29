---
name: agevolt-charging-simulator-e2e
description: "Pouzi ked pouzivatel ziada AgeVolt test nabijania, simulovanu nabijacku, SmartFox/evemsimulator ovladanie, start/stop charging E2E, zmenu vykonu, pripojenie/odpojenie auta, kontrolu Driver active charging, map view Station availability alebo overenie, ze nova transakcia pribudla v Operation Transactions. Skill pokryva prihlaseneho aj buduce neprihlasene/guest scenare a riadi bezpecne cleanup kroky."
---

# AgeVolt Charging Simulator E2E

Tento skill riadi E2E test nabijania cez AgeVolt FE a SmartFox SfoxWeb simulator.
Pouzi ho pri poziadavkach typu "sprav mi test nabijania", "otestuj nabijacku",
"simuluj auto", "zmen vykon" alebo "over transakciu po nabijani".

## Povinne citanie

1. Nacitaj `$agevolt-fe`.
2. Pri browser krokoch nacitaj `$browser`.
3. Ak kontrolujes DataGrid transaction view alebo V4 defaulty, nacitaj
   `$agevolt-fe-datagrid-v4` alebo `$agevolt-datagrid-v4-audit`.
4. Ak kliknutie start/stop meni realne data, pouzi pravidla z
   `knowledge_base/mutations.md`.

## Bezpecnost

- Neukladaj SmartFox heslo, access token ani AgeVolt credentials do suborov.
- SmartFox prihlasenie ber z aktualneho promptu, bezpecnej env premennej alebo
  explicitneho schvalenia v danom threade.
- Ak pouzivas env subor, nacitaj iba lokalny/SharePointom dodany runtime subor
  podla `references/smartfox.env.example`; nikdy ho necommituj do pluginu ani
  web-portal repozitara.
- Pred mutaciou si over, ze si na ocakavanej testovacej stanici/konektore.
- Po teste vzdy zastav nabijanie vo FE, nastav simulator naspat na
  `Disconnected` a vrat vykon na bezpecny default, typicky `10 kW`.
- Ak je backend down alebo FE vracia `Service Unavailable`, test pozastav a
  nemen simulator dalej.
- Ak ide o neprihlaseny scenar, nepredpokladaj ulozene vozidlo/tag; postupuj
  podla UI a reportuj, kde sa flow lisi.

## Simulator

Predvoleny SmartFox endpoint:

- aplikacia: `https://app.smartfox.cloud/`
- websocket: `wss://smartfox.cloud/endpoint/sfoxweb/`
- PLC: `evemsimulator1` (`EvEmSimulator1` v UI)
- start page: `/user`
- protocol: `SfoxWeb`

Mapovanie simulatora:

| Simulator | Stav output | Vykon output |
|---|---:|---:|
| Vehicle A | `out0` | `out1` |
| Vehicle B | `out3` | `out4` |

Stavy:

- `1` = `Disconnected`
- `2` = `Connected`
- `3` = `Charging`

Priklady SfoxWeb requestov:

- Vehicle A connected: `/user?out0=2`
- Vehicle A charging: `/user?out0=3`
- Vehicle A disconnected: `/user?out0=1`
- Power A 12 kW: `/user?out1=12`
- Vehicle B charging: `/user?out3=3`
- Power B 8 kW: `/user?out4=8`

Ak potrebujes deterministicke ovladanie mimo browser UI, pouzi
`scripts/smartfox-simulator.mjs`.

Env template pre bezpecne runtime credentials je v
`references/smartfox.env.example`.

## Zakladny prihlaseny scenar

1. Otvor AgeVolt FE na Driver/Management space, kde existuje testovacia stanica.
2. Otvor map view Station availability:
   `/v3/table/34009f0b-584d-4550-8bcb-1e5a2785f988?viewDisplay=map`.
3. V DataGrid/left search vyhladaj stanicu, napriklad `T1_1911_1`.
4. Otvor stanicu a vyber konektor:
   - konektor `#1` zvycajne mapuj na Vehicle A,
   - konektor `#2` zvycajne mapuj na Vehicle B.
5. V simulatore nastav vybrane vozidlo na `Connected`.
6. V AgeVolt detaile konektora klikni `Start charging`.
7. Na Driver active charging over:
   - `1 active`,
   - vzniknuty transaction ID,
   - stanica/konektor zodpoveda vyberu,
   - EVSE status zacne ako `PREPARING` alebo `CHARGING`.
8. V simulatore nastav vozidlo na `Charging`.
9. Men vykon cez `out1` alebo `out4` a polluj FE:
   - `Power now`,
   - `Energy`,
   - `EVSE Status`,
   - `Connection State`,
   - `Last update`.
10. Zastav nabijanie cez FE `Stop charging`.
11. V simulatore nastav vozidlo na `Disconnected` a vykon vrat na `10 kW`.
12. Otvor `Operation -> Transactions`:
    `/v3/table/df1d2a00-6e9e-4ce8-b38b-01f6a8d168d3`.
13. Over novu transakciu v `All` a podla typu aj v `Internal`, `Public`,
    `Shared`, `eRoaming` alebo `Unknown and blocked`.

## Co reportovat

V reportingu vzdy uved:

- space a URL viewu,
- stanica, EVSE ID, konektor cislo,
- Vehicle A/B mapovanie,
- hodnoty odoslane do simulatora,
- FE hodnoty po start, pocas charging a po stop,
- transaction ID, ak bolo zobrazene,
- ci transakcia pribudla v transaction view,
- cas start/end a consumption,
- rozdiely alebo limity, napriklad ak simulator posle `18 kW`, ale FE ukaze
  limitovany vykon podla konektora.

## Zname pozorovania

- Pri `T1_1911_1` konektor `#1` je `SK*AGV*E1*19971*10*1`.
- Po `Start charging` sa moze AgeVolt presmerovat na `/charging`.
- FE moze ukazovat vykon limitovany stanicou alebo konektorom, nie nutne presne
  rovnaky ako hodnota poslana do simulatora.
- Transaction view default nemusi zobrazovat `transaction_id`; vtedy overuj
  kombinaciou stanica, start/end cas, driver/tag, typ, consumption a check.

## Scenare

Pre varianty citaj `references/scenarios.md` iba ak je potrebne:

- prihlaseny driver s vozidlom a tagom,
- neprihlaseny/guest driver,
- zmena vykonu pocas nabijania,
- stop charging a overenie transaction view,
- negativne stavy backend down, station offline, simulator offline.
