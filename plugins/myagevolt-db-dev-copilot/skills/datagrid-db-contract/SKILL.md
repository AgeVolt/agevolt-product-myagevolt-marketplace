---
name: datagrid-db-contract
description: "Pouzi pri MyAgeVolt DB/metadatovom kontrakte pre DataGrid alebo FE formular cez AgeVolt database repo: SQL pohlad, general_mysql_column, general_mysql_view, menu_view DB podklady, fe_select_sql, fe_default_sql, fe_hide_sql. FE render patri do agevolt-fe."
---

# DataGrid DB Kontrakt

Tento skill riesi iba DB a metadatovu vrstvu pre DataGrid/FE formular. FE render,
MUI, `renderCell`, frontendovy preset a UI pravidla patria do existujucich
`agevolt-fe` DataGrid skillov.

## Kontext

Precitaj:

- `../../kb/database-repo-workflow.md`
- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/mysql-schema-inventory.md`

V `database` repo citaj `exports/agevolt/config_data/general_mysql_*`,
`exports/agevolt/config_data/menu_view*`, `exports/agevolt_fe_*_view/**`,
`exports/agevolt_fe_sp/**` a relevantne `knowledge_base/database/api-contracts.md`.
`triggers cistenie` je iba legacy kontext; pri konflikte vyhrava `database` repo.

Pred objektovym lookupom alebo diffom vykonaj `Repo Sync Gate` z
`database-repo-workflow.md`: `git fetch origin`, cisty hlavny branch,
`git pull --rebase --ff-only`, potom branch z aktualneho mainu. Ak je repo na
feature branchi alebo ma lokalne zmeny, zastav a ukaz blocker.

## Rozsah

Patri sem:

- SQL pohlad a DB kontrakt pre FE,
- `agevolt.general_mysql_column` metadata,
- `fe_select_sql`, `fe_default_sql`, `fe_hide_sql`,
- `general_mysql_view` / `menu_view` DB podklady,
- testovaci `CALL agevolt_fe_sp.general_fe_column_values_sp(...)`.

Mimo rozsahu:

- React/MUI/DataGrid renderer,
- frontendovy preset JSON,
- `componentMeta`, `renderCell`, onClick UI akcie.

## Postup

1. Pomenuj latest-main sync stav, precitane database repo subory a aktualny DB kontrakt.
2. Ak treba zmena, priprav novu branchu, export/config diff a changelog kandidat.
3. Ukaz zmenene subory, relevantny diff a testovaci SQL plan.
4. Spytaj sa na commit; po commite sa samostatne spytaj na push.

## Hranice

- DB apply nikdy nerob bez exact `APPROVE WRITE` alebo `APPROVE WRITE PROD`.
- Ak treba FE implementaciu, odkaz na `agevolt-fe-datagrid-v4` alebo suvisiaci
  AgeVolt FE skill.
