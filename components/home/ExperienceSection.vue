<template lang="html">
  <div class="experience-section-cont">
    <div class="section-heading-cont">
      <p class="header">Our Instagram</p>
      <p class="subtext">#WallaceHatch</p>
      <hr class="line">
    </div>
    <live-instagram-feed :instagramPosts="instagramPosts" ></live-instagram-feed>
    <div class="quote-box">
      <p class="quote-text">“You can have anything you want in life if you dress for it.”</p>
      <p class="quote-source">– Edith Head</p>
    </div>
  </div>
</template>

<script>
import LiveInstagramFeed from './LiveInstagramFeed';
import InstagramService from '@/InstagramService';

export default {
  components: {
    LiveInstagramFeed,
  },
  data() {
    return {
      instagramPosts: null
    }
  },
  mounted(){
    InstagramService.getInstagramPosts().then((result) => {
      this.instagramPosts = result.data.graphql.user.edge_owner_to_timeline_media.edges.slice(0,12);
    })
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .experience-section-cont .section-heading-cont {
    padding-bottom: 0;
  }

  .experience-section-cont {
    text-align: center;
    .quote-box {
      display: inline-block;
      margin: 6rem 1rem 7rem 1rem;
      max-width: 73.6rem;
      border: solid 2.4px #f1f1f1;
      padding: 4rem 8rem;
      box-sizing: border-box;
      @include respond-to(lg) {max-width: 58.8rem; margin: 4rem 1rem 5rem 1rem;}
      @include respond-to(sm) {padding: 2.4rem 3rem;}
    }
    .quote-text {
      @include text-quote;
      text-transform: uppercase;
      @include respond-to(lg) {
        font-size: 1.4rem;
        line-height: 1.43;
	      letter-spacing: 4px;
      }
    }
    .quote-source {
      @include intro-text;
      font-size: 1.2rem;
      margin-top: 1rem;
      letter-spacing: 4px;
      text-transform: uppercase;
    }
  }
</style>
