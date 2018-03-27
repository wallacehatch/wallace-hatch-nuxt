<template lang="html">
<no-ssr>
  <div class="review-stars-cont">
    <slot name="before"></slot>
    <div class="star-cont">
      <i class="fas fa-star star star-bg"></i>
      <i v-if="rating > 0.5" class="fas fa-star star star-fg"></i>
      <i v-else-if="rating > 0.0" class="fas fa-star-half star star-fg"></i>
    </div>
    <div class="star-cont">
      <i class="fas fa-star star star-bg"></i>
      <i v-if="rating > 1.5" class="fas fa-star star star-fg"></i>
      <i v-else-if="rating > 1.0" class="fas fa-star-half star star-fg"></i>
    </div>
    <div class="star-cont">
      <i class="fas fa-star star star-bg"></i>
      <i v-if="rating > 2.5" class="fas fa-star star star-fg"></i>
      <i v-else-if="rating > 2.0" class="fas fa-star-half star star-fg"></i>
    </div>
    <div class="star-cont">
      <i class="fas fa-star star star-bg"></i>
      <i v-if="rating > 3.5" class="fas fa-star star star-fg"></i>
      <i v-else-if="rating > 3.0" class="fas fa-star-half star star-fg"></i>
    </div>
    <div class="star-cont">
      <i class="fas fa-star star star-bg"></i>
      <i v-if="rating > 4.5" class="fas fa-star star star-fg"></i>
      <i v-else-if="rating > 4.0" class="fas fa-star-half star star-fg"></i>
    </div>
    <slot name="after"></slot>
  </div>
</no-ssr>
</template>

<script>
export default {
  props: ['rating'],
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.review-stars-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  .star-cont {
    // width: 1.24rem;
    // height: 0.9rem;
    display: inline-block;
    position: relative;
    margin: 0 0.3rem;
    @include respond-to(sm) {margin: 0 0.5rem}
  }
  .star {
    font-size: 1rem;
    color: #d8d8d8;
    @include respond-to(sm) {font-size: 1.2rem}
  }
  .star-fg {
    color: #000;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
