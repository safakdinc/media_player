<template>
  <div class="flex-grow flex items-center gap-2">
    <div
      class="w-8 h-full flex items-center justify-center cursor-pointer hover:text-orange-400"
      style="transition: color 0.2s ease"
      @click="toggleAudio">
      <ClientOnly>
        <font-awesome v-if="modelValue == 0" :icon="['fas', 'volume-xmark']" />
        <font-awesome v-else-if="audioMuted" :icon="['fas', 'volume-xmark']" />
        <font-awesome v-else-if="modelValue > 0 && modelValue < 50" :icon="['fas', 'volume-low']" />
        <font-awesome v-else-if="modelValue >= 50" :icon="['fas', 'volume-high']" />
      </ClientOnly>
    </div>
    <div class="h-full w-64 flex items-center volumeSlider">
      <input
        :value="modelValue"
        type="range"
        min="0"
        max="100"
        @input="update(parseInt($event.target.value))"
        class="w-full h-full"
        id="position"
        name="position" />
    </div>
    <div class="text-sm w-7 flex justify-center">{{ modelValue }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: Number,
  audioMuted: Boolean
});

const emits = defineEmits(['update:modelValue', 'toggleAudio']);

const toggleAudio = () => {
  emits('toggleAudio');
};

const update = value => {
  emits('update:modelValue', value);
  let element = document.querySelector('.volumeSlider');
  element.style.setProperty('--before-width', `${value}%`);
};

onMounted(() => {
  let element = document.querySelector('.volumeSlider');
  element.style.setProperty('--before-width', `${props.modelValue}%`);
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
