<template lang="html">
  <div class="instagram-feed-cont">
      <a class="instagram-image" :class="{'four-tile': fourTile}" v-for="(post, i) in instagramPosts"
      target="_blank" :href="'https://www.instagram.com/p/'+ post.node.shortcode + '/'"
      :style="{ 'background-image': 'url(' + post.node.display_url + ')' }">
      </a>
    <div class="insta-btn-wrapper" :class="{'four-tile': fourTile}">
      <a target="_blank" href="https://www.instagram.com/wallaceHatch/" class="view-insta-btn">View Our Instagram</a>
    </div>
  </div>
</template>

<script>
import InstagramService from '@/InstagramService';
export default {
  props: ['instagramPosts', 'fourTile'],
  methods: {
    clickInstagramMedia(mediaId) {
      InstagramService.getInstagramMediaInfo(mediaId).then((result) => {
          console.log("insta media info is");
          console.log(result);
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.instagram-feed-cont {
  margin: 4rem 2.3rem 0 2.3rem;
  padding-bottom: 0.9rem;
  box-sizing: border-box;
  @include respond-to(lg) {margin: 0rem 1rem;}
  @include respond-to(md) {margin-top: 1.5rem;}
  @include respond-to(sm) {margin-top: 2.5rem;}
  &:after {
    content: "";
    display: block;
    padding-bottom: 33.33%;
    @include respond-to(sm) {padding-bottom: 0;}
  }

  .insta-btn-wrapper {
    clear: both;
    padding-top: 1.5rem;
    padding-bottom: 3.1rem;
    display: none;
    @include respond-to(sm) {display: block;}
    &.four-tile {display: none;}
  }
  .view-insta-btn {
    display: block;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 7px 10px 2px rgba(0, 0, 0, 0.15), 0 4px 4px 0 rgba(0, 0, 0, 0.05);
    border: solid 3px #000000;
    text-transform: uppercase;
    @include intro-text;
    font-size: 1.2rem;
    padding: 1.6rem 0;
    font-weight: bold;
    @include respond-to(md) {padding: 1rem 0}
  }
  .instagram-image {
    display: inline-block;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: calc(16.66% - 2px);
    font-size: 30rem;
    background-size: cover;
    float: left;
    margin: 0 0.1rem 0.2rem 0.1rem;
    text-indent: 100%;
    transition: .2s all cubic-bezier(.55,.15,.41,.84);
    position: relative;
    z-index: 1;
    &:after {
      content: "";
      display: block;
      padding-bottom: 100%;
    }
    &:hover {
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 0 12px 24px 0 rgba(95,95,95,0.70);
      transform: translateY(-8px);
      z-index: 2;
    }
    &:nth-of-type(n + 6):hover {
      transform: translateY(8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 0 -12px 24px 0 rgba(95,95,95,0.70);
    }
    &:first-of-type:hover {
      transform: translate(-8px, -8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 12px 12px 24px 0 rgba(95,95,95,0.70);
    }
    &:last-of-type:hover {
      transform: translate(8px, 8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), -12px -12px 24px 0 rgba(95,95,95,0.70);
    }
    &:nth-of-type(6):hover {
      transform: translate(8px, -8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), -12px 12px 24px 0 rgba(95,95,95,0.70);
    }
    &:nth-of-type(7):hover {
      transform: translate(-8px, 8px);
      box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 12px -12px 24px 0 rgba(95,95,95,0.70);
    }

    @mixin four-tile() {
      width: calc(50% - 2px);
      &:nth-of-type(2):hover {
        transform: translate(8px, -8px);
        box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), -12px 12px 24px 0 rgba(95,95,95,0.70);
      }
      &:nth-of-type(3):hover {
        transform: translate(-8px, 8px);
        box-shadow: 0 2px 6px 0 rgba(149,149,149,0.30), 12px -12px 24px 0 rgba(95,95,95,0.70);
      }
      &:nth-of-type(n + 5){
        display: none;
      }
    }
    &.four-tile {
      @include four-tile;
    }
    @include respond-to(sm) {
      @include four-tile;
    }
  }
}
</style>
