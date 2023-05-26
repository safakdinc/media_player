<template>
  <div class="w-full h-4 flex text-xs items-center gap-2 px-1">
    <div v-html="elapsedTime()"></div>
    <div class="flex-grow flex items-center">
      <input
        v-model="value"
        type="range"
        min="0"
        :max="audioDuration"
        class="slider w-full h-full"
        id="position"
        @input="handleInput"
        name="position" />
    </div>
    <div v-html="totalTime()" @click=""></div>
  </div>
</template>
<script setup>
import { ref, watch, reactive } from 'vue';

const props = defineProps({
  playbackTime: {
    type: [Number, String],
    required: true,
    default: 0
  },
  audioDuration: {
    type: [Number, String],
    default: 0
  }
});

const seconds = ref(null);
const value = ref(0);
const anchor = ref(null);

const convertTime = seconds => {
  const format = val => `0${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(':');
};

watch(
  () => props.playbackTime,
  newPlaybackTime => {
    anchor.value = Math.round(newPlaybackTime);
    seconds.value = convertTime(newPlaybackTime);
  }
);

watch(seconds, newTime => {
  value.value = anchor.value;
  let element = document.querySelector('.slider');
  let ratio = (value.value / props.audioDuration) * 100;
  element.style.setProperty('--before-width', `${ratio}%`);
});

const totalTime = () => {
  let seconds = props.audioDuration;
  return convertTime(seconds);
};

const elapsedTime = () => {
  let seconds = Math.round(value.value); // Round the seconds to the nearest integer
  return convertTime(seconds);
};

onMounted(async () => {
  setTimeout(() => {
    let element = document.querySelector('.slider');
    let ratio = (value.value / props.audioDuration) * 100;
    element.style.setProperty('--before-width', `${ratio}%`);
  }, 10);
});

onMounted(() => {
  elapsedTime();
  totalTime();
});

const emits = defineEmits(['update']);

const handleInput = () => {
  emits('update', value.value);
};
</script>

<style scoped>
.background {
  background: linear-gradient(0deg, rgb(92, 77, 144) 0%, rgb(125, 107, 157) 100%);
}

.play-button {
  height: 45px;
}
input[type='range'] {
  z-index: 1;
  margin: auto;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 100%;
  height: 5px;
  cursor: pointer;
  outline: none;
  border-radius: 5px; /* iOS */
  background: white;
}
.slider {
  position: relative;
}
.slider::before {
  content: '';
  z-index: -1;
  width: calc(var(--before-width));
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #f50;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  margin-right: 2px;
  background-color: #f50;
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}

input[type='range']::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: #f50;
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}

input[type='range']::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 10px rgba(255, 85, 0, 0.4);
}

input[type='range']::-moz-range-thumb:hover {
  box-shadow: 0 0 0 10px rgba(255, 85, 0, 0.4);
}
</style>
