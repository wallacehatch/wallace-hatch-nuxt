<template lang="html">
<no-ssr>
  <div class="review-stars-cont" @mouseleave="(e) => {setHoveroutRating(rating)}">
    <slot name="before"></slot>
    <div class="star-cont" @mouseenter="(e) => {setHoverRating(1, true)}" @click="() => {setRealRating(1)}" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{hovering: isHovering && wasRated < 1, visible: (lRating > 0.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (lRating > 0.0) && (lRating <= 0.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @mouseover="(e) => {setHoverRating(2, true)}" @click="() => {setRealRating(2)}" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{hovering: isHovering && wasRated < 2, visible: (lRating > 1.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (lRating > 1.0) && (lRating <= 1.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @mouseover="(e) => {setHoverRating(3, true)}" @click="() => {setRealRating(3)}" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{hovering: isHovering && wasRated < 3, visible: (lRating > 2.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (lRating > 2.0) && (lRating <= 2.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @mouseover="(e) => {setHoverRating(4, true)}" @click="() => {setRealRating(4)}" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{hovering: isHovering && wasRated < 4, visible: (lRating > 3.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (lRating > 3.0) && (lRating <= 3.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <div class="star-cont" @mouseover="(e) => {setHoverRating(5, true)}" @click="() => {setRealRating(5)}" :class="{select: selectMode}">
      <i class="fas fa-star star star-bg"></i>
      <span class="star-mask" :class="{hovering: isHovering && wasRated < 5, visible: (lRating > 4.5)}"><i class="fas fa-star star star-fg"></i></span>
      <span class="star-mask" :class="{visible: (lRating > 4.0) && (lRating <= 4.5)}"><i class="fas fa-star-half star star-fg"></i></span>
    </div>
    <slot name="after"></slot>
  </div>
</no-ssr>
</template>

<script>
export default {
  props: ['rating', 'selectMode'],
  inject: ['$validator'],
  data() {
    return {
      lRating: 0,
      isHovering: false,
      wasRated: 0,
    }
  },
  mounted() {
    this.lRating = this.rating;
  },
  watch: {
    'rating' (newRating) {
      this.lRating = newRating;
    }
  },
  methods: {
    setHoveroutRating(rating) {
      this.wasRated = 0;
      this.setHoverRating(rating, false);
    },
    setRealRating(rating) {
      this.wasRated = rating
      this.isHovering = false;
      this.$emit('rate', rating)
    },
    setHoverRating(rating, hovering) {
      if (!this.selectMode) return;
      this.lRating = rating;
      this.isHovering = hovering;
    }
  }
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
      &.hovering .star-fg {color: #d8d8d8 !important;}
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
