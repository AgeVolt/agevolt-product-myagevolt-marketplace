# MyAgeVolt DB Prostredie

Verejne bezpecny sumar prostredia. Aktualne pravidla a objektovy inventar hladaj
primarne v AgeVolt `database` repozitari.

- Databazu ber podla `database/knowledge_base/database/mysql-style.md` ako MySQL
  8.0.40, InnoDB, `utf8mb4` / `utf8mb4_unicode_ci`.
- Implementacne zmeny pripravuj ako branch + diff + changelog v `database` repo.
- Casove stlpce pouzivat ako `TIMESTAMP(3)`; pri `created_at` preferovat `NOW(3)`.
- Pri novych objektoch pouzivat `DELIMITER //` a definera podla internych DB pravidiel projektu.
- Toto nie je inventar realnej schemy. Najprv nacitaj `database/exports/**` a
  `database/exports/_metadata/**`.
- `triggers cistenie` je legacy kontext. Pri konflikte vyhrava `database`.
