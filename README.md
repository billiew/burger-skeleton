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
- Nummer framför betällning istället för dubletter?
- Change stock?
- Varför funkar inte Undo knappen?

- Varför måste man uppdatera sidan en eller flera (kitchen) gånger för att text mm ska visas?
- Varför återställs antalet ingredienser när man hoppar mellan kategorier?

(-dölja ingredienser som inte finns i lager?)

CHECKLIST
/////

Prioriterat:
[ ] Lista i Kitchen (dela upp efter kategori)
[ ] Se och uppdatera lagerstatus i kitchenview
[X] Anpassar efter skärmstorlek


Beställning:
- [ ] Att flera av samma i beställnignen representeras av en siffra.
- [X] Se till så en inte kan beställa mer än det finns i lager
- [ ]Fixa knapparna så de fungerar felfritt
- [ ] När dryck eller tillbehör är i tryckt ska knapparna för bröd, pålägg osv. försvinna.
- [ ] Se till så att man hamnar i rätt kategori när sidan startar
- [X] Kan inte lägga tom order
- [ ] Startfönster
- [ ] Tack för  din beställning, detta är ditt ordernummer-fönster
- [ ] Om man lagt till tex bröd och lägger till pålägg, för att sen gå tillbaka till bröd så står det 0 på det bröd man lagt till.
- [Sanna] Ändra färg på knapp beroende på vilken avdelning man är i (just nu ändras bara färg om man klickat på en knapp, men färger försvinner om man klickar någon annanstans på sidan)
- [ ] Lägga till footer eller padding, så att sidan inte tvärt tar slut

Kök:
- [X] Fixa inne i grid, så det delas upp efter kategori
- [Sanna, lagt till saker, men funkar ej] Undo färdig order
- [ ] Inventory

Lågprioriterat:
- [X] Kategorier i lagerstatusen i kitchenview
- [ ] Snygga till knapparna
- [ ] Snygga till så alternativen ser ut som vi ville (layout)
- [ ] Redigering i beställningslista
      kunna ta bort ingrediens
- [ ] de ingredienser som inte finns i lager ska försvinna ur ordering view
- [ ] Ordna de olika kategorierna på "rätt" ställe under Hamburger. (Tex så patty kommer först, sen bröd osv)


Bra länkar att läsa vidare på:

Om flikar:


https://www.w3schools.com/howto/howto_js_tabs.asp
https://www.w3schools.com/css/css_navbar.asp


Buttons:

https://www.w3schools.com/css/css3_buttons.asp

http://www.echoecho.com/htmlforms14.htm
(länk ovan kanske bra när vi ska göra meny-rutorna)
