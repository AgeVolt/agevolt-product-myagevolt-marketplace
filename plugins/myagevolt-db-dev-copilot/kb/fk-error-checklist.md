# Checklist FK Chyb

- Overit typy, dlzky, signed/unsigned, charset/collation.
- Overit existenciu indexu na referencovanom aj referencujucom stlpci.
- Overit osirele data alebo hodnoty mimo referencovanej tabulky.
- Overit nazov a realny kluc referencovaneho stlpca.
- Ak fix vyzaduje novy stlpec, index alebo FK v produkcii, priprav ich ako
  oddelene kroky podla `mysql-production-ddl-safety.md`.
- Najprv hladat DDL a FK metadata v `database/exports/**` a
  `database/exports/_metadata/foreign_keys.tsv`.
- Vypytat InnoDB status alebo refresh blocker, ak chyba nie je jasna. Pasted
  `SHOW CREATE` nie je prvy krok.
