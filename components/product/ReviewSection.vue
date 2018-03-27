<template lang="html">
<section-cont title="Customer Reviews" subtext="Authentic Reviews from our community">
  <div class="product-reviews-cont">
    <div class="reviews-header-cont clearfix">
      <div class="left-cont">
        <review-stars class="review-header-stars" rating="3.4">
          <span class="review-count" slot="before">21 Reviews</span>
          <span class="rating-text" slot="after">/ 4.5 out of 5 Stars</span>
        </review-stars>
        <div class="recommend-cont">
          <no-ssr><i class="fal fa-check icon"></i></no-ssr>
          <span class="text">86% reviewers recommend this product</span>
        </div>
      </div>
      <div class="cta-btn-2 hide-sm">Write a Review</div>
      <div class="cta-btn-2">Read all Reviews</div>
      <div class="cta-btn-2 ml sm-only">Write a Review</div>
    </div>
    <div class="reviews-body-cont">
      <review-tile></review-tile>
      <review-tile></review-tile>
      <review-tile></review-tile>
    </div>
    <div class="reviews-footer-cont">
      <div class="cta-btn-2">Read all Reviews</div>
      <div class="cta-btn-2 ml">Write a Review</div>
    </div>
  </div>
</section-cont>
</template>

<script>
import SectionCont from './SectionCont';
import ReviewStars from './ReviewStars';
import ReviewTile from './ReviewTile';
export default {
  components: {
    SectionCont,
    ReviewStars,
    ReviewTile,
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.product-reviews-cont {
  .reviews-footer-cont {
    display: flex;
    margin: 3rem 0;
    justify-content: center;
    @include respond-to(sm) {margin: 2rem 0}
    .ml {
      margin-left: 2rem;
      @include respond-to(sm) {margin-left: 1rem;}
    }
  }
  .reviews-header-cont {
    border-bottom: 1px solid #d8d8d8;
    padding: 0 3rem 3rem 3rem;
    @include respond-to(md) {padding: 0 0 3rem 0;}
    @include respond-to(sm) {
      padding: 0 1rem;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      border: none;
    }
    .review-header-stars {
      @include respond-to(sm) {display: block;}
    }
    .left-cont {
      float: left;
      @include respond-to(sm) {float: none; width: 100%; padding: 0 1rem; margin-bottom: 1.5rem; text-align: center;}
      .star {font-size: 1.4rem;}
      .review-count {
        @include intro-text;
        font-size: 2rem;
        letter-spacing: 0.4rem;
        font-weight: 300;
        margin-right: 1rem;
      }
      .rating-text {
        @include text-body;
        color: #5d5d5d;
        margin-left: 0.5rem;
        @include respond-to(md) {display: none;}
      }
    }
    .cta-btn-2 {
      width: 24rem;
      float: right;
      margin-left: 2rem;
      margin-bottom: 0.2rem;
      @include respond-to(lg) {width: 22rem;}
      @include respond-to(md) {width: 18rem;}
      @include respond-to(sm) {
        width: 14.5rem;
        margin-left: 0.4rem;
      }
      &.ml {@include respond-to(sm) {margin-left: 1rem;}}
    }
    .recommend-cont {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      @include respond-to(sm) {justify-content: center;}
      .icon {
        width: 2.4rem;
        height: 2.4rem;
        border: 1px solid #ccc;
        border-radius: 10rem;
        font-size: 1.2rem;
        padding: 0.6rem;
        box-sizing: border-box;
      }
      .text {
        @include text-body;
        font-size: 1.2rem;
        margin-left: 1rem;
      }
    }
  }
}
</style>
