<template lang="html">
  <div @click="handleTileClick" class="product-tile-cont">
    <div class="product-image" :style="{backgroundImage: 'url(' + item.product.images[0] + ')'}"></div>
    <p class="product-title">{{item.product.name}}</p>
    <p class="product-price">{{item.product.skus.data[item.skuInd].price / 100 | currency }}</p>
    <div class="hover-tile-cont">
      <div class="inner-tile">
        <p class="product-info">
          <span class="title">{{item.product.name}}</span> <span class="price">{{item.product.skus.data[item.skuInd].price / 100 | currency }}</span>
        </p>
        <div class="add-cart-btn hide-sm" @click.stop="handleAddCartClick">Add to bag</div>
        <div class="add-cart-btn mobile" @click.stop="handleTileClick">Shop now</div>
      </div>
    </div>
  </div>
</template>

<script>
import BagService from '@/BagService';
export default {
  asyncData({params}) {
    const [handle, sku] = params.handleSku.split('-')
    return {
      handle,sku,
    }
  },
  data () {
    return {
      nav: {
        items: this.$store.state.navItems,
        active: 0,
      },
    }
  },
  props: ['item'],
  methods: {
    handleTileClick() {
      this.$router.push('/watches/' + this.item.product.id + '-' + this.item.sku);
    },
    handleAddCartClick() {
      BagService.addItem(this.item.product, this.item.sku,  1);
      this.$store.commit('INC_BADGE_NUMBER');
      this.$store.commit('SET_CART_ACTIVE', true);
    }
  },
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .product-tile-cont {
    float: left;
    position: relative;
    box-sizing: border-box;
    padding: 4rem 0.25rem 5.5rem 0.25rem;
    width: 33.33%;
    transition: 0.3s all linear;
    &:hover {
      cursor: pointer;
      .product-image {
        z-index: 4;
        transform: translateY(-2.4rem);
        @include respond-to(sm) {transform: none; z-index: 0;}
      }
      .inner-tile {
        background-color: $wh-white;
        @include respond-to(sm) {background-color: rgba(0,0,0,0)}
      }
    }
    @include respond-to(lg) { padding: 1.5rem 0.35rem 4rem 0.35rem;}
    @include respond-to(md) { padding: 1.4rem 0.3rem 4rem 0.3rem;}
    @include respond-to(sm) {
      padding: 1rem 0.25rem 3rem 0.25rem;
      width: 100%;
      margin-top: 1.5rem;
    }

    .product-image {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      transition: 0.35s all cubic-bezier(.69,.16,.32,1);
      width: 100%;
      height: 46.3rem;
      @include respond-to(sm) {height: 32rem;}
    }
    .product-title {
      @include intro-text;
      font-size: 1.4rem;
      text-transform: uppercase;
      text-align: center;
      padding-top: 3.8rem;
      @include respond-to(lg) {
        font-size: 1.2rem;
        letter-spacing: 3px;
        padding-top: 2.5rem;
      }
    }
    .product-price {
      @include intro-text;
      font-size: 1.4rem;
      letter-spacing: 2px;
      font-weight: 300;
      text-align: center;
      padding-top: 0.7rem;
      @include respond-to(lg) {
        font-size: 1.2rem;
        letter-spacing: 3px;
      }
    }
    .add-cart-btn {
      background-color: $wh-black;
      box-shadow: 0 12px 24px 0 rgba(95, 95, 95, 0.5), 0 2px 6px 0 rgba(149, 149, 149, 0.2);
      @include intro-text;
      font-size: 1.4rem;
      text-transform: uppercase;
      text-align: center;
      width: 28.2rem;
      margin: auto;
      margin-top: 3rem;
      color: $wh-white;
      font-weight: bold;
      white-space: nowrap;
      padding: 2.2rem 0;
      transition: 0.3s all cubic-bezier(.28,.56,.32,1);
      &.mobile {display: none;}
      @include respond-to(lg) {
        margin-top: 2rem;
        padding: 1.5rem 0;
        width: 22rem;
      }
      @include respond-to(sm) {
        padding: 1.5rem 5.3rem;
        &.mobile {display: block;}
      }
      @include respond-to(md) {width: 18rem;}
      &:hover {
        cursor: pointer;
        background-color: #262626;
      }
    }
    .hover-tile-cont {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: 0.35s all cubic-bezier(.69,.16,.32,1);
      @include respond-to(sm) {
        opacity: 1.0;
      }
      .product-info {
        @include intro-text;
        font-size: 1.4rem;
        text-transform: uppercase;
        text-align: center;
        padding-top: 2rem;
        @include respond-to(lg) {
          font-size: 1.2rem;
          letter-spacing: 3px;
          padding-top: 1rem;
        }
        .price {
          letter-spacing: 2px;
          font-weight: 300;
          @include respond-to(lg) { letter-spacing: 3px; }
        }
      }
    }

    &:hover {
      box-shadow: 0 12px 24px 0 rgba(95, 95, 95, 0.3), 0 2px 6px 0 rgba(149, 149, 149, 0.2);
      .hover-tile-cont {
        opacity: 1;
      }
    }
    .inner-tile {
      padding: 5rem 0;
      position: absolute;
      background-color: rgba(0,0,0,0);
      bottom: 0;
      left: 0;
      right: 0;
      @include respond-to(lg) {
        padding: 3rem 0;
      }
      @include respond-to(md) {
        padding: 2.5rem 0;
      }
      @include respond-to(sm) {
        padding-bottom: 3rem;
      }
      &:hover {
        opacity: 1;
        .add-cart-btn {
          opacity: 1.0;
        }
      }
    }
  }

</style>
