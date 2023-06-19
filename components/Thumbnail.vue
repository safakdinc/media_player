<template>
  <div class="w-full h-full relative top-0 left-0 flex justify-center items-center z-20" ref="image" @click="handleClick">
    <img v-if="src" class="image w-full h-full object-cover object-center rounded-md" :src="src" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  src: String
});

const image = ref();

const { $anime } = useNuxtApp();

const isClicked = ref(false);

onMounted(() => {
  window.addEventListener('resize', () => {
    if (isClicked.value) {
      let element = image.value;
      let rect = element.getBoundingClientRect();
      console.log(window.innerWidth / 2 - rect.width / 2);
      $anime({
        targets: element,
        left: window.innerWidth / 2,
        top: window.innerHeight / -2,
        easing: 'easeOutQuad',
        duration: 500
      });
    }
  });
});

const handleClick = event => {
  isClicked.value = !isClicked.value;
  let element = image.value;
  animateImage(element);
};

const animateImage = element => {
  let rect = element.getBoundingClientRect();
  console.log(window.innerWidth / 2 - rect.width / 2);
  if (isClicked.value) {
    $anime({
      zIndex: {
        value: [99, 99],
        round: true
      },
      targets: element,
      scale: 3,
      left: window.innerWidth / 2 - rect.width / 2,
      top: window.innerHeight / -2 + rect.height / 2,
      easing: 'easeOutQuad',
      duration: 500
    });
  } else {
    $anime({
      targets: element,
      scale: 1,
      left: 0,
      top: 0,
      easing: 'easeOutQuad',
      duration: 500
    });
  }
  console.log(window.innerWidth / 2 - rect.width / 2);
};
</script>

<style scoped></style>
