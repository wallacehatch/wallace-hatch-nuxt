<template lang="html">
  <div class="checkout-cont">
    <div class="section-header-cont">
      <div v-for="(section, i) in sections" @click="function() {navigateToSection(i)}" :class="{active: currentSection === i}" class="section-header">{{section}}</div>
    </div>
    <router-view :bag="bag" :form="form" @setSection="setCurrentSection"/>
    <help-footer></help-footer>
  </div>
</template>

<script>
import HelpFooter from '@/components/checkout/CheckoutHelpFooter';
import BagService from '@/BagService';
export default {
  components: {
    HelpFooter,
  },
  methods: {
    navigateToSection(i) {
      return ; // don't wnat this functionality at the moment
      this.setCurrentSection(i);
      switch (i) {
      case 0:
      this.$router.replace('/checkout/info');
      break;
      case 1:
      this.$router.replace('/checkout/review');
      break;
      }
    },
    setCurrentSection(i) {
      this.currentSection = i
    }
  },
  beforeMount() {
    this.bag = BagService.getBag();
  },
  data() {
    return {
      currentSection: 0,
      sections: ['Information', 'Review'],
      bag: null,
      form: {
        addressSelected: false,
        account: {
          name: '',
          email: '',
          password: '',
          phone: '',
          acceptTerms: true,
        },
        shipping: {
          name: '',
          address: '',
          streetNumber: '',
          streetName: '',
          aptSuite: '',
          company: '',
          city: '',
          state: '',
          country: '',
          zip: '',
        },
        googlePlace: null,
        billing: {
          cardNumber: null,
          cardType: null,
          exp: '',
          cvc: '',
        }
      }
    }
  },
  mounted() {
    this.$store.commit('SET_NAV_LAYOUT', 1);
  },
  beforeDestroy() {
    this.$store.commit('SET_NAV_LAYOUT', 0);
  }
}
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';
.checkout-cont {
  margin-top: 7rem;
  .section-header-cont {
    padding: 4rem 0 5.3rem 0;
    text-align: center;
    @include respond-to(sm) {
      padding: 3rem 0;
    }
  }
  .section-header {
    @include intro-text;
    font-size: 1.4rem;
    letter-spacing: 4px;
    display: inline-block;
    padding: 0 2rem 2rem 2rem;
    color: #d3d3d3;
    position: relative;
    border-color: transparent;
    text-transform: uppercase;
    @include respond-to(sm) {
      font-size: 1.2rem;
      letter-spacing: 0.3rem;
    }
    &::before {
      content: "";
      height: 100%;
      position: absolute;
      bottom: 0;
      left: calc(50% - 1.75rem);
      width: 3.5rem;
      border-bottom: 4px solid transparent;
      border-color: inherit;
    }
    &.active {
      color: #000;
      border-color: #000;

    }
  }
}
</style>
