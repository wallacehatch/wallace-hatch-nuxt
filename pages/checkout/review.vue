<template lang="html">
  <div class="checkout-review-cont">
    <div class="left-cont">
      <div class="info-cont shipping clearfix">
        <p class="title">Shipping Address</p>
        <div class="edit-btn" @click="$router.push('/checkout/info/ship_to')">Edit</div>
        <p class="name">{{form.shipping.name || 'John Doe'}}</p>
        <p class="address">{{form.shipping.streetNumber || '000'}} {{form.shipping.streetName || 'Some Ave'}}</p>
        <p class="address">{{form.shipping.city || 'Anytown'}} {{form.shipping.state || 'OH'}} {{form.shipping.zip || '11111'}}</p>
      </div>
      <div class="info-cont billing clearfix">
        <p class="title">Payment Method</p>
        <div class="edit-btn" @click="$router.push('/checkout/info/bill_to')">Edit</div>
        <div class="card-icon review" :class="form.billing.cardType"></div>
        <div class="card-details-cont">
          <p class="address">Ending {{ maskedCardNumber() || '9999'}}</p>
          <p class="address">Expires {{form.billing.exp || '00/00'}}</p>
        </div>
      </div>
    </div>
    <div class="right-cont">
      <checkout-product-tile v-for="(item, i) in bag.items" v-if="item.quantity > 0" :key="'cpt' + i" :item="item" ></checkout-product-tile>
      <order-summary :loading="loading" :bag="bag" buttonText="Place Your Order" class="review" @buttonClick="submitOrder"></order-summary>
      <p class="terms-statement">By placing this order, you agree to the <nuxt-link target="_blank" to="/terms">Terms of Use</nuxt-link> and <nuxt-link target="_blank" to="/privacy">Privacy Policy</nuxt-link>.</p>
    </div>
  </div>
</template>

<script>
import OrderSummary from '@/components/checkout/OrderSummary';
import StripeService from '@/StripeService.js';
import CheckoutProductTile from '@/components/checkout/CheckoutProductTile';
import BagService from '@/BagService';
export default {
  props: ['form', 'bag'],
  components: {
    OrderSummary,
    CheckoutProductTile,
  },
  data() {
    return {
      // bag: {items: []},
      loading: false,
      successModalData: null,
    }
  },
  methods: {
    maskedCardNumber() {
      if (!this.form.billing.cardNumber) return '0000';
      const numArr = this.form.billing.cardNumber.split(' ');
      return numArr[numArr.length-1];
    },
    submitOrder() {
      const orderItems = BagService.getBag().items.map((item) => {
        return {sku: item.sku, quantity: item.quantity};
      });

      var couponCode = ""
      if (this.$store.state.coupons.length > 0) {
        couponCode = this.$store.state.coupons[0].id
      }
      this.loading = true;
      StripeService.submitOrder(this.form, orderItems, couponCode).then((result) => {
        this.loading = false;
        this.$store.commit('SET_BADGE_NUMBER', 0);
        BagService.clearBag();
        var name = result.data.shipping.name
        var orderId = result.data.id.substr(3)
        this.successModalData = {
          active: true,
          customerName: name,
          orderId: orderId,
        }
        hj && hj('stateChange', '/ordersuccess');
        window.fbq && window.fbq('track', 'Purchase');
        // TODO Rewrite this using standard ga api
        // this.$ga.event('event', 'conversion', {
        //     'send_to': 'AW-812669170/xHNFCMDg4H4Q8rHBgwM',
        //     'transaction_id': orderId,
        // });
        ga && ga.page('/ordersuccess');
        this.$router.push('/');
        this.$store.commit('SET_ORDER_SUCCESS_MODAL_ACTIVE', this.successModalData)
      }, (err) => {
        this.loading = false;
        alert(err.response.data.error_message);
      })
    }
  },
  mounted() {
    this.$emit('setSection', 1);
  },
  beforeMount() {
    window.scrollTo(0,0);
  },
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.total-summary-cont.review {
  border: none;
  background-color: $wh-white;
  margin-top: 2rem;
  @include respond-to(md) {
    margin-top: 0;
  }
  hr {
    margin: 3rem 0;
    border: none;
    border-bottom: 1px solid #d8d8d8;
  }
}
.checkout-review-cont {
  max-width: 104rem;
  width: calc(100% - 12rem);
  overflow: auto;
  margin: auto;
  @include respond-to(sm) {
    width: calc(100% - 4rem);
  }
  .left-cont {
    width: 50%;
    box-sizing: border-box;
    float: left;
    padding: 0 4rem;
    @include respond-to(md) {
      padding: 0 2rem;
    }
    @include respond-to(sm) {
      padding: 0;
      width: 100%;
    }
  }
  .right-cont {
    float: left;
    width: calc(50% - 1px);
    border-left: solid 1px #d8d8d8;
    box-sizing: border-box;
    padding: 0 4rem;
    @include respond-to(md) {
      padding: 0 2rem;
    }
    @include respond-to(sm) {
      padding: 0;
      width: 100%;
      border: none;
    }
  }
  .terms-statement {
    @include text-body;
    text-align: center;
    padding: 0 1.5rem;
    color: #767676;
    @include respond-to(sm) {
      margin-top: 2rem;
    }
    a {
      color: #000;
      text-decoration: none;
    }
  }
  .info-cont.shipping {
    border-bottom: 1px solid #d8d8d8;
    padding-bottom: 4rem;
    @include respond-to(sm) {
      padding-bottom: 2.95rem;
    }
  }
  .info-cont.billing {
    padding-top: 4rem;
    @include respond-to(sm) {
      border-bottom: 1px solid #d8d8d8;
      padding: 2.95rem 0;
    }
  }
  .info-cont {
    // overflow: auto;
    .title {
      @include h5;
      letter-spacing: 5px;
      font-size: 2.4rem;
      text-transform: uppercase;
      float: left;
      line-height: 3.3rem;
      @include respond-to(md) { font-size: 1.8rem; }
      @include respond-to(sm) { font-size: 1.6rem; }
    }
    .edit-btn {
      float: right;
      @include text-body;
      padding: 0.4rem 1.3rem;
      border: 1px solid #cccccc;
      border-radius: 4px;
      transition: 0.2s all linear;
      &:hover {
        cursor: pointer;
        box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
      }
    }
    .name {
      clear: both;
      @include intro-text;
      font-size: 1.4rem;
      padding-top: 2rem;
      padding-bottom: 0.5rem;
      text-transform: uppercase;
    }
    .address {

      @include text-body;
      font-size: 1.4rem;
      color: #767676;
      line-height: 1.71;
    }
    .card-icon.review {
      background-image: url('https://d3dty8fv62xana.cloudfront.net/unknowncard.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      width: 4.7rem;
      clear: both;
      float: left;
      position: initial;
      margin-top: 1.3rem;
      margin-right: 1.5rem;
      height: 4.6rem;
      &.UNKNOWN {background-image: url('https://d3dty8fv62xana.cloudfront.net/unknowncard.svg');}
      &.AMEX {background-image: url('https://d3dty8fv62xana.cloudfront.net/amex.svg');}
      &.VISA {background-image: url('https://d3dty8fv62xana.cloudfront.net/visa.svg');}
      &.MASTERCARD {background-image: url('https://d3dty8fv62xana.cloudfront.net/mastercard.svg');}
      &.DISCOVER {background-image: url('https://d3dty8fv62xana.cloudfront.net/discover.svg');}
    }
    .card-details-cont {
      float: left;
      padding-top: 1.3rem;

    }
  }
}
</style>
