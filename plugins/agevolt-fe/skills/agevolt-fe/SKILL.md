---
name: agevolt-fe
description: "Pouzi pri akejkolvek AgeVolt frontend praci v Codexe: web-portal, ine FE aplikacie, UI refaktor, komponenty, lokalizacia, dashboard, settings, Dynamic DataGrid, knowledge-base routing alebo ked ma agent pred kodom nacitat AgeVolt FE pravidla. Skill sluzi ako zivy KB router: cita lokalne AGENTS.md/knowledge_base alebo dostupne lokalne AgeVolt repo zdroje a zastavi pracu pri konflikte s pravidlami."
---

# AgeVolt FE

Tento skill je bootloader pre AgeVolt frontend pracu. Nie je autorita pravidiel.
Autorita je v aktualnom repozitari alebo v zodpovedajucom lokalnom AgeVolt
repozitari s `AGENTS.md` a `knowledge_base/`.

## Povinne Kroky

1. Precitaj lokalny `AGENTS.md`, ak existuje.
2. Precitaj lokalny `knowledge_base/index.md` a `knowledge_base/registry.yaml`,
   ak existuju.
3. Ak lokalna KB chyba alebo ulohou je riadit sa AgeVolt FE standardom mimo
   `web-portal`, najdi lokalny `web-portal` repozitar a citaj jeho `AGENTS.md`
   a `knowledge_base/`. Ako orientacny index kandidatov mozes pouzit
   `references/agevolt-fe-sources.yaml`, ak je dostupny v plugine.
4. Ak uloha meni produktove spravanie, opravnenia, peniaze, onboarding,
   notifikacie, brand, trhovu dostupnost alebo domenovy vyznam dat, nacitaj aj
   lokalny `business-logic` repozitar.
5. Pred kodom pomenuj, z ktoreho zdroja pravidla citas: lokalna cesta, branch
   a commit, ak je dostupny.
6. Povedz, ktore konkretne pravidla platia pre ulohu.
7. Ak pravidlo chyba, je nejasne, alebo request ide proti pravidlam, zastav a
   navrhni rule-change. Nekoduj proti pravidlam.

## Routing

- Static settings page alebo settings komponenty: pouzi `$agevolt-fe-settings`.
- Dynamic DataGrid V4, MySQL dynamic view alebo default preset: pouzi
  `$agevolt-fe-datagrid-v4`.
- Dashboard, navigation shell, localization, mutations alebo responsive: citaj
  lokalny `knowledge_base/registry.yaml` a relevantne rule subory.

## Pravidla Zdrojov

- Najprv pouzi lokalnu KB aktualneho repozitara.
- Ak aktualne repo nie je AgeVolt FE repo alebo nema pravidla, pouzi lokalny
  `web-portal` alebo `business-logic` repo podla scope ulohy.
- Ak autoritativny zdroj nevies najst alebo precitat, nehadat pravidla. Nahlas
  blocker.
- Plugin nesmie prepisat vyznam pravidiel. Ak je rozdiel medzi pluginom a KB,
  vyhrava KB.

## Finalna Kontrola

Na konci prace uved:

- ktore KB zdroje a commity/cesty boli pouzite,
- ktore pravidla boli relevantne,
- ci vznikol rule conflict alebo otvorena otazka,
- ake overenia boli spustene alebo preco boli blokovane.
