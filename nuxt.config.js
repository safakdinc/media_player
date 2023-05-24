// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt 3 Portfolio',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  buildModules: [
    // ...
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuex'
  ],
  modules: ['@vueuse/motion/nuxt', 'nuxt-headlessui'],
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
  plugins: ['~/plugins/fontawesome.js', '~/plugins/vuex.js']
});
