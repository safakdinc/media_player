// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt 3 Portfolio',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'tr'
      }
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  buildModules: [
    // ...
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuex'
  ],

  modules: ['@vueuse/motion/nuxt', 'nuxt-headlessui', '@nuxt/devtools', '@nuxtjs/fontaine'],

  headlessui: {
    prefix: 'Headless'
  },
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  plugins: ['~/plugins/fontawesome.client.js', '~/plugins/vuex.js'],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  }
});
