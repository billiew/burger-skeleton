<template>
	<div class="orderWrapper">
 		<span class="box ordernumb">{{uiLabels.order}}: #{{orderId}}</span>
		<div class="box burger">
		{{order.type}} {{uiLabels.hamburger}}:
		<div v-for="item in order.ingredients":key="item.ingredient_id">
			<span v-if="item.category<5">{{ item["ingredient_"+lang] }}</span>
		</div>
		</div>
		<div class="box burger">
		{{order.type}} {{uiLabels.hamburger}}:
		<div v-for="item in order.ingredients":key="item.ingredient_id">
			<span v-if="item.category<5">{{ item["ingredient_"+lang] }}</span>
		</div>
		</div>
		<div class="box drink">
		{{order.type}} {{uiLabels.drinks}}  :
		<div v-for="item in order.ingredients":key="item.ingredient_id">
			<span v-if="item.category===6">{{ item["ingredient_"+lang] }}</span>
		</div>
		</div>
		<div class="box sides">
		{{order.type}} {{uiLabels.sideorders}}  :
		<div v-for="item in order.ingredients":key="item.ingredient_id">
			<span v-if="item.category===5">{{ item["ingredient_"+lang] }}</span>
		</div>
		</div>
		<button v-on:click="orderUndo">
			{{uiLabels.notReady}}
		</button>
	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
	methods: {
		orderUndo: function () {
			// sending 'done' message to parent component or view so that it
			// can catch it with v-on:done in the component declaration
			this.$emit('undo');
		}
	}
}
</script>
<style scoped>
.orderWrapper{
  display: grid;
  grid-template-columns: 25% 25% 25% 25% ;
}

.box {
		padding: 1em;
		font-size: 90%;
		text-align: center;

}

.ordernumb {
		grid-column: 1;
		grid-row: 1 / span 3;
}
.burger {
		grid-column: 2;
		grid-row: 1 / span 3;
}
.drink {
		grid-column: 3 ;
		grid-row: 1 / span 3;
}

.sides {
		grid-column: 4 ;
		grid-row: 1 / span 3;
}
</style>
