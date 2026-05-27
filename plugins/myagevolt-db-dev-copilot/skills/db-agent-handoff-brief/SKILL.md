---
name: db-agent-handoff-brief
description: "Pouzi ked treba pripravit zadanie pre Cursor alebo ineho AI agenta s DB/repo pristupom po MyAgeVolt DB analyze. Nepouzivaj na priame SQL zmeny, SELECTy iba na citanie, cistenie dat, kontrolu vykonu ani triage DB chyb; tento skill iba bali overene fakty a otvorene otazky do zadania."
---

# Zadanie Pre DB Agenta

Tento skill pripravuje zadanie pre dalsieho agenta s DB alebo repo pristupom.

## Kontext

Precitaj:

- `../../kb/mysql-safety-boundaries.md`
- `../../kb/handoff-template.md`

Ak treba realne tabulky alebo objekty, najprv si vypytaj zdroj schemy alebo MCP
iba na citanie.

## Postup

1. V jednej casti pomenuj ciel.
2. Oddel potvrdene fakty od predpokladov.
3. SQL ukazky, nazvy objektov, chyby a linky pridaj iba vtedy, ked su vhodne
   pre cielove publikum.
4. Pomenuj presne repo alebo DB oblasti, ktore ma dalsi agent skontrolovat.
5. Najprv definuj kontroly iba na citanie.
6. Ak moze byt potrebny zapis, vyzaduj nahlad/diff a explicitne potvrdenie cloveka.
7. Na konci povedz, aky vystup sa od dalsieho agenta ocakava.

## Hranice

- Nevymyslaj chybajuci DB alebo repo kontext.
- Nepridavaj zakaznicky citlive riadky bez explicitne schvaleneho publika.
- Neziadaj od dalsieho agenta priame produkcne zapisy bez nahladu a potvrdenia.
