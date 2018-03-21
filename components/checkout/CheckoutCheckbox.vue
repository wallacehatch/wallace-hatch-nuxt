<template lang="html">
  <div class="checkout-checkbox-cont">
    <input @change="handleCheck" :name="cName" :id="'cb_' + cKey" type="checkbox" :checked="iValue">
    <label :for="'cb_' + cKey">
      <no-ssr><i class="fa fa-check"></i></no-ssr>
    </label>
    <span>Text me updates about my order (standard message & data rates may apply).</span>
  </div>
</template>

<script>
export default {
  props: ['cKey', 'cName', 'iValue'],
  methods: {
    handleCheck(e) {
      // debugger;
      this.$emit('input', e.target.checked);
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .checkout-checkbox-cont {
    position: relative;
    height: 3.2rem;
		input {
			display: none;
		}
		label {
		  display: inline-block;
      height: 3.2rem;
      width: 3.2rem;
      box-sizing: border-box;
      background-color: #ffffff;
    	box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.05), 0 4px 4px 0 rgba(0, 0, 0, 0.05);
    	border: solid 1px #d1d1d1;
      text-align: center;
      svg {
        display: none;
        width: 100%;
        height: 100%;
        font-size: 1.7rem;
      }
		}
    span {
      position: absolute;
      display: inline-block;
      top: 0.75rem;
      left: 4.7rem;
      @include text-body;
      font-size: 1.2rem;
      letter-spacing: 0.2px;
      @include respond-to(sm) {top: 0;}
    }
    input:checked+label {
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
	    border: solid 2px #000000;
      svg {display: initial;}
  	}
	}

</style>
