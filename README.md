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

<<<<<<< HEAD
För att komma till startsidan:
=======
Start page added:

>>>>>>> 2ab3865ec4bb7028d16fc8e419b22d9e2ebc92bd
http://localhost:8080/#/startpage

För att komma till bekräftelsesidan:
http://localhost:8080/#/finishedOrder
### Start looking at the code

Start at Ordering.vue in the folder views. You will notice that the code is a structured a bit differently than in the lab. Instead of separating code by language type (HTML, CSS, and JS), it is now separated by page or component so that, for instance, all CSS that is specific for a component is placed in the same .vue file as the HTML and the Vue JS scripts. This makes it easier to manage larger projects that will contain thousands of lines of code.

Notice how the template is using two different components Ingredient and OrderItem. You will find the declarations for these in the folder components.

Try to read the code and figure out how things are connected. One special file, which is important to pay attention to is sharedVueStuff.js in components. This contains code that is used both in Ordering.vue and Kitchen.vue, which is read in as a mixin. This complicates the structure a bit but is a nifty way of keeping code duplication low.

FRÅGOR:


- Varför måste man uppdatera sidan en eller flera (kitchen) gånger för att text mm ska visas?
- Varför återställs antalet ingredienser när man hoppar mellan kategorier?
- Varför försvinner ordrarna när stock uppdateras?
(-dölja ingredienser som inte finns i lager?)

CHECKLIST
/////

Prioriterat:
- [ ] Anpassar efter skärmstorlek (någorlunda bra nu men måste vara bättre)

Beställning:
- [ ] Tack för din beställning, detta är ditt ordernummer-fönster. Lägg till ordernummer!




Lågprioriterat:
- [ ] Knapparna ska lysa när man är inne i en kategori

Kök:
- [ ] Att när man uppdaterar stock så försvinner inte beställningarna
      (Nu måste man uppdatera sidan för att se beställningarna igen)
2020-01-03, Vi har testat, inte värt att lägga för mkt tid på

Bra länkar att läsa vidare på:

Om flikar:


https://www.w3schools.com/howto/howto_js_tabs.asp
https://www.w3schools.com/css/css_navbar.asp


Buttons:

https://www.w3schools.com/css/css3_buttons.asp

http://www.echoecho.com/htmlforms14.htm
(länk ovan kanske bra när vi ska göra meny-rutorna)
