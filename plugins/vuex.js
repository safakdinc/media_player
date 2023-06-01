import { createStore } from 'vuex';
import axios from 'axios';
import moment from 'moment';
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
      playingNow: { link: '', title: '', thumbnail: '', duration: '', source: '' }
    };
  },
  mutations: {
    setPlayingNow(state, payload) {
      state.playingNowIndex = payload.index;
      state.playingNow = state.tracksData[payload.index];
      state.playingNow.source = payload.source;
    },
    addNewTrack(state, link) {
      state.tracks.push(link);
    },
    addNewTrackData(state, track) {
      state.tracksData.unshift(track);
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
      let response = await $fetch(`/api/audio_link?url=${payload.link}`);
      commit('setPlayingNow', { source: response.data, index: payload.index });
    },
    //init tracks info
    async getTracksData({ commit, state }) {
      state.tracks.forEach(async link => {
        setTimeout(async () => {
          let response = await $fetch(`/api/audio_data?url=${link}`);
          let iso8601Duration = response.duration;
          let duration = moment.duration(iso8601Duration);
          let title = response.data.items[0].snippet.title;
          let thumbnail = response.data.items[0].snippet.thumbnails.maxres.url;
          state.tracksData.push({
            title: title,
            link: link,
            thumbnail: thumbnail,
            duration: { hours: duration.hours(), minutes: duration.minutes(), seconds: duration.seconds() }
          });
        }, 100);
      });
    },
    async addTrackData({ commit, state }, link) {
      let data = {};
      let response = await $fetch(`/api/audio_data?url=${link}`);
      let iso8601Duration = response.duration;
      let duration = moment.duration(iso8601Duration);
      let title = response.data.items[0].snippet.title;
      let thumbnail = response.data.items[0].snippet.thumbnails.maxres.url;
      data.title = title;
      data.link = link;
      data.thumbnail = thumbnail;
      data.duration = { hours: duration.hours(), minutes: duration.minutes(), seconds: duration.seconds() };
      commit('addNewTrackData', data);
    }
  }
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
