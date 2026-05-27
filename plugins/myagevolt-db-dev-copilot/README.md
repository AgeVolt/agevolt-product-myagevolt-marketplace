# MyAgeVolt DB Pomocnik

Databazovy pomocnik pre MyAgeVolt portal. Pilot vznikol migraciou ChatGPT
projektu `triggers cistenie` podla planu v `AI projects`.

Plugin pokryva:

- MySQL pohlady, triggery, procedury, funkcie a eventy,
- OCPP RAW prijem a RAW -> `last_*` davkovy tok,
- jednorazove cistiace SQL pre normalizaciu dat,
- DB chyby, FK/InnoDB/ENUM/collation diagnostiku,
- pomale dotazy a kontrolu indexov,
- DB/metadatovy kontrakt pre DataGrid.

## Hranica Sukromnych Podkladov

Surove DB exporty, CSV inventar, produkcne SQL dumpy, logy pomalych dotazov,
zakaznicke data a plne ChatGPT prepisy nepatria do verejnej Git kopie. Verejne
bezpecny skill ma pri chybajucej sukromnej KB nahlasit chybajuci pristup alebo
zdroj a nema si domyslat realnu DB strukturu.

## Pilotne Zdroje

- `AI projects/Celkovy migracny plan ChatGPT projektov.md`
- `AI projects/migration-staging/chatgpt-projects/triggers-cistenie`
- ChatGPT projekt `triggers cistenie`
