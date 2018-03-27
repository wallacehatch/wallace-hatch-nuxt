<template lang="html">
  <div class="pdp-section-cont">
    <h1 class="title">{{title}}</h1>
    <p class="subtext">{{subtext}}</p>
    <hr class="line">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtext'],
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .pdp-section-cont{
    padding: 8rem 0 0 0;
    .title {
      @include h3;
      font-size: 3.2rem;
      text-transform: uppercase;
      letter-spacing: 1rem;
      text-align: center;
      @include respond-to(lg) {
        font-size: 2.4rem;
        letter-spacing: 0.75rem;
        line-height: 1.58;
      }
      @include respond-to(md) {
        font-size: 2.0rem;
        letter-spacing: 0.6rem;
        line-height: 1.0;
      }
      @include respond-to(sm) {
        font-size: 1.8rem;
        letter-spacing: 0.4rem;
      }
    }
    .subtext {
      @include intro-text;
      font-size: 1.4rem;
      letter-spacing: 4px;
      text-align: center;
      padding-top: 1rem;
      text-transform: uppercase;
      @include respond-to(lg) {
        font-size: 1.2rem;
        letter-spacing: 0.3rem;
      }
      @include respond-to(sm) {line-height: 2.0;}
    }
    .line {
      margin: 5rem auto 7rem auto;
      border: none;
      border-bottom: 4px solid $wh-black;
      width: 4rem;
      @include respond-to(md) {margin: 3rem auto 5rem auto;}
      @include respond-to(sm) {
        margin-bottom: 2rem;
      }
    }
  }
</style>
