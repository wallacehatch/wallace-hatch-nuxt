<template lang="html">
    <div class="product-line-cont">
        <div class="product-line-inner-cont">
          <div class="product-box">
            <div class="product-image" @click="handleImageClick" :style="{backgroundImage: 'url(' + item.product.images[0] + ')'}"></div>
            <div class="product-info-wrapper">
            <div class="product-info">
                <h4 class="product-line-heading">{{item.product.skus.data[skuIndex].attributes.size}} MM</h4>
                <h4 class="product-line-heading name">{{item.product.name}}</h4>
                <p class="product-line-subtext">Color: {{item.product.metadata.dialColor}}/{{item.product.metadata.caseColor}}</p>
            </div>
            <div class="product-line-right">
              <p class="right-heading">QTY</p>
              <button class="increment-button" @click="decreaseQuantity"><no-ssr><i class="fal fa-minus"></i></no-ssr></button>
              <p class="quantity">{{item.quantity}}</p>
              <button class="increment-button" @click="increaseQuantity"><no-ssr><i class="fal fa-plus"></i></no-ssr></button>
           </div>
           <div class="product-line-right price-cont">
              <p class="right-heading">Price</p>
              <p class="price">{{item.product.skus.data[skuIndex].price / 100 * item.quantity | currency}}</p>
           </div>
           <div class="product-line-bottom">
             <button class="remove-button desktop" @click="removeItem">Remove</button>
             <div class="additional-message-cont"><p>Includes {{cleanedBandType}}  band with quick release to use when changing bands.</p></div>
             <button class="remove-button mobile sm-only" @click="removeItem">Remove</button>
           </div>
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
      cleanedBandType: this.getCleanedBandType(),
    }
  },
  methods: {
    increaseQuantity(){
      BagService.addItem(this.item.product, this.item.sku, 1);
      this.$emit('qtyChange');
    },
    decreaseQuantity(){
      BagService.removeItem(this.item.product, this.item.sku, 1);
      this.$emit('qtyChange');
    },
    removeItem(){
      BagService.removeItem(this.item.product, this.item.sku, this.item.quantity);
      this.$emit('qtyChange');
    },
    handleImageClick() {
      this.$router.push('/watches/' + this.item.product.id + '/' + this.item.sku);
    },
    getCleanedBandType() {
      switch(this.item.product.metadata.bandType) {
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
.product-line-cont {
  button {
    background-color: $wh-white;
  }
  .product-line-inner-cont{
    max-width: 114rem;
    width: calc(100% - 4rem);
    margin: auto;
    overflow: auto;
    text-align: center;
  }
 .product-box {
    display: inline-block;
    overflow: auto;
    margin: 5.5rem 0;
    @include respond-to(lg) {margin-right: 2rem;}
    @include respond-to(md) {margin-left: 2rem; margin-right: 0rem;}
  }
  .product-image {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 18.4rem;
    height: 26.3rem;
    margin-right: 6rem;
    @include respond-to(lg) {width: 14.4rem; height: 24.7rem; margin-right: 6rem;}
    @include respond-to(md) {width: 14.4rem; height: 24.7rem; margin-right: 4rem;}
  }
  .product-info-wrapper{
    padding: 5.7rem 0 5.7rem 0rem;
    display: inline-block;
    @include respond-to(lg) {padding: 4rem 0 4rem 0rem;}
    @include respond-to(md) {padding: 4rem 0rem;}
    // @include respond-to(sm) {padding: 0rem 0rem 0rem 0rem;}
  }
  .product-box > * {
      float:left;
  }
  .product-info {
    text-transform: uppercase;
    display: inline-block;
    text-align: left;
    line-height: 2rem;
    padding: 0 7em 0 0;
    @include respond-to(md) {padding: 0rem 0rem 0rem 0rem;}
    @include respond-to(sm) {padding: 0rem 0rem 0rem 0rem !important;}
    .product-line-subtext {
      @include intro-text;
      font-size: 1.2rem;
      letter-spacing: 2px;
    }
    .product-line-heading {
      @include intro-text;
      font-size: 14px;
      letter-spacing: 4px;
      font-weight: normal;
      min-width: 28rem;
      @include respond-to(sm) {
        font-size: 1rem;
        letter-spacing: 2.9px;
      }
    }
    .name {
      margin-top: 1rem;
      margin-bottom: 1.5rem;
      font-size: 2.4rem;
      letter-spacing: 6px;
      @include respond-to(md) {
        font-size: 2rem;
      }
      @include respond-to(sm) {
        font-size: 1.8rem;
      }
    }
  }

  .product-line-bottom {
    text-align: left;
    .additional-message-cont {
      margin-top: 3rem;
      margin-left: 2rem;
      border-radius: 2px;
      background-color: #f6f6f6;
      display: inline-block;
      @include respond-to(sm){
        width: 100%;
        margin-left: 0;
      }
      p {
        padding: .7rem 1.5rem;
        font-size: 12px;
        text-transform: none;
        letter-spacing: 0.2px;
        text-align: left;
        color: #5c5c5c;
      }
    }
  }
  .desktop{
    @include respond-to(sm){
      display: none;
    }
  }
  .mobile{
    @include respond-to(sm){
      display: inline-block;
      width: 100% !important;
      margin-top: 1.7rem;
    }
  }
  .remove-button {
    width: 80px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #cccccc;
    transition: 0.2s linear;
    outline: none !important;
    &:hover{
      box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }

  .product-line-right {
    vertical-align: top;
    text-align: center;
    display: inline-block;
    @include respond-to(md) {margin-left: 5rem !important;}
    .quantity{
      display: inline-block;
      padding: 2.5rem 0rem 1rem 0rem;
      min-width: 3rem;
    }
    .right-heading{
      @include text-body;
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 2.9px;
      text-transform: uppercase;
    }
    .price{
      margin-top: 2rem;
      font-weight: 300;
      font-size: 18px;
      font-weight: 300;
      letter-spacing: 2.2px;
      min-width: 10rem;
    }
    .increment-button {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #cccccc;
      transition: 0.2s linear;
      outline: none !important;
      &:hover{
        cursor: pointer;
        box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
  .price-cont{
    margin-left: 8.4rem;
    @include respond-to(md) {margin-left: 0rem;}
  }
}

</style>
