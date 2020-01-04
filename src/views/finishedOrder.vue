<template>
<div id="orders">
  <button v-if="this.lang=='en'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/sv.png" height="20"></button>
  <button v-if="this.lang=='sv'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/en.png" height="20"></button>
  <div class="wrapper">
          <h2><center>{{uiLabels.thankOrder}}</center></h2>
          <!-- {{orders}} -->
          <OrderItemToShow
          v-if="(order.orderId === 1)"
          class="orderitemtoshow"
          v-for="(order,key) in orders"
          v-on:process="showorder(order)"
          :order-id="key"
          :order="order"
          :ui-labels="uiLabels"
          :lang="lang"
          :key="key">
        </OrderItemToShow>
    <br>
    <button v-on:click="changePage()"><h1>{{uiLabels.newOrder}}</h1></button>
  </div>
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

  methods: {
    changePage: function() {
      this.$router.push('/');
      this.$router.go();
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

  .orderitemtoshow {
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
