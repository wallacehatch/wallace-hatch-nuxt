<template lang="html">
  <div class="review-tile-cont clearfix">
    <div class="left-cont">
      <div class="image">{{review.customer_name ? review.customer_name.split('')[0] : '?'}}</div>
      <p class="name hide-sm">By {{review.customer_name | firstLastInitial}}</p>
      <p class="prev-reviews hide-sm">{{review.customer_reviews}} Review<span v-if="review.customer_reviews > 1">s</span></p>
    </div>
    <div class="right-cont">
      <review-stars :rating="review.star_rating">
        <div class="recommend-cont" slot="after" v-if="review.friend_recommendation">
          <span class="rating-text">/ {{new Date(review.created_at).timePassed()}}</span>
          <no-ssr><i class="fal fa-check icon hide-sm"></i></no-ssr>
          <span class="recommend-text hide-sm">Yes I recommend <span class="md-only hide-sm"><br>t</span><span class="hide-md"> t</span>his product.</span>
        </div>
      </review-stars>
      <div class="mobile-recommend-cont" v-if="review.friend_recommendation">
        <no-ssr><i class="fal fa-check icon"></i></no-ssr>
        <span class="recommend-text">Yes I recommend this product.</span>
      </div>
      <p class="review-text mobile">By Grem M. 1 Review</p>
      <p class="review-text review-title">{{review.review_title}}</p>
      <p class="review-text">{{review.review_message}}</p>
    </div>
  </div>
</template>

<script>
import ReviewStars from './ReviewStars';
export default {
  props: ['review'],
  components: {
    ReviewStars,
  },
  filters: {
    firstLastInitial(value) {
      if (value.split(' ').length === 1) return value;
      const first = value.split(' ')[0]
      const last = value.split(' ')[value.split(' ').length-1].split('')[0]
      return first + ' ' + last + '.'
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.review-tile-cont {
  padding: 5rem 3rem;
  @include respond-to(sm) {padding: 3rem 0rem; margin: 0 1.5rem;}
  border-bottom: 1px solid #d8d8d8;
  .left-cont {
    margin-right: 4.7rem;
    width: 9.4rem;
    float: left;
    @include respond-to(md) {width: 7.5rem}
    @include respond-to(sm) {width: 5rem; margin-right: 1.3rem;}
  }
  .right-cont {
    float: left;
    width: calc(100% - 15.1rem);
    @include respond-to(md) {width: calc(100% - 12.2rem);}
    @include respond-to(sm) {width: calc(100% - 6.3rem);}
    .review-stars-cont {
      justify-content: left;
      flex-wrap: wrap;
      @include respond-to(md) {align-items: flex-start;}
      @include respond-to(sm) {align-items: center;}
    }
  }
  .image {
    background-position: center;
    background-color: $wh-black;
    color: $wh-white;
    width: 100%;
    border-radius: 10rem;
    margin-bottom: 2.1rem;
    @include text-body;
    font-size: 4.2rem;
    font-weight: bold;
    text-align: center;
    height: 9.4rem;
    line-height: 9.4rem;
    @include respond-to(md) {
      height: 7.5rem;
      line-height: 7.5rem;
      font-size: 3.4rem;
    }
    @include respond-to(sm) {
      height: 5rem;
      line-height: 5rem;
      font-size: 2.4rem;
    }
  }
  .name, .prev-reviews {
    @include text-body;
    font-size: 1.2rem;
  }
  .star {
    font-size: 1.4rem;
  }
  .mobile-recommend-cont {
    display: none !important;
    @include respond-to(sm) {
      display: flex !important;
      align-items: center !important;
      margin-top: 0.5rem;
    }
  }
  .recommend-cont, .mobile-recommend-cont {
    display: flex;
    align-items: center;
    @include respond-to(md) {align-items: flex-start;}
    .icon {
      width: 2.4rem;
      height: 2.4rem;
      border: 1px solid #ccc;
      border-radius: 10rem;
      font-size: 1.2rem;
      padding: 0.6rem;
      box-sizing: border-box;
      margin-left: 1rem;
      @include respond-to(sm) {margin: 0;}
    }
    .rating-text {
      @include text-body;
      font-size: 1.2rem;
      color: #5d5d5d;
      margin-left: 1rem;
    }
    .recommend-text {
      @include text-body;
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }
  .review-text {
    @include text-body;
    margin-top: 1rem;
    @include respond-to(md) {font-size: 1.2rem; line-height: 1.5;}
    &.mobile {
      display: none;
      @include respond-to(sm) {display: block;}
    }
  }
}
</style>
