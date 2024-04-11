Selmer James Solland s374993

# Kinobillettbestilling

Dette prosjektet er en webapplikasjon for bestilling av kinobilletter. Den tillater brukere å velge en film, angi antall billetter de ønsker å kjøpe, og oppgi personlige opplysninger før de fullfører kjøpet. Applikasjonen består av en frontend laget med HTML, JavaScript og Bootstrap, og en backend implementert med Spring Boot.

Opprinnelig var applikasjonen designet for å kjøre helt på klient-siden, hvor billettinformasjon ble lagret i en JavaScript-array. Brukerne kunne legge til billetter og se en liste over alle billetter de hadde lagt til.

# Oppdatering av Kinobillett-applikasjon med H2 Database

## Trinnene inkluderte:

1. **Legge til Avhengigheter:**
   Vi oppdaterte `pom.xml` for å inkludere avhengigheter for Spring Data JPA og H2-databasen.

2. **Konfigurere `application.properties`:**
   Vi la til nødvendig konfigurasjon for å aktivere og få tilgang til H2-databasen via H2-konsollen.

3. **Opprette JPA-Entiteten:**
   Vi omdannet `Billett` Java-klassen til en JPA-entitet med tilsvarende annotasjoner for å representere tabellen i databasen.

4. **Opprette Repository:**
   Vi laget `BillettRepository`, et Spring Data JPA repository, for å håndtere CRUD-operasjoner for `Billett`-entiteten.

5. **Oppdatere BillettController:**
   Vi endret `BillettController` til å bruke `BillettRepository` for å interagere med databasen i stedet for en lokal liste.

6. **Feilsøking:**
   Vi navigerte gjennom ulike feilsøkingsscenarier for å sikre at applikasjonen kjører og er koblet riktig til H2-databasen.

7. **Bekreftelse:**
   Vi bekreftet at data blir lagret korrekt i databasen ved å bruke H2-konsollen og verifiserte at dataene persisterte over applikasjonens omstarter.
