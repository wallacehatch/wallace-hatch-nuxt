<template lang="html">
  <sliding-modal class="add-review-modal" :active="active" @close="$emit('close')">
    <div class="image-cont" :style="{backgroundImage: 'url(' + product.images[0] + ')'}">
      <p class="review-label">My review for</p>
      <p class="section-heading">{{product.name}}</p>
    </div>
    <p class="section-heading">Overall Rating</p>
    <review-stars class="add-review-stars" @rate="setRating" :rating="review.star_rating" selectMode="true">
      <span slot="after" class="review-label rate-click">Click or Tap to rate!</span>
    </review-stars>
    <p class="section-heading">Write a Reivew</p><br>
    <contact-input
    iName="title"
    v-model="review.review_title"
    :iValue="review.review_title"
    iValidate="required"
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
    iValidate="required|email"
    iPlaceholder="Order Email"
    iClass="max">
    </contact-input>
    <br>
    <p class="review-label">In order to keep our reviews legit and from
      customers who bought the product.<br>We need the email you used to place your order.
    </p>
    <br><br>
    <p class="section-heading">Would you recommend<br>this product to a friend?</p>
    <br><br>
    <div>
      <button @click="review.friend_recommendation = true" :class="{selected: review.friend_recommendation === true}" class="cta-btn-2 review-reco-btn">Yes</button>
      <button @click="review.friend_recommendation = false" :class="{selected: review.friend_recommendation === false}" class="cta-btn-2 review-reco-btn">No</button>
    </div>

    <p class="section-heading">Would you recommend<br>this product to a friend?</p>
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
      v-validate="'required'"
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
    <div class="cta-btn-1 post-review-btn">Post Review</div>
  </sliding-modal>
</template>

<script>
import SlidingModal from '@/components/common/modals/SlidingModal';
import ReviewStars from './ReviewStars';
import ContactInput from '@/components/common/contactModal/ContactInput';
// import CheckoutInput from '@/components/checkout/CheckoutInput';
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
  },
  data() {
    return {
      submitSuccess: false,
      review: {
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
  .add-review-stars {
    justify-content: flex-start;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
  .image-cont {
    margin-top: 1rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 37.5rem;
    box-sizing: border-box;
    padding: 1.5rem 0rem;
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
  .review-reco-btn {
    width: 13rem;
    &:last-of-type {
      margin-left: 1rem;
      margin-bottom: 3rem;
    }
    &.selected {
      background-color: #000000;
      color: #fff;
      box-shadow: 0 27px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
    }
    &.scale {
      width: 5.1rem;
      margin-left: 1rem;
      margin-bottom: 0;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
  .post-review-btn {
    width: 24rem;
  }
}
</style>
