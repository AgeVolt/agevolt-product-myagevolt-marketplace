# Sablona Zadania Pre Agenta

- Problem a pozorovane spravanie.
- Dotknute tabulky/objekty, ak su overene.
- Relevantne chybove hlasky/logy.
- Co uz bolo overene.
- Co ma druhy agent skontrolovat v repo/DB.
- Database repo cesta, branch, base commit, latest-main sync stav, zmenene
  exporty, changelog kandidat a precitana KB.
- Refresh/live verification stav priamo menenych objektov.
- Ak ide o produkcne DDL: split-step plan, lock timeouty, lock risk a direct DDL
  vs online schema change rozhodnutie.
- Bezpecnostne limity: iba na citanie alebo nahlad pred zapisovou zmenou.
- Approval stav: commit, push a DB apply su oddelene.
