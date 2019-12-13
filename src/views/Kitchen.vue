<template>
<div id="orders">
  <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
  <div>
    <button id="mybutton" v-on:click="changeView('que')"> <h1>{{ uiLabels.ordersInQueue }}</h1> </button>
    <button id="mybutton" v-on:click="changeView('finished')"> <h1>{{ uiLabels.ordersFinished }}</h1> </button>
    <button id="mybutton" v-on:click="changeView('productStock')"> <h1>{{ uiLabels.productsInStock }}</h1> </button>
  </div>
  <div id="kitchenorders">
    <div v-if="view==='que'">
    <h1>{{ uiLabels.ordersInQueue }}</h1>
    <div class="wrapper">
        <OrderItemToPrepare
        v-if="order.status !== 'done'"
        class="orderitemtoprepare"
        v-for="(order, key) in orders"
        v-on:done="markDone(key)"
        :order-id="key"
        :order="order"
        :ui-labels="uiLabels"
        :lang="lang"
        :key="key">
      </OrderItemToPrepare>
    </div>
  </div>
  <div v-if="view==='finished'">
    <h1>{{ uiLabels.ordersFinished }}</h1>
    <div class="wrapper2">
      <OrderItem
      class="orderitem"
      v-if="order.status === 'done'"
      v-for="(order, key) in orders"
      v-on:undo="markUndo(key)"
      :order-id="key"
      :order="order"
      :lang="lang"
      :ui-labels="uiLabels"
      :key="key">
    </OrderItem>
  </div>
</div>
  <div v-if="view==='productStock'">
    <h1>{{ uiLabels.productsInStock }}</h1>
    <Ingredient>

  </Ingredient>
    </div>
  </div>
</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'
import Ingredient from '@/components/Ingredient.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare,
    Ingredient,
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
    }
  },
  methods: {
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
    padding: 2em;
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
    height: 100px;
    width: 30%;
    background-color: rgb(250, 210, 255);
  }
</style>
