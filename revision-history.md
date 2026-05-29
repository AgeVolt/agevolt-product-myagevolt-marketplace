# Revision history

## 2026-05-29 - Migracia `agevolt-fe`

- Do marketplace-u `product-myagevolt` bol pridany migrovany plugin
  `agevolt-fe` zo stareho zdroja `AI/Doplnky/plugins/agevolt-fe`.
- Prenesene su public-safe skilly, assets, referencie a SmartFox helper bez
  credentialov.
- Povodny lokalny MCP `agevolt-fe-kb`, `.mcp.json`, `mcp/` a stare root
  instalacne/sync skripty neboli prenesene.
- Plugin bol upraveny na priame citanie autoritativnych lokalnych repo KB
  zdrojov a na blocker pri chybajucej KB.
- Verejna Git kopia ma obsahovat rovnaku public-safe projekciu bez private
  dat, secretov a customer/export podkladov.

## 2026-05-27 - Pilot `myagevolt-db-dev-copilot`

- Vytvoreny prvy pilotny plugin marketplace-u `product-myagevolt`.
- Zdrojom je migracny plan `AI projects/Celkovy migracny plan ChatGPT projektov.md`
  a sukromny staging `AI projects/migration-staging/chatgpt-projects/triggers-cistenie`.
- Pridane skilly pre MyAgeVolt DB pracu: zmeny rutin, kontrola vykonu,
  triage DB chyb, dotazy nad schemou, cistenie dat, zadanie pre agenta a
  DataGrid DB kontrakt.
- Sukromna DB KB ostava v SharePointe; verejna Git kopia smie obsahovat iba
  verejne bezpecne postupy a manifesty.
- Opravene texty manifestov, README, skillov a KB do slovenciny podla pravidiel
  `creator-intake:update-marketplace`; technicke identifikatory ostavaju bez prekladu.
- Verejne bezpecna marketplace KB a plugin KB su urcene na synchronizaciu do
  Git kopie; sukromne ChatGPT/CSV zdroje ostavaju iba v SharePointe.
