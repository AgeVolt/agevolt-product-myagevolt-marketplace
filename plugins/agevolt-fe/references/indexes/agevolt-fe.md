# AgeVolt FE Index

Tento subor je kratky public-safe index pre plugin `agevolt-fe`.

Plugin je router a pomocnik pre AgeVolt frontend knowledge-base pracu. Nevlastni
produktove ani repo pravidla.

## Autorita

Pouzi tieto zdroje v poradi:

1. Aktualny repozitar: `AGENTS.md`, `README.md`, `knowledge_base/index.md` a
   `knowledge_base/registry.yaml`.
2. Surodenecky alebo znamy lokalny repozitar `web-portal`, ak aktualny
   workspace nie je frontend repo alebo nema potrebnu KB.
3. Surodenecky alebo znamy lokalny repozitar `business-logic`, ak uloha meni
   produktove spravanie, opravnenia, peniaze, onboarding, notifikacie, brand,
   trhovu dostupnost alebo domenovy vyznam dat.

`references/agevolt-fe-sources.yaml` je iba orientacny index kandidatov. Nie je
autorita pravidiel.

## Moduly

- `agevolt-fe` - hlavny frontend KB bootloader a router.
- `agevolt-fe-settings` - staticke settings stranky, zdielane settings
  komponenty, formulare, dialogy, akcie, layout, visual QA a lokalizacia.
- `agevolt-fe-datagrid-v4` - Dynamic DataGrid V4 router.
- `agevolt-datagrid-v4-view-designer` - produktovy alebo neprogramatorsky
  workflow pre navrh view a default preset specifikacie.
- `agevolt-datagrid-v4-technical` - DB/FE implementacny workflow pre SQL view,
  `general_mysql_*`, `menu_view`, presety, renderery, JSON Logic, jednotky a
  actions.
- `agevolt-datagrid-v4-audit` - review workflow pre existujuce views, presety,
  `componentMeta`, personal presety a produkcne bugy.
- `agevolt-charging-simulator-e2e` - E2E test nabijania cez AgeVolt FE a
  SmartFox simulator.

## MCP

Povodny lokalny MCP `agevolt-fe-kb` nebol preneseny do tejto migracie. Plugin
neobsahuje `.mcp.json` ani `mcp/`. Agent ma citat autoritativne lokalne repo
subory priamo a pri chybajucom zdroji nahlasit blocker.

## Rozsirovanie

- Reusable FE workflow skilly pridavaj pod `plugins/agevolt-fe/skills/<skill>`.
- Velke pravidla drzte v repozitarovych `knowledge_base/`, nie v tomto plugine.
- Pluginove referencie drzte kratke a smerujte na zive zdroje.
- Tokeny, private credentials, produkcne secrety a zakaznicke data nepatria do
  skillov, manifestov ani referencii.
