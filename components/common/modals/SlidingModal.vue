<template lang="html">
  <div v-show="lActive">
    <div :id="'sliding_modal_mask' + mKey" class="sliding-modal-mask"></div>
    <div :id="'sliding_modal_cont' + mKey" @click="$emit('close')" class="sliding-modal-cont">
      <div @click.stop :id="'sliding_modal_inner_cont' + mKey" class="inner-cont" style="transform: translateX(101%)">
        <div @click="$emit('close')" class="close-btn"><no-ssr><i class="fal fa-times"></i></no-ssr></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
export default {
  props: ['active', 'mKey'],
  data() {
    return {
      lActive: false,
      dur: 500,
    }
  },
  methods: {
    toggleModal(active) {
      if (active) {
        this.lActive = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          anime({
            targets: '#sliding_modal_mask' + this.mKey,
            opacity: 1.0,
            duration: this.dur,
            easing: 'easeInOutCubic'
          })
          anime({
            targets: '#sliding_modal_inner_cont' + this.mKey,
            translateX: 0,
            duration: this.dur,
            easing: 'easeInOutCubic'
          })
        })
      }
      else {
        document.body.style.overflow = 'initial';
        anime({
          targets: '#sliding_modal_mask' + this.mKey,
          opacity: 0,
          duration: this.dur,
          easing: 'easeInOutCubic'
        })
        anime({
          targets: '#sliding_modal_inner_cont' + this.mKey,
          translateX: '101%',
          duration: this.dur,
          easing: 'easeInOutCubic',
          complete: () => {
            this.lActive = false;
          }
        })
      }
    }
  },
  mounted() {
    // uncomment this to have form always out
    this.toggleModal(true);
  },
  watch: {
    'active' (newState) {
      console.log('active changed!');
      this.toggleModal(newState);
    },
  }
}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .sliding-modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: scroll;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0.0;
  }
  .sliding-modal-cont {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: scroll;
    .inner-cont {
      background-color: $wh-white;
      box-shadow: -20px 0 20px 0 rgba(0, 0, 0, 0.1), -10px 0 14px 0 rgba(0, 0, 0, 0.2);
      max-width: 60rem;
      width: 66%;
      min-height: 100vh;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(101%);
      -webkit-transform: translateX(101%);
      @include respond-to(sm) {
        width: 94%;
      }
    }
    .close-btn {
      font-size: 32px;
	    font-weight: 300;
      width: 2.4rem;
      height: 3.2rem;
      float: right;
      position: relative;
      z-index: 1;
      margin: 2rem 2rem 1.8rem 2rem;
      transition: 0.2s all linear;
      &.white {color: $wh-white;}
      &:hover {
        cursor: pointer;
        color: #262626;
      }
      @include respond-to(sm) {
        margin: 1rem 1rem 0 0;
      }
    }
  }
</style>
