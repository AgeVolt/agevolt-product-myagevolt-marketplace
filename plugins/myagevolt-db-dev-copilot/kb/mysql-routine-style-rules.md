# Stylove Pravidla MySQL Rutin

Verejne bezpecne pravidla pre postup triggerov/procedur/eventov.

- Pri uprave existujuceho triggera/procedury negenerovat cely objekt; vratit iba dotknute `label: BEGIN ... END;` bloky alebo diff a presne miesto vlozenia/nahrady.
- Pri implementacnej praci priprav zmenu v `database` repo ako branch + lokalny
  diff + changelog kandidat. Samostatny SQL blok je vhodny iba pre vysvetlenie
  alebo plan, nie ako nahrada repo diffu.
- Pri vytvoreni noveho objektu musi changelog obsahovat cely `CREATE` skript s
  delimiterom.
- Triggery pomenovat `<table>_bi`, `<table>_bu`, `<table>_ai`, `<table>_au`.
- Procedury volane z triggerov pomenovat `<table>_bi1`, `_bi2` atd. podla poradia.
- Hned po `main: BEGIN` udrziavat kratky sumarny komentar. Pri zmene bloku skontrolovat aj sumare parent blokov.
- Komentare pisat kratko po slovensky a popisat, co blok potrebuje pred sebou a co zabezpecuje pre dalsie bloky.
- Lokalne `DECLARE` drzat v najmensom vnorenom bloku.
- Ak `triggers cistenie` odporuje `database/knowledge_base/database/mysql-style.md`,
  pouzi pravidlo z `database`.
