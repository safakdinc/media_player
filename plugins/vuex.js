import { createStore } from 'vuex';
import axios from 'axios';
import moment from 'moment';
const store = createStore({
  state() {
    return {
      tracks: [
        'https://www.youtube.com/watch?v=QvqjVCWT_4g',
        'https://www.youtube.com/watch?v=z69T1yUzn44',
        'https://www.youtube.com/watch?v=mKfzgL8VRV4'
      ],
      tracksData: [],
      playingNowIndex: 0,
      playingNow: { link: '', title: '', thumbnail: '', duration: '' }
    };
  },
  mutations: {
    setTracksDatas(state, payload) {
      state.tracksData = payload;
    },
    setPlayingNow(state, index) {
      state.playingNow = state.tracksData[index];
    },
    addNewTrack(state, link) {
      state.tracks.push(link);
    },
    addNewTrackData(state, track) {
      state.tracksData.push(track);
    },
    nextTrack(state) {
      state.playingNowIndex++;
      if (state.playingNowIndex >= state.tracks.length) {
        state.playingNowIndex = 0;
      }
      state.playingNow = state.tracksData[state.playingNowIndex];
    }
  },
  actions: {
    async getTracksDatas({ commit, state }) {
      const datas = [];
      state.tracks.forEach(async link => {
        let response = await $fetch(`/api/audio_data?url=${link}`);
        let iso8601Duration = response.duration;
        let duration = moment.duration(iso8601Duration);
        let title = response.data.items[0].snippet.title;
        let thumbnail = response.data.items[0].snippet.thumbnails.maxres.url;
        datas.unshift({
          title: title,
          link: link,
          thumbnail: thumbnail,
          duration: { hours: duration.hours(), minutes: duration.minutes(), seconds: duration.seconds() }
        });
      });
      commit('setTracksDatas', datas);
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
