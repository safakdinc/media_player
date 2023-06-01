<template>
  <div class="w-full overflow-auto">
    <div class="w-full sticky top-0 left-0 flex items-center h-24 gap-5 text-[aliceblue]">
      <div class="text-4xl font-fester font-bold">Oynatma Listeleri</div>
    </div>
    <div class="text-[aliceblue]">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>
