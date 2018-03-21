<template lang="html">
  <div v-show="lActive" class="mobile-nav-cont">
    <div @click="handleClose" class="mobile-nav-mask" id="mobile_nav_mask"></div>
    <div class="mobile-nav-inner-cont" id="mobile_nav_inner_cont" style="transform: translateX(-101%)">
      <div @click="handleClose" class="close-btn"><no-ssr><i  class="fal fa-times"></i></no-ssr></div>
      <ul class="nav-options-cont">
        <li @click="function() {handleNavItemClick(i)}" v-for="(item, i) in items" :class="{active: activeItem === i}">{{item}}</li>
      </ul>
      <div class="secondary-nav-cont">
        <ul class="aux-options-cont">
          <!-- <li>Sign in</li> -->
          <li @click="faqClick" >FAQ</li>
          <li @click="contactUsClick">contact us</li>
        </ul>
        <ul class="social-items-cont">
          <li><a target="_blank" href="https://www.instagram.com/wallaceHatch/"><no-ssr><i class="fab fa-instagram"></i></no-ssr></a></li>
          <li><a target="_blank" href="https://www.facebook.com/WallaceHatch/"><no-ssr><i class="fab fa-facebook-f"></i></no-ssr></a></li>
          <li><a target="_blank" href="https://twitter.com/WallaceHatch"><no-ssr><i class="fab fa-twitter"></i></no-ssr></a></li>
          <li><a target="_blank" href="mailto:hello@wallacehatch.com?Subject=Checked%20Out%20the%20Site"><no-ssr><i class="fal fa-envelope"></i></no-ssr></a></li>
        </ul>
        <ul class="legal-items-cont top">
          <li @click="termsClick">Terms & Conditions</li>
          <li @click="privacyClick">Privacy Policy</li>
        </ul>
        <ul class="legal-items-cont bottom">
          <li>© 2017 Wallace Hatch</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import StripeService from '@/StripeService.js';
export default {
  props: ['active', 'activeItem'],
  data() {
    return {
      lActive: false,
      dur: 500,
      nav: {
        sohoId: null,
        kallioId: null,
        palermoId: null,
      },
      // items: [this.$store.state.navItems[0], 'Contact Us', 'FAQ', this.$store.state.navItems[this.$store.state.navItems.length-1]],
      items: this.$store.state.navItems,
    }
  },
  mounted() {
    // this.toggleModal(true);
    StripeService.getAllProducts().then((result) => {
      result.data.map((product) => {
        const newItems = product.skus.data.map((sku, ind) => {
          if (sku.attributes.collection === 'frontPage') {
            switch (sku.id.toUpperCase()) {
            case 'BR140P':
            this.nav.sohoId = product.id;
            break;
            case 'WR140S':
            this.nav.kallioId = product.id;
            break;
            case 'BB140S':
            this.nav.palermoId = product.id;
            break;
            }
          }
        })
      })
    }, (err) => {
      debugger;
    })
  },
  methods: {
    termsClick() {
      this.$router.push('/terms');
      this.$emit('close');
    },
    privacyClick() {
      this.$router.push('/privacy');
      this.$emit('close');
    },
    contactUsClick() {
      this.$store.commit('SET_CONTACT_ACTIVE', true);
      this.$emit('close');
    },
    faqClick() {
      this.$router.push('/faq');
      this.$emit('close');
    },
    handleClose() {
      this.$emit('close');
    },
    handleNavItemClick(i) {
      this.$store.commit('SET_NAV_ACTIVE', i);
      this.$emit('close');
      switch (i) {
      case 0:
      this.$router.push('/');
      break;
      case 1:
      this.$router.push('/watches/' + this.nav.kallioId + '-WR140S');
      break;
      case 2:
      this.$router.push('/watches/' + this.nav.sohoId + '-BR140P');
      break;
      case 3:
      this.$router.push('/watches/' + this.nav.palermoId + '-BB140S');
      break;
      case 4:
      this.$router.push('/our-story');
      break;
      }
    },
    toggleModal(active) {
      if (active) {
        this.lActive = true;
        document.body.style.overflow = 'hidden';
        anime({
          targets: '#mobile_nav_mask',
          opacity: 1.0,
          duration: this.dur,
          easing: 'easeInOutCubic'
        })
        anime({
          targets: '#mobile_nav_inner_cont',
          translateX: 0,
          duration: this.dur,
          easing: 'easeInOutCubic'
        })
      }
      else {
        if (!this.$store.state.contactModalActive) {document.body.style.overflow = 'initial';}
        anime({
          targets: '#mobile_nav_mask',
          opacity: 0,
          duration: this.dur,
          easing: 'easeInOutCubic'
        })
        anime({
          targets: '#mobile_nav_inner_cont',
          translateX: '-110%',
          duration: this.dur,
          easing: 'easeInOutCubic',
          complete: () => {
            this.lActive = false;
          }
        })
      }
    },
  },
  watch: {
    'active' (newState) {
      this.toggleModal(newState);
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .secondary-nav-cont {
    position: absolute;
    border-top: 1px solid #252525;
    left: 0; right: 0; bottom: 1.5rem;
  }
  .mobile-nav-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // background-color: rgba(0,0,0,0.8);
    overflow: scroll;

  }
  .mobile-nav-inner-cont {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 2rem);
    max-width: 40rem;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
	  box-shadow: 20px 0 20px 0 rgba(0, 0, 0, 0.2), 10px 0 14px 0 rgba(0, 0, 0, 0.2);
    transform: translateX(-110%);
    padding: 0 2rem;
    box-sizing: border-box;
    .close-btn {
      font-size: 32px;
      width: 2.4rem;
      height: 3.2rem;
      float: left;
      position: relative;
      z-index: 1;
      margin: 1.2rem 0rem 0rem -0.5rem;
      transition: 0.2s all linear;
      color: $wh-white;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .nav-options-cont {
      margin-top: 3rem;
      padding-bottom: 2.5rem;
      li {
        @include intro-text;
        font-weight: 300;
        text-transform: uppercase;
        color: $wh-white;
        text-align: center;
        text-transform: uppercase;
        padding: 1.5rem 0;
        list-style: none;
        &.active {
          // position: relative;
          // font-weight: 500;
          // margin-bottom: 1rem;
          // &:after {
          //   content: "";
          //   position: absolute;
          //   bottom: 0;
          //   left: calc(50% - 2rem);
          //   height: 1px;
          //   width: 4rem;
          //   border-bottom: 4px solid $wh-white;
          // }
        }
      }
    }
    .aux-options-cont {
      @include intro-text;
      font-size: 1.2rem;
      color: $wh-white;
      list-style: none;
      text-align: center;
      text-transform: uppercase;
      margin-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #252525;
      li {
        padding: 1rem 0;
      }
    }
    .social-items-cont {
      list-style: none;
      text-align: center;
      font-size: 2rem;
      padding: 1.8rem 0;
      border-bottom: 1px solid #252525;
      li {
        display: inline-block;
        padding: 0 1.5rem;
      }
      a {
        text-decoration: none;
        color: $wh-white;
      }
    }
    .legal-items-cont {
      @include text-body;
      color: $wh-white;
      list-style: none;
      &.top {padding-top: 1.25rem;}
      li {
        display: inline-block;
        padding: 0.75rem 1rem;
      }
      a {
        text-decoration: none;
        color: $wh-white;
      }
      text-align: center;
    }
  }
</style>
