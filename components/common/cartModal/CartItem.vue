<template lang="html">
    <div class="cart-item-cont">
        <div class="cart-item-inner-cont clearfix"  @click="handleImageClick">
            <div class="product-image" :style="{backgroundImage: 'url(' + item.product.images[0] + ')'}"></div>
            <div class="product-info">
                <h4 class="cart-item-text">{{item.product.skus.data[skuIndex].attributes.size}} MM</h4>
                <h4 class="cart-item-heading">{{item.product.name}}</h4>
               <p>Color: {{item.product.metadata.dialColor}}/{{item.product.metadata.caseColor}}</p>
            </div>
        </div>
        <div class="cart-item-bottom">
            <div class="product-line">
              <p class="right-heading">QTY</p>
              <button class="increment-button" @click="decreaseQuantity"><no-ssr><i class="fal fa-minus"></i></no-ssr></button>
              <p class="product-line-text">{{item.quantity}}</p>
              <button class="increment-button" @click="increaseQuantity"><no-ssr></no-ssr><i class="fal fa-plus"></i></no-ssr></button>
           </div>
           <div class="product-line">
              <p class="right-heading">Price</p>
              <p class="product-line-text price">{{item.product.skus.data[skuIndex].price / 100 * item.quantity | currency}}</p>
           </div>
           <div class="product-line-bottom">
             <slot></slot>
             <button class="remove-button" @click="removeItem">Remove</button>
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
      this.$store.commit('SET_CART_ACTIVE', false);
      this.$router.push('/watches/' + this.item.product.id + '/' + this.item.sku);
    },
  },
beforeMount() {
	 // const tmp = JSON.parse(this.product.variant.title);
      // this.productInfo = tmp;
  },

}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
.cart-item-cont{
    button {
      background-color: #fff;
    }
		.product-image {
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 6rem;
      height: 10.3rem;
      margin: 1rem 1rem 0 1rem;
    }
		.cart-item-inner-cont > * {
      float:left;
		}
		.product-info {
			text-transform: uppercase;
			padding: 3rem 2rem 2rem 0rem;
      @include respond-to(sm) {padding: 3rem 0rem 2rem 0rem;}
			text-align: left;
			line-height: 2rem;
      p {
        font-size: 1.2rem;
        letter-spacing: 2px;
      }
	   	.cart-item-heading{
    		@include intro-text;
  			letter-spacing: 3px;
  			font-weight: 500;
  	  }
      .cart-item-text{
        @include text-small;
        text-align: left;
        font-weight: 500;
      }
    }

    .cart-item-bottom {
    .product-line {
      text-align: center;
      display: inline-block;
      margin: 0 2rem;
      .product-line-text {
        display: inline-block;
        padding: 1rem 1rem;
        font-weight: 300;
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 2.2px;
        min-width: 3.5rem;
        box-sizing: border-box;
        &.price {
          min-width: 11rem;
        }
      }
      .right-heading {
        @include text-body;
        font-size: 10px;
        font-weight: 300;
        letter-spacing: 2.9px;
        text-transform: uppercase;
      }

      .increment-button {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #cccccc;
        transition: 0.2s linear;
        &:hover{
          box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
      }
    }
    .remove-button{
      height: 32px;
      border-radius: 4px;
      border: solid 1px #cccccc;
      margin-top: 1rem;
      width: 100%;
      @include text-body;
      transition: 0.2s linear;
      &:hover {
        cursor: pointer;
        box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
}

</style>
