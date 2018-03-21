<template lang="html">
  <div class="product-info-table">
    <div class="product-info-line">
      <span class="item-key">SKU</span>
      <span class="item-value">{{sku.id}}</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Case thickness</span>
      <span class="item-value">{{productInfo.caseThickness}}mm</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Dial color</span>
      <span class="item-value">{{productInfo.dialColor}}</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Movement</span>
      <span class="item-value">{{productInfo.movement}}</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Band width</span>
      <span class="item-value">{{sku.attributes.bandWidth}}mm</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Band</span>
      <span class="item-value">{{productInfo.bandType}}</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Strap color</span>
      <span class="item-value">{{productInfo.bandColor}}</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Interchangable bands</span>
      <span class="item-value">{{productInfo.interchangableBands}}</span>
    </div>
    <div class="product-info-line">
      <span class="item-key">Water resistant</span>
      <span class="item-value">{{productInfo.waterResistant}}</span>
    </div>
  </div>

</template>

<script>
export default {
  props: ['productInfo', 'sku'],

}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.product-info-line {
  border-top: 1px solid #d8d8d8;
  @include text-body;
  padding: 1.5rem 0;
  @include respond-to(sm) {font-size: 1.2rem;}
  &:first-of-type {
    border: none;
  }
  .item-key {
    font-weight: bold;
    display: inline-block;
    width: 16rem;
    margin-left: 1.6rem;
    margin-right: 6.4rem;
    @include respond-to(lg) {
      margin-right: 2.2rem
    }
    @include respond-to(md) {
      margin-right: 1.1rem;
      width: 13.3rem;
    }
    @include respond-to(sm) {
      margin-right: 1rem;
      width: auto;
    }
  }
  .item-value {

  }
}
</style>
