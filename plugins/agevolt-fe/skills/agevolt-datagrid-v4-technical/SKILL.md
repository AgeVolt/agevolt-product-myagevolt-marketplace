---
name: agevolt-datagrid-v4-technical
description: "Pouzi pri technickej FE alebo cross DB/FE implementacii AgeVolt DataGrid V4: menu_view.base/default/meta, runtime componentMeta, default preset JSON, renderCell registry, JSON Logic valueGetter/valueFormatter, units, onClickAction, row actions, exports a FE renderer kontrakty. Cisto DB/metadatovy kontrakt cez database repo patri do $datagrid-db-contract."
---

# AgeVolt DataGrid V4 Technical

Tento skill je pre DB/FE developera. Ciel je implementovat alebo upravit
DataGrid V4 tak, aby FE ostal renderer a backend response ostal zdroj pravdy.

## Hranica Voci DB Copilotovi

- Ak request riesi iba SQL view, `general_mysql_*`, `fe_select_sql`,
  `fe_default_sql`, `fe_hide_sql` alebo DB metadata bez FE renderer dopadu,
  pouzi `$datagrid-db-contract`.
- Ak request riesi FE renderer, UI spravanie, preset runtime, actions, export,
  `componentMeta` interpretaciu alebo DB/FE kontrakt v jednej zmene, pouzi tento
  skill a pri DB casti nacitaj aj DB repo pravidla.

## Povinne Citanie

Najprv nacitaj `$agevolt-fe`, potom:

- `knowledge_base/dynamic-data-grid-v4.md`
- `knowledge_base/mutations.md`, ak grid action meni data
- `knowledge_base/localization.md`, ak sa menia viditelne texty
- `knowledge_base/responsive-testing.md`, ak sa meni FE renderer/layout
- `knowledge_base/new-component-workflow.md`, ak vznikne renderer/API

Ak sa meni DB repo, precitaj DB repo `AGENTS.md` a jeho KB.

## Implementacny Postup

1. Identifikuj `menu_view`, `view_name`, component index a realny runtime
   `componentMeta`.
2. Skontroluj SQL view a `general_mysql_*` metadata.
3. Refreshni alebo priprav refresh:
   `general_mysql_view_refresh`, `general_mysql_view_column_refresh`,
   `general_mysql_column_refresh`, `general_mysql_procedure_refresh`,
   `menu_view_base_refresh`.
4. Over `menu_view.base` ako generovany technicky kontrakt.
5. Vytvor alebo uprav `menu_view.default` az po stabilnom `base`.
6. Over `menu_view_detail_v2` alebo finalny FE response.
7. Audituj `menu_view_personal_v2`, ak sa zmenili `viewColumnId`, component
   indexy alebo preset shape.
8. Spusti dostupne FE/DB kontroly a napis, co bolo blokovane.

## Povinne Kontroly

- `base/default/meta` index alignment.
- `default` shape je `Array<Array<Preset>>`.
- `properties.state`, `properties.columns`, `showAll:false`,
  `rawDisplayMode:false`.
- Vsetky stlpce v sort/filter/group/aggregation/pinning/visibility existuju.
- JSON Logic pouziva iba registrovane operacie a existujuce `viewColumnId`.
- `{THIS.VALUE}` sa pouziva iba ako placeholder aktualneho stlpca.
- `renderCell.component` existuje v registry.
- `defaultProps.unit` a `properties.activeUnits` su zladene.
- `onClickAction` ma jasny `dialog`, `redirect` alebo `new_tab` kontrakt.
- Row actions maju podporovany typ a validny target.
- Export config neodkazuje na neexistujuce fieldy.
- Zmena `viewColumnId` je oznacena ako breaking change.

## Zakazane Skratky

- Nehardcoduj dynamicky grid config v page-level FE.
- Nepouzivaj deprecated generic V2 mutation pre novu pracu.
- Neupravuj `menu_view.base` rucne bez explicitnej migracie alebo emergency
  repair.
- Nepreskakuj default preset s tym, ze grid sa renderuje z base.
- Nezavadzaj novy renderer, unit contract, JSON Logic op alebo onClick shape bez
  shared kontraktu a KB update.

## Vystup

V odpovedi vzdy uved:

- KB zdroj a commit/cestu,
- DB tabulky, procedury, SQL view a FE subory kontrolovane alebo menene,
- stav `base`, `default`, `personal`, `favourite`,
- migration/audit dopad,
- spustene kontroly,
- presne blockery alebo follow-up tasky.
