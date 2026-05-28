# Bezpecnostne Hranice

Verejne bezpecne hranice pre DB pomocnika.

- Bez explicitnej poziadavky nepridavat ochranne bloky, SIGNALy ani audit polia.
- SIGNAL pouzit iba na vyziadanie; message po slovensky.
- Bez DDL v triggeroch/procedurach, okrem explicitne migracnych skriptov.
- Produkcne zapisove SQL nedavat cez MCP v MVP. MCP kandidat je iba na citanie pre schemu/objekt/EXPLAIN.
- Ak chyba schema alebo zdroj, najprv hladat v `database` repo. Ak repo alebo
  objekt chyba, nahlasit access gap alebo potrebu refreshu.
- Pred implementacnou branchou alebo objektovym lookupom s dopadom na diff
  musi prejst `Repo Sync Gate`: `git fetch origin`, cisty hlavny branch a
  `git pull --rebase --ff-only`. Ak je repo na feature branchi alebo ma lokalne
  zmeny, zastav a ukaz blocker.
- Nepytat pasted `SHOW CREATE` alebo CSV ako prvy krok.
- Commit a push su samostatne approval gate. Po diff-e sa pytaj na commit; po
  commite sa samostatne pytaj na push.
- DB apply nikdy nerob bez presneho approval textu: `APPROVE WRITE` alebo
  `APPROVE WRITE PROD`.
- Do verejneho Gitu neukladat surove CSV, DB hosty, zakaznicke data, logy
  pomalych dotazov ani produkcne exporty.
