<template>
  <div class="flex-grow flex items-center gap-2">
    <div
      v-if="showButtons"
      class="w-8 h-full flex items-center justify-center cursor-pointer hover:text-orange-400"
      style="transition: color 0.2s ease"
      @click="muteAudio">
      <font-awesome v-if="volumeValue == 0" :icon="['fas', 'volume-xmark']" />
      <font-awesome v-else-if="audioMuted" :icon="['fas', 'volume-xmark']" />
      <font-awesome v-else-if="volumeValue > 0 && volumeValue < 50" :icon="['fas', 'volume-low']" />
      <font-awesome v-else-if="volumeValue >= 50" :icon="['fas', 'volume-high']" />
    </div>
    <div class="h-full w-64 flex items-center volumeSlider">
      <input
        v-model="volumeValue"
        type="range"
        min="0"
        max="100"
        @input="setVolume"
        class="w-full h-full"
        id="position"
        name="position" />
    </div>
    <div class="text-sm w-7 flex justify-center">{{ volumeValue }}</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  volume: Number,
  player: String
});

const emits = defineEmits(['setVolume', 'muteAudio']);

const setVolume = () => {
  let element = document.querySelector('.volumeSlider');
  element.style.setProperty('--before-width', `${volumeValue.value}%`);
  emits('setVolume', volumeValue.value);
};

const muteAudio = () => {
  audioMuted.value = !audioMuted.value;
  emits('muteAudio');
};

const volumeValue = ref(props.volume);
const audioMuted = ref(false);
const playerElement = ref(props.player);

const showButtons = ref(false);
onMounted(async () => {
  setTimeout(() => {
    showButtons.value = true;
  }, 10);
});

const setVolume_enter = () => {
  let audio = playerElement.value;
  if (audio) {
    let element = document.querySelector('.volumeSlider');
    element.style.setProperty('--before-width', `${volumeValue.value}%`);
  }
};
onMounted(() => {
  setVolume_enter();
});
</script>

<style scoped>
.play-button {
  height: 45px;
}
input[type='range'] {
  z-index: 1;
  margin: auto;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  cursor: pointer;
  outline: none;
  border-radius: 5px; /* iOS */
  background: white;
}
.volumeSlider {
  position: relative;
}
.volumeSlider::before {
  content: '';
  pointer-events: none;
  height: 100%;
  width: var(--before-width);
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-color: #f50;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
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
