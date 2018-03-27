<template lang="html">
  <div class="review-tile-cont clearfix">
    <div class="left-cont">
      <div class="image">G</div>
      <p class="name hide-sm">By Greg M.</p>
      <p class="prev-reviews hide-sm">1 Reviews</p>
    </div>
    <div class="right-cont">
      <review-stars :rating="review.star_rating">
        <div class="recommend-cont" slot="after">
          <span class="rating-text">/ {{review.star_rating}} out of 5 Stars</span>
          <no-ssr><i class="fal fa-check icon hide-sm"></i></no-ssr>
          <span class="recommend-text hide-sm">Yes I recommend<br class="md-only hide-sm"><span class="hide-md"> </span>this product.</span>
        </div>
      </review-stars>
      <div class="mobile-recommend-cont">
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
  data() {
    return {
      // review: {
      //   prodct_id: "prod_CCDBCRzlKEEp7V",
      //   star_rating: 3.5,
      //   review_title: "This is the greates watch I have ever seen in my entire life",
      //   review_message: "pibus ac facilisis in, egestas eget quam. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
      //   customer_id: "cus_CLeyoSgOmQdiDf",
      // }
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
