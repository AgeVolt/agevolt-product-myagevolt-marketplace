# Revision history

## 2026-05-29 - DataGrid View Naming

- Do `datagrid-db-contract` skillu doplnene pravidlo, ze SQL view export musi
  pouzivat rovnaky nazov ako automaticky `menu_view_ensure_views` placeholder.
- Pri oprave nazvu sa ma zly manualny view cleanupnut a SELECT presunut pod
  automaticky nazov z `menu_view.view_name`.

## 2026-05-28 - Production DDL Safety Sync

- Database repo dotiahnuty na `08e9e66`; nove pravidla z
  `knowledge_base/database/db-change-workflow.md` a `mysql-style.md` su
  premietnute do pluginu.
- Pridana KB `mysql-production-ddl-safety.md` pre delene produkcne `ALTER TABLE`,
  online DDL clauses, lock timeouty a `pt-online-schema-change`/`gh-ost` review.
- Workflow vyzaduje refresh alebo manualne overenie priamo meneneho objektu pred
  DB zmenou; `exports/**` su snapshot, live DB je zdroj pravdy.
- Business-logic KB je povinny vstup pri zmenach domenoveho spravania; ak
  `../business-logic` chyba, skill ma zastavit s access gapom.

## 2026-05-28 - Latest Main Sync Gate

- Doplnene tvrde pravidlo, ze database repo sa pred objektovym lookupom a
  implementacnou branchou musi zosynchronizovat cez `git fetch origin` a
  `git pull --rebase --ff-only` na hlavnej branchi.
- Ak je database repo na feature branchi alebo ma lokalne zmeny, skill musi
  zastavit a ukazat blocker namiesto prace zo zastaraneho snapshotu.
- Skilly maju v odpovedi uvadzat branch, base commit a sync stav.
- UI nazvy pluginu a skillov su po anglicky: display names, kratke popisy a
  default prompty.

## 2026-05-28 - Database Repo Merge

- Zluceny legacy kontext ChatGPT projektu `triggers cistenie` s novym AgeVolt
  `database` repozitarom.
- `database/AGENTS.md` a `database/knowledge_base/**` su nastavene ako vyssia
  autorita pri konflikte pravidiel.
- Skilly maju najprv hladat v `database/exports/**`, `exports/_metadata/**`,
  `knowledge_base/**`, `changelog/**` a az potom hlasit access gap.
- Implementacne DB zmeny maju ist cez novu branchu, lokalny diff a changelog
  kandidat; commit, push a DB apply maju samostatne approval gate.

## 2026-05-27 - Aktivny Pilotny Zaklad

- Vytvoreny plugin `myagevolt-db-dev-copilot`.
- Prenesena sukromna staging KB z ChatGPT projektu `triggers cistenie`.
- Pridanych 6 prvych skillov pre MyAgeVolt DB pracu.
- Doplnene sukromne `triggers-cistenie-chat-index-full.csv` s 324 chatmi
  vycitanymi z ChatGPT projektu cez UI.
- CSV zdroje `90_tables.csv` az `97_events.csv` su evidovane ako manualny
  chybajuci pristup/zdroj, kym ich pouzivatel nedoda alebo neprepoji zo SharePointu.
- Texty README, manifestov, skillov a KB boli upravene do slovenciny; verejna
  Git kopia obsahuje iba verejne bezpecnu cast bez surovych DB exportov.
- Doplnene rozdelenie KB na verejne bezpecnu Git cast a SharePoint-only
  sukromne zdroje; skilly uz neodkazuju na sukromne CSV ako povinny Git subor.
