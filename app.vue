<template>
  <NuxtLayout name="default">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup>
import '@/assets/css/fonts.css';
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
