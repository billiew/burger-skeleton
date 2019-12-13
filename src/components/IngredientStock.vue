<template>
  <div class="ingredientStock">
    <label>
      {{item["ingredient_"+ lang]}}
      <button id="orderbuttons" v-on:click="removeStock"> <img src="@/assets/negative-sign-button.png" height="15"></button>
      {{item.stock}}
      <button id="orderbuttons"  v-on:click="addStock"> <img src="@/assets/plusbutton.png" height="15"></button>
      <hr>
    </label>
  </div>
</template>
<script>
export default {
  name: 'IngredientStock',
  props: {
    item: Object,
    lang: String
  },
  //   data: function () {
  //   return {
  //     counter: 0
  //   };
  // },
  methods: {
    removeStock: function () {
      this.$store.state.socket.emit('updateStock', {ingredient: this.item}, this.item.stock-1);
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
    },
    addStock: function () {
      if(this.item.stock>0){
        this.item.stock += 1;
      }

      // sending 'decrement' message to parent component or view so that it
      // can catch it with v-on:decrement in the component declaration
      this.$store.state.socket.emit('order', {order: order});
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
