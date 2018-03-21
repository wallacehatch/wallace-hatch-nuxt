<template lang="html">
  <div>
    <div class="image-zoom-mask hide-sm" @click="handleImageZoom" v-if="imageZoomed"></div>
    <v-touch class="mobile-image-zoom-popover" id="zoom_image_mobile_cont" v-if="mobileZoomPopoverActive"
      @panstart="startMobileImagePan" @panmove="panMobileImage">
      <img class=" zoom-image-mobile lazy" id="zoom_image_mobile" v-lazy="product.images[activeImageIndex]">
      <div @click="mobileZoomPopoverActive = false" class="zoom-tab mobile-close"><no-ssr><i class="fal fa-times"></i></no-ssr></div>
    </v-touch>
    <div v-if="$store.state.mobile" class="active-image-cont" id="active_image_cont">
      <img class="active-image lazy" id="active_image" v-lazy="product.images[activeImageIndex]" alt="">
      <div @click="mobileZoomPopoverActive = true" class="zoom-tab mobile"><no-ssr><i class="fal fa-expand"></i></no-ssr></div>
    </div>
    <div v-else class="active-image-cont" id="active_image_cont" @click="handleImageZoom" :class="{zoomed: imageZoomed}">
      <img class="active-image lazy" id="active_image" v-lazy="product.images[activeImageIndex]" alt="">
      <div v-show="!imageZoomed" class="zoom-tab hide-sm" :class="{zoomed: imageZoomed}"><no-ssr><i class="fal fa-expand"></i></no-ssr></div>
      <div v-show="imageZoomed" class="zoom-tab" :class="{zoomed: imageZoomed}"><no-ssr><i class="fal fa-times"></i></no-ssr></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'activeImageIndex'],
  data() {
    return {
      imageZoomed: false,
      mobileZoomPopoverActive: false,
      currentHandleZoomPan: null,
      panMobileImage: () => {console.log('dont call me')},
    }
  },
  methods: {

    startMobileImagePan(e) {
      // console.log('starting mobile pan');
      this.panMobileImage = this.mobileImagePan();
    },
    mobileImagePan(e) {
      // console.log('panning mobile image');
      const el = document.getElementById('zoom_image_mobile');
      const elCont = document.getElementById('zoom_image_mobile_cont');
      var lastDeltaY = 0;
      var lastDeltaX = 0;
      return (e) => {
        const width  = el.getBoundingClientRect().width;
        const height  = el.getBoundingClientRect().height;
        const xDiff = el.getBoundingClientRect().width - elCont.getBoundingClientRect().width
        const yDiff = el.getBoundingClientRect().height - elCont.getBoundingClientRect().height
        const currentX = Number(el.style.left.slice(0,-2)) || 250;
        const currentY = Number(el.style.top.slice(0,-2)) || 250;
        const newPageX = currentX + e.deltaX - lastDeltaX;
        const newPageY = currentY + e.deltaY - lastDeltaY;
        const adjustedPageX = Math.max(Math.min(width/2, newPageX), width/2 - xDiff);
        const adjustedPageY = Math.max(Math.min(height/2, newPageY), height/2 - yDiff);
        // console.log(String(newPageX) + 'px')
        // console.log(String(newPageY) + 'px')
        // console.log('these are dims');
        // console.log(currentX);
        // console.log(currentY);
        // console.log('--------------------');
        el.style.left = String(adjustedPageX) + 'px';
        el.style.top = String(adjustedPageY) + 'px';
        lastDeltaX = e.deltaX;
        lastDeltaY = e.deltaY;
      }
    },
    handleZoomPan(e) {
      // console.log('desktop zoom panning');
      const elCont = document.getElementById('active_image_cont');
      const el = document.getElementById('active_image');
      var lastPageY = e.clientY;
      var lastPageX = e.clientX;
      return (e) => {
        // console.log('zoom panning');
        const width  = el.getBoundingClientRect().width;
        const xDiff = el.getBoundingClientRect().width - elCont.getBoundingClientRect().width
        const yDiff = el.getBoundingClientRect().height - elCont.getBoundingClientRect().height
        const newPageX = lastPageX - e.clientX + Number(el.style.left.slice(0,-2));
        const newPageY = lastPageY - e.clientY + Number(el.style.top.slice(0,-2));
        const adjustedPageX = Math.max(Math.min(width/2, newPageX), width/2 - xDiff);
        const adjustedPageY = Math.max(Math.min(newPageY, 0), yDiff * -1);
        el.style.left = String(adjustedPageX) + 'px';
        el.style.top = String(adjustedPageY) + 'px';
        lastPageX = e.clientX;
        lastPageY = e.clientY;
      }
    },
    handleImageZoom(e) {
      // console.log('desktop image zooming');
      const el = document.getElementById('active_image');
      const width  = el.getBoundingClientRect().width;
      const height = el.getBoundingClientRect().height;
      if (!this.imageZoomed) {
        el.style.top = String(-1 * (e.layerY - (height/4))) + 'px';
        el.style.left = String(-1.4 * (e.layerX - (width/2))) + 'px';
        el.style.transform = 'translateX(-50%)';
        this.currentHandleZoomPan = this.handleZoomPan(e);
        document.addEventListener('mousemove', this.currentHandleZoomPan);
        this.imageZoomed = true;
      }
      else {
        el.style.left = '50%';
        el.style.top = 0;
        el.style.transform = 'translateX(-50%)';
        document.removeEventListener('mousemove', this.currentHandleZoomPan);
        this.imageZoomed = false;
      }
    },
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .image-zoom-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
  }
  .mobile-image-zoom-popover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
    background-color: $wh-white;
    .zoom-image-mobile {
      position: absolute;
      transform: translate(-50%, -50%);
      height: 150%;
      top: 250px;
      left: 200px;
    }
  }
  .zoom-tab {
    position: absolute;
    top: 0;
    right: 0;
    width: 4.4rem;
    height: 4.4rem;
    background-color: #e9eaed;
    opacity: 0;
    transition: 0.2s all linear;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-color: #ccc;
    svg {
      font-size: 2.8rem;
      color: $wh-black;
    }
    &.mobile {
      opacity: 1;
      top: 1rem;
      right: 1rem;
      // bottom: 1rem;
      // right: 1rem;
      width: 3.6rem;
      height: 3.6rem;
      svg {font-size: 2rem;}
    }
    &.mobile-close {
      opacity: 1;
      top: initial;
      left: 50%;
      transform: translateX(-50%);
      bottom: 3rem;
      width: 3.6rem;
      height: 3.6rem;
      svg {font-size: 2rem;}
    }
    &:hover {
      box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
      border: solid 1px #cccccc;
      cursor: pointer;
    }
    &.zoomed {
      background-color: #000000;
      border-color: #000 !important;
      box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1) !important;
      svg {font-size: 3.2rem; color: $wh-white;}
    }
  }
  .active-image-cont {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    height: 51.5rem;
    overflow: hidden;
    .active-image {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      transition: 0.2s all ease;
    }

    &:hover {
      cursor: zoom-in;
      .zoom-tab {
        opacity: 1;
        box-shadow: 0 10px 17px 0 rgba(0, 0, 0, 0.1), 0 4px 10px 0 rgba(0, 0, 0, 0.2);
        border: solid 1px #cccccc;
      }
    }
    &.zoomed {
      &:hover {cursor: zoom-out;}
      .zoom-tab {opacity: 1;}
      .active-image {
        height: 200%;
      }
    }
    @include respond-to(md) {height: 41.2rem}
    @include respond-to(sm) {height: 40rem;}
  }
</style>
