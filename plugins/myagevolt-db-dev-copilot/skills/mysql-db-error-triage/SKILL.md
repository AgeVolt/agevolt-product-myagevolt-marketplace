---
name: mysql-db-error-triage
description: "Pouzi pri MyAgeVolt DB chybach, FK constraint problemoch, InnoDB statuse, analyze DB chyb, OCPP/nabijacich DB anomaliach a P1 incidente. Nepouzivaj na bezne zmeny rutin, lookupy iba na citanie, cistenie dat, kontrolu pomalych dotazov ani zadanie pre agenta."
---

# Triage MySQL DB Chyb

Tento skill sluzi na analyzu DB chyb a incidentov.

## Kontext

Precitaj:

- `../../kb/mysql-agevolt-environment.md`
- `../../kb/mysql-schema-inventory.md`
- `../../kb/mysql-safety-boundaries.md`
- `../../kb/fk-error-checklist.md`

Ak chyba realna schema alebo log, vypytaj si presnu chybu, `SHOW CREATE`,
InnoDB status, relevantny SELECT/export alebo MCP iba na citanie.

## Postup

1. Zachyt presnu chybu, objekt, SQL ukazku a cas, ak su dostupne.
2. Zarad problem: FK/constraint, typ/collation mismatch, chybajuci index,
   runtime chyba rutiny, OCPP/nabijacia anomalia alebo neznama pricina.
3. Pri FK chybach skontroluj typ/dlzku/signedness stlpcov, collation,
   referencovany kluc/index, osirele data a InnoDB status.
4. Pri OCPP/nabijacich anomaliach oddel biznis symptom od DB dokazu.
5. Vystup ma obsahovat potvrdene fakty, hypotezy, dalsie kontroly iba na citanie
   a riziko.
6. Ak musi kod alebo repo pozriet iny agent, odovzdaj cez `db-agent-handoff-brief`.

## Hranice

- Nenavrhuj destruktivne opravy pred potvrdenim cez kontroly iba na citanie.
- Nerob z jednej incidentnej hodnoty globalne pravidlo.
- Neobchadzaj MCP ani credential pravidla.
