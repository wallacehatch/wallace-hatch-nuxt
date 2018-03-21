<template lang="html">
  <div class="checkout-field-wrapper" :class="{active: fieldState.active || hasValue}">

    <div class="checkout-field-cont">
      <input v-if="!iMask"
      @blur="shouldBlurField"
      class="checkout-input"
      :class="[iClass, {active: fieldState.active || hasValue, valid: fieldState.classes.valid, error: errors.has(iName) || forceError}]"
      :id="iId"
      :type="iType || 'text'"
      :name="iName"
      :value="iValue"
      @input="updateModelValue"
      v-validate="iValidate || ''"
      :disabled="iDisabled"
      @focus="focusField">

      <input v-if="iMask"
      @blur="shouldBlurField"
      class="checkout-input"
      :class="[iClass, {active: fieldState.active || hasValue, valid: fieldState.classes.valid, error: errors.has(iName) || forceError}]"
      :id="iId"
      :type="iType || 'text'"
      :name="iName"
      :value="iValue"
      @input="updateModelValue"
      v-validate="iValidate || ''"
      :disabled="iDisabled"
      v-mask="iMask"
      @focus="focusField">

      <label for="" class="placeholder-label">{{iPlaceholder}}</label>
      <slot name="cardIcon"></slot>
      <div v-if="(iValidate) && (typeof fields[iName] !== 'undefined')" class="status-bubble" :class="{ valid: fieldState.classes.valid, invalid: errors.has(iName) }"></div>
    </div>
    <slot name="cardAuth"></slot>
    <span v-show="errors.has(iName)" class="error-label">{{errors.first(iName)}}</span>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask';
export default {
  props: ['iValidate', 'iDisabled', 'iPlaceholder', 'iClass', 'iId', 'iType', 'iName', 'iMask', 'iValue', 'forceError', 'hasValue'],
  directives: {mask},
  inject: ['$validator'],
  data() {
    return {
      fieldState: {
        active: false,
        classes: {valid: false},
      },

    }
  },
  methods: {
    isValid() {
      return this.fieldState.classes.valid;
    },
    updateModelValue: function(e) {
      this.$emit('input', e.target.value)
    },
    shouldBlurField(e) {
      if (!e.target.value) {this.fieldState.active = false}
      this.$emit('blur', e);
    },
    focusField(e) {
      this.fieldState.active = true;
      this.$emit('focus', e);
    },
  },
  mounted() {
    this.fieldState.classes = this.fields[this.iName];
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.checkout-field-wrapper {
  width: 50%;
  .error-label {
    display: block;
    @include text-body;
    font-size: 1.2rem;
    letter-spacing: 0.2px;
    padding-top: 1rem;
    clear: both;
    color: $wh-red;
  }
}
.checkout-field-cont {
  position: relative;
  width: 100%;
  @include text-body;
  .checkout-input {
    box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.05), 0 4px 4px 0 rgba(0, 0, 0, 0.05);
	  border: solid 1px #d1d1d1;
    @include text-body;
    padding: 1.5rem;
    outline: none;
    display: block;
    width: 100%;
    box-sizing: border-box;
    &.active, &[value] {
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
	    border: solid 2px #000000;
      padding-bottom: 0.8rem;
      padding-top: 2.0rem;
      &+.placeholder-label {
        font-size: 1rem;
        letter-spacing: 0.4px;
        transform: translateY(-0.8rem);
      }
    }
    &.error {
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.05), 0 4px 4px 0 rgba(0, 0, 0, 0.05);
	    border: solid 1px $wh-red;
      padding-bottom: 0.9rem;
      padding-top: 2.1rem;
    }
  }
  .placeholder-label {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    color: #676767;
    pointer-events: none;
    transition: 0.2s all cubic-bezier(.51,.11,.53,.77);
  }
  .status-bubble {
    border-radius: 5rem;
    width: 1rem;
    height: 1rem;
    background-color: transparent;
    position: absolute;
    top: calc(50% - 0.5rem);
    right: 1.5rem;
    transition: 0.2s all cubic-bezier(.51,.11,.53,.77);
    &.valid { background-color: #7fb968; }
    &.invalid { background-color: #dc3b31; }
  }
}

</style>
