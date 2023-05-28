<template>
  <div class="w-full flex flex-col gap-5 p-2">
    <div
      v-for="(item, index) in datas"
      class="w-full h-14 flex items-center gap-2 pr-2 pb-1 border-b hover-link cursor-pointer rounded-md"
      style="border-color: rgba(197, 197, 197, 0.4)"
      @click="playAudio(index)">
      <div class="h-full w-16">
        <img class="w-full h-full object-center object-cover rounded-sm" :src="item.thumbnail" />
      </div>
      <div class="w-2/5">{{ item.title }}</div>
      <div>Bilinmeyen Albüm</div>
      <div class="ml-auto">Bilinmeyen Tarz</div>
      <div class="ml-auto">
        {{ item.duration.hours !== 0 ? `${item.duration.hours}:` : '' }}{{ item.duration.minutes !== 0 ? item.duration.minutes : '00' }}:{{
          item.duration.seconds
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';

const store = useStore();
const axios = useNuxtApp().$axios;

const items = ref(store.state.tracks);
const datas = ref([]);
onMounted(async () => {
  items.value.forEach(async item => {
    let response = await axios.get('/api/audio_data', {
      params: {
        link: item
      }
    });
    let iso8601Duration = response.data.duration;
    const duration = moment.duration(iso8601Duration);
    let title = response.data.audioData.items[0].snippet.title;
    let thumbnail = response.data.audioData.items[0].snippet.thumbnails.maxres.url;
    datas.value.unshift({
      title: title,
      link: item,
      thumbnail: thumbnail,
      duration: { hours: duration.hours(), minutes: duration.minutes(), seconds: duration.seconds() }
    });
  });
});

const playAudio = async index => {
  let data = datas.value[index];
  store.commit('setPlayingNow', { link: data.link, thumbnail: data.thumbnail, index: index });
};
</script>

<style scoped>
.hover-link {
  position: relative;
  transition: background-color 0.25s ease-out;
  background-color: rgba(255, 255, 255, 0);
}
.hover-link:hover {
  background-color: rgb(32, 35, 39);
}
.hover-link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
<style scoped src="@/assets/css/page-transitions.css"></style>
