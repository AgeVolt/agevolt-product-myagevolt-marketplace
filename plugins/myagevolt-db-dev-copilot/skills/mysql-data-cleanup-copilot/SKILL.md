---
name: mysql-data-cleanup-copilot
description: "Pouzi pri jednorazovych MyAgeVolt SQL cistiacich skriptoch a normalizacii dat cez AgeVolt database repo. Priprav preview SELECT, branch + diff a changelog kandidat; DB apply vyzaduje exact approval. Nepouzivaj na rutiny, lookupy, vykon, triage ani handoff."
---

# Pomocnik Pre Cistenie Dat V MySQL

Tento skill je pre jednorazove cistenie a normalizaciu dat v SQL.

## Kontext

Precitaj:

- `../../kb/database-repo-workflow.md`
- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-schema-inventory.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/cleanup-examples.md`

V `database` repo citaj relevantne exporty, metadata a
`knowledge_base/database/mutations-or-writes.md`.
`triggers cistenie` je iba legacy kontext; pri konflikte vyhrava `database` repo.

## Postup

1. Najprv potvrd tabulku, stlpce a existujuce pravidla v `database` repo.
2. Oddel kontrolne SQL od zapisoveho SQL.
3. Pred kazdym `UPDATE` priprav nahladovy `SELECT`.
4. Zapisove SQL obmedz na ID alebo presne predikaty.
5. SQL `NULL`, prazdny string, whitespace a JSON string `"null"` ber ako odlisne
   pripady.
6. Pri ENUM cisteni rataj s internou prazdnou ENUM hodnotou v MySQL.
7. Ak ide o DB zmenu, priprav branch + diff + changelog kandidat v `database`
   repo a ukaz zmenene subory.
8. Spytaj sa na commit; po commite sa samostatne spytaj na push.

## Hranice

- DB apply nikdy nerob bez exact `APPROVE WRITE` alebo `APPROVE WRITE PROD`.
- Nevytvaraj tu trigger/procedure logiku; na to pouzi `mysql-routine-change-copilot`.
- Netvrd, ze cistenie je bezpecne, kym nie je nahladovy dotaz.
- Nevkladaj zakaznicke riadky do verejneho vystupu.
