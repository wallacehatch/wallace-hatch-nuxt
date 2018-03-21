<template lang="html">
  <div class="band-section-cont">
    <h1 class="uppercase">Additional Bands</h1>
    <p class="uppercase">Customers who baught this item also bought</p>
    <hr class="line">
    <div class="band-showcase-cont">
     <band-tile v-for="(band, i) in bands" :key="'bTile' + i" :band="band"></band-tile>
   </div>
  </div>
</template>

<script>
import BandTile from './BandTile'
export default {
  data () {
    return {
      bands: null
    }
  },
  components: {
    BandTile,
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style lang="scss">
  @import '../../assets/css/_variables.scss';
  .band-section-cont{
    text-align: center;
    padding: 11rem 0 3rem 0;
    overflow: auto;
    .line {
      margin: 5rem auto 4rem auto;
      border: none;
      border-bottom: 4px solid $wh-black;
      width: 4rem;
      margin-bottom: 3rem;
      @include respond-to(sm) {
        margin-bottom: 2rem;
      }
    }
      .band-showcase-cont {

    padding: 0 2rem;
    margin: 0 auto;
    overflow: visible;
    @include respond-to(lg) {padding: 0 0.75rem}
    max-width: 144rem;
  }


  }


</style>
