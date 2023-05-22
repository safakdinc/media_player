import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      isPlaying: false,
      playingNow: '@/assets/strange.mp3'
    };
  },
  mutations: {
    togglePlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setPlayingNow(state, audio) {
      state.playingNow = audio;
    }
  }
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
