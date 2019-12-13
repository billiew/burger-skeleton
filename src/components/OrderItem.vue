<template>
	<div>
		{{uiLabels.order}}: #{{orderId}}
		<div>
		{{order.type}} {{uiLabels.ingredients}}:
		</div>
		<div v-for="item in order.ingredients" :key="item.ingredient_id">
			{{ item["ingredient_"+lang] }}
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

</style>
