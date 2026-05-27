# AgeVolt Product myAgeVolt Marketplace

Marketplace pre vsetko okolo portalu myAgeVolt.

Ma sluzit ludom, ktori pracuju s myAgeVolt portalom ako produktom: produktova KB, procesy, funkcne pravidla, pouzivatelske scenare, technicka dokumentacia, developerske pracovne postupy, repo pravidla, PR/CI pomocnici a testovacie alebo podporne postupy vztahujuce sa k portalu.

Tento marketplace nema byt vseobecny developersky nastrojovy balik pre celu firmu. Patri sem len to, co priamo suvisi s myAgeVolt portalom.

Aktualny stav: aktivny pilot s prvym pluginom `myagevolt-db-dev-copilot`.

## Pluginy

- `myagevolt-db-dev-copilot` - databazova praca pre MyAgeVolt: MySQL pohlady,
  triggery, procedury, eventy, OCPP RAW/davkovy tok, jednorazove cistenie dat,
  DB chyby, pomale dotazy a DataGrid DB kontrakty. Plugin vychadza z pilotnej
  migracie ChatGPT projektu `triggers cistenie`.

## Hranica Sukromnej KB

Tento marketplace obsahuje iba verejne bezpecny zaklad, manifesty, marketplace
KB a skillove postupy. Surove DB exporty, SQL dumpy, logy pomalych dotazov,
zakaznicke data, plne ChatGPT prepisy a CSV subory schemy ostavaju v internom
SharePoint zdroji:

```text
AI Agent/marketplaces/agevolt-product-myagevolt-marketplace/
```
