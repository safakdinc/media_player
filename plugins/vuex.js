import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      tracks: [
        'https://www.youtube.com/watch?v=QvqjVCWT_4g',
        'https://www.youtube.com/watch?v=z69T1yUzn44',
        'https://www.youtube.com/watch?v=mKfzgL8VRV4'
      ],
      playingNowIndex: 0,
      playingNow: ''
    };
  },
  mutations: {
    setPlayingNow(state, payload) {
      state.playingNow = payload.link;
      state.playingNowThumbnail = payload.thumbnail;
      state.playingNowIndex = payload.index;
    },
    nextTrack(state) {
      state.playingNowIndex++;
      if (state.playingNowIndex >= state.tracks.length) {
        state.playingNowIndex = 0;
      }
      state.playingNow = state.tracks[state.playingNowIndex];
    }
  }
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
