<template>
  <div v-if="show" class="w-full h-full flex flex-wrap content-start p-3 gap-2 body">
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.path"
      class="w-full h-10 button_2 rounded-md items-center p-3 gap-3 cursor-pointer hidden lg:flex">
      <font-awesome v-if="item.icon" :icon="item.icon" class="text-[aliceblue]"></font-awesome>
      <div v-else v-html="item.html" class="text-[aliceblue]"></div>
      <div class="text-[aliceblue] font-bold">{{ item.text }}</div>
    </NuxtLink>
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.path"
      class="w-full h-10 button_2 rounded-md items-center justify-center p-3 gap-3 cursor-pointer flex lg:hidden flex-shrink-0">
      <font-awesome v-if="item.icon" :icon="item.icon" class="text-[aliceblue]"></font-awesome>
      <div v-else v-html="item.html" class="text-[aliceblue]"></div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const show = ref(false);
onMounted(async () => {
  setTimeout(() => {
    show.value = true;
  }, 1);
});

let items = [
  {
    icon: ['fas', 'home'],
    text: 'Ana Menü',
    path: '/'
  },
  {
    icon: ['fas', 'music'],
    text: 'Müzikler',
    path: '/musics'
  },
  {
    icon: ['fas', 'video'],
    text: 'Videolar',
    path: '/videos'
  },
  {
    html: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 122.88 121.61" style="enable-background:new 0 0 122.88 121.61" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M73.12,0H88.6v5.17c38.74,8.87,43.17,27.47,20.7,56.79c2.39-29.09-0.54-35.33-20.7-36.68v73.54 c0.04,0.39,0.05,0.78,0.05,1.18c0,9.56-10.03,19.04-22.4,21.18c-12.37,2.14-22.4-3.88-22.4-13.44c0-13.04,17.91-24.36,29.26-20.37 L73.12,0L73.12,0z M5.69,73.78C2.55,73.78,0,71.23,0,68.09c0-3.14,2.55-5.69,5.69-5.69h47.63c3.14,0,5.69,2.55,5.69,5.69 c0,3.14-2.55,5.69-5.69,5.69H5.69L5.69,73.78z M5.69,46.14C2.55,46.14,0,43.59,0,40.44c0-3.14,2.55-5.69,5.69-5.69h47.63 c3.14,0,5.69,2.55,5.69,5.69c0,3.14-2.55,5.69-5.69,5.69H5.69L5.69,46.14z M5.69,18.5C2.55,18.5,0,15.95,0,12.8 c0-3.14,2.55-5.69,5.69-5.69h47.63c3.14,0,5.69,2.55,5.69,5.69c0,3.14-2.55,5.69-5.69,5.69H5.69L5.69,18.5z" fill="aliceblue"/></g></svg>',
    text: 'Oynatma Listeleri',
    path: '/playlists'
  },
  {
    icon: ['fas', 'video'],
    text: 'Deneme',
    path: '/deneme'
  }
];
</script>

<style scoped>
a.router-link-active {
  background-color: rgb(80, 73, 120);
}
.body {
  --button-bg-color: rgb(48, 40, 91);
  --button-bg-color-hover: rgb(69, 60, 124);
  --button-box-shadow-color: rgba(48, 40, 91, 0.8);
}
.button_2 {
  background: none;
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  box-shadow: 0 0 0 0 var(--button-box-shadow-color), inset 0 0 0 0 var(--button-box-shadow-color);
  transform: translate(0, 0);
}
.button_2:hover {
  transform: translate(0px, -3px);
  background-color: var(--button-bg-color-hover);
}
</style>
