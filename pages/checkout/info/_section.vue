<template lang="html">
  <form @submit.prevent="advanceToReview" class="checkout-info-cont">
    <h2 class="info-section-title">Your Details</h2>
    <checkout-input iPlaceholder="First and Last Name"
      iType="text"
      class="info-field-cont"
      iName="name"
      v-model="form.account.name"
      :iValue="form.account.name"
      :hasValue="!!form.account.name"
      iValidate="required">
    </checkout-input>
    <checkout-input iPlaceholder="Email"
      iType="text"
      class="info-field-cont"
      iName="email"
      v-model="form.account.email"
      :iValue="form.account.email"
      :hasValue="!!form.account.email"
      iValidate="required|email">
    </checkout-input>
    <checkout-input iPlaceholder="Phone"
      iType="tel"
      class="info-field-cont"
      iName="phone"
      v-model="form.account.phone"
      :iValue="form.account.phone"
      :hasValue="!!form.account.phone"
      iMask="(###) ###-####">
    </checkout-input>
    <checkout-checkbox
      class="info-field-cont"
      v-model="form.account.acceptTerms"
      :iValue="form.account.acceptTerms"
      cKey="0" cName="order text">
    </checkout-checkbox>
    <hr class="info-section-divider">

    <h2 class="info-section-title" id="ship_to" >Ship to</h2>
    <checkout-input iPlaceholder="First and Last Name"
      iType="text"
      class="info-field-cont"
      iName="shipping name"
      v-model="form.shipping.name"
      :iValue="form.shipping.name"
      :hasValue="!!form.shipping.name"
      iValidate="required">
    </checkout-input>
    <checkout-input iPlaceholder="Street Address"
      iType="text"
      class="info-field-cont"
      iName="address_ac"
      v-model="form.shipping.address"
      :iValue="form.shipping.address"
      :hasValue="!!form.shipping.address"
      @blur="blurAddressField"
      @focus="focusAddressField"
      iClass="address"
      iId="address_ac"
      iValidate="required">
    </checkout-input>
    <div v-if="form.addressSelected" class="address-details-cont">
      <checkout-input iPlaceholder="Apt/Suite"
        iType="text"
        class="info-field-cont col-2"
        iName="aptSuite"
        v-model="form.shipping.aptSuite"
        :iValue="form.shipping.aptSuite"
        :hasValue="!!form.shipping.aptSuite"
        iValidate="">
      </checkout-input>
      <checkout-input iPlaceholder="Company"
        iType="text"
        class="info-field-cont col-2"
        iClass="nbl"
        iName="company"
        v-model="form.shipping.company"
        :iValue="form.shipping.company"
        :hasValue="!!form.shipping.company"
        iValidate="">
      </checkout-input>
      <checkout-input iPlaceholder="City"
        iType="text"
        class="info-field-cont col-3"
        :iClass="[ {'active': form.shipping.city}]"
        iName="city"
        v-model="form.shipping.city"
        :iValue="form.shipping.city"
        iValidate="required"
        iDisabled="true"
        initValidate="true">
      </checkout-input>
      <checkout-input iPlaceholder="State"
        iType="text"
        class="info-field-cont col-3"
        :iClass="['nbl', {'active': form.shipping.state}]"
        iName="state"
        v-model="form.shipping.state"
        :iValue="form.shipping.state"
        iValidate="required"
        iDisabled="true"
        initValidate="true">
      </checkout-input>
      <checkout-input iPlaceholder="Zip Code"
        iType="text"
        class="info-field-cont col-3"
        :iClass="['nbl', {'active': form.shipping.zip}]"
        iName="zip"
        v-model="form.shipping.zip"
        :iValue="form.shipping.zip"
        iDisabled="true"
        iValidate="required">
      </checkout-input>
    </div>
    <hr class="info-section-divider">

    <h2 class="info-section-title" id="bill_to">Bill to</h2>
    <card-input v-model="form.billing"  :iValue="form.billing" class="info-field-cont"></card-input>
    <checkout-coupon class="info-field-cont"></checkout-coupon>
    <order-summary :loading="loading" :bag="bag" buttonText="Review Your Order"  @buttonClick="advanceToReview"></order-summary>
  </form>
</template>

<script>
import CheckoutInput from '@/components/checkout/CheckoutInput';
import CardInput from '@/components/checkout/CardInput';
import CheckoutCheckbox from '@/components/checkout/CheckoutCheckbox';
import OrderSummary from '@/components/checkout/OrderSummary';
import StripeService from '@/StripeService.js';
import CheckoutCoupon from '@/components/checkout/CheckoutCoupon';
export default {
  props: ['form', 'bag'],
  components: {
    CheckoutInput,
    CheckoutCheckbox,
    CardInput,
    OrderSummary,
    CheckoutCoupon,
  },
  methods: {
    advanceToReview() {
      if (!this.form.addressSelected) {this.scrollToInputError(); return;}
      if (this.form.account.acceptTerms && !this.form.account.phone) {
        this.errors.add({field: 'phone', msg: 'In order to receive text updates, you must enter a phone number.'})
        this.scrollToInputError(); return;
      }
      this.$validator.validateAll().then((result) => {
        console.log(result)
        if (result) {
          this.loading = true;
          StripeService.createCustomer(this.form).then((result) => {
            this.loading = false;
            this.$router.push('/checkout/review');
          }, (err) => {
            var errorObj = JSON.parse(err.response.data.error_message)
            this.loading = false;
            alert(errorObj.message)
          })
        }
        else { this.scrollToInputError() }
      })
    },
    scrollToInputError() {
      const inputs = document.getElementsByTagName('input');
      for (var i=0; i < inputs.length; i++) {
        if ((typeof this.fields[inputs[i].name] !== 'undefined') && (this.errors.has(inputs[i].name))) {
          window.scroll({
            top: inputs[i].getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
          });
          break;
        }
      }
    },
    focusAddressField(e) {
      this.form.addressSelected = false;
    },
    blurAddressField(e) {
      setTimeout(() => {
        !this.form.addressSelected && this.errors.add({field: 'address_ac', msg: 'Must enter a Google Maps verified address'});
      },200)
    },
    assignAddressComponent(c) {
      switch (c.types[0]) {
        case 'street_number':
          this.form.shipping.streetNumber = c.long_name;
          break;
        case 'route':
          this.form.shipping.streetName = c.long_name;
          break;
        case 'locality':
          this.form.shipping.city = c.long_name;
          break;
        case 'administrative_area_level_1':
          this.form.shipping.state = c.long_name;
          break;
        case 'country':
          this.form.shipping.country = c.long_name;
          break;
        case 'postal_code':
          this.form.shipping.zip = c.long_name;
          break;
      }
    }
  },
  mounted() {
    this.$emit('setSection', 0);
    this.$route.params.section && window.scroll({
      top: document.getElementById(this.$route.params.section).getBoundingClientRect().top - 100,
      left: 0,
      behavior: 'smooth'
    });
    var input = document.getElementById('address_ac');
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setOptions({types: ['address']})
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.errors.remove('address_ac');
      this.form.addressSelected = true;
      this.form.googlePlace = place;
      this.form.shipping.address = place.formatted_address;
      place.address_components.map(this.assignAddressComponent);
      setTimeout(() => { document.getElementById('address_ac').value = place.formatted_address; })
    })
  },
  data() {
    return {
      loading: false,
      acService: null,
      placesService: null,
    }
  },
}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .checkout-info-cont {
    .info-field-cont.summary {
      margin-bottom: 0;
    }
    .info-section-divider {
      padding-top: 3rem;
      width: calc(100% - 30rem);
      @include respond-to(md) {
        width: calc(100% - 25rem);
        max-width: 50rem;
      }
      @include respond-to(sm) {width: calc(100% - 4rem);}
      margin: auto;
      margin-bottom: 3rem;
      border: none;
      border-bottom: solid 1px #d8d8d8;
    }
    .info-section-title {
      @include h4;
      letter-spacing: 1rem;
      font-size: 3.2rem;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 3rem;
      @include respond-to(md) {
        font-size: 2rem;
        letter-spacing: 0.6rem;
        margin-bottom: 2rem;
      }
      @include respond-to(sm) {
        font-size: 1.8rem;
        letter-spacing: 0.5rem;
      }
    }
    .info-field-cont {
      max-width: 50rem;
      width: calc(100% - 2rem);
      margin: auto;
      margin-bottom: 2rem;
      &.col-2 {
        max-width: 25rem;
        width: 50%;
        float: left;
      }
      &.col-3 {
        max-width: 16.66rem;
        width: 33.33%;
        float: left;
      }
    }
    .address-details-cont {
      max-width: 50rem;
      width: calc(100% - 2rem);
      margin: auto;
      overflow: auto;
    }
    .address {
      &::placeholder {
        color: transparent;
      }
    }
  }
  .checkout-input.nbr {
    border-right: none !important;
  }
  .checkout-input.nbl {
    border-left: none !important;
  }
</style>
