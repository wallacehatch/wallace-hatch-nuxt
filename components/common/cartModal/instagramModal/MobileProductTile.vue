<template lang="html">
<div class="insta-product-cont-mobile">
  <div class="product-image" :style="{backgroundImage: 'url(' + item.images[0] + ')'}" @click="handleProductClick"></div>
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

      this.$router.push('/watches/' + this.item.id + '/' + this.item.skus.data[0].id);

    }

  },
}
</script>

<style lang="scss">
@import '../../../styles/_variables.scss';

.insta-product-cont-mobile{
   margin: 0 1rem;
  .product-image{
    display: inline-block;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    float: left;
    transition: 0.35s all cubic-bezier(.69,.16,.32,1);
    width: 43px;
    height: 54px;
    overflow: auto;
  }
  .info {
    margin-left: 0.6rem;
    text-align: left;
    float: right;
    margin-top: 0.5rem;

    .size {
      @include intro-text;
      font-size: 0.55rem;
      letter-spacing: 1.4px;;

    }
    .name {
      @include intro-text;
      font-size: 7.3px;
      letter-spacing: 1.8px;
      text-transform: uppercase;


    }
    .color {
      @include intro-text;
      font-size: 4.6px;
        letter-spacing: 0.5px;
      text-transform: uppercase;


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
        margin-top: 5.5px;
        font-size: 7.3px;
        margin-bottom: 1rem;

      }
    }
  }
}




</style>
