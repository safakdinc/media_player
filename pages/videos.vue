<template>
  <div class="w-full">
    <div class="w-full sticky flex items-center h-24 gap-5 text-[aliceblue]">
      <div class="text-4xl font-fester font-bold">Video</div>
      <div
        v-for="(item, index) in items"
        class="flex gap-3 font-yolk text-lg items-center cursor-pointer">
        {{ item }}
      </div>
    </div>
    <div class="w-full text-white">
      Videolar
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const items = ref(['Tüm Videolar', 'Klasörler']);
</script>

<style scoped></style>
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
</style>
<style src="@/assets/css/fonts.css"></style>
