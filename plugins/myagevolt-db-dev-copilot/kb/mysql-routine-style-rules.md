# Stylove Pravidla MySQL Rutin

Pouzi tieto pravidla pre MyAgeVolt triggery, procedury, funkcie a eventy.

- Pri uprave existujucej rutiny nevracaj cely objekt, ak to pouzivatel vyslovene
  neziada. Vrat iba zmeneny blok `label: BEGIN ... END;` alebo sustredeny diff
  a presne instrukcie na vlozenie.
- Pri vytvoreni noveho objektu vrat cele spustitelne `CREATE` s delimiterom.
- Pouzi jeden trigger na tabulku/event typ: `<table>_bi`, `<table>_bu`,
  `<table>_ai`, `<table>_au`.
- Vacsiu logiku del na pomenovane bloky ako `label: BEGIN ... END;`.
- `DECLARE` drz v najmensom lokalnom bloku, ktory ho potrebuje.
- Hned po `main: BEGIN` udrziavaj kratky sumarny komentar; pri zmene vnutornej
  logiky aktualizuj aj sumare rodicovskych blokov.
- Komentare pis kratko po slovensky a vysvetli, co blok potrebuje pred sebou a
  co pripravi pre dalsi blok.
- Nepridavaj extra ochrany, audit ani `SIGNAL`, ak si to pouzivatel nepyta.
