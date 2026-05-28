# Priklady Cistenia

- Prazdny string/whitespace -> SQL NULL cez `NULLIF(TRIM(x), '')`.
- JSON text `"null"` nepovazovat za SQL NULL; explicitne normalizovat.
- Pri ENUM NOT NULL ratat s internou MySQL 0-hodnotou `''`.
- Cistiaci skript oddelit od produkcnej logiky triggerov/procedur.
