# Pravidla Vykonu A Indexov

Verejne bezpecne pravidla pre MyAgeVolt DB vykonovy postup.

- Minimalizovat horucu cestu: raw insert a davkove spracovanie maju byt kratke.
- V triggeroch nerobit full-scan. Kazdy lookup musi mat index oporu.
- Pri kontrole indexov najprv povedat, ktory existujuci index dotaz pokryva; novy index navrhnut iba ked treba.
- Produkcny index pridavaj ako samostatny DDL krok. Nekombinuj ho s column alebo
  FK zmenou v jednom `ALTER TABLE`.
- Pri live/velkej tabulke pomenuj lock risk a ci treba direct DDL maintenance
  window alebo online schema change tool.
- Existujuce indexy, velkosti tabuliek a FK vztahy overuj v `database/exports/**`
  a `database/exports/_metadata/**`.
- Tazsie alebo periodicke veci riesit eventom; lock patri do eventu, nie do
  davkovej procedury.
- Pri reporte pomalych dotazov zoradit zavaznost, vysvetlit dopad, navrhnut minimalnu opravu a oddelit jednorazovy historicky problem od stale aktualneho problemu.
