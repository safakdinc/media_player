<template>
  <div class="w-full h-[50vh] flex justify-center items-center box">
    <div class="w-full h-full relative transition-all duration-500 flex gap-1 items-end" ref="visualizer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/visualizer.css';

const visualizer = ref(null);

const audio = ref(null);
const ctx = new window.AudioContext();
const analyser = ctx.createAnalyser();
const source = ref(null);
analyser.fftSize = 64;
const bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
const elements = ref([]);
onMounted(async () => {
  audio.value = document.querySelector('audio');
  audio.value.crossOrigin = 'anonymous';
  source.value = ctx.createMediaElementSource(audio.value);
  source.value.connect(analyser);
  source.value.connect(ctx.destination);
});
onMounted(async () => {
  for (let i = 0; i < bufferLength; i++) {
    let element = document.createElement('div');
    element.classList.add('element');
    elements.value.push(element);
    visualizer.value.appendChild(element);
  }
  update();
});
const clamp = (num, min, max) => {
  if (num >= max) {
    return max;
  } else if (num <= min) {
    return min;
  } else {
    return num;
  }
};
const update = () => {
  requestAnimationFrame(update);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    let item = dataArray[i];
    item = item > 150 ? item : item * 1.5;
    elements.value[i].style.height = `${item}px`;
  }
};
</script>
