---
name: mysql-schema-query-copilot
description: "Pouzi pri MyAgeVolt SQL lookupoch iba na citanie, SELECT/count/join dotazoch, hladani v scheme a jednoduchych analytickych dotazoch nad znamou DB strukturou. Nepouzivaj na zmeny triggerov/procedur, update/delete cistiace skripty, optimalizaciu pomalych dotazov, triage DB chyb ani zadanie pre agenta."
---

# Pomocnik Pre MySQL Schemu A Dotazy

Tento skill je pre SQL iba na citanie nad MyAgeVolt schemou.

## Kontext

Precitaj:

- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-schema-inventory.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/mysql-access-gaps.md`

Ak sukromne CSV subory schemy nie su dostupne, vypytaj si ich alebo schvalene
MCP iba na citanie. Nehadaj presne joiny.

## Postup

1. Urci pozadovany vystup: pocet, lookup, join, hladanie, validacia alebo report.
2. Potvrd dostupne fakty o tabulkach a stlpcoch zo sukromnej KB, DDL od
   pouzivatela alebo MCP iba na citanie.
3. Vytvor `SELECT` iba na citanie.
4. Pri ambiguitach kvalifikuj stlpce a aliasy.
5. Pridaj kratke vysvetlenie joinov a filtrov.
6. Predpoklady a mozne chybajuce indexy spomen iba ked su relevantne.

## Hranice

- Ziadne `INSERT`, `UPDATE`, `DELETE`, DDL, upravy trigger/procedure ani
  produkcne akcie.
- Ak pouzivatel chce opravit data, pouzi `mysql-data-cleanup-copilot`.
- Ak sa pyta, preco je dotaz pomaly, pouzi `mysql-performance-review`.
