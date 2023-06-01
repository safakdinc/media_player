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
  serverMiddleware: [
    {
      path: '/api', // The path where you want to apply CORS middleware
      handler: '~/middlewares/cors.js'
    }
  ],
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
  plugins: ['~/plugins/fontawesome.js', '~/plugins/vuex.js']
});
