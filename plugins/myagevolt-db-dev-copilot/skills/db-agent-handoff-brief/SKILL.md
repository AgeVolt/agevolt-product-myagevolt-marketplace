---
name: db-agent-handoff-brief
description: "Pouzi ked treba pripravit zadanie pre Cursor alebo ineho AI agenta s DB/repo pristupom po MyAgeVolt DB analyze. Brief musi obsahovat database repo kontext, precitane KB, branch/diff stav a oddelene commit/push/DB apply approvals."
---

# Zadanie Pre DB Agenta

Tento skill pripravuje zadanie pre dalsieho agenta s DB alebo repo pristupom.

## Kontext

Precitaj:

- `../../kb/database-repo-workflow.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/handoff-template.md`

Ak treba realne tabulky alebo objekty, najprv hladaj v `database` repo. Ak repo
alebo objekt chyba, nahlas access gap.

`triggers cistenie` je iba legacy kontext; pri konflikte ho prepisuje
`database/AGENTS.md` a `database/knowledge_base/**`.

## Postup

1. V jednej casti pomenuj ciel.
2. Oddel potvrdene fakty od predpokladov.
3. Uved database repo cestu, branch, precitane KB a dotknute exporty/changelogy.
4. SQL ukazky, nazvy objektov, chyby a linky pridaj iba vtedy, ked su vhodne
   pre cielove publikum.
5. Najprv definuj kontroly iba na citanie.
6. Ak moze byt potrebny zapis, vyzaduj branch + diff a explicitne potvrdenie cloveka.
7. Oddel approval stav: commit, push a DB apply.
8. Na konci povedz, aky vystup sa od dalsieho agenta ocakava.

## Hranice

- Nevymyslaj chybajuci DB alebo repo kontext.
- Nepridavaj zakaznicky citlive riadky bez explicitne schvaleneho publika.
- Neziadaj od dalsieho agenta priame produkcne zapisy bez nahladu a potvrdenia.
- Ak handoff obsahuje DB apply, zapis approval ako neudeleny, kym pouzivatel
  nepovie exact `APPROVE WRITE` alebo `APPROVE WRITE PROD`.
