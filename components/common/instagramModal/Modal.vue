<template lang="html">
   <div v-show="lActive" id="insta_modal_mask" class="insta-modal-mask">
      <div class="insta-modal-cont">
         <div class="close-btn" @click="$emit('close')"><i class="fal fa-times"></i></div>
         <div class="insta-content-top-cont-mobile sm-only">
            <div class="oval">
               <div class="logo"></div>
            </div>
            <div class="top-text">
               <p><strong>wallacehatch</strong></p>
               <p class="caption">{{instagramInfo.location}}</p>
            </div>
         </div>
         <div class="insta-image" :style="{backgroundImage: 'url(' + instagramInfo.picture_url + ')'}"></div>
         <div class="insta-content-cont">
            <div class="insta-content-top-cont hide-sm">
               <div class="oval">
                  <div class="logo"></div>
               </div>
               <div class="top-text">
                  <p><strong>wallacehatch</strong></p>
                  <p class="caption">{{instagramInfo.location}}</p>
               </div>
               <div class="line"></div>
            </div>
            <div class="insta-content-middle">
              <div class="products-cont-mobile sm-only">
                <div  v-for="(item, i) in instagramInfo.products">
                  <mobile-product-tile :key="'pTile' + i" :item="item"></mobile-product-tile>
                  <!-- {{instagramInfo.products.length}} -->
                  <div class="divider" v-if="i < instagramInfo.products.length && i > 0"></div>
                </div>
              </div>
              <p class="caption"><strong>wallacehatch </strong>{{instagramInfo.caption}}</p>
                <div class="products-cont hide-sm"  v-for="(item, i) in instagramInfo.products">
                    <product-tile :key="'pTile' + i" :item="item"></product-tile>
                </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import anime from 'animejs';
import InstagramService from '@/InstagramService.js';
import ProductTile from './ProductTile'
import MobileProductTile from './MobileProductTile'
export default {
  components :{
    ProductTile,
    MobileProductTile,
  },
  data() {
    return {
      lActive: false,
      dur: 500,
      instagramInfo: {
        caption: "",
        picture_url: "",
        products: null,
      },
    }
  },
  mounted() {
    // this.$store.commit('SET_INSTAGRAM_MODAL_ACTIVE', {})  // to toggle instagram modal
  },
  methods: {
    toggleModal(active) {
      if (active) {
        this.getInstagramMediaInfo();
        this.lActive = true;
        if (window.innerWidth < 767) { document.body.style.overflow = 'hidden'; }
        setTimeout(() => {
          anime({
            targets: '#insta_modal_mask',
            duration: this.dur,
            opacity: 1.0,
            easing: 'easeInOutCubic'
          })
        })
      }
      else {
        if (window.innerWidth < 767) { document.body.style.overflow = 'initial'; }
        anime({
          targets: '#insta_modal_mask',
          opacity: 0,
          duration: this.dur,
          easing: 'easeInOutCubic',
          complete: () => {
            this.lActive = false;
            this.instagramInfo = {};
          }
        })
      }
    },
    getInstagramMediaInfo(){
      if (this.$store.state.instagramModal.mediaId) {
      InstagramService.getInstagramMediaInfo(this.$store.state.instagramModal.mediaId).then((result) => {
          this.instagramInfo = result.data
          this.instagramInfo.caption = result.data.caption.split(".\n.\n")[0]
      })
    }
    },
  },
  watch: {
    '$store.state.instagramModal.active' (newState) {
      this.toggleModal(newState);
    }
  },
}
</script>

<style lang="scss">
@import '../../../assets/css/_variables.scss';
.insta-modal-mask {
  position: fixed;
  clear: both;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  padding-top: 8.4rem;
  overflow: scroll;
  opacity: 0;
  @include respond-to(sm) {
    padding-top: 1.5rem;
  }


.insta-modal-cont {
  clear: both;
  max-width: 86rem;
    @include respond-to(sm) {
      width: 90.6%;
    }
  width: 84%;
  background-color: #ffffff;
	box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  text-align: center;
  margin: auto;
  position: relative;
  overflow: auto;
  .insta-image{
    @include respond-to(sm) {
      height: 363px;
      width: 100%;
      margin-top: 1.9rem;
    }
    clear: both;
    display: inline-block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    overflow: hidden;
    float: left;
    transition: 0.35s all cubic-bezier(.69,.16,.32,1);
    width: 54%;
    height: 60rem;
  }
  .insta-content-top-cont-mobile{

    @include respond-to(sm) {
    display: block !important;
    overflow: auto;
    padding-left: 1rem;
    padding-top: 1.5rem;
    .line{
      overflow: auto;
      height: 1px;
      padding-top: 2rem;
      width: 100%;
      border-bottom: 1px solid #d8d8d8;
  }
  .top-text{
      margin-top: 0.4rem;
      margin-left: 2rem;
      overflow: auto;
      float: left;
      display: inline-block;
  }
  .oval {
  overflow: auto;
  display: inline-block;
  float: left;
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border: solid 1px #dbdbdb;
  border-radius: 50%;
}
  .logo {

    background-image: url('https://d3dty8fv62xana.cloudfront.net/wh-mark.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 24px;
    height: 21px;
    object-fit: contain;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
  }
}
}

  .insta-content-cont {

    display: inline-block;

    width: 37.1%;
    padding: 3rem;
    @include respond-to(md) {width: 35%;}
    @include respond-to(sm) {
      width: 100% !important;
      padding: 0 !important;
      margin: auto;
    }
  }


    .insta-content-top-cont{
      overflow: auto;
      padding-left: 1rem;
      padding-top: 1.5rem;
      .line{
        overflow: auto;
        height: 1px;
        padding-top: 2rem;
        width: 100%;
        border-bottom: 1px solid #d8d8d8;
    }
    .top-text{
        margin-top: 0.4rem;
        margin-left: 2rem;
        overflow: auto;
        float: left;
        display: inline-block;
    }
    .oval {
    overflow: auto;
    display: inline-block;
    float: left;
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border: solid 1px #dbdbdb;
    border-radius: 50%;
  }
    .logo {

      background-image: url('https://d3dty8fv62xana.cloudfront.net/wh-mark.svg');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 24px;
      height: 21px;
      object-fit: contain;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;
    }
  }

  .insta-content-middle{
    margin-top: 1.5rem;
    @include respond-to(sm) {margin-top: 0rem;}
    .caption{
      @include respond-to(sm) {
          padding: 1rem 1.5rem;

      }
      font-size: 12px;
      line-height: 1.67;
      letter-spacing: 0.2px;
      margin-bottom: 2rem;
    }
    .products-cont-mobile{

      @include respond-to(sm) {

        display: flex !important;
        justify-content: center;
        overflow: auto;
        border-bottom: solid 1px #dbdbdb;
        width: 100%;

        .divider{
          position: relative;
          background-color: #dbdbdb;

          width: 1px;
          height: 100%;
        }
      }
    }
    text-align: left;
  }


  .close-btn {

    @include respond-to(sm) {
      top: 0.8rem;
      right: 1rem;
      font-size: 28px;
    }
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

}
}
</style>
