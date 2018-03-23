<template>
  <div>
    <site-header :active="$store.state.navActive"></site-header>

    <div v-if="error.statusCode === 404" class="site-cont fof-cont clearfix">
      <div class="fof-left-cont">
        <p class="error-text-1">404 Error</p>
        <p class="error-text-2">Yeah... something<br>went wrong</p>
        <p class="error-text-3">Our timing might be off</p>
        <nuxt-link class="home-btn" to="/">Home Page</nuxt-link>
      </div>
      <div class="fof-right-cont"></div>
    </div>
    <div v-else class="site-cont">
      <h1>Error: {{error.statusCode}}</h1>
    </div>

    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from '@/components/common/SiteHeader';
import SiteFooter from '@/components/common/SiteFooter';

export default {
  name: 'app',
  props: ['error'],
  components: {
    SiteHeader,
    SiteFooter,
  },
  fetch({store, params}) {
    store.commit('SET_NAV_LAYOUT', 0);
  }

}
</script>

<style lang='scss'>
  @import '../assets/css/_variables.scss';
  .fof-cont {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 6.7rem 1.5rem 7.1rem 1.5rem;
    text-transform: uppercase;
    flex-wrap: wrap;
    @include respond-to(sm) {
      justify-content: center;
    }
  }
  .fof-left-cont {
    display: inline-block;
    min-width: 32rem;
    margin-bottom: 4rem;
    .error-text-1 {
      @include intro-text;
      font-size: 1.6rem;
      letter-spacing: 4px;
      @include respond-to(sm) {
        font-size: 1.4rem;
      }
    }
    .error-text-2 {
      @include h3;
      font-size: 3.2rem;
      letter-spacing: 8px;
      margin: 1rem 0 2rem 0;
      @include respond-to(sm) {
        font-size: 2.2rem;
      }
    }
    .error-text-3 {
      @include intro-text;
      font-size: 1.2rem;
      letter-spacing: 3px;
    }
  }
  .fof-right-cont {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('https://s3.us-east-2.amazonaws.com/wallace-hatch/404-watch.svg');
    width: 24.2rem;
    height: 42rem;
    margin-left: 2rem;
    @include respond-to(sm) {
      height: 27rem;
      width: 16rem;
    }
  }
  .home-btn {
    @include intro-text;
    font-size: 1.4rem;
    font-weight: bold;
    display: inline-block;
    color: #fff;
    text-decoration: none;
    padding: 1.6rem 5.5rem;
    background-color: #000000;
    box-shadow: 0 17px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
    border: solid 2px transparent;
    margin-top: 2rem;
    transition: 0.2s all linear;
    &:hover {
      box-shadow: 0 17px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.1);
      background-color: #ffffff;
      border-color: #000;
      color: #000;
    }
  }
  // #app {
  //   min-height: 100%;
  //   background-position: center;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   position: relative;
  //   -webkit-font-smoothing: antialiased;
  //   -moz-osx-font-smoothing: grayscale;
  //   box-sizing: border-box;
  // }
  // .site-cont {
  //   margin-top: 7rem;
  //   @include respond-to(sm) {
  //     margin-top: 5.5rem;
  //   }
  // }
  //
  //
  // .lazy {
  //   @include lazy-trans;
  //   opacity: 0;
  //   &[lazy=loading] {
  //     opacity: 0;
  //   }
  //   &[lazy=error] {
  //     opacity: 1;
  //   }
  //   &[lazy=loaded] {
  //     opacity: 1;
  //   }
  //   &.delay-1 {
  //     transition-delay: $lazy-dur-1;
  //   }
  //   &.delay-2 {
  //     transition-delay: $lazy-dur-2;
  //   }
  //   &.delay-3 {
  //     transition-delay: $lazy-dur-3;
  //   }
  // }
  //
  //
  // .clearfix:before,
  // .clearfix:after {
  //     content: ".";
  //     display: block;
  //     height: 0;
  //     overflow: hidden;
  // }
  // .clearfix:after { clear: both; }
  // .load-mask {
  //   opacity: 0 !important;
  //   min-height: 100vh !important;
  // }
  // input {
  //   border-radius: 0px;
  //   -webkit-appearance: none;
  //   -moz-appearance: none;
  //   appearance: none;
  // }
</style>
