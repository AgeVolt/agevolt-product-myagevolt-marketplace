---
name: agevolt-fe-datagrid-v4
description: "Router pre AgeVolt Dynamic DataGrid V4 pracu. Pouzi pri menu_view, default presetoch, view dizajne, renderCell registry, valueGetter/valueFormatter JSON Logic, units, onClickAction, row actions, exportoch, audite existujuceho gridu alebo technickej FE/cross DB-FE implementacii. Cisto DB/metadatovy kontrakt cez database repo patri do $datagrid-db-contract. Skill nacita zivu KB a zvoli designer, technical alebo audit workflow."
---

# AgeVolt FE DataGrid V4 Router

Tento skill je vstupny router pre vsetku DataGrid V4 pracu. Sam o sebe nie je
detailny navod. Najprv nacitaj `$agevolt-fe`, potom zivu KB a nasledne vyber
spravny workflow.

## Povinne Citanie

Najprv precitaj:

- `knowledge_base/dynamic-data-grid-v4.md`
- `knowledge_base/registry.yaml`
- `knowledge_base/index.md`

Ak praca zasahuje produktovy vyznam dat, permissions, peniaze alebo domenu,
precitaj aj business-logic KB podla `$agevolt-fe`.

## Routing

Vyber presne jeden primarny workflow:

- Produktovy navrh alebo neprogramatorske zadanie: precitaj
  `../agevolt-datagrid-v4-view-designer/SKILL.md`.
- Cisto DB/metadatovy kontrakt bez FE runtime alebo renderer dopadu: pouzi
  `$datagrid-db-contract` z `myagevolt-db-dev-copilot`.
- Technicka implementacia v DB/FE, SQL view, `general_mysql_*`,
  `menu_view.default`, renderery, units alebo onClick: precitaj
  `../agevolt-datagrid-v4-technical/SKILL.md`.
- Audit existujuceho view, default presetov, personal presetov, PR alebo
  produkcneho spravania: precitaj `../agevolt-datagrid-v4-audit/SKILL.md`.

Ak je request zmiesany, najprv urob designer/spec cast, potom technical cast a
nakoniec audit checklist. Pri konflikte pravidiel zastav a pomenuj konflikt.

## Zakladne Invarianty

- Backend response je zdroj pravdy. FE je renderer.
- Nove produkcne V4 view musi mat premysleny `menu_view.default`.
- Nehardcoduj dynamicke stlpce, formattery, jednotky, actions, export ani
  preset spravanie do page-level FE.
- Novy renderer, JSON Logic operation, unit contract alebo onClick shape je
  zdielana API zmena a potrebuje KB doplnenie.
- Pri zmene `viewColumnId` alebo component indexu audituj personal presety.

## Vystup Routera

V odpovedi vzdy uved:

- ktory workflow bol zvoleny,
- z akej KB cesty a pripadne commit-u agent cital,
- ci ide o navrh, implementaciu alebo audit,
- dalsi presny krok alebo blocker.
