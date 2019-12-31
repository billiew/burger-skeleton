<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/bubbles.jpg">
    <button v-if="this.lang=='en'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/sv.png" height="20"></button>
    <button v-if="this.lang=='sv'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/en.png" height="20"></button>
    <div class="wrapper">

      <button v-on:click="changePage()"><h1>{{uiLabels.newOrder}}</h1></button>
      <br></br>
            <h2><center>{{uiLabels.welcome}}</center></h2>
  </div>
</div>
</template>
<script>
</script>

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
      currentCategory: 0
    }
  },
  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
  },
  methods: {
    changePage: function(item) {
      this.$router.push('/');
      this.$router.go();
    },
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
    },
    reload(){
      var location = this.$route.fullPath

      this.$router.replace('/')

      this.$nextTick(() => this.$router.replace(location))
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

#placeOrderButton{
  position:absolute;
  bottom:2%;
  right:3%;
  font-size: 100%;
  padding: 2%;
  background-color: #4CAF50;
  border-color: #000000;
  border-radius: 10px;

}
#placeOrderText{
  background-color: #87CEFA;
  border-radius: 10px;
  font-size: 130%;
}
#PlaceOrderSection{
  background-color:  	#ADD8E6;
  border-radius: 8px;
  height: 450px;

}

.menu{
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 1em;

}

.menu2{
  display: grid;
  grid-template-columns: auto auto auto 10%;
  height: 20%;
  padding: 1em;

}

.wrapper{
  display: grid;
  grid-gap: 1%;
  grid-template-columns: 80% 20%;
  padding: 3%;
}

.wrapper2{
  display: grid;
  grid-gap: 5%;
  grid-template-columns: 30% 30% 30% ;
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
  text-align: center;
  border: 1px solid #ccd;
  padding: 1em;
  background-color: rgb(190, 210, 255);
}

#mybutton{
  width: 60%;
  background-color: rgb(190, 210, 255);
}

#mybutton:focus {
  background-color: LightSalmon;
}

button:hover {
  background-color: lightblue;
  cursor: pointer;
}
</style>
