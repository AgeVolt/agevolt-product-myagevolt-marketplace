# Inventar MySQL Schemy

Primarny inventar MyAgeVolt DB je v AgeVolt `database` repozitari.

Najprv najdi a citaj:

- `database/AGENTS.md`
- `database/knowledge_base/index.md`
- `database/knowledge_base/registry.yaml`
- `database/knowledge_base/reference/**`
- `database/exports/_metadata/**`
- `database/exports/<schema>/tables/*.sql`
- `database/exports/<schema>/views/*.sql`
- `database/exports/<schema>/routines/*.sql`
- `database/exports/<schema>/triggers/*.sql`
- `database/exports/<schema>/events/*.sql`
- `database/exports/<schema>/config_data/*.sql`
- `database/changelog/*.sql`

Nepytaj si `SHOW CREATE` alebo CSV ako prvy krok. Ak objekt v repo nenajdes,
nahlas chybajuci objekt, potrebu refreshu alebo access gap.

Legacy CSV a ChatGPT podklady z `triggers cistenie` mozu pomoct ako historicky
kontext, ale pri konflikte vyhrava `database` repo.
