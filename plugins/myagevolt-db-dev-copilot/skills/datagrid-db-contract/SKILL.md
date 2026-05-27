---
name: datagrid-db-contract
description: "Pouzi pri MyAgeVolt DB/metadatovom kontrakte pre DataGrid alebo FE formular: SQL pohlad, general_mysql_column, general_mysql_view, menu_view DB podklady, fe_select_sql, fe_default_sql, fe_hide_sql a pravidla value/default/hide. Nepouzivaj na FE renderCell/MUI/DataGrid UI implementaciu; to patri do agevolt-fe DataGrid skillov."
---

# DataGrid DB Kontrakt

Tento skill riesi iba DB a metadatovu vrstvu pre DataGrid/FE formular. FE render,
MUI, `renderCell`, frontendovy preset a UI pravidla patria do existujucich
`agevolt-fe` DataGrid skillov.

## Najprv Nacitaj KB

Precitaj podla potreby:

- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/mysql-schema-inventory.md`
- pri dynamickych FE hodnotach sukromne poznatky z ChatGPT projektu, ak su
  dostupne v SharePoint zdroji.

Ak sukromna KB chyba, najdi SharePoint root:

```text
AI Agent/marketplaces/agevolt-product-myagevolt-marketplace/plugins/myagevolt-db-dev-copilot/kb/
```

Ak chybaju realne stlpce/tabulky, vypytaj si CSV schemy, `SHOW CREATE` alebo
MCP iba na citanie.

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

## Pravidla Pre `fe_*_sql`

- `fe_select_sql` vracia minimalne `value` a `label`.
- `fe_default_sql` vybera jednu default hodnotu, nepridava novu moznost.
- `fe_hide_sql` vracia JSON array hodnot; `JSON_ARRAY('*')` znamena skryt vsetko.
- `fe_*_sql` nesmie koncit bodkociarkou, nesmie byt multi-statement a nesmie
  obsahovat DDL.
- Kontext citaj z `@ctx`, `agevolt_core.get_space()` alebo `agevolt_core.get_user()`
  iba ked je to v zadani a schema to podporuje.

## Vystup

Dodaj spustitelny SQL update alebo plan a kratky test:

```sql
SET @spaceId = '...';
SET @userId = '...';
CALL agevolt_fe_sp.general_fe_column_values_sp(...);
```

Ak treba FE implementaciu, odkaz na `agevolt-fe-datagrid-v4` alebo suvisiaci
AgeVolt FE skill.
