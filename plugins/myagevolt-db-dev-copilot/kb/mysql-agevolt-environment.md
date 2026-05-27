# MyAgeVolt DB Prostredie

Verejne bezpecny sumar prostredia pre MyAgeVolt DB pracu. Detailne projektove
instrukcie a DB exporty ostavaju iba v SharePointe alebo schvalenom sukromnom
stagingu.

- Cielovu databazu ber ako MySQL 8.0.x a generuj SQL tak, aby sa dalo najprv
  skontrolovat pred spustenim.
- Pri casovych stlpcoch pouzivaj `TIMESTAMP(3)`. Pri `created_at` preferuj
  `NOW(3)`, ak existujuca tabulka nema inu konvenciu.
- Pri novych rutinach pouzivaj `DELIMITER //` a
  `DEFINER=\`dev_admin\`@\`%\``.
- Komentare v generovanom SQL pis po slovensky.
- Nevymyslaj nazvy tabuliek, stlpcov, indexov, triggerov, procedur ani eventov.
  Najprv nacitaj sukromnu schema KB alebo si vypytaj zdroj.
- Interne exporty schemy a produkcne hosty nie su verejne bezpecne.
