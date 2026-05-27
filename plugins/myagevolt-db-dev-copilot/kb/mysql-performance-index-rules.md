# Pravidla Vykonu A Indexov

- Horuce cesty drz kratke. Do insert/prijem ciest nepridavaj joiny ani drahu
  logiku, ak to sukromna KB vyslovene nepovoluje.
- V triggeroch nerob full scan.
- Kazdy lookup v generovanej trigger/procedure logike musi mat indexovu oporu.
- Pri kontrole indexov najprv pomenuj existujuci index, ktory dotaz pokryva.
  Novy index navrhni iba vtedy, ked existujuce indexy nepokryvaju pristupovy
  vzor.
- Periodicku alebo tazsiu pracu ries skor ako event/davkovy kandidat, nie ako
  trigger logiku.
- Pri analyze pomalych dotazov oddel jednorazovy historicky problem od vzorov,
  ktore su stale aktualne.
