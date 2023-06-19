<template>
  <transition name="loading" mode="out-in">
    <div v-if="loading" class="fixed top-0 left-0 w-full h-full flex justify-center items-center text-white">
      <client-only>
        <Vue3Lottie :animationData="loadingJSON" :autoPlay="true" :height="200" :width="200" />
      </client-only>
    </div>
  </transition>
  <Transition name="loading" mode="out-in">
    <NuxtLayout v-if="!loading" name="default">
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </Transition>
</template>
<script setup>
import 'vue3-lottie/dist/style.css';
import { onMounted, ref, watch } from 'vue';
import '@/assets/css/fonts.css';
import '@/assets/css/loading.css';
import '@/assets/css/page-transitions.css';
import loadingJSON from '@/assets/animations/loading.json';

import { useStore } from 'vuex';

const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
<style>
.font_1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.font-fester {
  font-family: 'Fester Bold', sans-serif;
}
.font-yolk {
  font-family: 'TPF Yolk Bold', sans-serif;
}
.font-code-next {
  font-family: 'Code Next Book', sans-serif;
}
.page-leave-active,
.page-enter-active {
  transition: all 0.5s;
}
.page-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(200px);
}
.page-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
