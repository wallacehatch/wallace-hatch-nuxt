<template>
  <div>
    <p v-if="iOptional" for="" :class="{disabled: iDisable}" class="optional-text">Optional</p>
    <div class="field-cont contact">
      <input
      v-if="iValidate"
      v-validate="iValidate"
      @focus="active = true"
      @blur="shouldBlurField"
      :value="iValue"
      @input="updateModelValue"
      :type="iType || 'text'"
      :name="iName"
      :disabled="iDisable"
      class="std-input reg-text open-sans"
      :class="[{disabled: iDisable, active: active, 'is-danger': errors.has(iName)},iClass]">
      <input
      v-if="!iValidate"
      @focus="active = true"
      @blur="shouldBlurField"
      :value="iValue"
      @input="updateModelValue"
      :type="iType || 'text'"
      :name="iName"
      :disabled="iDisable"
      class="std-input reg-text open-sans"
      :class="[{disabled: iDisable, active: active, 'is-danger': errors.has(iName)},iClass]">
      <label :class="{active: active}" class="std-input-label open-sans" for="">{{errors.has(iName) ? errors.first(iName) : iPlaceholder}}</label>
    </div>
  </div>
</template>

<script>
  export default {
   name: 'StdInput',
   inject: ['$validator'],
   data() {
     return {
       active: false,
     }
   },
   props: ['iName', 'iType', 'iValidate', 'iPlaceholder', 'iClass', 'iMask', 'iValue', 'iMin', 'iMax', 'iStep', 'iOptional', 'iDisable'],
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
@import '../../../assets/css/_variables.scss';
.optional-text {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  @include text-body;
  font-size: 1rem;
  &.disabled {color: #d1d1d1;}
}
.field-cont.contact {
  float: none;
}
.std-input.is-danger {
  // color: red;
  border-color: red !important;
  // background-color: red;
  &+label {
    color: red;
  }
}
.std-input.disabled {
  background-color: #fafafa !important;
  border-color: #d1d1d1 !important;
  color: #d1d1d1 !important;
  &+label {color: #d1d1d1 !important}
}
</style>
