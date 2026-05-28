# Produkcne DDL Safety

Tento verejne bezpecny sumar kopiruje len workflow pravidla z aktualneho
`database/knowledge_base/database/db-change-workflow.md` a
`database/knowledge_base/database/mysql-style.md`. Pri konflikte vyhrava aktualny
`database` repo.

## Zakladne Pravidlo

Produkcne table DDL musi byt planovane ako male samostatne kroky. Nespoj viac
fyzickych zmien na tej istej tabulke do jedneho produkcneho `ALTER TABLE`.

Zakazane ako jeden produkcny statement:

- `ADD COLUMN` spolu s `ADD KEY`, `ADD INDEX`, `ADD UNIQUE` alebo `ADD CONSTRAINT`
- pridanie FK spolu s referenced alebo referencing stlpcom
- miesanie column changes, index changes, FK changes, rename alebo table options
- viac nesuvisiacich column changes v jednom `ALTER TABLE`

## Povinne Delenie

1. Pridaj nullable/default-null stlpec ako samostatny krok.
2. Index pridaj v neskorsom samostatnom kroku.
3. Foreign key pridaj ako vlastny reviewed krok.
4. Pre live alebo velke tabulky najprv odhadni metadata/table lock riziko.
5. Pred produkcnym DDL nastav kratke lock timeouty v rovnakej session:

```sql
SET SESSION lock_wait_timeout = 5;
SET SESSION innodb_lock_wait_timeout = 5;
```

## Online DDL

Pre column-only zmeny pouzi explicitne online DDL clauses, ked ich MySQL podporuje:

```sql
ALTER TABLE `agevolt`.`some_table`
  ADD COLUMN `new_column` varchar(255) NULL DEFAULT NULL COMMENT '...',
  ALGORITHM=INSTANT,
  LOCK=NONE;
```

Ak MySQL odmietne pozadovany `ALGORITHM` alebo `LOCK`, zastav. Neskusaj v
produkcii slabsi lock mode bez samostatneho review a explicitneho approvalu.

## Online Schema Change Tool

Ak je riziko dlheho metadata locku alebo table locku nejasne, odporuc
`pt-online-schema-change` alebo `gh-ost`. Neprepinaj na tieto tooly potichu a
nepokracuj direct DDL potichu. Pouzivatel musi explicitne zvolit:

- direct DDL lock risk, zvycajne v maintenance window, alebo
- online schema change tool po compatibility review.

Compatibility review ma pokryt triggers, FK, replication/binlog spravanie,
disk/IO kapacitu a specifika tabulky.

## Changelog A Apply

DDL priprav ako branch + diff + changelog kandidat. DB apply nikdy nerob bez
exact `APPROVE WRITE` alebo `APPROVE WRITE PROD`.
