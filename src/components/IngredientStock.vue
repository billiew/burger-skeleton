<template>
  <div class="ingredientStock">
      <label for="ingredient">{{item["ingredient_"+ lang]}}<br>
        {{item.stock}}
        <input v-model="newStock" type="number" id="ingredient" name="n">
        <button v-on:click="changeStock"> Submit </button>
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
    data: function () {
    return {
      newStock: this.item.stock
    };
  },
  methods: {
    changeStock: function () {
      this.$store.state.socket.emit('updateStock', {ingredient: this.item}, this.newStock);
      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
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
