<template>
  <div class="w-full">
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
  middleware(to, from) {
    const links = ref([
      {
        path: '/musics',
        index: 1
      },
      {
        path: '/musics/albums',
        index: 2
      },
      {
        path: '/musics/artists',
        index: 3
      }
    ]);
    const to_link = ref(null);
    const from_link = ref(null);
    links.value.forEach(element => {
      if (element.path == to.fullPath) {
        to_link.value = element.index;
      }
      if (element.path == from.fullPath) {
        from_link.value = element.index;
      }
      if (to_link.value > from_link.value) {
        to.meta.pageTransition.name = 'slide-left';
      } else {
        to.meta.pageTransition.name = 'slide-right';
      }
    });
  }
});
</script>
<style scoped src="@/assets/css/page-transitions.css"></style>
