# MyAgeVolt DB Dev Copilot

Databazovy pomocnik pre MyAgeVolt portal. Primarny pracovny zdroj je lokalny
repozitar `database`, ktory obsahuje `AGENTS.md`, `knowledge_base/`, `exports/`,
`changelog/` a workflow pre DB zmeny.

Plugin pokryva:

- MySQL pohlady, triggery, procedury, funkcie a eventy,
- OCPP RAW prijem a RAW -> `last_*` davkovy tok,
- jednorazove cistiace SQL a normalizaciu dat,
- DB chyby, FK/InnoDB/ENUM/collation diagnostiku,
- pomale dotazy a kontrolu indexov,
- DB/metadatovy kontrakt pre DataGrid,
- latest-main sync gate pred objektovym lookupom a branchou,
- produkcne DDL safety: delene `ALTER TABLE`, online/lock review a kratke lock timeouty,
- branch + diff workflow pre review, commit a push.

## Zdroje A Priorita

1. `database/AGENTS.md` a `database/knowledge_base/**` su autorita pre aktualne
   DB pravidla.
2. `database/exports/**`, `exports/_metadata/**`, `changelog/**` a `drafts/**`
   su primarne zdroje pre hladanie objektov a pripravu zmeny.
3. Pred implementacnym diffom musi `database` repo prejst cez `git fetch origin`
   a `git pull --rebase --ff-only` na hlavnej branchi. Ak je repo na feature
   branchi alebo ma lokalne zmeny, skill musi zastavit a ukazat blocker.
4. Pri priamom dotyku DB objektu je live DB zdroj pravdy. Export treba pred
   zmenou refreshnut cez `scripts/refresh.py --object` alebo manualne overit a
   zosuladit.
5. Produkcne table DDL musi byt rozdelene na male samostatne kroky. Lock risk
   a online schema change strategia musia byt pomenovane pred apply.
6. `triggers cistenie` je legacy kontext zluceny do pracovneho postupu. Ak je v
   konflikte s `database`, vzdy vyhrava `database`.

## Hranica Sukromnych Podkladov

Surove DB exporty, CSV inventar, produkcne SQL dumpy, logy pomalych dotazov, zakaznicke data a
plne ChatGPT prepisy nepatria do verejnej Git kopie. Verejne bezpecny skill
ma pri chybajucom `database` repo alebo business-logic KB nahlasit access gap a
nema si domyslat realnu DB strukturu.
