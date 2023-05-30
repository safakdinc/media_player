<template>
  <div class="w-full h-full text-white flex justify-center items-center">
    <div class="w-[700px] flex flex-wrap gap-1 rounded-lg" style="background-color: rgba(24, 24, 24); min-height: 400px">
      <div class="w-full p-3">
        <div class="field field_v2">
          <input
            id="last-name"
            class="field__input text-white"
            v-model="link"
            placeholder="Link"
            @input="getYoutubeData"
            autocomplete="off" />
          <span class="field__label-wrap" aria-hidden="true">
            <span class="field__label text-white">Type a youtube link</span>
          </span>
        </div>
      </div>
      <div class="w-full p-3" v-if="data">
        {{ data.title }}
      </div>
      <div class="w-full p-3 relative">
        <img class="rounded-lg" :src="data.thumbnail" />
        <div class="absolute bottom-3 right-5">
          <div class="flex items-center">
            {{ data.duration.hours }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import '@/assets/css/input.css';
import moment from 'moment';

const axios = useNuxtApp().$axios;

const link = ref('');
const data = ref({});
const getYoutubeData = async () => {
  try {
    let response = await axios.get('http://localhost:8888/api/audio_data', {
      params: {
        link: link.value
      }
    });
    let iso8601Duration = response.data.duration;
    let duration = moment.duration(iso8601Duration);
    let title = response.data.audioData.items[0].snippet.title;
    let thumbnail = response.data.audioData.items[0].snippet.thumbnails.maxres.url;
    data.value.title = title;
    data.value.thumbnail = thumbnail;
    data.value.duration = { hours: duration.hours(), minutes: duration.minutes(), seconds: duration.seconds() };
    console.log(data.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
