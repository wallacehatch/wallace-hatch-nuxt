require('dotenv').config()
module.exports = {

  head: {
    title: 'Wallace Hatch - Elegant watches, Affordable prices',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'xDDrCzPOdOiXABDCA0xDxBjUFOyoiFhMNJPFTFZPaGU' },
      { property: 'og:image', content: 'http://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-1w.jpg' },
      { property: 'og:image:secure_url', content: 'https://s3.us-east-2.amazonaws.com/wallace-hatch/hero-image-1w.jpg' },
      { property: 'og:title', content: 'Wallace Hatch - Elegant watches, Affordable prices' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Chic, elegant, and premium style at an exceedingly reasonable price — the perfect companion for tomorrow’s adventure.' },
      { property: 'og:url', content: 'https://wallacehatch.com/' },
      { property: 'og:site_name', content: 'Wallace Hatch' },
      { hid: 'description', name: 'description', content: "Chic, elegant, and premium style at an exceedingly reasonable price — the perfect companion for tomorrow’s adventure." },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://d3dty8fv62xana.cloudfront.net/WH_mark-32x32.png' }
    ],
    script: [{
      src: "/fontawesome-all.js",
      defer: true,
    }, {
      type: "text/javascript",
      src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDims8b5LgM2e4c7kLVgkqn3b5MPRgf0_U&libraries=places",
    }],
    noscript: [{
      innerHTML: `
      <img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=217133402174638&ev=PageView&noscript=1"/>
      `
    }]
  },

  loading: false,

  css: ['@/assets/css/main.scss'],

  plugins: ['@/plugins/vee-validate',
  '@/plugins/vue2-filters',
  '@/plugins/vue-lazyload',
  '@/plugins/vue-the-mask',
  {src: '@/plugins/ga', ssr: false},
  {src: '@/plugins/hotjar', ssr: false},
  {src: '@/plugins/facebookPixel', ssr: false},
  {src: '@/plugins/vue-touch', ssr: false}],

  env: {
    API_URL: process.env.API_URL,
    AD_ID: process.env.AD_ID,
  },
  build: {
    // vendor: ['vee-validate', 'vue-lazyload', 'vue-the-mask', 'vue-touch', 'vue2-filters', 'axios', 'animejs'],
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
