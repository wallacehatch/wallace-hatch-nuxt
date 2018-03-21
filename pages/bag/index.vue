<template>
  <div class="bag-page-cont">
  	<no-ssr>
      <div class="bag-upper-cont">
    		<h1 class="heading">You have</h1>
    		<p class="items-description">{{message}}</p>

    		<button  class="checkout-btn" @click="$router.push('/checkout/info')" v-if="this.totalQuantity > 0">Checkout</button>
    		<button  class="shopping-btn" @click="$router.push('/')" v-if="this.totalQuantity == 0">Start Shopping</button>
    		<p class="subtext">Free worldwide Shipping &</p>
    		<p class="subtext">Returns on orders over $95</p>
    	</div>
    </no-ssr>
  	<div class="product-section">
      <div class="hide-sm" v-for="(item, i) in cart.items">
        <product-line v-if="item.quantity > 0" :key="'pTile' + i" :item="item" @qtyChange="refreshCart"></product-line>
         <hr v-if="item.quantity > 0" class="bag-divider">
      </div>
      <div class="sm-only" v-for="(item, i) in cart.items">
        <cart-item v-if="item.quantity > 0" class="mobile-bag-item bag-item" :key="'pTile' + i" :item="item" @qtyChange="refreshCart">
          <p class="additional-message-cont">Includes {{getCleanedBandType(item)}} band and with quick release to use when changing bands.</p>
        </cart-item>
        <hr v-if="item.quantity > 0" class="mobile-bag-divider">
      </div>
    </div>
  </div>
</template>

<script>
import BagService from '@/BagService';
import StripeService from '@/StripeService';
import ProductLine from '@/components/bag/ProductLine'
import CartItem from '@/components/common/cartModal/CartItem';
export default {
   name: 'BagPage',
   components: {
   	ProductLine,
    CartItem,
   },
   data () {
    return {
      cart: {
        items: [],
      },
      totalQuantity: 0,
      message: null,
    }
  },
  beforeMount() {
  	this.refreshCart()
    this.$store.commit('SET_NAV_LAYOUT', 0);
  },
  methods: {
    refreshCart(){
      if (BagService.getBag()) {
        this.cart = BagService.getBag();
      }
      this.totalQuantity = this.cart.items.reduce((total, item) => { return total + item.quantity }, 0);
      this.$store.commit('SET_BADGE_NUMBER', this.totalQuantity);
      switch (this.$store.state.badgeNumber) {
      case 0:
      this.message = "Nothing in your bag, start shopping to fill it up."; break;
      case 1:
      this.message = this.$store.state.badgeNumber + " item in your bag"; break;
      default:
      this.message = this.$store.state.badgeNumber + " items in your bag"; break;

      }
    },
    getCleanedBandType(item) {
      switch(item.product.metadata.bandType) {
        case "Stainless mesh":
          return "stainless mesh"
          break
        case "Leather strap":
          return"leather"
          break
      }
    }
  },
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .mobile-bag-divider {
    border: none;
    border-bottom: solid 1px #d8d8d8;
    width: calc(100% - 4rem);
    margin: auto;
    margin-top: 4rem;
  }

  .mobile-bag-item {

    text-align: center;
    .remove-button {
      width: calc(100% - 2rem) !important;
    }
    button {
      background-color: #fff;
    }
    .additional-message-cont {
      @include text-body;
      font-size: 1.2rem;
      background-color: #f6f6f6;
      padding: 0.7rem 1.5rem;
      text-align: left;
      box-sizing: border-box;
      margin: auto;
      width: calc(100% - 2rem);
      margin-top: 2rem;
      border-radius: 2px;
    }
    .cart-item-inner-cont {
      display: inline-block;
      .cart-item-text {
        padding-top: 1.9rem;
        letter-spacing: 2.9px !important;
      }
      .cart-item-heading {
        letter-spacing: 4px !important;
        font-size: 1.8rem !important;
      }
      .product-info p {
        font-size: 1.2rem;
        margin-top: 0.4rem;
        letter-spacing: 2px;
      }
      .product-image {
        width: 6.8rem;
        height: 10.9rem;
        margin-top: 3rem;
      }
    }
    .cart-item-bottom {
      width: 100%;
    }
  }

  .bag-page-cont{
    .bag-divider {
    border: none;
    border-bottom: solid 1px #d8d8d8;
    width: calc(100% - 4rem);
    margin: auto;
    max-width: 1140px;
  }

  	padding: 7rem 0rem 0rem 0rem;
    overflow: auto;
    margin: auto;
    @include respond-to(sm) {padding: 4rem 0rem 0 0rem; }
    .bag-upper-cont{
    	padding: 6rem 0 6.6rem 0;
    	text-align: center;
    	background-color: #f6f6f6;
      @include respond-to(sm) {padding: 5rem 0;}
    	.heading {
      	@include h1;
      	text-align: center;
      	text-transform: uppercase;
      	@include respond-to(sm) {
          font-size: 1.8rem;
        }
      }
    .items-description{

    	@include intro-text;
    	text-transform: uppercase;
    	font-size: 14px;
    	margin-top: 1rem;

      @include respond-to(sm) {
        margin-left:  auto;
        margin-right: auto;
        font-size: 12px;
       line-height: 1.5;
      letter-spacing: 3px;
        font-size: 1.2rem;
        max-width: 28rem;

      }

    }
     .subtext{
       	@include text-small;
    		text-transform: uppercase;
    		line-height: 2.0;
    		letter-spacing: 2px;
    		color: #717171;
      }

    .checkout-btn {
    background-color: $wh-black;
    padding: 2rem 9.3rem;
    box-shadow: 0 7px 13px 0 rgba(95, 95, 95, 0.5), 0 1px 3px 0 rgba(149, 149, 149, 0.2);
    @include intro-text;
    font-size: 1.4rem;
    color: $wh-white;
    margin: 3rem 0 2rem 0;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0;
    outline: none;

    transition: 0.2s all linear;
    &:hover {
      cursor: pointer;
      background-color: #262626;
    }
    @include respond-to(sm) {
      font-size: 1.4rem;
      width: calc(100% - 2rem);
    }
  }
  .shopping-btn{
  	background-color: $wh-black;
    padding: 2rem 5.9rem;
    @include intro-text;
    font-size: 1.4rem;
    margin: 3rem 0 2rem 0;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0;
    outline: none;
    transition: 0.2s all linear;
    &:hover {
      cursor: pointer;
      background-color: #262626;
      color: $wh-white;
    }
    @include respond-to(sm) {
      font-size: 1.4rem;
      // width: 100%;
    }
  background-color: #ffffff;
	box-shadow: 0 12px 24px 0 rgba(95, 95, 95, 0.3), 0 2px 6px 0 rgba(149, 149, 149, 0.2);
	border: solid 2px #000000;
  }


  }
    }



</style>
