# Checklist FK Chyb

- Over typy, dlzky, signed/unsigned, charset a collation.
- Over existenciu indexu na referencovanom aj referencujucom stlpci.
- Over osirele data alebo hodnoty mimo referencovanej tabulky.
- Over realny nazov a kluc referencovaneho stlpca.
- Ak chyba nie je jasna, vypytaj si InnoDB status a aktualne `SHOW CREATE`.
