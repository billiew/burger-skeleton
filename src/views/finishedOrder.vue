<template>
<div id="orders">
  <button v-if="this.lang=='en'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/sv.png" height="20"></button>
  <button v-if="this.lang=='sv'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/en.png" height="20"></button>
  <div>
    <button id="mybutton" v-on:click="changeView('que')"> <h1>{{ uiLabels.ordersInQueue }}</h1> </button>

  </div>
  <div id="kitchenorders">
    <div v-if="view==='que'">

    <div class="wrapper">
        <OrderItemToPrepare

        class="orderitemtoprepare"
        v-for="(order,key) in orders"
        v-on:done="markDone(key)"

        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToPrepare>
    </div>
  </div>
  </div>
</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import Ingredient from '@/components/Ingredient.vue'
import IngredientStock from '@/components/IngredientStock.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    Ingredient,
    IngredientStock
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      currentCategory: 1
    }
  },
  methods: {
    setCategory: function (cat) {
      this.currentCategory = cat;
    },
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    markUndo: function (orderid) {
      this.$store.state.socket.emit("orderUndo", orderid);
    }
  }
}

</script>
<style scoped>
	#orders {
    font-size:24pt;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }

  .wrapper{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto;
    padding: 0.5em;
  }
  .wrapper2{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto;
    padding: 2em;
  }

  .orderitemtoprepare {
    border: 1px solid #ccd;
    padding: 1em;
    background-color: rgb(190, 210, 255);
  }
  .orderitem {
    border: 1px solid #ccd;
    padding: 1em;
    background-color: rgb(190, 210, 255);
  }

  #mybutton{
    height: 5em;
    width: 30%;
    background-color: rgb(250, 210, 255);
  }

  #mybutton:focus {
    background-color: LightSalmon;
  }

  .menu{
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    padding: 1em;

  }

</style>
