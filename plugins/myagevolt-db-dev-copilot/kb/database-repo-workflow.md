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
- relevantne KB subory z `knowledge_base/database/**`, `knowledge_base/topics/**`,
  `knowledge_base/reference/**`, `knowledge_base/quality/**` alebo
  `knowledge_base/workflows/**`

Ak zmena ovplyvnuje produktove spravanie, billing, opravnenia, stanice,
wallet/payments, notifikacie, reporting/export semantiku alebo validacie,
precitaj aj sibling `../business-logic`. Ak nie je dostupny, nahlas access gap.

`.cursor/rules` v database repo su iba pointere. Autorita je `AGENTS.md` a
`knowledge_base/**`.

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

1. Over stav database repo cez `git status --short --branch`.
2. Pred pracou na `main` urob alebo odporuc `git pull --rebase`.
3. Ak je working tree cisty, vytvor novu branchu `codex/db-<kratky-slug>`.
   Ak cisty nie je, zastav a ukaz existujuce zmeny.
4. Uprav lokalny export, KB alebo config podla pravidiel database repo.
5. Pri DB zmene priprav changelog kandidat
   `changelog/YYYYMMDD_HHMMSS__<schema>__<short_description>.sql`.
6. Ukaz pouzivatelovi, ktore subory boli zmenene a relevantny diff.
7. Spytaj sa na commit. Bez potvrdenia necommituj.
8. Po commite sa samostatne spytaj na push. Bez potvrdenia nepushuj.

Commit/push approval nie je DB write approval.

## DB Write Approval

Nikdy neaplikuj SQL do DB bez presneho approval textu z database repo:

- non-production write: `APPROVE WRITE`
- production write: `APPROVE WRITE PROD`

Ak sa SQL po schvaleni zmeni, pytaj approval znovu.
