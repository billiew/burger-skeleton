<template>
  <div id="orders">
    <img class="example-panel" src="@/assets/white-brick-wall.jpg">
    <button v-if="this.lang=='en'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/sv.png" height="20"></button>
    <button v-if="this.lang=='sv'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/en.png" height="20"></button>
    <center class="main">
      <h2>{{uiLabels.thankOrder}}</h2>
      <div v-for="(order) in orders" :key="order.price">
      <h6> {{changeOrderNumber(order.orderId)}}</h6>
     </div>
     <OrderItemToShow
     v-if="(order.orderId === finishOrderNumber)"
     class="orderitemtoshow"
     v-for="(order,key) in orders"
     :order-id="key"
     :order="order"
     :ui-labels="uiLabels"
     :lang="lang"
     :key="key">
   </OrderItemToShow>
    <br>
    </center>
    <center class="theButtons">
      <button v-on:click="changePageToOrder()"><h1>{{uiLabels.newMenu}}</h1></button>
      <button v-on:click="changePageToStart()"><h1>{{uiLabels.finish}}</h1></button>
    </center>
  </div>
</template>
<script>
import OrderItemToShow from '@/components/OrderItemToShow.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItemToShow,
  },
  mixins: [sharedVueStuff], // include stuff that is used in both
  //the ordering system and the kitchen
  data: function () {
    return {
      finishOrderNumber: 0
    };
  },
  methods: {
    changePageToStart: function() {
      this.$router.push('/startpage');
    },
    changePageToOrder: function() {
      this.$router.push('/');
      this.$router.go();
    },
    changeOrderNumber: function(ord) {
      this.finishOrderNumber = ord;
    }
  }
}

</script>
<style scoped>
#orders {
  font-size:24pt;
}
.main {
  background-color: rgba(255,255,255,0,9);
}
h1 {
  text-transform: uppercase;
  font-size: 1.4em;
}

.example-panel {
  width: 100%;
  height: 100%;
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
.orderitemtoshow {
  border: 1px solid #ccd;
  padding: 1em;
  background-color: rgba(255, 255, 255, 1);
}


.theButtons{
  align-items: center;
}
button {
  border-radius: 1em;
  width: 10em;
  font-weight: bold;
  /* align: center; */
}
button:hover {
  background-color: lightblue;
  cursor: pointer;
}
</style>
