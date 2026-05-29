# Scenare charging simulatora

Pouzi tento subor iba ked request vyzaduje iny scenar ako zakladny prihlaseny
driver flow zo `SKILL.md`.

## Prihlaseny driver

Vstup:

- user je prihlaseny v AgeVolt FE,
- ma vybrane vozidlo a tag,
- testovacia stanica je viditelna v Station availability map view.

Ocekavany flow:

1. Vyhladaj stanicu.
2. Vyber konektor.
3. Nastav SmartFox vozidlo na `Connected`.
4. Spusti nabijanie.
5. Nastav SmartFox vozidlo na `Charging`.
6. Zmen vykon.
7. Over aktivne nabijanie.
8. Zastav nabijanie.
9. Over transakciu v `All` a v prislusnom type-specific transaction tabe.

## Neprihlaseny alebo guest driver

Pouzi ked user explicitne poziada o neprihlaseny flow.

Rozdiely oproti prihlasenemu flow:

- nepredpokladaj existujuce vozidlo/tag,
- po `Start charging` moze FE vyzadovat login, tag, guest payment alebo iny
  authorization krok,
- ak FE vytvori public/unknown/blocked transaction, kontroluj prislusny
  transaction tab, nie `Internal`.

Reportuj presne, kde flow skoncil:

- login required,
- payment required,
- missing tag/vehicle,
- public transaction created,
- blocked/unknown transaction created,
- start rejected.

## Zmena vykonu

Postup:

1. Session musi byt `CHARGING`.
2. Posli aspon tri hodnoty vykonu, napr. `6`, `18`, `3`, `12`.
3. Polluj FE aspon 10-15 sekund po kazdej zmene.
4. Reportuj requested vs observed power.

Ak observed power nesedi 1:1:

- over, ci konektor/station limit nedava zmysel,
- over `Last update`,
- ak `Connection State` prejde na `OFFLINE`, reportuj, ze dalsie live zmeny
  uz nemusia prichadzat.

## Stop a overenie transakcie

Po stope over:

- `/charging` ukazuje `0 active`,
- simulator je `Disconnected`,
- transaction view ma novy riadok,
- transaction typ sedi s flowom,
- consumption je nenegativna,
- check je `OK` alebo vysvetleny iny stav.

Ak transaction ID nie je visible:

- porovnaj station,
- start/end cas,
- driver/tag,
- type,
- consumption,
- source/check.

## Negativne scenare

Backend down:

- FE ukaze `Service Unavailable` alebo loading configuration,
- pozastav test,
- nemen simulator dalej.

Simulator offline:

- SmartFox plc list nema online `evemsimulator1`,
- neklikaj start charging,
- reportuj blocker.

Station offline:

- start moze vytvorit pending/failed/preparing stav,
- neinterpretuj chybajuce live data ako FE bug bez overenia station connection.
