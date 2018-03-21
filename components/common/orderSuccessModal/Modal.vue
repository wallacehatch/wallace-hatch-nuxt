<template lang="html">
  <div v-show="lActive" id="os_modal_mask" class="os-modal-mask">
    <div class="os-modal-cont">
      <div class="close-btn" @click="$emit('close')"><no-ssr><i class="fal fa-times"></i></no-ssr></div>
      <div class="logo"></div>
      <h4>Hi {{$store.state.orderSuccessModal.customerName.split(' ')[0]}}!</h4>
      <p class="subtext">Your order has been placed.</p>
      <p class="body">Your order: <span>{{$store.state.orderSuccessModal.orderId}}</span> has been received. We’ll let you know when
        it’s on it’s way. You should be receiving an email from us very shortly.
      </p>
      <div class="continue-btn" @click="$emit('close')">Continue Shopping</div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
export default {
  data() {
    return {
      lActive: false,
      dur: 500,
    }
  },
  mounted() {
    // this.$store.commit('SET_ORDER_SUCCESS_MODAL_ACTIVE', {
    //   active: true,
    //   customerName: 'Ian Hansborough',
    //   orderId: 'asd',
    // })
  },
  methods: {
    toggleModal(active) {
      if (active) {
        this.lActive = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          anime({
            targets: '#os_modal_mask',
            duration: this.dur,
            opacity: 1.0,
            easing: 'easeInOutCubic'
          })
        })
      }
      else {
        // if (window.innerWidth < 767) { document.body.style.overflow = 'initial'; }
        document.body.style.overflow = 'initial';
        anime({
          targets: '#os_modal_mask',
          opacity: 0,
          duration: this.dur,
          easing: 'easeInOutCubic',
          complete: () => {
            this.lActive = false;
          }
        })
      }
    },
  },
  watch: {
    '$store.state.orderSuccessModal.active' (newState) {
      this.toggleModal(newState);
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';
.os-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 17rem;
  overflow: scroll;
  opacity: 0;
  @include respond-to(sm) {
    padding-top: 8rem;
  }
}
.os-modal-cont {
  max-width: 65rem;
  width: calc(100% - 4rem);
  background-color: #ffffff;
	box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  text-align: center;
  padding-top: 4rem;
  padding-bottom: 6rem;
  margin: auto;
  position: relative;
  .logo {
    background-image: url('https://d3dty8fv62xana.cloudfront.net/wh-mark.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 4.74rem;
    height: 4rem;
    margin: auto;
    margin-bottom: 4rem;
  }
  h4 {
    font-size: 24px;
	  letter-spacing: 7px;
    text-transform: uppercase;
    font-weight: 400;
  }
  .subtext {
    @include intro-text;
    font-size: 1.2rem;
    letter-spacing: 3.4px;
    padding: 1rem 0 2rem 0;
    text-transform: uppercase;
  }
  .body {
    @include text-body;
    font-size: 1.2rem;
    max-width: 30rem;
    width: calc(100% - 2rem);
    margin: auto;
    line-height: 2.0;
    span {text-decoration: underline;}
  }
  .close-btn {
    display: inline-block;
    position: absolute;
    top: 1.4rem;
    right: 1.6rem;
    font-size: 2rem;
    transition: 0.2s all linear;
    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
  .continue-btn {
  	background-color: $wh-black;
    padding: 1.6rem 2.4rem;
    @include intro-text;
    font-size: 1.4rem;
    max-width: 24rem;
    margin: 4rem auto;
    margin-bottom: 0;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0;
    letter-spacing: 2px;
    outline: none;
    transition: 0.2s all linear;
    background-color: #ffffff;
  	box-shadow: 0 12px 24px 0 rgba(95, 95, 95, 0.3), 0 2px 6px 0 rgba(149, 149, 149, 0.2);
  	border: solid 2px #000000;
    &:hover {
      cursor: pointer;
      background-color: #262626;
      color: $wh-white;
    }
    @include respond-to(sm) {
      font-size: 1.4rem;
    }
  }

}
</style>
