<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/white-brick-wall.jpg">
    <button v-if="this.lang=='en'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/sv.png" height="20"></button>
    <button v-if="this.lang=='sv'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/en.png" height="20"></button>
    <h4 class="OBS">{{uiLabels.limit}}</h4>
    <div class="menu2">
      <button id="button0" v-on:click="setCategory(1)"> <img src="@/assets/burger.png" height="45" :title="uiLabels.hamburger"></button>
      <button id="button6" v-on:click="setCategory(6)"><img src="@/assets/soda.png" height="50" :title="uiLabels.drinks"> </button>
      <button id="button5" v-on:click="setCategory(5)"> <img src="@/assets/fries.png" height="60" :title="uiLabels.sideorders"></button>
      <button id="buttonCancel" v-on:click="cancelOrder()">  {{ uiLabels.cancelOrder }} </button>
    </div>
    <div class="menu" v-if="currentCategory<5">
      <button id="button1" v-on:click="setCategory(1)"> {{ uiLabels.patty }} </button>
      <button id="button4" v-on:click="setCategory(4)"> {{ uiLabels.bread }} </button>
      <button id="button2" v-on:click="setCategory(2)"> {{ uiLabels.addon }} </button>
      <button id="button3" v-on:click="setCategory(3)"> {{ uiLabels.sauce }} </button>
    </div>
    <div  class="wrapper">
      <div class="wrapper2">
        <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-if="item.category===currentCategory"
        v-on:increment="addToOrder(item)"
        v-on:decrement="removeFromOrder(item)"
        v-bind:counter="ingredientCount(item)"
        :item="item"
        :lang="lang"
        :key="item.ingredient_id"
        :ui-labels="uiLabels">
      </Ingredient>
    </div>
    <div class="theOrder">
      <div class="box orderItems">
        <h1>{{ uiLabels.yourOrder }}</h1>
        <h4> {{uiLabels.hamburger}}: </h4>
        <div v-for="item in groupIngredients(chosenIngredients)" :key="item.ingredient_id">
          <span v-if="item.ing.category<5">{{item.count}} x {{ item.ing['ingredient_' + lang] }}</span>
        </div>
        <h4> {{uiLabels.drinks}}: </h4>
        <div v-for="item in groupIngredients(chosenIngredients)" :key="item.ingredient_id">
          <span v-if="item.ing.category===6">{{item.count}} x {{ item.ing['ingredient_' + lang] }}</span>
        </div>
        <h4> {{uiLabels.sideorders}}: </h4>
        <div v-for="item in groupIngredients(chosenIngredients)" :key="item.ingredient_id">
          <span v-if="item.ing.category===5">{{item.count}} x {{ item.ing['ingredient_' + lang] }}</span>
        </div>
        <div>
          <br>
          <h4>{{ uiLabels.sum }} : {{ price }} :-</h4>
        </div>
      </div>
      <button :disabled="(chosenIngredients.length==0)?true:false" class="box button" v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
        <br id="empty">
      <div class="box allergies">
        <img src="@/assets/vegan.png" height="35" :title="uiLabels.vegan">
        {{ uiLabels.vegan }}
        <br>
        <img src="@/assets/lactose-free.png" height="35" :title="uiLabels.lactose">
        {{ uiLabels.lactose }}
        <br>
        <img src="@/assets/gluten-free.png" height="35" :title="uiLabels.gluten">
        {{ uiLabels.gluten }}
      </div>
    </div>


    <!-- <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div>
    <OrderItem
    v-for="(order, key) in orders"
    v-if="order.status !== 'done'"
    :order-id="key"
    :order="order"
    :ui-labels="uiLabels"
    :lang="lang"
    :key="key">
  </OrderItem>
</div> -->
</div>
</div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */
export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      currentCategory: 1
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    ingredientCount: function (item) {
      let counter = 0;
      for(let i = 0; i < this.chosenIngredients.length; i += 1) {
        if (this.chosenIngredients[i] === item)
        counter += 1;
      }
      return counter;
    },
    setCategory: function (cat) {
      this.currentCategory = cat;
    },
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
    },
    removeFromOrder: function (item) {
      for (let i = 0; i < this.chosenIngredients.length; i += 1 ) {
        if (this.chosenIngredients[i] === item) {
          this.chosenIngredients.splice(i, 1);
          if (this.price>0){
            this.price -= +item.selling_price;
            break;
          }
        }
      }
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
      order = {
        ingredients: this.chosenIngredients,
        price: this.price
      };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];

      this.$router.push('/finishedOrder');

    },
    cancelOrder: function() {
      this.$router.push('/startpage');

    },
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin-bottom: 30%;
  width: 70;
  color: black;
}

.OBS {
  text-transform: uppercase;
  text-align: center;
  color: red;
  background-color: pink;
  font-family: arial;
}


.menu{
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 1em;

}
.menu button{
  height: 3em;
}
.menu2{
  display: grid;
  grid-template-columns: auto auto auto 10%;
  height: 20%;
  padding: 1em;

}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="menu2"] {
    grid-template-columns: 30% 20% 25% 25%;
  }
}

.wrapper{
  display: grid;
  grid-gap: 1%;
  grid-template-columns: 75% 25%;
  padding: 3%;
  height: fit-content;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="wrapper"] {
    grid-template-columns: 60% 40%;
    grid-gap: 4%;
  }
}

.wrapper2{
  display: grid;
  grid-gap: 3%;
  grid-template-columns: 30% 30% 30% ;
  padding: 1em;
  height: fit-content;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="wrapper2"] {
    grid-template-columns: 100%;
    grid-gap: 0.5%;
    padding: 0em;
    width: 100%;
  }
}

.theOrder{
  display: grid;
  font-family: arial;
  grid-gap: 1%;
  grid-template-columns: auto;
  border-radius: 1em;
  border-width: 5em;
  height: fit-content;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="theOrder"] {
    width: fit-content;
  }
}


.box {
  padding: 1em;
  font-size: 90%;
  border-radius: 1em;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="box"] {
    padding: 0.3em;
  }
}
.orderItems{
  border-color: #000000;
  background-color:  rgba(255, 255, 255, 0.9);
}

.button{
  bottom:1em;
  right:3em;
  font-size: 1em;
  font-weight: bolder;
  background-color: #4CAF50;
  border-color: #000000;
  height: 5em;
}
empty{
  background-color: rgba(0,0,0,0);
}
.allergies{
  padding: 1em;
  background-color:  rgba(255, 255, 255, 0.9);
}
#placeOrderText{
  background-color: white;
  marigin: 3em;
  border-radius: 0.1em;
  font-size: 1.3em;
}

.example-panel {
  width: 100%;
  height: 100%;
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
.ingredient {
  text-align: center;
  border: 0.5em solid rgb(150,150,150);
  padding: 1.6em 1.6em 3em 1.6em;
  background-color: rgb(255, 250, 250);
  height: 9em;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="ingredient"] {
    border: 0.5em solid #ccd;
    width: 90%;
    padding: 1em 0.1em 1em 0.1em;
    height: fit-content;
  }
}
@when (cat:"1"){

}
button {
  border-radius: 1em;
  border:0.05em solid rgb(100,100,100);
  font-weight: bold;
}
button:focus {
  background-color: LightSalmon;
}
button:hover {
  background-color: lightblue;
  cursor: pointer;
}
#buttonCancel{
  background-color: rgb(255, 90, 90);
}
#buttonCancel:hover{
  background-color: lightblue;
  cursor: pointer;
}
</style>
