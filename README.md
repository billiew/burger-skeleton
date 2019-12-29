# burger-skeleton

This skeleton code contains a back-end for your burger ordering system as well as stubs for building views and maintaining a clean folder structure. Take some time to get acquainted with the different files and how they are connected.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Browser

When server is running, visit the following pages in a web browser:

http://localhost:8080/#/

http://localhost:8080/#/kitchen

För att komma till startsidan:
http://localhost:8080/#/startpage

### Start looking at the code

Start at Ordering.vue in the folder views. You will notice that the code is a structured a bit differently than in the lab. Instead of separating code by language type (HTML, CSS, and JS), it is now separated by page or component so that, for instance, all CSS that is specific for a component is placed in the same .vue file as the HTML and the Vue JS scripts. This makes it easier to manage larger projects that will contain thousands of lines of code.

Notice how the template is using two different components Ingredient and OrderItem. You will find the declarations for these in the folder components.

Try to read the code and figure out how things are connected. One special file, which is important to pay attention to is sharedVueStuff.js in components. This contains code that is used both in Ordering.vue and Kitchen.vue, which is read in as a mixin. This complicates the structure a bit but is a nifty way of keeping code duplication low.

FRÅGOR:


- Varför måste man uppdatera sidan en eller flera (kitchen) gånger för att text mm ska visas?
- Varför återställs antalet ingredienser när man hoppar mellan kategorier?
- Hur kan vi använda UI-labels under mappen components så att tex knappen submit i kitchen
  eller pcs kan ändra språk?

(-dölja ingredienser som inte finns i lager?)

CHECKLIST
/////

Prioriterat:
- [ ] Anpassar efter skärmstorlek (någorlunda bra nu men måste vara bättre)
Christine fixar 2019-12-29


Beställning:
- [ ] Ikoner för laktos/gluten/vegan
- [ ] När dryck eller tillbehör är i tryckt ska knapparna för bröd, pålägg  
      osv. försvinna.
- [ ] Se till så att man hamnar i rätt kategori när sidan startar
- [ ] Startfönster
Christine fixar 2019-12-29
- [ ] Tack för din beställning, detta är ditt ordernummer-fönster
Christine fixar 2019-12-29
- [ ] Om man lagt till tex bröd och lägger till pålägg, för att sen gå
      tillbaka till bröd så står det 0 på det bröd man lagt till.
- [ ] Dela upp Beställningen (den på höger sida) i Hamburgare, Dryck och       
      Tillbehör (så som det är uppdelat i Kitchen)
- [ ] Lägg till en cancel-knapp

Kök:
- [ ] Submit-knappen i Stock ska ändra språk
- [ ] Att flera av samma i beställnignen representeras av en siffra.
- [ ] Att när man uppdaterar stock så försvinner inte beställningarna

Lågprioriterat:
- [ ] Filtrering för laktos/gluten/vegan
- [ ] Snygga till knapparna
- [ ] Snygga till så alternativen ser ut som vi ville (layout)
- [ ] Redigering i beställningslista
      kunna ta bort ingrediens
- [ ] de ingredienser som inte finns i lager ska försvinna ur ordering view


Bra länkar att läsa vidare på:

Om flikar:


https://www.w3schools.com/howto/howto_js_tabs.asp
https://www.w3schools.com/css/css_navbar.asp


Buttons:

https://www.w3schools.com/css/css3_buttons.asp

http://www.echoecho.com/htmlforms14.htm
(länk ovan kanske bra när vi ska göra meny-rutorna)
