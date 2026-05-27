---
name: mysql-routine-change-copilot
description: "Pouzi pri MyAgeVolt MySQL trigger/procedure/function/event praci, ked treba vytvorit novy DB objekt alebo upravit existujuci objekt blokovo/diffom. Nepouzivaj na SELECT lookupy iba na citanie, jednorazove cistenie dat, kontrolu pomalych dotazov, triage DB chyb ani zadanie pre agenta; na tie pouzi susedne skilly."
---

# Pomocnik Pre Zmeny MySQL Rutin

Tento skill sluzi na zmeny MyAgeVolt MySQL rutin: triggerov, procedur, funkcii
a eventov.

## Kontext

Najprv precitaj tieto KB subory:

- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-routine-style-rules.md`
- `../../kb/mysql-schema-inventory.md`
- `../../kb/mysql-safety-boundaries.md`

Ak pouzivatel odkazuje na migrovany ChatGPT projekt, hladaj lokalny SharePoint
alebo staging `migration-staging/chatgpt-projects/triggers-cistenie/`. Sukromnu
KB nacitaj iba vtedy, ked je dostupna lokalne.

## Postup

1. Rozlis, ci ide o upravu existujuceho objektu alebo vytvorenie noveho objektu.
2. Pri existujucom objekte si vypytaj aktualny `SHOW CREATE` alebo zdroj, ak
   este nie je dostupny.
3. Vrat iba zmeneny blok `label: BEGIN ... END;` alebo sustredeny diff, ak
   pouzivatel vyslovene neziada cely objekt.
4. Presne povedz, kde blok vlozit alebo nahradit.
5. Pri novom objekte vrat cele spustitelne SQL s `DELIMITER //` a
   `DEFINER=\`dev_admin\`@\`%\``.
6. Skontroluj, ci sumarne komentare po `main: BEGIN` a v rodicovskych blokoch
   stale opisuju finalne spravanie.
7. Uved predpoklady a potrebne overovacie dotazy.

## Hranice

- Nevymyslaj nazvy tabuliek alebo stlpcov z nekompletnych ukazok.
- Nepridavaj ochrany, audit polia, `SIGNAL` ani DDL bez explicitnej poziadavky.
- Komentare drz kratke a po slovensky.
- Ak je uloha v skutocnosti vykon, triage chyby, cistenie dat, lookup iba na
  citanie alebo zadanie pre agenta, prepni na prislusny susedny skill.
