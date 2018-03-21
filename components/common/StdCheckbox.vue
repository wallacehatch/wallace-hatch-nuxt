<template>
  <div class="field-cont">
    <input
    @focus="active = true"
    @input="updateModelValue"
    type="text"
    :name="iName"
    class="std-input reg-text open-sans"
    :class="[{error: error, submitted: submitted}, iClass]">
    <label v-if="active === false  || iValue == ''" class="std-input-label open-sans" for="">{{error ? error : iPlaceholder}}</label>
    <div class="side-label-cont">
      <label @click="$emit('submitForm')"
      :class="{active: active}"
      class="side-label">
        <span class="side-label-text">{{submitted ? 'Thank you for signing up for our newsletter' : 'Sign Up'}}</span>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
   name: 'StdCheckbox',
   data() {
     return {
       active: false,
     }
   },
   props: ['iName', 'iType', 'iValidate', 'iPlaceholder', 'iClass', 'iMask', 'iValue', 'iMin', 'iMax', 'iStep', 'submitted', 'error'],
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
</style>
