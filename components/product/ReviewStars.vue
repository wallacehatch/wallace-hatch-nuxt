<template lang="html">
<no-ssr>
  <div class="review-stars-cont">
    <slot name="before"></slot>
    <div class="star-cont" @click="$emit('rate', 1)" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{visible: (rating > 0.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (rating > 0.0) && (rating <= 0.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @click="$emit('rate', 2)" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{visible: (rating > 1.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (rating > 1.0) && (rating <= 1.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @click="$emit('rate', 3)" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{visible: (rating > 2.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (rating > 2.0) && (rating <= 2.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @click="$emit('rate', 4)" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{visible: (rating > 3.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (rating > 3.0) && (rating <= 3.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @click="$emit('rate', 5)" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{visible: (rating > 4.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (rating > 4.0) && (rating <= 4.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <slot name="after"></slot>
  </div>
</no-ssr>
</template>

<script>
export default {
  props: ['rating', 'selectMode'],
  inject: ['$validator'],
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.review-stars-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  .star-cont {
    display: inline-block;
    position: relative;
    margin: 0 0.3rem;
    @include respond-to(sm) {margin: 0 0.5rem}
    .star-mask {
      opacity: 0;
      &.visible {opacity: 1.0 !important;}
    }
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
  .star-cont.select {
    .star {
      font-size: 3.2rem;
    }
    .star-fg {
      text-shadow: 0 7px 10px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
      color: #0c0c0c;
    }
    .star-bg {
      text-shadow: 0 7px 10px rgba(0, 0, 0, 0.05), 0 4px 4px rgba(0, 0, 0, 0.1);
      color: #fff;
      font-stretch: normal;
      path {
        stroke: #d1d1d1;
        stroke-width: 15px;
      }
    }
  }
}
</style>
