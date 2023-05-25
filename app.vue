<template>
  <NuxtLayout name="default">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
<script setup></script>

<style>
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
