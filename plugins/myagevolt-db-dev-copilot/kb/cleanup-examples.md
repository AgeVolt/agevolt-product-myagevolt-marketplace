# Priklady Cistenia

- Prazdny string alebo whitespace normalizuj na SQL NULL cez `NULLIF(TRIM(x), '')`.
- JSON text `"null"` nepovazuj za SQL NULL; normalizuj ho explicitne.
- Pri ENUM NOT NULL rataj s internou MySQL 0-hodnotou `''`.
- Cistiaci skript oddel od produkcnej logiky triggerov a procedur.
- Pred zapisom vzdy priprav nahladovy `SELECT`.
