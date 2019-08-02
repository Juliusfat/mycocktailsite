
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */

 server: {
  port: 8000, // par défaut: 3000
  // host: '0.0.0.0', par défaut: localhost
  },

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/css/style.css' },
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // ssr: false to only include it on client-side
    { src: '~/plugins/html2canvas.js', ssr: false },
    { src: '~/plugins/jspdf.js', ssr: false },
    { src: '~/plugins/font-awesome' },
    { src: '~/plugins/vue-notifications', ssr: false},
    { src: '~/plugins/vue-star-rating', ssr: true}
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
    proxyHeaders: false,
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    build: {
      vendor: ['html2canvas', 'jspdf']
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
