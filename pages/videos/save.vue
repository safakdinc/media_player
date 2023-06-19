<template>
  <div class="w-full flex flex-wrap gap-3">
    <div v-for="(box, index) in boxes" :key="index" class="w-[200px] h-[200px]" @click="toggleActive($event, index)">
      <div class="box" :class="{ fixed: box.isActive, relative: !box.isActive }" :style="{ left: box.left, top: box.top }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const { $anime } = useNuxtApp();

const boxes = ref([
  { isActive: false, left: 0, top: 0 },
  { isActive: false, left: 0, top: 0 },
  { isActive: false, left: 0, top: 0 },
  { isActive: false, left: 0, top: 0 }

  // Add more box objects as needed
]);

function toggleActive(event, index) {
  let box = boxes.value[index];
  let element = event.target;
  box.isActive = !box.isActive;
  let rect = element.getBoundingClientRect();
  // Apply animation
  if (box.isActive) {
    box.left = rect.left;
    box.top = rect.top;
    $anime({
      targets: element,
      left: [box.left, window.innerWidth / 2 - element.offsetWidth / 2],
      top: [box.top, window.innerHeight / 2 - element.offsetHeight / 2],
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  } else {
    box.left = rect.left;
    box.top = rect.top;
    $anime({
      targets: element,
      left: 0,
      top: 0,
      duration: 1000,
      easing: 'easeInOutQuad'
    });
  }
  console.log(box);
}
</script>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>
