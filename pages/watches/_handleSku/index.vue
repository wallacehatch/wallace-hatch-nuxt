<template>
  <div :class="{'load-mask': !product}">
    <div class="pdp-cont" v-if="product">
      <div class="pdp-upper-cont">
        <div class="pdp-ul">
          <product-image :product="product" :activeImageIndex="activeImageIndex"></product-image>
          <div class="additional-images-cont">
            <div v-for="(image, i) in product.images" class="additional-image lazy"
              :class="{active: activeImageIndex === i}"
              @click="activeImageIndex = i"
              v-lazy:background-image="product.images[i]">
            </div>
          </div>
        </div>
        <div class="pdp-ur lazy" id="pdp_lazy_1" :class="{'sticky-space': stickyAddCart}">
          <p class="size">{{product.skus.data[currentSkuIndex].attributes.size}}MM</p>
          <hr class="line">
          <p class="title">{{product.name}}</p>

          <div class="product-rating-cont" @click="scrollToReviews">
            <no-ssr>
              <review-stars :rating="averageRating">
                <span slot="after" class="ratings-count">({{productReviews.length}})</span>
              </review-stars>
            </no-ssr>
          </div>

          <p class="price hide-sm">{{product.skus.data[currentSkuIndex].price / 100 | currency }}</p>
          <div class="color-bubble" :style="{backgroundImage: 'url(https://d3dty8fv62xana.cloudfront.net/skucrop-' + product.skus.data[currentSkuIndex].id + '.jpg)'}" ></div>
          <p class="color-text">Color: {{product.metadata.dialColor}} / {{product.metadata.caseColor}}</p>
          <div class="add-cart-btn pdp" id="add_cart_btn_pdp" :class="{'stuck': stickyAddCart}" @click="handleAddCartClick">
            <span class="mobile-add">Add to bag</span>
            <span class="mobile-price">{{product.skus.data[currentSkuIndex].price / 100 | currency}}</span>
          </div>
        </div>
        <hr class="pdp-divider">
      </div>
      <div class="pdp-lower-cont clearfix">
        <div class="pdp-ll">
          <hr class="line">
          <p class="pdp-info-title">About The Watch</p>
          <p class="description">{{product.description}}</p>
          <hr class="line">
          <div class="how-to-wear-header">
            <p class="pdp-info-title">How to wear</p>
            <no-ssr><p class="hashtag"><i class="fab fa-instagram"></i> #{{product.metadata.hashtag}}</p></no-ssr>
          </div>
          <div class="how-to-wear-images-cont" v-if="product">
            <a target="_blank"
              @click="clickInstagramMedia(product.metadata.howToWear.split(',')[0])"
              :style="{backgroundImage: 'url(https://instagram.com/p/' + product.metadata.howToWear.split(',')[0] + '/media)'}"
              class="how-to-wear-image">
            </a>
            <a target="_blank"
              @click="clickInstagramMedia(product.metadata.howToWear.split(',')[1])"
              :style="{backgroundImage: 'url(https://instagram.com/p/' + product.metadata.howToWear.split(',')[1] + '/media)'}"
              class="how-to-wear-image">
            </a>
            <a target="_blank"
              @click="clickInstagramMedia(product.metadata.howToWear.split(',')[2])"
              :style="{backgroundImage: 'url(https://instagram.com/p/' + product.metadata.howToWear.split(',')[2] + '/media)'}"
              class="how-to-wear-image">
            </a>
            <a target="_blank"
              @click="clickInstagramMedia(product.metadata.howToWear.split(',')[3])"
              :style="{backgroundImage: 'url(https://instagram.com/p/' + product.metadata.howToWear.split(',')[3] + '/media)'}"
              class="how-to-wear-image">
            </a>
            <a target="_blank"
              @click="clickInstagramMedia(product.metadata.howToWear.split(',')[4])"
              :style="{backgroundImage: 'url(https://instagram.com/p/' + product.metadata.howToWear.split(',')[4] + '/media)'}"
              class="how-to-wear-image">
            </a>
            <a target="_blank"
              @click="clickInstagramMedia(product.metadata.howToWear.split(',')[5])"
              :style="{backgroundImage: 'url(https://instagram.com/p/' + product.metadata.howToWear.split(',')[5] + '/media)'}"
              class="how-to-wear-image">
            </a>
          </div>
        </div>
        <div class="pdp-lr">
          <hr class="line">
          <p class="pdp-info-title">Watch Details</p>
          <product-info-table :sku="product.skus.data[currentSkuIndex]" :productInfo="product.metadata"></product-info-table>
        </div>
        <hr class="pdp-divider aux">
        <review-section @refresh="getProductReviews" :product="product" id="review-section" :reviews="productReviews"></review-section>
      <!-- <band-section></band-section> -->
      </div>
    </div>
  </div>
</template>

<script>
import BagService from '@/BagService';
import ReviewService from '@/ReviewService';
import StripeService from '@/StripeService';
import ProductInfoTable from '@/components/product/ProductInfoTable';
import BandSection from '@/components/bands/BandSection';
import ProductImage from '@/components/product/ProductImage';
import ReviewStars from '@/components/product/ReviewStars';
import ReviewSection from '@/components/product/ReviewSection';
export default {
    head() {
      return {
        title: this.product.name + ' - Wallace Hatch',
        meta: [
          { hid: 'og-title', property: 'og:title', content: this.product.name + ' - Wallace Hatch'},
          { hid: 'og-description', property: 'og:description', content: this.product.description },
          {hid: 'description', name: 'description', content: this.product.description}
        ]
      }
    },
    name: 'ProductPage',
    components: {
      ProductInfoTable,
      BandSection,
      ProductImage,
      ReviewStars,
      ReviewSection,
    },
    asyncData({params, error}) {
      const [handle, sku] = params.handleSku.split('-');
      return StripeService.getProduct(handle).then((result) => {
        const product = result.data;
        const currentSkuIndex = BagService.indexForSku(product, sku);
        const stickyAddCart = false;
        return { handle,sku,product,currentSkuIndex,stickyAddCart }
      }, (err) => { debugger; })
    },
    data () {
      return {
        currentSkuIndex: null,
        productReviews: [],
        averageRating: 0.0,
        stickyAddCart: false,
        product: null,
        handle: null,
        sku: null,

        addCartOffset: null,
        activeImageIndex: 0,
        lastMobileImageHeight: 0,
      }
  },
  mounted() {
    this.setSkuNav(this.sku)
    this.setLazyLoad();
    window.fbq && window.fbq('track', 'ViewContent');
    this.getProductReviews();
  },
  beforeMount() {
    this.setButtonOffset();
    this.$store.commit('SET_NAV_LAYOUT', 0);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    scrollToReviews() {
      console.log('should be scrolling');
      window.scrollTo({
        top: document.getElementById('review-section').getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth',
      })
    },
    getProductReviews() {
      ReviewService.getProductReviews(this.product.id).then((result) => {
        this.productReviews = result.data.reverse();
        this.averageRating = result.data.reduce((total, review) => {
          return total + review.star_rating / result.data.length
        },0)
      }, (err) => { debugger; })
    },
    setLazyLoad() {
      this.$Lazyload.$once('loaded', (e) => {
        document.getElementById('pdp_lazy_1').setAttribute('lazy', 'loaded')
      })
    },
    setSkuNav(sku) {
      switch (sku.toUpperCase()) {
        case 'WR140S':
        this.$store.commit('SET_NAV_ACTIVE', 1);
        break;
        case 'BR140P':
        this.$store.commit('SET_NAV_ACTIVE', 2);
        break;
        case 'BB140S':
        this.$store.commit('SET_NAV_ACTIVE', 3);
        break;
      }
    },
    clickInstagramMedia(mediaId) {
      this.$store.commit('SET_INSTAGRAM_MODAL_ACTIVE', {
        active: true,
        mediaId: mediaId,
      })
    },
    setButtonOffset() {
      setTimeout(() => {
        this.addCartOffset = window.scrollY + document.getElementById('add_cart_btn_pdp').getBoundingClientRect().top - window.innerHeight + 62;
        this.handleScroll();
      })

    },
    handleScroll() {
      if (window.innerWidth >= 767) return;
      this.stickyAddCart = (window.scrollY <= this.addCartOffset);
    },
    handleAddCartClick() {
      BagService.addItem(this.product, this.sku, 1);
      window.fbq && window.fbq('track', 'AddToCart');
      this.$store.commit('INC_BADGE_NUMBER');
      this.$store.commit('SET_CART_ACTIVE', true);
    }
  },
}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .product-rating-cont {
    margin-bottom: 2rem;
    &:hover {cursor: pointer;}
    @include respond-to(sm) {
      margin-bottom: 3rem;
    }
    .ratings-count {
      display: inline;
      @include intro-text;
      font-size: 1.2rem;
      letter-spacing: 1.5px;
      margin-left: 0.3rem;
      @include respond-to(sm) {margin-left: 0.6rem;}
    }
  }
  .how-to-wear-images-cont {
    margin: -0.3rem;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
      @include respond-to(sm) {padding-bottom: 66.66%;}
    }
  }
  .how-to-wear-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('https://instagram.com/p/Bbdd0u3FdB6/media/');
    margin: 0.3rem;
    width: calc(33.33% - 6px);
    transition: .2s all cubic-bezier(.55,.15,.41,.84);
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    float: left;
    box-sizing: border-box;
    &:hover {
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 0 12px 24px 0 rgba(95,95,95,0.70);
      transform: translateY(-8px);
      z-index: 0;
      cursor: pointer;
    }
    &:nth-of-type(n + 4):hover {
      transform: translateY(8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 0 -12px 24px 0 rgba(95,95,95,0.70);
    }
    &:first-of-type:hover {
      transform: translate(-8px, -8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 12px 12px 24px 0 rgba(95,95,95,0.70);
    }
    &:last-of-type:hover {
      transform: translate(8px, 8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), -12px -12px 24px 0 rgba(95,95,95,0.70);
    }
    &:nth-of-type(3):hover {
      transform: translate(8px, -8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), -12px 12px 24px 0 rgba(95,95,95,0.70);
    }
    &:nth-of-type(4):hover {
      transform: translate(-8px, 8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 12px -12px 24px 0 rgba(95,95,95,0.70);
    }
  }
  .pdp-lower-cont {
    overflow: hidden;
    padding: 11rem 1.3rem;
    @include respond-to(lg) {padding: 8rem 0 0 0;}
    @include respond-to(md) {padding: 6.2rem 3rem 0 3rem;}
    @include respond-to(sm) {padding: 4rem 0 0 0;}
    .pdp-info-title {
      @include intro-text;
      font-size: 1.4rem;
      text-transform: uppercase;
      margin-bottom: 1.7rem;
    }
    .how-to-wear-header {
      overflow: auto;
      .pdp-info-title {float: left;}
      .hashtag {
        @include text-small;
        float: right;
        text-transform: uppercase;
      }
    }
    .line {
      border: none;
      border-bottom: 4px solid $wh-black;
      width: 4rem;
      margin-bottom: 3rem;
      @include respond-to(sm) {
        margin-bottom: 2rem;
      }
    }
    .pdp-ll {
      float: left;
      width: 50%;
      box-sizing: border-box;
      padding: 0 5.75rem 0 1.3rem;
      @include respond-to(sm) {
        width: 100%;
        padding: 0 1rem;
        margin-bottom: 4rem;
      }
      .description {
        @include text-body;
        margin-bottom: 4rem;
      }
    }
    .pdp-lr {
      float: left;
      width: 50%;
      box-sizing: border-box;
      padding: 0 1.3rem 0 5.75rem;
      .line, .pdp-info-title { margin-left: 1.6rem;}
      @include respond-to(sm) {
        width: 100%;
        padding: 0 1rem;
      }
    }
  }
  .pdp-divider {
    clear: both;
    border: none;
    margin: auto;
    border-bottom: 1px solid #d8d8d8;
    @include respond-to(lg) {margin: 0 -2rem;}
    @include respond-to(md) {margin: 0 1.5rem;}
    &.aux {@include respond-to(md) {border: none;}}
  }
  .add-cart-btn.pdp {
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
    padding: 2.2rem 0;
    margin-top: 3rem;
    transition: 0.2s background-color linear;
    transition-property: background-color, box-shadow;
    @include respond-to(md) {width: 18rem;}
    @include respond-to(sm) {
      margin: 2rem 1rem 4rem 1rem;
      padding: 2.2rem;
      display: block;
      width: initial;
      overflow: auto;
    }
    &:hover {
      cursor: pointer;
      background-color: #262626;
    }
    .mobile-add {
      @include respond-to(sm) {float: left;}
    }
    .mobile-price {
      display: none;
      float: right;
      font-weight: 300;
      @include respond-to(sm) {display: initial;}
    }
    &.stuck {
      margin: 0;
      position: fixed;
      bottom: 0rem;
      left: 0;
      right: 0;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 -9px 24px 0 rgba(95, 95, 95, 0.5), 0 -4px 6px 0 rgba(149, 149, 149, 0.2);
    }
  }
  .pdp-cont {
    padding: 7.5rem 10.2rem 0 10.2rem;
    max-width: 114rem;
    margin: auto;
    @include respond-to(lg) {padding: 7.5rem 4rem 0 4rem; }
    @include respond-to(md) {padding: 7.5rem 0rem 0 0rem; }
    @include respond-to(sm) {padding: 5.4rem 0rem 0 0rem; }
  }
  .pdp-upper-cont {
    .pdp-ul {
      float: left;
      max-width: 50rem;
      width: 52.5%;
      padding-top: 2rem;
      @include respond-to(md) {padding-top: 1rem}
      @include respond-to(sm) {
        padding-top: 0rem;
        width: 100%;
        max-width: 100%;
      }

      .additional-images-cont {
        padding: 1rem 0 8rem 0;
        overflow: auto;
        text-align: center;
        @include respond-to(lg) { padding: 1rem 0 6rem 0; }
        @include respond-to(md) { padding: 0rem 0 4rem 0; }
        @include respond-to(sm) {
          padding: 0rem 0 2rem 0;
        }
      }
      .additional-image {
        box-sizing: border-box;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: $wh-white;
        width: 4rem;
        height: 4rem;
        margin-left: 1.3rem;
        display: inline-block;
        box-shadow: 0 2px 6px 0 rgba(149, 149, 149, 0.2);
        border: solid 2px #d8d8d8;
        transition: 0.2s all linear;
        &:first-of-type { margin-left: 0;}
        &:hover {
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
        }
        &.active {
          box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
          border: solid 2px #000000;
        }
        @include respond-to(md) {
          width: 4rem;
          height: 4rem;
          margin-left: 1.34rem;
        }
        @include respond-to(sm) {
          margin-left: 1rem;
        }
      }
    }
    .pdp-ur {
      float: left;
      text-align: center;
      width: 47.5%;
      min-width: calc(100% - 50rem);
      padding-top: 11rem;
      @include respond-to(md) {
        padding-top: 8.1rem;
      }
      @include respond-to(sm) {
        width: 100%;
        padding-top: 0;
      }
      &.sticky-space {
        padding-bottom: 10.2rem;
      }
      .size {
        @include intro-text;
        font-size: 1.4rem;
        @include respond-to(sm) {font-size: 1.2rem;}
      }
      .line {
        border: none;
        border-bottom: 4px solid $wh-black;
        width: 4rem;
        margin: 2rem auto;
        @include respond-to(sm) {
          margin: 1rem auto 1.6rem auto;
        }
      }
      .title {
        @include intro-text;
        font-size: 3.2rem;
        letter-spacing: 8px;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        @include respond-to(sm) {
          font-size: 2.4rem;
          letter-spacing: 6px;
          margin-bottom: 1.6rem;
        }
      }
      .price {
        @include intro-text;
        font-size: 2.4rem;
        font-weight: 300;
        margin-bottom: 1.7rem;
      }
      .color-bubble {
        height: 3.4rem;
        width: 3.4rem;
        margin: auto;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
        border: solid 3px #ffffff;
        border-radius: 10rem;
        transition: 0.2s all linear;
        position: relative;
        overflow: visible;
        &::before {
          content: "";
          width: 4.6rem;
          height: 4.6rem;
          background-color: #000;
          position: absolute;
          left: -0.6rem;
          top: -0.6rem;
          border-radius: 10rem;
          z-index: -1;
        }
        &:hover {cursor: pointer;}
        @include respond-to(sm) {margin: 1rem auto 4rem auto;}
      }
      .color-text {
        @include intro-text;
        font-size: 1.4rem;
        text-transform: uppercase;
        margin-top: 4.5rem;
        @include respond-to(sm) {
          margin-top: 0;
        }
      }
    }
  }
</style>
