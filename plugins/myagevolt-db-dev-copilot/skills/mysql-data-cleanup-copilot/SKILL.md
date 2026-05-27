---
name: mysql-data-cleanup-copilot
description: "Pouzi pri jednorazovych MyAgeVolt SQL cistiacich skriptoch a normalizacii dat, napriklad JSON adresy, prazdny string vs NULL, prazdna ENUM hodnota, kolacie alebo bezpecny update plan. Nepouzivaj na trigger/procedure zmeny, lookupy iba na citanie, kontrolu pomalych dotazov, triage DB chyb ani zadanie pre agenta."
---

# Pomocnik Pre Cistenie Dat V MySQL

Tento skill je pre jednorazove cistenie a normalizaciu dat v SQL.

## Kontext

Precitaj:

- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-schema-inventory.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/cleanup-examples.md`

Ak chyba schema alebo ukazkove riadky, vypytaj si `SHOW CREATE`, relevantny
vyrez dat alebo MCP iba na citanie.

## Postup

1. Oddel kontrolne SQL od zapisoveho SQL.
2. Ak chybaju podklady, vypytaj si ukazkove riadky, DDL cielovej tabulky a
   ocakavanu finalnu hodnotu.
3. Pred kazdym `UPDATE` priprav nahladovy `SELECT`.
4. Zapisove SQL obmedz na ID alebo presne predikaty.
5. SQL `NULL`, prazdny string, whitespace a JSON string `"null"` ber ako odlisne
   pripady.
6. Pri ENUM cisteni rataj s internou prazdnou ENUM hodnotou v MySQL.
7. Pri destruktivnej zmene dopln navrh zalohy alebo rollbacku.

## Hranice

- Nevytvaraj tu trigger/procedure logiku; na to pouzi `mysql-routine-change-copilot`.
- Netvrd, ze cistenie je bezpecne, kym nie je nahladovy dotaz.
- Nevkladaj zakaznicke riadky do verejneho vystupu.
