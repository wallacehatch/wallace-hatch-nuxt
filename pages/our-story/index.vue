<template lang="html">
  <div class="site-cont">
    <div class="story-hero-cont">
      <img v-lazy="'https://d3dty8fv62xana.cloudfront.net/city-image.jpg'"
      data-srcset="https://d3dty8fv62xana.cloudfront.net/city-image.jpg 1353w,
      https://d3dty8fv62xana.cloudfront.net/city-image%402x.jpg 2600w,
      https://d3dty8fv62xana.cloudfront.net/city-image%403x.jpg 3900w"
      alt="" class="story-hero-image lazy">
      <div class="lazy delay-1" id="os_lazy_1">
        <h1>Welcome to<br>Wallace Hatch</h1>
        <p class="handle">@wallacehatch</p>
        <div class="hr-line white"></div>
      </div>
    </div>
    <div class="story-intro-cont lazy delay-2" id="os_lazy_2">
      <div class="content-cont">
        <div class="marker"><no-ssr><i class="fal fa-map-marker-alt"></i></no-ssr></div>
        <p class="location">Columbus, OH</p>
        <p class="body">
          We are a team of designers, stylists, photographers, innovators, and risk-takers; brought together by a shared passion for adventure, originality, and elegant design.<br><br>
          We created Wallace Hatch to embody the idea of empowered living. What is empowered living? It’s the belief that life is short and the world is wide. It’s having the mindset that every day is in and of itself a unique adventure. It’s, above all else, a reminder to take hold of tomorrow’s adventure and live it like only you know how to.<br><br>
          We believe that this type of empowered lifestyle should be attainable for everyone. Because of this, we’ve created watches that showcase clean, elegant, and premium style at a price point that won’t break the bank<br><br>
          As our community of adventurers, trend-setters, and risk-takers grows, we invite you to join us; the journey has just begun.
        </p>
      </div>
    </div>
    <div class="story-section-cont mission">
      <h1>Our Mission</h1>
      <p class="subtext">To Be More than just a choice in style</p>
      <div class="hr-line"></div>
      <div class="story-feature-cont clearfix">
        <div class="left hide-sm">
          <p class="body">Wallace Hatch was founded on the belief that the watch you wear should represent more than just a choice in style. Our goal is to create products that truly empower you — inspiring you to go further, do more, and make the most of the daily adventure that is your life.</p>
        </div>
        <div class="right image"></div>
        <div class="left sm-only">
          <p class="body">Wallace Hatch was founded on the belief that the watch you wear should represent more than just a choice in style. Our goal is to create products that truly empower you — inspiring you to go further, do more, and make the most of the daily adventure that is your life.</p>
        </div>
      </div>
    </div>

    <div class="story-section-cont community">
      <h1>Our Community</h1>
      <a target="_blank" href="https://www.instagram.com/wallaceHatch/" class="social-link"><no-ssr><i class="fab fa-instagram"></i></no-ssr></a>
      <a target="_blank" href="https://twitter.com/WallaceHatch" class="social-link"><no-ssr><i class="fab fa-twitter"></i></no-ssr></a>
      <a target="_blank" href="https://www.facebook.com/WallaceHatch/" class="social-link"><no-ssr><i class="fab fa-facebook-f"></i></no-ssr></a>
      <div class="hr-line"></div>

      <div class="community-visual-cont">
        <div class="insta-feed-cont">
          <div class="insta-feed-mask"></div>
          <live-instagram-feed class="our-community hide-sm" :instagramPosts="liveInstagramPosts" ></live-instagram-feed>
        </div>
        <div class="iphone"></div>
      </div>

      <p class="body community">By far the most important part of the Wallace Hatch brand is the ever-growing community  of exceptional humans that have adopted it.
       Follow along on Insta as our community shares their daily experiences; putting the Wallace Hatch flair on the endless adventure that we call life.</p>
      <p class="tags community">#WallaceHatch <span>#WHpicoftheday</span></p>

    </div>

    <div class="story-section-cont products">
      <h1>Our Products</h1>
      <p class="subtext">Clean. elegant. premium. affordable.</p>
      <div class="hr-line"></div>
      <div class="story-feature-cont clearfix">
        <div class="left">
          <live-instagram-feed class="our-products" fourTile="true" :instagramPosts="productInstagramPosts" ></live-instagram-feed>
        </div>
        <div class="right">
          <p class="body">The goal of our products is simple. Deliver clean, elegant, and premium style at an exceedingly reasonable price — the perfect companion for tomorrow’s adventure. We back this up with a two-year guarantee on all of our products, plus free U.S shipping and returns.</p>
        </div>
      </div>
    </div>

    <h1 class="book-end-tag">#WallaceHatch</h1>

  </div>
</template>

<script>
import LiveInstagramFeed from '@/components/home/LiveInstagramFeed';
import InstagramService from '@/InstagramService';
export default {
  head() {
    return {
      title: 'Our Story - Wallace Hatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Our Story - Wallace Hatch'},
        { hid: 'og-description', property: 'og:description', content: 'Designed in Columbus, Ohio - Our mission is to Be More than just a choice in style' },
        {hid: 'description', name: 'description', content: 'Designed in Columbus, Ohio - Our mission is to Be More than just a choice in style'}
      ]
    }
  },
  components: {
    LiveInstagramFeed,
  },
  mounted() {
    this.$Lazyload.$once('loaded', (e) => {
      document.getElementById('os_lazy_1').setAttribute('lazy', 'loaded')
      document.getElementById('os_lazy_2').setAttribute('lazy', 'loaded')
    })
    InstagramService.getInstagramPosts().then((result) => {
        this.liveInstagramPosts = result.data.graphql.user.edge_owner_to_timeline_media.edges.slice(0,12);
    })
  },
  data() {
    return {
      liveInstagramPosts: null,
      productInstagramPosts: [{
        node: {
        shortcode: 'BeifoHrBxs0',
        display_url: 'https://www.instagram.com/p/BeifoHrBxs0/media/',
      },}, {
        node: {
        shortcode: 'BenquNQBofW',
        display_url: 'https://www.instagram.com/p/BenquNQBofW/media/',
      },}, {
        node: {
        shortcode: 'BelHPVrhnsi',
        display_url: 'https://www.instagram.com/p/BelHPVrhnsi/media/',
      }, },{
        node: {
        shortcode: 'Be3w2gFhLyj',
        display_url: 'https://www.instagram.com/p/Be3w2gFhLyj/media/',
      },}]
    }
  },
  beforeMount() {
    this.$store.commit('SET_NAV_ACTIVE', 4);
    this.$store.commit('SET_NAV_LAYOUT', 2);
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .instagram-feed-cont.our-products {
    margin: 0;
    @include respond-to(sm) { margin-top: 3rem; }
  }
  .instagram-feed-cont.our-community {
    position: relative;

  }
  .insta-feed-cont {
    position: relative;
    .insta-feed-mask {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 2;
      background-image: radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.0), #fff 70%);
    }
  }
  .community-visual-cont {
    padding-top: 9.3rem;
    position: relative;
    overflow: hidden;
    @include respond-to(sm) {
      padding-top: 0rem;
    }
    .iphone {
      background-size: contain;
      background-position: center top;
      background-repeat: no-repeat;
      position: absolute;
      width: 38vw;
      height: 50vw;
      margin: auto;
      top: 0; left: 0; right: 0;
      z-index: 3;
      background-image: url('https://d3dty8fv62xana.cloudfront.net/iphone-insta%402x.png');
      @include respond-to(2x) {background-image: url('https://d3dty8fv62xana.cloudfront.net/iphone-insta%402x.png');}
      @include respond-to(3x) {background-image: url('https://d3dty8fv62xana.cloudfront.net/iphone-insta%403x.png');}
      @include respond-to(sm) {
        width: 100%;
        height: 130vw;
        position: initial;
        background-size: 133% auto;
      }
    }
  }

  .story-section-cont {
    padding-top: 7rem;
    text-align: center;
    &.mission, &.products {
      @include respond-to(sm) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    .body.community, .tags.community {
      max-width: 55rem;
      margin: auto;
      @include text-body;
      font-size: 1.4rem;
	    line-height: 2.0;
      @include respond-to(lg) {font-size: 1.2rem}
      @include respond-to(sm) {
        margin: 0 1.5rem;
      }
    }
    .tags.community {
      margin-bottom: 13rem;
      span {padding-left: 5rem;}
      @include respond-to(lg) {margin-bottom: 6.4rem}
      @include respond-to(md) {margin-bottom: 5rem}
      @include respond-to(sm) {margin-bottom: 1rem; text-align: left;}
    }
    .body.community {
      margin-top: 4rem;
      margin-bottom: 1rem;
      text-align: left;
    }
    .social-link {
      color: $wh-black;
      font-size: 2.4rem;
      display: inline-block;
      margin: 1rem 1.4rem 4rem 1.4rem;
      transition: 0.2s all linear;
      &:hover {opacity: 0.5;}
      @include respond-to(lg) { font-size: 2.2rem; }
      @include respond-to(sm) { margin-bottom: 3rem;}
    }
    h1 {
      text-transform: uppercase;
      font-size: 3.2rem;
      @include respond-to(lg) {font-size: 2.4rem;}
      @include respond-to(md) {font-size: 2rem;}
      margin-bottom: 1rem;
    }
    .subtext {
      margin-bottom: 4rem;
      @include intro-text;
      font-size: 1.4rem;
      letter-spacing: 4px;
      text-transform: uppercase;
      @include respond-to(lg) {
        font-size: 1.2rem;
        letter-spacing: 3px;
      }
      @include respond-to(sm) { margin-bottom: 2.3rem; }
    }
    .story-feature-cont {
      display: flex;
      align-items: center;
      @include respond-to(lg) {
        width: calc(100% - 22rem);
        margin-top: 6rem;
      }
      @include respond-to(md) {
        margin-top: 5rem;
        width: calc(100% - 10rem);
      }
      @include respond-to(sm) {
        margin-top: 4rem;
        margin: 0;
        width: 100%;
        display: block;
      }
      max-width: 107.7rem;
      margin: auto;
      margin-top: 6rem;
      margin-bottom: 11rem;
      .left, .right {
        float: left;
        box-sizing: border-box;
        width: 50%;
        @include respond-to(sm) {
          width: 100%;
        }
      }
      .right.image {
        background-image: url('https://scontent-lga3-1.cdninstagram.com/vp/4c522575beaba9c55968538edcb101b3/5B04C97C/t51.2885-15/e35/26375935_211346592759883_8504134227896303616_n.jpg');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0 12px 24px 0 rgba(95, 95, 95, 0.2), 0 2px 6px 0 rgba(149, 149, 149, 0.1);
        @include respond-to(sm) {margin-top: 4rem;}
        &:after {
          content: "";
          display: block;
          padding-bottom: 100%;
        }
      }
      .left .body, .right .body {
        text-align: left;
        padding-top: 3.2rem;
        @include text-body;
        font-size: 2rem;
      	font-weight: 300;
      	line-height: 2.1;
      	letter-spacing: 0.2px;
        @include respond-to(lg) {font-size: 1.8rem;}
        @include respond-to(md) {font-size: 1.6rem;}
        @include respond-to(sm) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
      }
      .left .body {
        padding-right: 7.7rem;
        @include respond-to(lg) {padding-right: 5rem;}
        @include respond-to(md) {padding-right: 4rem;}
      }
      .right .body {
        padding-left: 7.7rem;
        @include respond-to(lg) {padding-left: 5rem;}
        @include respond-to(md) {padding-left: 4rem;}
      }
    }
  }
  .content-cont {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    padding: 5.9rem 10.5rem 14.5rem 10.5rem;
    overflow: hidden;
    @include respond-to(sm) {
      padding: 3rem 1.5rem 0 1.5rem;
      position: initial;
      // height: auto;
    }
  }
  .story-intro-cont {
    max-width: 72rem;
    width: calc(100% - 8.8rem);
    margin: auto;
    position: relative;
    background-color: transparent;
    text-align: center;
    margin-top: calc(33.6rem - 48.43vw);
    height: 64.6rem;
    @include respond-to(lg) {margin-top: calc(23rem - 48.43vw); height: 57.4rem}
    @include respond-to(md) {margin-top: calc(21rem - 48.43vw);}
    @include respond-to(sm) {
      margin-top: 0;
      width: 100%;
      height: auto;
    }
    &::before {left: 0px;}
    &::after {right: 0px;}
    &::after, &::before {
      content: '';
      position: absolute;
      top: 0;
      height: 80%;
      width: 5px;
      box-shadow: 0 24px 48px 0 rgba(95, 95, 95, 0.2), 0 2px 6px 0 rgba(149, 149, 149, 0.1);
      z-index: -1;
      border-radius: 500px;
    }
    .marker {
      font-size: 2.4rem;
    }
    .location {
      margin: 2rem 0 3rem 0;
      @include intro-text;
      font-size: 1.4rem;
      text-transform: uppercase;
    }
    .body {
      text-align: left;
      @include text-body;
    }
  }
  .story-hero-cont {
    width: 100vw;
    height: 48.43vw;
    position: relative;
    overflow: hidden;
    z-index: -1;
    padding-top: 15.4rem;
    @include respond-to(lg) {padding-top: 8.8rem}
    @include respond-to(md) {padding-top: 8rem}
    @include respond-to(sm) {padding-top: 6rem; overflow: hidden;}
    .story-hero-image {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      z-index: -1;
    }
    h1 {
      text-transform: uppercase;
      color: $wh-white;
      text-align: center;
      font-size: 5.2rem;
      @include respond-to(lg) { font-size: 3.2rem; }
      @include respond-to(md) { font-size: 2.8rem; }
      @include respond-to(sm) { font-size: 2.4rem; }
    }
    .handle {
      @include intro-text;
      font-size: 1.4rem;
      letter-spacing: 4px;
      text-align: center;
      text-transform: uppercase;
      margin-top: 1rem;
      margin-bottom: 5rem;
      color: $wh-white;
      @include respond-to(lg) {margin-bottom: 4rem;}
      @include respond-to(md) {margin-bottom: 3rem;}
    }
  }
  .hr-line {
    height: 0.4rem;
    background-color: $wh-black;
    width: 3.6rem;
    border-radius: 0px;
    margin: auto;
    &.white {
      background-color: $wh-white;
    }
  }
  .book-end-tag {
    text-transform: uppercase;
    letter-spacing: 1rem;
    text-align: center;
    margin: 10rem 0 11rem 0;
    @include respond-to(lg) {
      font-size: 2.4rem;
      letter-spacing: 7.5px;
      margin: 6rem 0 10rem 0;
    }
    @include respond-to(md) {
      font-size: 2rem;
      letter-spacing: 6px;
      margin: 6rem 0 8rem 0;
    }
    @include respond-to(sm) {
      margin: 3rem 0 4rem 0;
    }
  }
</style>
