# Database Repo Workflow

Tento subor urcuje, ako ma `myagevolt-db-dev-copilot` pracovat s AgeVolt
repozitarom `database`.

## Najdenie Repozitara

Database repo hladaj v tomto poradi:

1. `AGEVOLT_DATABASE_REPO`, ak existuje.
2. Sibling cesta `../database` voci aktualnemu workspace.
3. `/Users/olko/Desktop/AgeVolt/database`.
4. Aktualny workspace, ak sa vola `database`.

Ak repo nenajdes, nahlas access gap. Nepytaj si pasted `SHOW CREATE` ako prvy
krok a nevymyslaj schemu.

## Povinne Citanie

Pred DB analyzou alebo implementaciou v `database` repo precitaj:

- `AGENTS.md`
- `knowledge_base/index.md`
- `knowledge_base/registry.yaml`
- `knowledge_base/rule-governance.md`
- `../business-logic/knowledge_base/standards/repository-bootloader.md`, ak je
  sibling `../business-logic` dostupny
- relevantne KB subory z `knowledge_base/database/**`, `knowledge_base/topics/**`,
  `knowledge_base/reference/**`, `knowledge_base/quality/**` alebo
  `knowledge_base/workflows/**`

Ak zmena ovplyvnuje produktove spravanie, billing, opravnenia, stanice,
wallet/payments, notifikacie, reporting/export semantiku alebo validacie,
precitaj aj sibling `../business-logic/knowledge_base/index.md`,
`registry.yaml` a `catalog/index.md`. Ak nie je dostupny, nahlas access gap.

`.cursor/rules` v database repo su iba pointere. Autorita je `AGENTS.md` a
`knowledge_base/**`.

## Repo Sync Gate

Pred objektovym lookupom, analyzou s implementacnym dopadom alebo vytvorenim
branchu vzdy najprv over, ze pracujes z najnovsieho `origin/main`.

Povinny postup:

1. Spusti `git fetch origin`.
2. Spusti `git status --short --branch` a pomenuj aktualnu branchu.
3. Ak repo obsahuje lokalne zmeny, neprepisuj ich a nepokracuj ako keby ide o
   cisty latest main. Zastav, ukaz zmenene subory a vypytaj rozhodnutie:
   commit, stash, samostatny worktree alebo zahodit zmeny.
4. Ak aktualna branch nie je `main` alebo `master`, nepracuj dalej zo stareho
   feature branchu. Zastav a vypis, ze najprv treba prejst na aktualny main
   alebo rebasnut branch na `origin/main`.
5. Ak je repo ciste a si na hlavnej branchi, spusti
   `git pull --rebase --ff-only`.
6. Az po uspesnom pull-e citaj exporty pre implementacny zaver alebo vytvor
   novu branchu `codex/db-<kratky-slug>` z aktualnej hlavnej branche.
7. V odpovedi vzdy uved sync stav: branch, base commit cez
   `git rev-parse --short HEAD` a ci bol `origin/main` pullnuty.

Ak nie je mozne syncnut najnovsi main bez rizika pre lokalne zmeny, vystup je
blocker, nie SQL diff.

## Zdroje Pre Hladanie

Pre objektovu a schemovu pracu pouzivaj:

- `exports/<schema>/tables/*.sql`
- `exports/<schema>/views/*.sql`
- `exports/<schema>/routines/*.sql`
- `exports/<schema>/triggers/*.sql`
- `exports/<schema>/events/*.sql`
- `exports/<schema>/config_data/*.sql`
- `exports/_metadata/*.tsv`, `exports/_metadata/*.json`, `exports/_metadata/*.txt`
- `knowledge_base/reference/**`
- `knowledge_base/database/**`
- `changelog/*.sql`
- relevantne `drafts/**`, ak ide o rozpracovany navrh

Pri konflikte medzi `triggers cistenie` a `database` vzdy vyhrava `database`.
Legacy podklady `triggers cistenie` pouzivaj iba ako historicky kontext.

## Implementacny Git Workflow

Pri poziadavke na zmenu DB objektu alebo konfiguracie:

1. Vykonaj `Repo Sync Gate` vyssie. Bez uspesneho latest-main syncu nevytvaraj
   implementacnu branchu.
2. Ak je working tree cisty a hlavna branch je pullnuta, vytvor novu branchu
   `codex/db-<kratky-slug>` z aktualneho mainu. Ak cisty nie je alebo nie si na
   hlavnej branchi, zastav a ukaz existujuce zmeny/branch stav.
3. Pri priamo menenom DB objekte najprv refreshni alebo manualne over live
   definiciu: `python scripts/refresh.py --object <schema>.<name>`.
   Ak refresh nejde, manualne spusti vhodne `SHOW CREATE ...`, zosulad export a
   zachovaj LF line endings. Nepokracuj z neovereneho stareho snapshotu.
4. Ak refresh/manualne overenie ukaze rozdiel medzi live DB a exportom, najprv
   aktualizuj export a pomenuj discrepanciu.
5. Uprav lokalny export, KB alebo config podla pravidiel database repo.
6. Pri DB zmene priprav changelog kandidat
   `changelog/YYYYMMDD_HHMMSS__<schema>__<short_description>.sql`.
7. Pri config/reference table data zmene re-dumpni relevantny subor pod
   `exports/<schema>/config_data/`.
8. Ukaz pouzivatelovi, ktore subory boli zmenene a relevantny diff.
9. Spytaj sa na commit. Bez potvrdenia necommituj.
10. Po commite sa samostatne spytaj na push. Bez potvrdenia nepushuj.

Commit/push approval nie je DB write approval.

## DB Write Approval

Nikdy neaplikuj SQL do DB bez presneho approval textu z database repo:

- non-production write: `APPROVE WRITE`
- production write: `APPROVE WRITE PROD`

Ak sa SQL po schvaleni zmeni, pytaj approval znovu.
