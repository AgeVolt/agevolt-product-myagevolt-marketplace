---
name: agevolt-datagrid-v4-view-designer
description: "Pouzi pre produktovy alebo neprogramatorsky navrh AgeVolt DataGrid V4 view: ked treba z poziadavky vytvorit specifikaciu menu_view, stlpcov, default presetov, visible columns, sort/filter/grouping, renderCell, valueFormatter/valueGetter, units, onClick, row actions a export spravania bez toho, aby sa hned kodovalo."
---

# AgeVolt DataGrid V4 View Designer

Tento skill pomaha navrhnut DB-driven DataGrid V4 view a default preset z
produktovej poziadavky. Vystup ma byt implementacne pouzitelna specifikacia pre
DB/FE developera, nie nahodny FE hack.

## Povinne Citanie

Najprv nacitaj `$agevolt-fe`, potom:

- `knowledge_base/dynamic-data-grid-v4.md`
- `knowledge_base/localization.md`, ak vznikaju labels alebo tooltipy
- `knowledge_base/new-component-workflow.md`, ak treba novy renderer alebo API

Ak chyba lokalna KB, pouzi AgeVolt FE sync workflow z pluginu.

## Ako Vies Rozpravat S Neprogramatorom

Pytaj sa po logickych blokoch a dav \`A/B/C/D\` moznosti. Ked pouzivatel nevie
odpovedat, odporuc najbezpecnejsi UX default a oznac ho ako navrh.

Nepytaj sa na SQL detail, ak staci produktovy vyznam. Preloz produktove odpovede
do technickej specifikacie.

## Navrhovy Checklist

Ziskaj alebo navrhni:

- nazov view, ucel a primarny workflow,
- kto view pouziva a v akom screen/context-e,
- zdrojove entity a hlavny row model,
- povinne a volitelne stlpce,
- default visible columns, poradie, sirky, pinned columns a density,
- default sort, filter, grouping, aggregation a page size,
- stlpce s units a default unit display,
- valueFormatter/valueGetter poziadavky cez JSON Logic,
- renderCell komponenty z registry alebo potrebu noveho rendereru,
- cell onClick spravanie a target view/dialog,
- row actions a ich typ,
- export behavior a scheduled export potreby,
- empty/loading/error UX,
- permissions alebo role dopad,
- i18n kluce pre labels/tooltips/actions,
- rizika pre personal presety, ak ide o existujuce view.

## Specifikacia Default Presetu

V navrhu vzdy popis default preset ako produktove rozhodnutie. Nepredstieraj
hotovy DB JSON, ak chybaju realne `viewColumnId`.

Minimalny vystup:

```text
Default preset:
- visible columns:
- order:
- widths:
- pinned:
- sort:
- filter:
- grouping:
- aggregation:
- activeUnits:
- exportSettings:
- showAll: false
- rawDisplayMode: false
```

Ak poznas realne `viewColumnId`, mozes doplnit JSON skeleton. Ak ich nepoznas,
oznac ich ako TODO pre technical workflow.

## Zakazy

- Nevymyslaj neexistujuce `viewColumnId`.
- Nenavrhuj novy renderer, `feType`, JSON Logic operation alebo onClick shape ako
  lokalnu vynimku. Navrhni shared kontrakt a KB update.
- Nepouzivaj `menu_view_personal_v2` ako nahradu za chybajuci default.
- Nezakryvaj nejasny datovy zdroj UX textom.

## Vystup

Vystup ma mat:

- kratky produktovy summary,
- implementacnu DataGrid V4 specifikaciu,
- default preset navrh,
- DB/FE tasky pre developera,
- otvorene otazky s moznostami,
- explicitne blockery a konflikty s KB.
