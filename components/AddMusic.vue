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
              {{ calculateDuration(data.duration) }}
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
import { storeKey, useStore } from 'vuex';

const emits = defineEmits(['closeModal']);

const store = useStore();

const link = ref('');
const data = ref(null);
const getYoutubeData = async () => {
  let url = link.value;
  try {
    let response = await $fetch(`/api/audio_data?url=${url}`);
    let duration = response.duration;
    let title = response.title;
    let thumbnail = response.thumbnail;
    data.value = { title: title, thumbnail: thumbnail, duration: duration };
  } catch (error) {
    console.log(error);
  }
};
const calculateDuration = parameter => {
  const hours = Math.floor(parameter / 3600);
  const minutes = Math.floor((parameter % 3600) / 60);
  const seconds = parameter % 60;
  let calculated_hours = hours + ':';
  let calculated_minutes = minutes + ':';
  let calculated_seconds = seconds;
  if (hours < 1) {
    calculated_hours = '';
  }
  if (minutes < 10) {
    calculated_minutes = '0' + minutes + ':';
  }
  if (seconds < 10) {
    calculated_seconds = '0' + seconds;
  }
  let duration = calculated_hours + '' + calculated_minutes + '' + calculated_seconds;

  return duration;
};

const addTrack = () => {
  let url = link.value;
  store.dispatch('addTrackData', url);
  emits('closeModal');
};
</script>

<style scoped></style>
