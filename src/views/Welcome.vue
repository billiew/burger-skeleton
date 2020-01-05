<template>
  <div id="ordering">
    <img class="example-panel" src="@/assets/white-brick-wall.jpg">
    <button v-if="this.lang=='en'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/sv.png" height="20"></button>
    <button v-if="this.lang=='sv'" v-on:click="switchLang()">{{ uiLabels.language }} <img src="@/assets/en.png" height="20"></button>
    <div class="wrapper">
      <center>
      <span><img class="burger" src="@/assets/burger.png" height="70"><img class="header" src="@/assets/Crafty-Burgers.png"><img class="burger" src="@/assets/burger.png" height="70"></span>
      <h3>{{uiLabels.welcome}}</h3>
      <br>
      <button v-on:click="changePage()"><h1>{{uiLabels.newOrder}}</h1></button>
      </center>

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
  methods: {
    changePage: function(item) {
      this.$router.push('/');
      this.$router.go();
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
.wrapper{
  padding: 3%;
  font-size: 2em;
  background-color: rgba(255, 255, 255, 0.5);
  align-items: center;
  border: 1em;
  margin: 2em;
  font-family: arial;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="wrapper"] {
    font-size: 1em;

  }
}

.header {

}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="header"] {
    width: 80%;

  }
}

.burger {

}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  [class*="burger"] {
    height: 1em;

  }
}

.example-panel {
  width: 100%;
  height: 100%;
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}


button:hover {
  background-color: lightblue;
  cursor: pointer;
}
</style>
