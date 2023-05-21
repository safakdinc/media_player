// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt 3 Portfolio',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  buildModules: [
    // ...
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuex'
  ],
  modules: ['@vueuse/motion/nuxt'],
  css: ['~/assets/css/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  plugins: ['~/plugins/fontawesome.js', '~/plugins/vuex.js']
});
