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
      <div class="w-full" v-if="data && notFound != true">
        <div class="w-full flex flex-wrap">
          <div class="w-full p-3">
            {{ data.title }}
          </div>
          <div class="w-full p-3 relative">
            <img class="rounded-lg w-full h-full" :src="data.thumbnail" />
            <div class="absolute bottom-3 right-5">
              <div class="flex items-center">
                {{ calculateDuration(data.duration) }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-3 pb-3 flex items-center justify-end">
          <div
            v-if="data"
            class="py-1 rounded-lg w-20 flex justify-center items-center text-xl cursor-pointer"
            style="background-color: rgb(40, 200, 134)"
            @click="addTrack">
            Ekle
          </div>
        </div>
      </div>
      <div v-if="notFound" class="w-full h-52 flex flex-wrap justify-center items-center content-start">
        <div class="w-full">
          <client-only>
            <Vue3Lottie :animationData="notFoundJSON" :autoPlay="true" :height="100" :width="100" />
          </client-only>
        </div>
        <div>Video Bulunamadı</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import notFoundJSON from '@/assets/animations/notFound.json';
import { ref } from 'vue';
import '@/assets/css/input.css';
import { storeKey, useStore } from 'vuex';
import { Vue3Lottie } from 'vue3-lottie';

const emits = defineEmits(['closeModal']);

const store = useStore();

const link = ref('');
const data = ref(null);
const notFound = ref(null);
const getYoutubeData = async () => {
  let url = link.value;
  try {
    const { data: response } = await useFetch('/api/audio_data', {
      params: {
        url: url
      }
    });
    let duration = response.value.duration;
    let title = response.value.title;
    let thumbnail = response.value.thumbnail;
    if (title != null) {
      data.value = { title: title, thumbnail: thumbnail, duration: duration };
      notFound.value = false;
    } else {
      notFound.value = true;
    }
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
