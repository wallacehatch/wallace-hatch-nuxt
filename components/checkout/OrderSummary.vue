<template lang="html">
  <div class="total-summary-cont">
    <div class="info-field-cont summary">
      <div class="summary-line">
        <p class="label">Subtotal ({{quantity}} items)</p>
        <p class="amount">{{subtotal | currency}}</p>
      </div>
      <div v-if="$store.state.coupons.length > 0" class="summary-line">
        <p class="label">PROMO: {{$store.state.coupons[0].id}}</p>
        <p class="amount"> - {{discount | currency}}</p>
      </div>
      <div class="summary-line">
        <p class="label">Tax</p>
        <p class="amount">{{tax | currency}}</p>
      </div>
      <div class="summary-line">
        <p class="label">Shipping</p>
        <p class="amount">Free</p>
      </div>
    </div>
    <hr class="info-section-divider">
    <div class="info-field-cont">
      <div class="summary-line">
        <p class="label total">Total</p>
        <p class="amount total">{{total | currency}}</p>
      </div>
      <div @click="$emit('buttonClick')" :class="{loading: loading}" class="review-btn">
        {{buttonText}} <no-ssr><i class="fal fa-spinner"></i></no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import BagService from '@/BagService';
export default {
  props: ['buttonText', 'bag', 'loading'],
  mounted() {
    if (this.$store.state.coupons.length > 0) { this.updateOrderSummary(this.bag, this.$store.state.coupons[0]) }
    else {this.updateOrderSummary(this.bag)}
  },
  data() {
    return {
      subtotal: 0,
      quantity: 0,
      discount: 0,
      tax: 0,
      total: 0,
    }
  },
  methods: {
    updateOrderSummary(bag, coupon) {
      const totals = bag.items.reduce((total, item) => {
        return {
          subtotal: total.subtotal + item.product.skus.data[0].price * item.quantity / 100,
          quantity: total.quantity + item.quantity,
        }
      },{subtotal: 0, quantity: 0})
      this.subtotal = totals.subtotal;
      this.quantity = totals.quantity;
      const percOff = coupon ? coupon.percent_off / 100 : 0;
      this.discount = coupon ? totals.subtotal * percOff : 0;
      this.total = coupon ? totals.subtotal - this.discount : this.subtotal;
    },
  },
  watch: {
    '$store.state.coupons' (newCoup) {
      console.log('COUPONS CHANGED')
      if (newCoup.length > 0) { this.updateOrderSummary(this.bag, newCoup[0]) }
      else {this.updateOrderSummary(this.bag)}

    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.total-summary-cont {
  margin-top: 4rem;
  padding-top: 3.4rem;
  padding-bottom: 3rem;
  @include respond-to(md) {
    padding-top: 1.4rem;
    padding-bottom: 2rem;
  }
  @include respond-to(sm) {
    padding: 0.4rem 0.5rem 0 0.5rem;
  }
  background-color: #f6f6f6;
  border: 1px solid $wh-grey-1;
  border-left: none;
  border-right: none;
}
.summary-line {
  overflow: auto;
  margin-top: 1.8rem;
  .label {
    @include intro-text;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 2px;
    float: left;
    color: #717171;
    &.total {
      font-size: 1.4rem;
      letter-spacing: 4px;
      font-weight: initial;
      color: #000;
    }
  }
  .amount {
    @include intro-text;
    font-size: 1.4rem;
    letter-spacing: 1.5px;
    font-weight: 300;
    float: right;
    &.total {
      font-size: 1.8rem;
      letter-spacing: 2.2px;
    }
  }
}
.review-btn {
  display: block;
  background-color: #000;
  box-shadow: 0 17px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
  padding: 2.1rem 0;
  text-transform: uppercase;
  @include intro-text;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  letter-spacing: 4px;
  text-align: center;
  margin-top: 3rem;
  transition: 0.2s all linear;
  position: relative;
  svg {
    position: absolute;
    top: calc(50% - 0.7rem); left: calc(50% + 12rem);
    -webkit-animation: spin 2s linear infinite;
    -moz-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    animation-play-state: paused;
    opacity: 0;
  }
  &.loading svg {opacity: 1; animation-play-state: running;}
  &:hover {
    cursor: pointer;
    background-color: #262626;
  }
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
