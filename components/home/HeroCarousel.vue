<template lang="html">
  <!-- SITE HERO -->
  <div class="hero-cont">

    <img id="hero_image" v-lazy="stages[currentStage].images[0]"
    :data-srcset="stages[currentStage].images[0] +  ' 1353w, ' +
    stages[currentStage].images[1] +  ' 2600w, ' +
    stages[currentStage].images[2] +  ' 3900w, '"
    alt="" class="hero-image lazy">

    <div class="lazy delay-1" id="home_lazy_1">
      <p class="hero-1">{{stages[currentStage].heroOne}}</p>
      <h2 class="hero-2">{{stages[currentStage].heroTwo}}</h2>
      <p class="hero-3">{{stages[currentStage].heroThree}}</p>
      <button class="hero-btn" @click="shopNowScroll" >Shop now</button>
    </div>

    <div class="carousel-pg-cont lazy delay-1" id="home_lazy_3">
      <div v-for="(stage,i) in stages" class="pg-item">
        <div @click="function() {seekCarousel(i)}" :id="'pg_img_' + i" :class="{active: currentStage === i}" class="image" :style="{backgroundImage: 'url(' + stage.images[0] + ')'}"></div>
        <div class="progress-bar">
          <div :id="'pg_pb_' + i" style="width: 0" class="progress-bar fill"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import anime from 'animejs';
export default {
  props: ['loaded'],
  data() {
    return {
      stages: [{
        heroOne: 'Introducing The',
        heroTwo: 'Soho Hatch',
        heroThree: 'From our flagship collection',
        images: ['https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-1w.jpg',
                'https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-1w.jpg',
                'https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-1w.jpg'],
      }, {
        heroOne: 'Introducing The',
        heroTwo: 'Palermo Soul & Kallio Rose',
        heroThree: 'From our flagship collection',
        images: ['https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-2w.jpg',
                'https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-2w.jpg',
                'https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-2w.jpg'],
      }],
      currentStage: 0,
      easing: 'easeInOutCubic',
      pbAnimation: null,
      rotateAnimation: null,
      seekEnabled: true,
    }
  },
  watch: {
    'loaded' (newVal) {
      newVal && this.startProgressBar();
    }
  },
  methods: {
    shopNowScroll() {
      window.scroll({
        top: document.getElementById('product-showcase').getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
      });
    },
    seekCarousel(stage) {
      if (!this.seekEnabled) return;
      this.pbAnimation.pause();
      this.rotateAnimation.pause();
      this.seekEnabled = false;
      this.rotateCarousel(stage);

    },
    rotateCarousel(stage) {
      const foDur = 450;
      const fiDur = 450;
      const gap = 350;
      var nextStage = (this.currentStage+1 === this.stages.length) ? 0 : this.currentStage + 1;
      nextStage = stage ? stage : nextStage;

      this.rotateAnimation.add({
        targets: '#home_lazy_1',
        opacity: 0.0,
        duration: foDur/2,
        offset: 0,
        easing: this.easing,
      })
      this.rotateAnimation.add({
        targets: '#hero_image',
        opacity: 0.0,
        duration: foDur,
        offset: foDur,
        easing: this.easing,
      })
      this.rotateAnimation.add({
        targets: '#pg_img_' + String(this.currentStage),
        borderColor: 'rgba(0,0,0,0)',
        duration: foDur,
        offset: foDur,
        easing: this.easing,
      })
      this.rotateAnimation.add({
        targets: '#pg_pb_' + String(this.currentStage),
        opacity: 0.0,
        duration: foDur,
        offset: foDur,
        easing: this.easing,
        complete: () => {
          setTimeout(() => {
            if (!document.getElementById('pg_pb_' + String(this.currentStage))) return;
            document.getElementById('pg_pb_' + String(this.currentStage)).style.width = 0;
            document.getElementById('pg_pb_' + String(this.currentStage)).style.opacity = 1;
            this.currentStage = nextStage;
          }, gap/1.1)
        }
      })
      this.rotateAnimation.add({
        targets: '#home_lazy_1',
        opacity: 1.0,
        duration: fiDur,
        offset: foDur + foDur + fiDur*0.1 + gap,
        easing: this.easing,
      })
      this.rotateAnimation.add({
        targets: '#hero_image',
        opacity: 1.0,
        duration: fiDur,
        offset: foDur + foDur + gap,
        easing: this.easing,
      })
      this.rotateAnimation.add({
        targets: '#pg_img_' + String(nextStage),
        borderColor: 'rgba(255,255,255,1)',
        duration: fiDur/2,
        offset: foDur + foDur + gap,
        easing: this.easing,
        complete: () => {
          this.seekEnabled = true;
          this.startProgressBar()
        }
      })
    },
    startProgressBar() {
      this.rotateAnimation = anime.timeline();
      this.pbAnimation = anime({
        targets: '#pg_pb_' + String(this.currentStage),
        width: '100%',
        duration: 16000,
        easing: 'linear',
        complete: () => {
          this.rotateCarousel();
        }
      })
    },
  },
  mounted() {
    // this.startProgressBar();
  },
  beforeDestroy() {
    this.rotateAnimation.pause();
    this.pbAnimation.pause();
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
// SITE HERO
.carousel-pg-cont {
  position: absolute;
  bottom: 1.3rem;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  .pg-item {
    display: inline-block;
    margin: 0 0.5rem;
    width: 10rem;
    @include respond-to(md) {width: 5.6rem}
    .image {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 5rem;
      border: 4px solid rgba(0,0,0,0);
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #fff;
        opacity: 0;
        z-index: 1;
        transition: 0.2s opacity linear;
      }
      &:hover {
        cursor: pointer;
        &::after {opacity: 0.1}
      }
      &.active {border-color: #fff}
      @include respond-to(md) {
        height: 2.7rem;
        border-width: 2px;
      }
    }
    .progress-bar {
      opacity: 1.0;
      width: calc(100% - 4rem);
      height: 2px;
      background-color: #3f3f3f;
      border-radius: 10px;
      margin: auto;
      margin-top: 1.4rem;
      position: relative;
      &.fill {
        height: 2px;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
        background-color: #fff;
      }
    }
  }
}


.hero-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: -1;
}
.hero-cont {
  background-color: transparent;
  height: 44.44vw;
  box-sizing: border-box;
  padding-left: 11rem;
  padding-top: 20rem;
  position: relative;
  overflow: hidden;
  @include respond-to(lg) { padding-top: 16.6rem; padding-left: 8rem; }
  @include respond-to(md) { padding-top: 10.6rem; padding-left: 7rem; height: 49.5rem;}
  @include respond-to(sm) { padding-top: 9rem; padding-left: 2rem; height: 40rem; }
}

.hero-btn {
  border-radius: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 17px 20px 15px rgba(0, 0, 0, 0.5), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
	border: solid 2px $wh-white;
  padding: 1.6rem 3.5rem;
  @include intro-text;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 4rem;
  color: $wh-white;
  text-transform: uppercase;
  transition: 0.3s all linear;
  box-sizing: border-box;
  @include respond-to(md) { font-size: 1.2rem;}
  @include respond-to(lds) { width: 28rem !important; }
  @include respond-to(sm) { width: calc(100% - 2rem);}
  &:hover {
      background-color: #ffffff;
      box-shadow: 0 27px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
      color: #000000;
      cursor: pointer;
    }

}
.hero-1 {
  @include intro-text;
  text-transform: uppercase;
  color: $wh-white;
  padding-bottom: 0.6rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  @include respond-to(lg) {font-size: 1.4rem;}
}
.hero-2 {
  @include h1;
  font-size: 5.2rem;
  letter-spacing: 6.4px;
  color: $wh-white;
  padding-bottom: 1rem;
  text-transform: uppercase;
  font-weight: normal;
  width: 56rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
  @include respond-to(lg) {font-size: 3.6rem; width: 40rem;}
  @include respond-to(md) {font-size: 3rem; width: 35rem;}
  @include respond-to(sm) {font-size: 2.4rem; width: 30rem;}
}
.hero-3 {
  @include intro-text;
  text-transform: uppercase;
  font-size: 1.2rem;
  color: $wh-white;
  letter-spacing: 3px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}
</style>
