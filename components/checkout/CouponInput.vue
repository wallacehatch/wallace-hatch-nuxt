<template>
  <div class="field-cont">
    <input
    id="coupon_input"
    @focus="$emit('reset'); active = true"
    @blur="shouldBlurField"
    :value="iValue"
    @input="updateModelValue"
    type="text"
    :name="iName"
    class="std-input promo-input reg-text open-sans"
    :class="[{error: errors.has(iName), submitted: submitted, active: active}, iClass]">
    <label v-if="" class="std-input-label open-sans" for="">{{iPlaceholder}}</label>
    <div class="side-label-cont">
      <label @click="$emit('submitForm')"
      :class="{active: active && !errors.has(iName), 'coupon-error': errors.has(iName)}"
      class="side-label">
        <span class="side-label-text uppercase">Apply</span>
      </label>
    </div>
  </div>

</template>

<script>
  export default {
   name: 'CouponInput',
   inject: ['$validator'],
   data() {
     return {
       active: false,
     }
   },
   props: ['iName', 'iType', 'iValidate', 'iPlaceholder', 'iClass', 'iMask', 'iValue', 'iMin', 'iMax', 'iStep', 'submitted'],
   methods: {
    updateModelValue: function(e) {
      this.$emit('input', e.target.value)
    },
    shouldBlurField(e) {
      if (!e.target.value) {this.active = false;}
    },
   }
  }
</script>

<style lang='scss'>
@import '../../assets/css/_variables.scss';
.std-input.active {
  box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
	border: solid 2px #000000 !important;
  // padding: 1.5rem 0 !important;
}
</style>
