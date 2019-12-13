<template>
	<div class="orderWrapper">
		<span class="box ordernumb"><b>{{uiLabels.order}}: #{{orderId}}</b></span>
		<div class="box burger">
			{{order.type}}<b>{{uiLabels.hamburger}}:</b>
			<div v-for="item in order.ingredients" :key="item.ingredient_id">
				<span v-if="item.category<5">{{ item["ingredient_"+lang] }}</span>
			</div>
		</div>
		<div class="box drink">
			{{order.type}} <b>{{uiLabels.drinks}}:</b>
			<div v-for="item in order.ingredients" :key="item.ingredient_id">
				<span v-if="item.category===6">{{ item["ingredient_"+lang] }}</span>
			</div>
		</div>
		<div class="box sides">
			{{order.type}} <b>{{uiLabels.sideorders}}:</b>
			<div v-for="item in order.ingredients" :key="item.ingredient_id">
				<span v-if="item.category===5">{{ item["ingredient_"+lang] }}</span>
			</div>
		</div>
		<div v-if="order.status==='done'">
		<button v-on:click="orderUndo">
			{{uiLabels.notReady}}
		</button>
	</div>
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
			this.$emit('undo', this.orderId);
			//this.$store.state.socket.emit('orderUndo', this.orderId);
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
