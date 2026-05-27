# MyAgeVolt Architekturna KB

Seed marketplace-level KB pre vysoku architekturu MyAgeVolt.

## Ucel

Tento subor drzi spolocne architektonicke pravidla, mapu sluzieb a hranice medzi
FE, appkou, backendovymi sluzbami, DB, OCPP a externymi systemami.

## Pilotne Pravidlo

Pre pilot `myagevolt-db-dev-copilot` plati:

- DB schemu, procedury, triggery, eventy, pohlady, cistenie dat a vykonovu
  diagnostiku riesi plugin `myagevolt-db-dev-copilot`.
- FE rendering, MUI, DataGrid V4 renderer a UI preset pravidla ostavaju v
  existujucich `agevolt-fe` skilloch.
- DB MCP `myagevolt_db_readonly` iba na citanie je kandidat pre neskorsi krok:
  hladanie v scheme, `SHOW CREATE`, `EXPLAIN` a hladanie objektov. MVP nema
  zapisove MCP.

## Hranica Sukromnych Podkladov

Architektura moze odkazovat na interne zdroje, ale verejna Git kopia nesmie
obsahovat produkcne DB exporty, tajne hodnoty, zakaznicke data, logy pomalych
dotazov ani surove SQL dumpy.
