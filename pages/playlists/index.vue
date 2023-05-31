<template>
  <Suspense>
    <div class="text-white">{{ text }}</div>

    <template #fallback>
      <div class="text-white">Loading</div>
    </template>
  </Suspense>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const text = ref(null);

function fetchText() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('text');
    }, 30000);
  });
}

onMounted(async () => {
  text.value = await fetchText();
}); // Call fetchText on component mount
</script>
