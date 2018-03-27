<template>
  <div>
    <no-ssr>
      <order-success-modal @close="$store.commit('SET_ORDER_SUCCESS_MODAL_ACTIVE',{})"></order-success-modal>
    </no-ssr>
    <no-ssr>
      <coupon-modal @close="$store.commit('SET_COUPON_MODAL_ACTIVE',false)"></coupon-modal>
    </no-ssr>
    <no-ssr>
    <instagram-modal @close="$store.commit('SET_INSTAGRAM_MODAL_ACTIVE',{})"></instagram-modal>
  </no-ssr>
    <site-header :active="$store.state.navActive"></site-header>
    <nuxt/>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';
import OrderSuccessModal from '@/components/common/orderSuccessModal/Modal';
import InstagramModal from '@/components/common/instagramModal/Modal';
import CouponModal from '@/components/common/couponModal/Modal';
import BagService from '@/BagService';
import StripeService from '@/StripeService';
import CouponService from '@/CouponService';
import ReviewService from '@/ReviewService';


export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter,
    OrderSuccessModal,
    CouponModal,
    InstagramModal,
  },
  data() {
    return {
      navActive: 0,
    }
  },
  beforeMount() {
    Number.prototype.precisionRound = function(precision) {
      var factor = Math.pow(10, precision);
      return Math.round(this * factor) / factor;
    }

    const bag = BagService.getBag();
    if (bag === null) return;
    const bn = bag.items.reduce((total, item) => {return total + item.quantity},0);
    this.$store.commit('SET_BADGE_NUMBER', bn);
    // for some reason this is not loading correctly....
    this.$validator.extend('validExp', {
      getMessage: field => 'The Expiration Date you entered is before the current date',
      validate: (value) => {
        if (value.length == 5) {
          let splits  = value.split("/");
          let formattedDate = "20" + splits[1] + "-" + splits[0]
          let now = new Date()
          let enteredDate  = Date.parse(formattedDate)
          if (enteredDate < now) {
            return false
          }
        }
        return true;
      }
    })
  },
  mounted() {
    this.$store.commit('SET_MOBILE', window.innerWidth < 768);
    // CouponService.handleCouponActivation();  // Uncomment to trigger coupon service. Coupon will open in 60 seconds if user has not seen coupon before
  }
}
</script>

<style lang='scss'>
  @import '../assets/css/_variables.scss';
  #app {
    min-height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  .site-cont {
    margin-top: 7rem;
    @include respond-to(sm) {
      margin-top: 5.5rem;
    }
  }


  .lazy {
    @include lazy-trans;
    opacity: 0;
    &[lazy=loading] {
      opacity: 0;
    }
    &[lazy=error] {
      opacity: 1;
    }
    &[lazy=loaded] {
      opacity: 1;
    }
    &.delay-1 {
      transition-delay: $lazy-dur-1;
    }
    &.delay-2 {
      transition-delay: $lazy-dur-2;
    }
    &.delay-3 {
      transition-delay: $lazy-dur-3;
    }
  }


  .clearfix:before,
  .clearfix:after {
      content: ".";
      display: block;
      height: 0;
      overflow: hidden;
  }
  .clearfix:after { clear: both; }
  .load-mask {
    opacity: 0 !important;
    min-height: 100vh !important;
  }
  input {
    border-radius: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
</style>
