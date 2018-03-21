<template lang="html">
    <div class="cart-notification-cont">
    	<p class="notification-text">Add any watch band to your order <br> and get 10% off, shop now!</p>
    </div>
</template>

<script>
export default {
name: 'cartNotification',
  data() {
    return {
    	notification: "Add any watch band to your order and get 10% off, shop now!",
    }
  },
  methods: {

},


}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .cart-notification-cont{
  	margin: 2rem 0 1rem 0;
  	.notification-text{
  		@include text-body;
  		padding: 1.7rem 2.82rem;
  		border: solid 2px #000000;
  		font-weight: 600;
  		// line-height: 1.43;
  		// letter-spacing: 0.2px;
  		text-align: left;
  	}
  }


</style>
