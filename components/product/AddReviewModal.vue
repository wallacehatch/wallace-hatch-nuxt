<template lang="html">
  <sliding-modal :mKey="mKey" class="add-review-modal" :active="active" @close="$emit('close')">
    <div class="loader-mask" :class="{loading: loading}">
      <h4 class="title">Posting Review</h4>
      <p class="subtext">making this review legit</p>
      <no-ssr><i class="fal fa-spinner"></i></no-ssr>
    </div>

    <div class="mobile-image-text">
      <p class="review-label">My review for</p>
      <p class="section-heading">{{product.name}}</p>
    </div>
    <div class="image-cont" :style="{backgroundImage: 'url(' + product.images[0] + ')'}">
      <div class="image-text hide-sm">
        <p class="review-label">My review for</p>
        <p class="section-heading">{{product.name}}</p>
      </div>
    </div>

    <form @submit.prevent>
      <p class="section-heading">Overall Rating</p>
      <review-stars id="review_stars" class="add-review-stars" @rate="setRating" :rating="review.star_rating" selectMode="true">
        <span slot="after" class="review-label rate-click hide-sm">Click or Tap to rate!</span>
      </review-stars>
      <span class="review-label sm-only">Tap to rate!</span>
      <p class="error-label stars" v-if="errors.has('star_rating') && (review.star_rating === 0)">{{errors.first('star_rating')}}</p>
      <br class="sm-only">
      <br class="sm-only">
      <br class="sm-only">
      <p class="section-heading">Write a Reivew</p><br>
      <contact-input
      iName="title"
      v-model="review.review_title"
      :iValue="review.review_title"
      :iValidate="'required'"
      iPlaceholder="Title"
      iClass="max">
      </contact-input>
      <br>
      <div class="contact-text-area-cont">
        <span :class="{disabled: submitSuccess}" class="remaining-chars">{{reviewTextarea.chars}}/250</span>
        <textarea
        :disabled="submitSuccess"
        v-validate="'required'"
        maxlength="250"
        v-model="review.review_message"
        @focus="reviewTextarea.active = true"
        @blur="(e) => {shouldBlurField(e, reviewTextarea)}"
        @keyup="(e) => {setCharCount(e, reviewTextarea)}"
        :placeholder="errors.has('reviewBody') ? errors.first('reviewBody') : 'Review'"
        name="reviewBody" id="" cols="30" rows="4"
        class="contact-text-area"
        :class="{disabled: submitSuccess, 'is-danger': errors.has('reviewBody'), active: reviewTextarea.active}">
        </textarea>
      </div>
      <br>
      <contact-input
      iName="email"
      v-model="review.customer_email"
      :iValue="review.customer_email"
      :iValidate="'required|email'"
      iPlaceholder="Order Email"
      iClass="max">
      </contact-input>
      <br>
      <p class="review-label">In order to keep our reviews legit and from
        customers who bought the product.<span class="sm-only"> W</span><span class="hide-sm"><br>W</span>e need the email you used to place your order.
      </p>
      <br><br>
      <p class="section-heading hide-sm">Would you recommend<br>this product to a friend?</p>
      <p class="section-heading sm-only">Would you<br>recommend this<br>product to a friend?</p>
      <br><br>
      <div class="review-reco-btn-cont" id="friend_recommendation">
        <button @click="review.friend_recommendation = true"
          :class="{selected: review.friend_recommendation === true, unselected: review.friend_recommendation === false, error: errors.has('friend_recommendation')}"
          class="cta-btn-2 review-reco-btn">Yes
        </button>
        <button @click="review.friend_recommendation = false"
          :class="{selected: review.friend_recommendation === false, unselected: review.friend_recommendation === true, error: errors.has('friend_recommendation')}"
          class="cta-btn-2 review-reco-btn">No
        </button>
        <p class="error-label" v-if="errors.has('friend_recommendation') && (typeof review.friend_recommendation === 'undefined')">{{errors.first('friend_recommendation')}}</p>
      </div>

      <p class="section-heading hide-sm">Would you recommend<br>Wallace Hatch to a friend?</p>
      <p class="section-heading sm-only">Would you<br>recommend Wallace<br>Hatch to a friend?</p>
      <br><br>
      <div>
        <button @click="review.brand_rating = 1" :class="{selected: review.brand_rating === 1}" class="cta-btn-2 review-reco-btn scale">1</button>
        <button @click="review.brand_rating = 2" :class="{selected: review.brand_rating === 2}" class="cta-btn-2 review-reco-btn scale">2</button>
        <button @click="review.brand_rating = 3" :class="{selected: review.brand_rating === 3}" class="cta-btn-2 review-reco-btn scale">3</button>
        <button @click="review.brand_rating = 4" :class="{selected: review.brand_rating === 4}" class="cta-btn-2 review-reco-btn scale">4</button>
        <button @click="review.brand_rating = 5" :class="{selected: review.brand_rating === 5}" class="cta-btn-2 review-reco-btn scale">5</button>
      </div>
      <br>
      <div class="contact-text-area-cont">
        <span :class="{disabled: submitSuccess}" class="remaining-chars">{{feedbackTextarea.chars}}/250</span>
        <textarea
        :disabled="submitSuccess"
        maxlength="250"
        v-model="review.brand_rating_message"
        @focus="feedbackTextarea.active = true"
        @blur="(e) => {shouldBlurField(e, feedbackTextarea)}"
        @keyup="(e) => {setCharCount(e, feedbackTextarea)}"
        :placeholder="errors.has('feedbackBody') ? errors.first('feedbackBody') : 'Please tell us why'"
        name="feedbackBody" id="" cols="30" rows="4"
        class="contact-text-area"
        :class="{disabled: submitSuccess, 'is-danger': errors.has('feedbackBody'), active: feedbackTextarea.active}">
        </textarea>
      </div>
      <br>
      <p class="review-label">(will not appear on our site)</p>
      <br><br>
      <div @click="postReview" class="cta-btn-1 post-review-btn">Post Review</div>
    </form>
  </sliding-modal>
</template>

<script>
import SlidingModal from '@/components/common/modals/SlidingModal';
import ReviewStars from './ReviewStars';
import ContactInput from '@/components/common/contactModal/ContactInput';
import ReviewService from '@/ReviewService';
export default {
  props: ['active', 'product'],
  components: {
    SlidingModal,
    ReviewStars,
    ContactInput,
  },
  methods: {
    setRating(rating) {
      this.review.star_rating = rating;
    },
    shouldBlurField(e, textarea) {
      if (!e.target.value) {textarea.active = false;}
    },
    setCharCount(e, textarea) {
      textarea.chars = e.target.value.length
    },
    postReview() {
      this.$validator.validateAll().then((result) => {
        if (result && (typeof this.review.friend_recommendation !== 'undefined') && (this.review.star_rating !== 0)) {
          this.loading = true;
          document.getElementById('sliding_modal_cont' + this.mKey).scrollTop = 0;
          ReviewService.createReview(this.review).then((result) => {
            this.loading = false;
            this.$emit('success')
          }, (err) => {
            this.errors.add({field: 'email', msg: err.response.data.error_message});
            this.scrollToInputError();
            this.loading = false;
          })
        } else if (typeof this.review.friend_recommendation === 'undefined') {
          this.errors.add({field: 'friend_recommendation', msg: 'Please select one of the above options.'});
          const pos = document.getElementById('friend_recommendation').getBoundingClientRect().top + 200
          document.getElementById('sliding_modal_cont' + this.mKey).scrollTop = pos
        } else if (this.review.star_rating === 0) {
          this.errors.add({field: 'star_rating', msg: 'Please select a rating for this product.'});
          const pos = document.getElementById('review_stars').getBoundingClientRect().top + 200
          document.getElementById('sliding_modal_cont' + this.mKey).scrollTop = pos
        } else { this.scrollToInputError() }
      })
    },
    scrollToInputError() {
      console.log('scrolling to input error');
      const inputs = document.getElementsByTagName('input');
      for (var i=0; i < inputs.length; i++) {
        if ((typeof this.fields[inputs[i].name] !== 'undefined') && (this.errors.has(inputs[i].name))) {
          document.getElementById('sliding_modal_cont' + this.mKey).scrollTop = inputs[i].getBoundingClientRect().top + 200;
          break;
        }
      }
    },
  },
  data() {
    return {
      mKey: 'arev',
      loading: false,
      submitSuccess: false,
      review: {
        product_id: this.product.id,
        star_rating: 0,
        review_title: null,
        review_message: null,
				customer_email: null,
				friend_recommendation: undefined,
				brand_rating: 0,
				brand_rating_message: null,
      },
      selectedProdReco: null,
      reviewTextarea: {
        chars: 0,
        active: false,
      },
      feedbackTextarea: {
        chars: 0,
        active: false,
      },
    }
  },

}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.add-review-modal .inner-cont {
  padding: 0 2.5rem 2rem 2.5rem;
  .close-btn {margin: 1.4rem -0.9rem 0 0;}
  @include respond-to(sm) {
    padding: 0 1.5rem 1.5rem 1.5rem;
    .close-btn {margin: 1.2rem 0 0 0;}
  }
  .error-label {
    @include text-body;
    font-size: 1.2rem;
    color: $wh-red;
    margin-top: 1rem;
    &.stars {margin-top: -2rem; margin-bottom: 2rem;}
  }
  .loader-mask {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(255, 255, 255, 0.95);
    text-align: center;
    z-index: 10;
    padding-top: 6rem;
    display: none;
    &.loading {display: block;}
    .title {
      font-size: 2.4rem;
      letter-spacing: 7px;
      text-transform: uppercase;
      margin-bottom: 1rem;
      font-weight: 300;
    }
    .subtext {
      @include intro-text;
      font-size: 1.2rem;
      letter-spacing: 3.4px;
      text-transform: uppercase;
    }
    svg {
      position: absolute;
      top: calc(50vh - 5rem);
      left: calc(50%- 5rem);
      font-size: 10rem;
      -webkit-animation: spin 2s linear infinite;
      -moz-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }
  }
  .add-review-stars {
    justify-content: flex-start;
    margin-top: 1rem;
    margin-bottom: 3rem;
    .star-cont:first-of-type {margin-left: 0;}
    @include respond-to(sm) {margin-bottom: 1rem;}
  }
  .mobile-image-text {
    padding-top: 1.5rem;
    display: none;
    @include respond-to(sm) {display: block;}
  }
  .image-cont {
    margin-top: 1rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 37.5rem;
    box-sizing: border-box;
    padding: 1.5rem 0rem;
    @include respond-to(sm) {
      margin-top: -2rem;
    }
  }
  .review-label {
    @include text-body;
    font-size: 1.2rem;
    &.rate-click {margin-left: 2rem;}
  }
  .section-heading {
    @include intro-text;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
  .review-reco-btn-cont {
    margin-bottom: 3rem;
  }
  .review-reco-btn {
    width: 13rem;
    &:last-of-type {
      margin-left: 1rem;
    }
    &.error {
      border-color: $wh-red;
      color: $wh-red;
    }
    &.selected {
      background-color: #000000;
      color: #fff;
      border-color: #000;
      box-shadow: 0 27px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
    }
    &.unselected {
      border-color: #000;
      color: #000;
    }
    &.scale {
      width: 5.1rem;
      margin-left: 1rem;
      margin-bottom: 0;
      @include respond-to(sm) {width: 4.4rem;}
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
  .post-review-btn {
    width: 24rem;
    @include respond-to(sm) {width: 100%;}
  }
}
</style>
