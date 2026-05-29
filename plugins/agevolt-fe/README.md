# AgeVolt FE

Frontendovy pomocnik pre pracu na portali myAgeVolt a suvisiacich AgeVolt FE
repozitaroch.

Plugin nie je autorita pravidiel. Sluzi ako router na aktualne repo pravidla:
`AGENTS.md`, lokalne `knowledge_base/`, business-logic pravidla a konkretne FE
workflowy. Autorita ostava v repozitaroch, nie v tomto plugine.

## Rozsah

- nacitanie AgeVolt FE pravidiel pred implementaciou,
- settings obrazovky a zdielane settings komponenty,
- Dynamic DataGrid V4 designer, technical a audit workflowy,
- E2E charging scenare cez AgeVolt FE a SmartFox simulator,
- routing na `web-portal` a `business-logic` knowledge base.

## Hranica

Do migracie nepatri povodny lokalny MCP `agevolt-fe-kb`. Plugin neobsahuje
`.mcp.json`, `mcp/` ani stare root instalacne/sync skripty. Ak aktualny
repozitar nema potrebnu KB dostupnu lokalne, skill ma nahlasit blocker namiesto
domyslania pravidiel.

## Public-safe obsah

Do Git kopie patria manifesty, skilly, public-safe referencie, UI assets a
SmartFox helper bez credentialov. Skutocne hesla, tokeny, zakaznicke data,
produkcne exporty a vyplnene runtime env subory nepatria do SharePoint pluginu
ani do public Git marketplace.
