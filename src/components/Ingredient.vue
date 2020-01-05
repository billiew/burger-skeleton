<template>
  <div class="ingredient">
    <label>

        <button id="orderbuttons" v-on:click="decrementCounter"> <img src="@/assets/negative-sign-button.png" height="30"></button>
        <span id="boldTextItem"> ~ {{counter}} ~ </span>
        <button :disabled="(counter>=item.stock)?true:false"  id="orderbuttons"  v-on:click="incrementCounter"> <img src="@/assets/plusbutton.png" height="30"></button>

      <div id="boldTextItem">
        <br>
        {{item["ingredient_"+ lang]}}
      </div>
      <span v-if="item.vegan===1">
        <img src="@/assets/vegan.png" height="35">
      </span>
      <span v-if="item.milk_free===1">
        <img src="@/assets/lactose-free.png" height="35">
      </span>
      <span v-if="item.gluten_free===1">
        <img src="@/assets/gluten-free.png" height="35">
      </span>
      <br>
      {{item.selling_price}}:-
      <br>
      {{item.stock}} {{uiLabels.instock}}  <!-- här kunna använda uiLabels -->
    </label>
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    uiLabels: Object,
    item: Object,
    lang: String
  },
  data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter: function () {

      this.counter += 1;

      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('increment');
    },
    decrementCounter: function () {
      if(this.counter>0){
        this.counter -= 1;
      }

      // sending 'decrement' message to parent component or view so that it
      // can catch it with v-on:decrement in the component declaration
      this.$emit('decrement');
    },
    resetCounter: function () {
      this.counter = 0;
    }
  }
}
</script>
<style scoped>

#boldTextItem{
  font-weight: bold;
  font-size: 120%;
  font-family: arial;
}
button:hover {
  cursor: pointer;
}
</style>
