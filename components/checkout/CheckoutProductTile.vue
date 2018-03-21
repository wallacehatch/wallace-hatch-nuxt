<template lang="html">
<div class="cpt-wrapper">
  <hr class="checkout-product-divider">
  <div class="checkout-product-tile-cont">
    <div class="image" :style="{backgroundImage: 'url(' + item.product.images[0] + ')'}"></div>
    <div class="info">
      <p class="size">{{item.product.skus.data[skuIndex].attributes.size}}MM</p>
      <p class="name">{{item.product.name}}</p>
      <p class="color">COLOR: {{item.product.metadata.dialColor}}/{{item.product.metadata.caseColor}}</p>
      <div class="info-block info-quantity">
        <p class="label">QTY</p>
        <p class="value">{{item.quantity}}</p>
      </div>
      <div class="info-block info-price">
        <p class="label">PRICE</p>
        <p class="value">{{item.product.skus.data[skuIndex].price / 100 | currency}}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BagService from '@/BagService';
export default {
  props: ['item'],
  data() {
    return {
      skuIndex: BagService.indexForSku(this.item.product, this.item.sku),
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.cpt-wrapper:first-of-type .checkout-product-divider {
  display: none;
}
.checkout-product-divider {
  margin-top: 3rem;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  @include respond-to(sm) {margin-top: 2rem;}
}
.checkout-product-tile-cont {
  display: flex;
  align-items: center;
  margin-bottom: 2.9rem;
  clear: both;
  @include respond-to(sm) {justify-content: space-around;}
  .image {
    float: left;
    width: 18.4rem;
    height: 26.3rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-top: 3rem;
    @include respond-to(md) {
      width: 10.3rem;
      height: 14.7rem;
    }
    @include respond-to(sm) {margin-top: 2rem;}
  }
  .info {
    @include respond-to(md) { margin-left: 2.5rem; }
    @include respond-to(sm) { margin-left: 1.5rem; }
    .size {
      @include intro-text;
      font-size: 1.4rem;
      letter-spacing: 4px;
      @include respond-to(sm) {
        font-size: 1rem;
        letter-spacing: 3px;
      }
    }
    .name {
      @include intro-text;
      font-size: 2rem;
      letter-spacing: 5px;
      text-transform: uppercase;
      @include respond-to(sm) {
        font-size: 1.4rem;
        letter-spacing: 3px;
      }
    }
    .color {
      @include intro-text;
      font-size: 1.2rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 2.5rem;
      @include respond-to(md) {margin-bottom: 1.5rem;}
      @include respond-to(sm) {
        margin-bottom: 1rem;
        font-size: 1rem;
      }
    }
    .info-block {
      display: inline-block;
      text-align: center;
      .label {
        @include text-small;
        letter-spacing: 2.9px;
      }
      .value {
        @include intro-text;
        font-weight: 300;
        @include respond-to(sm) {
          font-size: 1.4rem;
          letter-spacing: 2px;
          line-height: initial !important;
        }
      }
    }
    .info-quantity .value {
      font-size: 1.4rem;
      line-height: 3rem;
    }
    .info-quantity {
      margin-right: 5rem;
    }
  }
}

</style>
