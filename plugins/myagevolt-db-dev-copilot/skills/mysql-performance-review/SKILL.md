---
name: mysql-performance-review
description: "Pouzi pri MyAgeVolt logoch pomalych dotazov, EXPLAIN analyze, pokryti indexmi, optimalizacii SQL a rozliseni historickeho vs aktualneho vykonoveho problemu. Nepouzivaj na bezne lookupy iba na citanie, trigger/procedure zmeny, cistiace skripty, triage DB chyb ani zadanie pre agenta."
---

# Kontrola Vykonu MySQL

Tento skill je pre pomale dotazy a pracu s indexmi.

## Kontext

Precitaj:

- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-schema-inventory.md`
- `../../kb/mysql-performance-index-rules.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/slow-query-report-template.md`

Ak chyba schema, indexy, statistiky alebo `EXPLAIN`, nahlas chybajuci
pristup/zdroj a vypytaj si podklad.

## Postup

1. Pred radenim zoskup opakovane vzory dotazov.
2. Rad podla dopadu na pouzivatela, frekvencie, rows examined, latencie a rizika
   horucej cesty.
3. Pred navrhom novych indexov skontroluj existujuce pokrytie indexmi.
4. Preferuj upravu dotazu alebo predikatu, ked problem vyriesi s mensim dopadom.
5. Oznac neistoty, ktore potrebuju `EXPLAIN`, statistiky tabuliek alebo MCP iba
   na citanie.
6. Vystup ma byt strucne hlasenie: problem, dokaz, pravdepodobna pricina,
   minimalna oprava a overenie.

## Hranice

- Nevymyslaj nazvy indexov ani kardinalitu bez schemy/statistik.
- DDL nenavrhuj ako finalny zasah bez oznacenia, ze ide o migracneho kandidata.
- Ak ide o constraint/runtime chybu, pouzi `mysql-db-error-triage`.
