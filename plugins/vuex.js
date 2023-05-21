import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      isPlaying: false
    };
  },
  mutations: {
    togglePlaying(state) {
      state.isPlaying = !state.isPlaying;
    }
  }
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
