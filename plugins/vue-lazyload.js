import Vue from 'vue'
import VueLazyload from 'vue-lazyload';

const config = {
  observer: true,
}

Vue.use(VueLazyload, config)
