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
      <div class="w-full flex flex-wrap" v-if="data">
        <div class="w-full p-3">
          {{ data.title }}
        </div>
        <div class="w-full p-3 relative">
          <img class="rounded-lg" :src="data.thumbnail" />
          <div class="absolute bottom-3 right-5">
            <div class="flex items-center">
              {{ duration_ref.hours == 0 ? '' : duration_ref.hours }}{{ duration_ref.minutes }}:{{ duration_ref.seconds }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-3 pb-3 flex items-center justify-end" v-if="data">
        <div
          class="py-1 rounded-lg w-20 flex justify-center items-center text-xl cursor-pointer"
          style="background-color: rgb(40, 200, 134)"
          @click="addTrack">
          Ekle
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import '@/assets/css/input.css';
import moment from 'moment';
import { storeKey, useStore } from 'vuex';

const emits = defineEmits(['closeModal']);

const axios = useNuxtApp().$axios;
const store = useStore();

const link = ref('');
const data = ref(null);
const getYoutubeData = async () => {
  let url = link.value;
  try {
    let response = await $fetch(`/api/audio_data?url=${url}`);
    let iso8601Duration = response.duration;
    let duration = moment.duration(iso8601Duration);
    let title = response.data.items[0].snippet.title;
    let thumbnail = response.data.items[0].snippet.thumbnails.maxres.url;
    data.value = {};
    data.value.title = title;
    data.value.thumbnail = thumbnail;
    data.value.duration = { hours: duration.hours(), minutes: duration.minutes(), seconds: duration.seconds() };
    calculateDuration();
  } catch (error) {
    console.log(error);
  }
};
const duration_ref = ref({});
const calculateDuration = () => {
  let duration = data.value.duration;
  let minutes = null;
  let seconds = null;
  let hours = null;
  if (duration.hours == 0) {
    hours = 0;
  } else if (duration.hours < 10) {
    hours = '0' + duration.hours;
  } else {
    hours = duration.hours;
  }
  if (duration.minutes == 0) {
    minutes = '00';
  } else if (duration.minutes < 10) {
    minutes = '0' + duration.minutes;
  } else {
    minutes = duration.minutes;
  }
  if (duration.seconds == 0) {
    seconds = '00';
  } else if (duration.seconds < 10) {
    seconds = '0' + duration.seconds;
  } else {
    seconds = duration.seconds;
  }
  duration_ref.value.hours = hours;
  duration_ref.value.seconds = seconds;
  duration_ref.value.minutes = minutes;
  console.log(duration_ref.value);
};
const addTrack = () => {
  let url = link.value;
  store.dispatch('addTrackData', url);
  emits('closeModal');
};
</script>

<style scoped></style>
