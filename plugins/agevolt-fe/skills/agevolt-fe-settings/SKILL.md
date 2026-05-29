---
name: agevolt-fe-settings
description: "Pouzi pri AgeVolt FE praci na statickych settings strankach, user/space settings, shared settings komponentoch, taboch, formularoch, readonly kartach, dialogoch, draweroch, settings tabulkach, layout rail, appbar/footer sirke, helper tooltipoch, lokalizacii a visual QA. Skill vzdy najprv cita zivu web-portal KB a potom riadi refaktor podla settings pravidiel."
---

# AgeVolt FE Settings

Pouzi tento skill iba po AgeVolt FE bootstrape alebo spolu s nim.

## Povinne Citanie

Najprv nacitaj lokalnu autoritativnu KB cez `$agevolt-fe`. Potom precitaj
relevantne subory z `web-portal/knowledge_base`:

- `static-settings-pages.md`
- `settings-layout.md`
- `settings-components.md`
- `settings-forms.md`
- `settings-inputs.md`
- `settings-actions.md`
- `settings-dialogs.md`
- `settings-data-grid.md`
- `settings-data-fetching.md`
- `settings-states.md`
- `settings-permissions.md`
- `settings-polish-patterns.md`
- `settings-visual-qa.md`
- `new-component-workflow.md`
- `localization.md`
- `i18n-sql-translations.md`
- `mutations.md`
- `responsive-testing.md`

Ak `registry.yaml` alebo `index.md` smeruje na novsie topic subory, citaj aj tie.

## Postup

1. Identifikuj screen, tabs, sections, forms, tables, actions a shared
   komponenty.
2. Najprv hladaj existujuce settings shared komponenty. Nevytvaraj one-off UI.
3. Ak treba novy komponent alebo API, zastav a predloz new-component proposal.
4. Ak je rozpor medzi aktualnym UI a pravidlami, pomenuj konflikt a oprav podla
   pravidiel alebo poziadaj o rule-change.
5. Pri visible texte dodrz FE SQL translation workflow v aktualnej KB.
6. Pri vizualnej zmene over desktop/tablet/mobile a dark/light, ak je dostupne.

## Pravidla

- Settings page ma pouzivat shared static settings layout.
- Appbar, content a footer rail musia sediet podla layout rules.
- Read-only values pouzivaju shared read-only komponent a maju byt nad
  formularovou castou, ak KB neurci vynimku.
- Helper vysvetlivky maju preferovat info tooltip/end adornment pattern podla
  aktualnych rules, nie rusivy helper text.
- Taby musia byt shared, URL/state synchronizovane a nesmu menit UI bez rule
  dovodu.
- Settings tabulky pouzivaju shared settings grid/toolbar a stable action
  column.

## Vystup

V odpovedi vzdy uved:

- nacitane settings rule subory,
- ci bol potrebny novy komponent alebo rozsireny shared API,
- visual QA stav,
- prekladovy/SQL stav,
- blokery.
