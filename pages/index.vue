<template lang="html">
  <div class="site-cont">
    <!-- SITE HERO -->
    <hero-carousel :loaded="heroLoaded"></hero-carousel>

    <!-- PRODUCT SHOWCASE -->
    <div class="section-heading-cont" id="product-showcase">
      <div class="lazy delay-1" id="home_lazy_2">
        <p class="header">Our Flagship Collection</p>
        <p class="subtext">Elegant, unisex timepieces</p>
        <hr class="line">
      </div>
    </div>
    <div class="product-showcase-cont clearfix">
      <!-- <product-tile v-for="(item, i) in items" :key="'pTile' + i" :item="item"></product-tile> -->
      <product-tile key="pTile0" v-if="kallio" :item="kallio"></product-tile>
      <product-tile key="pTile1" v-if="soho" :item="soho"></product-tile>
      <product-tile key="pTile2" v-if="palermo" :item="palermo"></product-tile>
    </div>
    <experience-section></experience-section>
  </div>
</template>

<script>
import ProductTile from '@/components/home/ProductTile';
import ExperienceSection from '@/components/home/ExperienceSection';
import StripeService from '@/StripeService.js';
import HeroCarousel from '@/components/home/HeroCarousel';
export default {
  components: {
    ExperienceSection,
    ProductTile,
    HeroCarousel,
  },
  data() {
    return {
      items: null,
      kallio: null,
      palermo: null,
      soho: null,
      heroLoaded: false,
    }
  },
  mounted() {
    this.$Lazyload.$once('loaded', (e) => {
      document.getElementById('home_lazy_1').setAttribute('lazy', 'loaded');
      document.getElementById('home_lazy_2').setAttribute('lazy', 'loaded');
      document.getElementById('home_lazy_3').setAttribute('lazy', 'loaded');
      this.heroLoaded = true;
    })
  },
  methods: {
  },
  beforeMount() {
    this.$store.commit('SET_NAV_ACTIVE', 0);
    this.$store.commit('SET_NAV_LAYOUT', 0);
    StripeService.getAllProducts().then((result) => {
      this.items = result.data.reduce((total, product) => {
        const newItems = product.skus.data.map((sku, ind) => {
          if (sku.attributes.collection === 'frontPage') {
            switch (sku.id.toUpperCase()) {
            case 'BR140P':
            this.soho = {
              product,
              sku: sku.id,
              skuInd: ind,
            }
            break;
            case 'WR140S':
            this.kallio = {
              product,
              sku: sku.id,
              skuInd: ind,
            }
            break;
            case 'BB140S':
            this.palermo = {
              product,
              sku: sku.id,
              skuInd: ind,
            }
            break;
            }
            return {
              product,
              sku: sku.id,
              skuInd: ind,
            }
          }
        })
        return total.concat(newItems)
      }, [])
    }, (err) => {
      debugger;
    })
  }
}
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';
.experience-section-cont {
  clear: both;
  padding-top: 6rem;
  @include respond-to(lg) {padding-top: 5rem}
  @include respond-to(md) {padding-top: 4rem}
  @include respond-to(sm) {padding-top: 3rem}
}

// PRODUCT SHOWCASE
.product-showcase-cont {
  padding: 0 2rem;
  margin: auto;
  overflow: visible;
  @include respond-to(lg) {padding: 0 0.75rem}
  max-width: 144rem;
}

.section-heading-cont {
  padding: 5rem 0 0rem 0;
  text-align: center;
  @include respond-to(lg) { padding: 5rem 0 0rem 0;}
  @include respond-to(md) { padding: 3rem 0 0rem 0;}
  @include respond-to(sm) { padding: 3rem 0 0rem 0;}
  .header {
    @include h4;
    line-height: 1.58;
    text-transform: uppercase;
    letter-spacing: 7.5px;
    text-align: center;
    @include respond-to(md) {font-size: 2rem;}
  }
  .subtext {
    @include intro-text;
    font-size: 1.2rem;
    letter-spacing: 3px;
    margin-top: 1rem;
    text-transform: uppercase;
    @include respond-to(sm) { line-height: 2.0 }
  }
  .line {
    border: none;
    border-bottom: 4px solid $wh-black;
    width: 4rem;
    margin: 3rem auto;
    @include respond-to(lg) {
      margin: 5rem auto;
    }
    @include respond-to(md) {
      margin: 3rem auto;
    }
    @include respond-to(sm) {
      margin: 1rem auto;
      margin-top: 3rem;
    }
  }
}
</style>
