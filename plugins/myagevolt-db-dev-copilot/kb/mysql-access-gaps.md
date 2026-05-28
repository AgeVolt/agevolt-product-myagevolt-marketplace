# Chybajuce Pristupy A Zdroje

## Primarny Zdroj

Primarny zdroj pre realnu MyAgeVolt DB strukturu je lokalny `database` repo:

- `AGENTS.md`
- `knowledge_base/index.md`
- `knowledge_base/registry.yaml`
- relevantne `knowledge_base/**`
- `exports/**`
- `exports/_metadata/**`
- `changelog/**`

Ak `database` repo chyba alebo v nom nie je hladany objekt, nahlas access gap alebo
refresh blocker. Nepytaj si pasted `SHOW CREATE` alebo CSV ako prvy krok.

## Legacy Zdroje Z `triggers cistenie`

Tieto subory su iba historicky/private kontext a nie su autorita pri konflikte s
`database` repo:

- `90_tables.csv`
- `91_columns.csv`
- `92_statistics.csv`
- `93_key_usage.csv`
- `94_fk_rules.csv`
- `95_triggers.csv`
- `96_routines.csv`
- `97_events.csv`
- plne chaty z ChatGPT projektu `triggers cistenie`

Ak su dostupne iba legacy zdroje a `database` repo chyba, pouzi ich len na popis
rizika alebo handoff. Nevykonavaj implementacne tvrdenia o aktualnej strukture bez
repo exportu alebo schvaleneho refreshu.

## Business Logic Gap

Ak DB zmena zasahuje domenu, uctovanie, nabijanie, OCPP spracovanie alebo stavovy
model a `../business-logic` nie je dostupny, zastav a vypis access gap. Nevymyslaj
business pravidla iba zo stareho chatu.

## Public Git Pravidlo

Do verejneho Gitu patria iba verejne bezpecne workflow pravidla a access-gap popisy.
Neukladaj raw DB exporty, sample rows, produkcne SQL dumpy, slow logy, hosty,
secrets ani zakaznicke data.
