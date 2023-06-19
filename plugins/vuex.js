import { createStore } from 'vuex';
const store = createStore({
  state() {
    return {
      tracks: [
        'https://www.youtube.com/watch?v=QvqjVCWT_4g',
        'https://www.youtube.com/watch?v=z69T1yUzn44',
        'https://www.youtube.com/watch?v=mKfzgL8VRV4',
        'https://www.youtube.com/watch?v=RQOJ8Q0bjU0&'
      ],
      tracksData: [],
      playingNowIndex: 0,
      playingNow: { link: '', title: '', thumbnail: '', duration: '', source: '', index: null }
    };
  },
  mutations: {
    setPlayingNow(state, payload) {
      const item = state.tracksData.find(track => track.index === payload.index);
      state.playingNowIndex = payload.index;
      state.playingNow = item;
      state.playingNow.source = payload.source;
    },
    addNewTrack(state, link) {
      state.tracks.push(link);
    },
    nextTrack(state) {
      state.playingNowIndex++;
      if (state.playingNowIndex > state.tracks.length - 1) {
        state.playingNowIndex = 0;
      }
      console.log(state.playingNowIndex);
      state.playingNow = state.tracksData[state.playingNowIndex];
    },
    previousTrack(state) {
      state.playingNowIndex--;
      if (state.playingNowIndex < 0) {
        state.playingNowIndex = state.tracks.length - 1;
      }
      console.log(state.playingNowIndex);
      state.playingNow = state.tracksData[state.playingNowIndex];
    }
  },
  actions: {
    async getTrackLink({ commit, state }, payload) {
      const { data: response } = await useFetch('/api/audio_link', {
        params: {
          url: payload.link
        }
      });
      commit('setPlayingNow', { source: response.value.data, index: payload.index });
    },
    //init tracks info
    async getTracksData({ commit, dispatch, state }) {
      state.tracks.forEach(async (link, index) => {
        const { data: response } = await useFetch(`/api/audio_data`, {
          params: {
            url: link
          }
        });
        let duration = response.value.duration;
        let title = response.value.title;
        let thumbnail = response.value.thumbnail;
        state.tracksData.push({
          index: index,
          title: title,
          link: link,
          thumbnail: thumbnail,
          duration: duration
        });
      });
    },
    async addTrackData({ commit, state }, link) {
      const { data: response, error } = await useFetch(`/api/audio_data`, {
        params: {
          url: link
        }
      });
      let duration = response.value.duration;
      let title = response.value.title;
      let thumbnail = response.value.thumbnail;
      state.tracksData.unshift({
        index: state.tracksData.length,
        title: title,
        link: link,
        thumbnail: thumbnail,
        duration: duration
      });
    }
  }
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
