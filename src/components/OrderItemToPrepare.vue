<template>
  <!-- Note in this component that it is using another component -->
<div>
  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItem>
  <button v-on:click="orderDone">
    {{uiLabels.ready}}
  </button>
</div>
</template>
<script>

import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
    /*orderUndo: function () {
			// sending 'done' message to parent component or view so that it
			// can catch it with v-on:done in the component declaration
			this.$emit('undo', this.orderId);
			//this.$store.state.socket.emit('orderUndo', this.orderId);
		},*/
    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>

button {
  background-color: rgb(0, 200, 0);
	width: 5em;
  height: 5em;
  border-radius: 1em;
}

button:hover {
  background-color: lightblue;
  cursor: pointer;
}
</style>
