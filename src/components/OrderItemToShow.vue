<template>
  <!-- Note in this component that it is using another component -->
<div>
  <OrderItem
    :ui-labels="uiLabels"
    :lang="lang"
    :order-id="orderId"
    :order="order">
  </OrderItem>
  <div v-if="order.status ==='not-started'">
</div>
</div>

</template>
<script>

import OrderItem from '@/components/OrderItem.vue'
export default {
  name: 'OrderItemToShow',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  },
  methods: {
    orderStarted: function () {
      // sending 'process' message to parent component or view so that it
      // can catch it with v-on:process in the component declaration
      this.$emit('started', this.orderId);
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

</style>
