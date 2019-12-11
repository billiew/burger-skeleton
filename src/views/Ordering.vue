<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/bubbles.jpg">
    <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
    <div class="menu2">
      <button id="mybutton"> <img src="@/assets/burger.png" height="50"> </button>
      <button id="mybutton" v-on:click="setCategory(6)"><img src="@/assets/soda.png" height="50"> </button>
      <button id="mybutton" v-on:click="setCategory(5)"> <img src="@/assets/fries.png" height="60"></button>
      </div>
    <div class="menu">
      <button id="mybutton" v-on:click="setCategory(1)"> BURGARE </button>
      <button id="mybutton" v-on:click="setCategory(4)"> BRÖD </button>
      <button id="mybutton" v-on:click="setCategory(2)"> PÅLÄGG </button>
      <button id="mybutton" v-on:click="setCategory(3)"> SÅS </button>
    </div>
    <div  class="wrapper">

      <div class="wrapper2">
        <!-- <h1>{{ uiLabels.ingredients }}</h1> -->
        <Ingredient
        ref="ingredient"
        v-for="item in ingredients"
        v-if="item.category===currentCategory"
        v-on:increment="addToOrder(item)"
        :item="item"
        :lang="lang"
        :key="item.ingredient_id">
      </Ingredient>
    </div>
    <div>
      <h1>{{ uiLabels.order }}</h1>
      {{ chosenIngredients.map(item => item["ingredient_"+lang]).join(', ') }}, {{ price }} kr
      <button v-on:click="placeOrder()">{{ uiLabels.placeOrder }}</button>
    </div>
  </div>
  <h1>{{ uiLabels.ordersInQueue }}</h1>
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
      currentCategory: 4
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    setCategory: function (cat) {
      this.currentCategory = cat;
    },
    addToOrder: function (item) {
      this.chosenIngredients.push(item);
      this.price += +item.selling_price;
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
    }
  }
}
</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin:auto;
  width: 70;
  color: black;
}

.menu{
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 1em;
}

.menu2{
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 1em;
}

.wrapper{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto;
  padding: 2em;
}

.wrapper2{
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto auto auto auto;
  padding: 1em;
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
  border: 1px solid #ccd;
  padding: 1em;
  background-color: rgb(190, 210, 255);
}

#mybutton{
  width: 60%;
  background-color: rgb(190, 210, 255);
}
button:hover {
  background-color: lightblue;
  cursor: pointer;
}
</style>
