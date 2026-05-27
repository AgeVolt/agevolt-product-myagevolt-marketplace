# Bezpecnostne Hranice MySQL

- Do verejneho vystupu nikdy nedavaj surove produkcne exporty, zakaznicke riadky,
  DB hosty, credentials ani sukromne ChatGPT zdrojove subory.
- Ak chybaju fakty o scheme, zastav a vypytaj si sukromne CSV/zdroj alebo MCP
  iba na citanie. Nepredpokladaj presnu schemu z pamati.
- V1 nema zapisove MCP. Ak sa MCP doplni neskor, zacni iba nastrojmi na citanie
  pre schemu, objekty a `EXPLAIN`.
- Nepouzivaj priamy HTTP fallback pre MCP. Ak MCP tooly nie su viditelne,
  poziadaj o spravnu MCP registraciu/login a novy chat.
- DDL patri do explicitnych migracnych skriptov, nie do produkcnych triggerov
  alebo procedur.
- `SIGNAL`, audit polia a obranne ochrany su opt-in, ak ich nevyzaduju
  existujuce sukromne pravidla.
