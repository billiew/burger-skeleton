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

### Start looking at the code

Start at Ordering.vue in the folder views. You will notice that the code is a structured a bit differently than in the lab. Instead of separating code by language type (HTML, CSS, and JS), it is now separated by page or component so that, for instance, all CSS that is specific for a component is placed in the same .vue file as the HTML and the Vue JS scripts. This makes it easier to manage larger projects that will contain thousands of lines of code.

Notice how the template is using two different components Ingredient and OrderItem. You will find the declarations for these in the folder components.

Try to read the code and figure out how things are connected. One special file, which is important to pay attention to is sharedVueStuff.js in components. This contains code that is used both in Ordering.vue and Kitchen.vue, which is read in as a mixin. This complicates the structure a bit but is a nifty way of keeping code duplication low.

FRÅGOR:
- Hur kopplar man en knapp till en kategori? Tex. Burgers till kategori 1. KLAR
- Hur gör man en lista av ingredienserna som man beställt (gäller både Ordering och Kitchen). Vill dela upp efter kategori?
- Varför drar den bort för många (2st istället för 1st) från lagret varje gång man beställer? KLAR

CHECKLIST
/////

Beställning:
- [ ] Redigering i beställningslista
      kunna ta bort ingrediens och att flera av samma representeras av en siffra.
- [x] My burger/beställningssammanfattning till höger
- [ ] fixa det tillen lista (vad en lagt till i sin beställning)
- [X] Uppdelning av kategorierna med tillhörande knappar
- [ ] Snygga till så alternativen ser ut som vi ville (layout)
- [ ] Se till så en inte kan beställa mer än det finns i lager, även
      att de saker som är noll i lager ej syns
- [x] Kunna ta bort ingrediens där man har tryck för den  
      minus/plus på ingrediens
- [ ]Fixa knapparna så de fungerar felfritt
- [X] Att bara den kategorin man tryckt på syns i taget
- [ ] När dryck eller tillbehör är i tryckt ska knapparna för bröd, pålägg osv. försvinna.
- [ ] Se till så att man hamnar i rätt kategori när sidan startar
- [X] Även knapparna "bröd,burgare,pålägg" ska byta språk när man klickar på knappen.
      Bör vi lägga till ett nytt  objekt i ui_en och ui_sv för det?
- [x] Fixa så rätt antal försvinner ut lagret
- [ ] Kan inte lägga tom order
- [ ] Startfönster
- [ ] Tack för  din beställning, detta är ditt ordernummer-fönster
- [ ]

Kök:
- [x] Grid på beställningen, så de hamnar i en lista
- [ ] Fixa inne i grid, så det delas upp efter kategori
- [Sanna, lagt till saker, men funkar ej] Undo färdig order
- [ ] Inventory


Bra länkar att läsa vidare på:

Om flikar:


https://www.w3schools.com/howto/howto_js_tabs.asp
https://www.w3schools.com/css/css_navbar.asp


Buttons:

https://www.w3schools.com/css/css3_buttons.asp

http://www.echoecho.com/htmlforms14.htm
(länk ovan kanske bra när vi ska göra meny-rutorna)
