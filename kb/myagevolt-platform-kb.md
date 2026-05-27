# MyAgeVolt Platformova KB

Seed marketplace-level KB pre produktovu a technicku pracu okolo platformy
MyAgeVolt.

## Ucel

Tento subor je spolocny kontext pre pluginy v marketplace `product-myagevolt`.
Vysvetluje, co platforma robi, ake moduly a role existuju a kde su hranice voci
fyzickym nabijackam, vyrobe, financiam a helpdesku.

## Aktualny Stav

- Toto je verejne bezpecny seed pre pilot `myagevolt-db-dev-copilot`.
- Neobsahuje surovu DB schemu, zakaznicke data ani produkcne exporty.
- Konkretne DB pravidla pilotneho pluginu su v
  `plugins/myagevolt-db-dev-copilot/kb/`.

## Routing

- MyAgeVolt portal, FE/DB/backendove pracovne postupy a platformove pravidla patria sem.
- Fyzicke nabijacky, Touchpoint hardware a ponukove postupy pre nabijacky patria do
  `product-chargers`.
- SuperFaktura, uctovanie, faktury a financne administrativne postupy patria do
  `finance-admin`.
- Zakaznicke incidenty a podporna operativa patria do `support-helpdesk`.
