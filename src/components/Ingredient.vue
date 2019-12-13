<template>
  <div class="ingredient">
    <label>
      <span>
      <button id="orderbuttons" v-on:click="decrementCounter"> <img src="@/assets/negative-sign-button.png" height="15"></button>
      {{counter}}
      <button :disabled="(counter>=item.stock)?true:false"  id="orderbuttons"  v-on:click="incrementCounter"> <img src="@/assets/plusbutton.png" height="15"></button>
      </span>
      <br>
      {{item["ingredient_"+ lang]}}
      <br>
      {{item.selling_price}}:-
      <br>{{item.stock}} pcs
    </label>
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
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

/*#orderbuttons{
  padding:5px;
  border-radius: 30px;
}
*/

</style>
