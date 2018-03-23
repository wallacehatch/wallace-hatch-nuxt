<template lang="html">
<div class="insta-product-cont">
  <div class="product-image" v-lazy:background-image="item.images[0]"  @click="handleProductClick"></div>
  <div class="info">
    <p class="size">40 MM</p>
    <p class="name">{{item.name}}</p>
    <p class="color">COLOR: {{item.dialColor}}/{{item.metadata.caseColor}}</p>
    <div class="info-block info-price">
      <p class="value">{{item.skus.data[0].price  / 100 | currency}}</p>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    handleProductClick(){
      this.$store.commit('SET_INSTAGRAM_MODAL_ACTIVE', {
        active: false,
        mediaId: "",
      })
      this.$router.push('/watches/' + this.item.id + '-' + this.item.skus.data[0].id);
    }
  },
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';

.insta-product-cont{
  height: 130px;
  background-color: #ffffff;
  border: solid 1px #dbdbdb;
  margin-bottom: 1rem;

  .product-image{
    display: inline-block;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    float: left;
    transition: 0.35s all cubic-bezier(.69,.16,.32,1);
    width: 99px;
    height: 124px;
    overflow: auto;
    &:hover {
      cursor: pointer;
    }
  }
  .info {
    margin-top: 2.1rem;
    @include respond-to(md) {p{font-size: 11px !important;}}
    .size {
      @include intro-text;
      font-size: 1.2rem;
      letter-spacing: 3px;

    }
    .name {
      @include intro-text;
      font-size: 16px;
      letter-spacing: 4px;
      text-transform: uppercase;
      @include respond-to(md) {font-size: 12px;}

    }
    .color {
      @include intro-text;
      font-size: 1rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      @include respond-to(md) {font-size: 12px;}

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
