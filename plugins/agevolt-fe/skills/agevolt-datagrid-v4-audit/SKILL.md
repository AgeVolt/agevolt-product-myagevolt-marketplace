---
name: agevolt-datagrid-v4-audit
description: "Pouzi na audit alebo review existujuceho AgeVolt DataGrid V4 view, default presetov, personal presetov, menu_view configu, componentMeta, renderCell, JSON Logic, units, onclickov, exportu, PR zmeny alebo produkcneho bugu. Skill hlada porusenia KB a navrhuje presne opravne tasky."
---

# AgeVolt DataGrid V4 Audit

Tento skill je pre review, QA a diagnostiku. Jeho uloha je najst porusenia
DataGrid V4 kontraktu a napisat presne, co treba opravit.

## Povinne Citanie

Najprv nacitaj `$agevolt-fe`, potom:

- `knowledge_base/dynamic-data-grid-v4.md`
- `knowledge_base/mutations.md`, ak audit zahrna actions/mutations
- `knowledge_base/localization.md`, ak audit zahrna visible labels
- `knowledge_base/responsive-testing.md`, ak audit zahrna renderer alebo UI

Ak auditujes DB config, precitaj aj DB repo `AGENTS.md` a relevantnu KB.

## Rozsah Auditu

Podla zadania skontroluj:

- `menu_view.view_name`, `base`, `default`, `meta`,
- finalny `componentMeta` z backend response,
- `menu_view_personal_v2.personal` a `favourite`,
- SQL view a `general_mysql_*` metadata,
- default preset shape a component index alignment,
- column ids, sort/filter/group/aggregation/pinning/visibility,
- generated columns a timeseries generated columns,
- JSON Logic valueGetter/valueFormatter,
- registered renderCells a props,
- units a activeUnits,
- column onClickAction a row actions,
- export/scheduled export settings,
- i18n keys pre visible UI text,
- FE page-local hardcoded dynamic grid config.

## Zavaznost

Reportuj findings v tomto poradi:

- P0: view sa nevie nacitat, data su chybne alebo user moze urobit zlu mutaciu.
- P1: default/personal preset, onClick, renderer alebo unit contract je rozbity.
- P2: UX default, export, label, sirka, sort/filter alebo QA gap je nespravny.
- P3: cleanup, naming, dokumentacia alebo buduci risk.

## Zakazane Zavery

- Nepovedz "OK", ak si nevidel finalny runtime response alebo DB config.
- Nepovazuj `base` za dostatocny default preset.
- Nepreskakuj personal preset audit pri zmene `viewColumnId`.
- Nepotvrdzuj vizualne spravanie bez Browser/QA alebo jasneho obmedzenia.

## Vystup

Zacni findings. Kazdy finding musi obsahovat:

- co je porusene,
- kde je to vidiet,
- preco je to problem,
- presny task na opravu.

Potom dopln:

- otvorene otazky,
- spustene alebo blokovane kontroly,
- kratky stav `base/default/personal/favourite`,
- odporucanie, ci treba designer alebo technical follow-up.
