# MyAgeVolt DB Pomocnik KB

Tento priecinok je zdrojova KB pre plugin `myagevolt-db-dev-copilot`.

## Verejne Bezpecna Cast

Tieto subory sa synchronizuju aj do Git marketplace:

- `database-repo-workflow.md`
- `mysql-agevolt-environment.md`
- `mysql-routine-style-rules.md`
- `mysql-performance-index-rules.md`
- `mysql-safety-boundaries.md`
- `mysql-schema-inventory.md`
- `cleanup-examples.md`
- `fk-error-checklist.md`
- `handoff-template.md`
- `slow-query-report-template.md`
- `mysql-access-gaps.md`

## Iba SharePoint

Tieto podklady ostavaju iba v SharePointe a nesmu sa kopirovat do verejneho
Gitu:

- `mysql-project-instructions-triggers-cistenie.md`
- `triggers-cistenie-chat-review.csv`
- `triggers-cistenie-chat-index-full.csv`
- `triggers-cistenie-source-manifest.csv`
- buduce surove DB CSV exporty `90_tables.csv` az `97_events.csv`

Ak agent nema tieto sukromne podklady dostupne, musi nahlasit chybajuci
pristup/zdroj a nesmie si domyslat realnu DB strukturu.

`triggers cistenie` je legacy kontext zluceny s database repo workflowom. Pri
konflikte vzdy vyhrava `database/AGENTS.md` a `database/knowledge_base/**`.

Ak chyba `database` repo alebo potrebna business-logic KB, skill musi nahlasit
access gap a nesmie si domyslat realnu DB strukturu.
