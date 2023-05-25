<template>
  <div class="w-full">
    <div
      class="w-full flex items-center h-24 gap-5 text-[aliceblue] sticky top-0 left-0 z-10"
      style="background-color: rgb(5, 14, 22)">
      <div class="text-4xl font-fester font-bold">Müzik</div>
      <div class="flex items-center gap-5 links">
        <nuxt-link
          v-for="(item, index) in items"
          :to="item.path"
          @click="switchPage(index)"
          :key="index">
          <div class="flex gap-3 font-yolk text-lg items-center cursor-pointer" ref="link_object">
            {{ item.text }}
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="text-[aliceblue] w-full">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const link_object = ref(null);
const router = useRouter();
const items = ref([
  {
    text: 'Müzikler',
    path: '/musics'
  },
  {
    text: 'Albümler',
    path: '/musics/albums'
  },
  {
    text: 'Sanatçılar',
    path: '/musics/artists'
  }
]);
const switchPage = index => {
  let element = document.querySelector('.links');
  let link = event.target;
  let linkWidth = link.offsetWidth;
  element.style.setProperty('--after-width', `${linkWidth}px`);
  let element_rect = element.getBoundingClientRect();
  let link_rect = link.getBoundingClientRect();
  let leftValue = link_rect.left - element_rect.left;
  element.style.setProperty('--after-left', `${leftValue}px`);
};
onMounted(async () => {
  setTimeout(() => {
    let route = router.currentRoute.value;
    link_object.value.forEach((link, index) => {
      if (items.value[index].path === route.path) {
        let element = document.querySelector('.links');
        let element_rect = element.getBoundingClientRect();
        let link_rect = link.getBoundingClientRect();
        let leftValue = link_rect.left - element_rect.left;
        element.style.setProperty('--after-width', `${link_rect.right - link_rect.left}px`);
        element.style.setProperty('--after-left', `${leftValue}px`);
      }
    });
  }, 1000);
});
</script>
<style scoped>
.links {
  position: relative;
}
.links::after {
  transition: all 0.5s;
  content: '';
  position: absolute;
  height: 2px;
  top: 100%;
  left: var(--after-left, 0);
  width: var(--after-width, 0);
  border-top: 2px solid rgb(0, 194, 104);
  transform: translateY(0px);
}
</style>
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
<style src="@/assets/css/page-transitions.css"></style>
