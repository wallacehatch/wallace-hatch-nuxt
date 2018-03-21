<template lang="html">
  <div v-show="lActive">
    <div id="cart_modal_mask" class="cart-modal-mask"></div>
    <div id="cart_modal_cont" @click="$emit('close')" class="cart-modal-cont">
      <div @click.stop id="cart_modal_inner_cont" class="inner-cont" style="transform: translateY(-101%)">
        <div @click="$emit('close')" class="close-btn"><no-ssr><i class="fal fa-times"></i></no-ssr></div>
        <div class="cart-body">
          <p class="heading">Added to bag!</p>
          <cart-notification v-if="showNoty"></cart-notification>

          <div v-for="(item, i) in bag.items">
            <cart-item v-if="item.quantity > 0" :item="item" :key="i" @qtyChange="refreshCart"></cart-item>
          </div>
          <button  class="cart-btn" @click="handleReviewBagClick">Review Bag<span class="total-price">{{bag.totalPrice | currency}}</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import BagService from '@/BagService';
import CartItem from './CartItem';
import CartNotification from './CartNotification';
export default {
  props: ['active'],
  data() {
    return {
      dur: 500,
      lActive: false,
      showNoty: false,
      bag: {
        items: [],
      },
    }
  },
  components: {
    CartItem,
    CartNotification,
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.innerWidth >= 767) return;
      // this.stickyAddCart = (window.scrollY <= this.addCartOffset);
    },
    refreshCart(){
      this.$store.commit('SET_BADGE_NUMBER', this.bag.totalQuantity);
      const bag = BagService.getBag();
      console.log(bag)
      if (bag === null) return;
      const totals = bag.items.reduce((total, item) => {
        return {
          price: total.price + item.product.skus.data[BagService.indexForSku(item.product, item.sku)].price * item.quantity / 100,
          quantity: total.quantity + item.quantity,
        }
      },{price: 0, quantity: 0});
      if (totals.quantity === 0) {
        this.$store.commit('SET_CART_ACTIVE', false);
        this.$store.commit('SET_BADGE_NUMBER', 0);
      }
      else {
        this.bag = bag;
        console.log(bag);
        this.bag.totalPrice = totals.price;
        this.bag.totalQuantity = totals.quantity;
        this.$store.commit('SET_BADGE_NUMBER', totals.quantity);
      }


    },
    toggleModal(active) {
      if (active) {
        this.lActive = true;
        if (window.innerWidth < 767) { document.body.style.overflow = 'hidden'; }
        setTimeout(() => {
          anime({
            targets: '#cart_modal_mask',
            duration: this.dur,
            easing: 'easeInOutCubic'
          })
          anime({
            targets: '#cart_modal_inner_cont',
            translateY: 0,
            duration: this.dur,
            easing: 'easeInOutCubic'
          })
        })
      }
      else {
        if (window.innerWidth < 767) { document.body.style.overflow = 'initial'; }
        anime({
          targets: '#cart_modal_mask',
          opacity: 0,
          duration: this.dur,
          easing: 'easeInOutCubic'
        })
        anime({
          targets: '#cart_modal_inner_cont',
          translateY: '-101%',
          duration: this.dur,
          easing: 'easeInOutCubic',
          complete: () => {
            this.lActive = false;
          }
        })
      }
    },
    handleReviewBagClick(){
      this.$router.replace('/bag');
      this.$store.commit('SET_CART_ACTIVE', false);
    },
  },
  mounted() {
    this.refreshCart();
    // uncomment this to have form always out
    // this.toggleModal(true);
  },
    watch: {
    'active' (newState) {
      this.refreshCart();
      this.toggleModal(newState);
    },
  },

}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .success-overlay-cont {
    background-color: #000;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding-top: 33%;
    opacity: 0.0;
    i {
      font-size: 42px;
      display: block;
      text-align: center;
      color: $wh-white;
    }
    .title {
      @include h5;
      color: $wh-white;
      font-size: 1.8rem;
    	line-height: 1.78;
    	letter-spacing: 5px;
      text-transform: uppercase;
      text-align: center;
      padding: 0 3.5rem;
      margin-top: 2rem;
      @include respond-to(sm) {
        font-size: 1.6rem;
        letter-spacing: 3px;
      }
    }
    .subtext {
      @include text-body;
      color: $wh-white;
      padding: 0 10rem;
      text-align: center;
      max-width: 40rem;
      margin: auto;
      margin-top: 1rem;
      @include respond-to(sm) {padding: 0 2rem;}
    }
  }
  .cart-modal-mask {
    position: fixed;
    pointer-events: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: scroll;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0.0;
  }
  .cart-modal-cont {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: scroll;
    .inner-cont {
      background-color: $wh-white;
      box-shadow: -20px 0 20px 0 rgba(0, 0, 0, 0.1), -10px 0 14px 0 rgba(0, 0, 0, 0.2);
      min-width: 32rem;
      min-height: 30.8rem;
      position: absolute;
      right: 0;
      top: 0;
      // transform: translateX(101%);
      // -webkit-transform: translateX(101%);
      @include respond-to(sm) {
        // width: 94%;
        // min-width: 28rem;
      }
    }
    .close-btn {
      font-size: 20px;
	    font-weight: 300;
      width: 1.5rem;
      height: 2.1rem;
      float: left;
      position: relative;
      z-index: 1;
      margin: 1.4rem 0rem -0.5rem 1.6rem;
      transition: 0.2s all linear;
      &.white {color: $wh-white;}
      &:hover {
        cursor: pointer;
        color: #262626;
      }
    }
    .cart-body {
      text-align: center;
      clear: both;
      padding: 1rem 1rem;
      padding-top: 0;
      @include respond-to(sm) {

      }
    }
    .heading {
      @include intro-text;
      font-family: Montserrat;
      text-transform: uppercase;
      // padding-bottom: 1rem;
      font-weight: 500;
      @include respond-to(sm) {font-size: 1.6rem;}
    }
    .subtext {
      @include text-body;
      line-height: 1.71;
	    letter-spacing: 0.2px;
      padding-bottom: 5rem;
      @include respond-to(sm) {
        padding-bottom: 2rem;
      }
    }
  }

  .cart-text-area {
    background-color: #ffffff;
  	box-shadow: 0 17px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
  	border: solid 2px #d1d1d1;
    overflow: visible;
    @include text-body;
    padding: 2rem 2rem;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    outline: none;
    transition: 0.15s all ease;
    &::-webkit-input-placeholder {color: #000}
    &:-moz-input-placeholder {color: #000}
    &::-moz-input-placeholder {color: #000}
    &::-ms-input-placeholder {color: #000}
    &:focus, &.active {
      border-color: #000;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    }
    &.is-danger {
      border-color: red !important;
      &::-webkit-input-placeholder {color: red}
      &:-moz-input-placeholder {color: red}
      &::-moz-input-placeholder {color: red}
      &::-ms-input-placeholder {color: red}
    }
    &.disabled {
      color: #d1d1d1;
      background-color: #fafafa;
      border-color: #d1d1d1 !important;
      &::-webkit-input-placeholder {color: #d1d1d1}
      &:-moz-input-placeholder {color: #d1d1d1}
      &::-moz-input-placeholder {color: #d1d1d1}
      &::-ms-input-placeholder {color: #d1d1d1}

    }
  }
  .cart-text-area-cont {
    position: relative;
    overflow: visible;
    .remaining-chars {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      @include text-body;
      font-size: 1rem;
      &.disabled {color: #d1d1d1;}
    }
  }
  .cart-btn {
    background-color: $wh-black;
    padding: 1.6rem 0rem;
    width: 100%;
    box-shadow: 0 7px 13px 0 rgba(95, 95, 95, 0.5), 0 1px 3px 0 rgba(149, 149, 149, 0.2);
    @include intro-text;
    font-size: 1.4rem;
    color: $wh-white;
    margin-top: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0;
    outline: none;
    transition: 0.2s all linear;
    overflow: auto;
    &:hover {
      cursor: pointer;
      background-color: #262626;
    }
    @include respond-to(sm) {
      font-size: 1.4rem;
      width: 100%;
    }

    .total-price{
      // margin-left: 2rem;
      float: right;
      margin-right: 2.5rem;
      color: white;
      font-weight: 300;
    }
  }

</style>
