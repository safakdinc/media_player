<template>
  <div class="w-full">
    <div class="w-full flex items-center h-24 gap-5 text-[aliceblue] sticky top-0 left-0 z-10" style="background-color: rgb(5, 14, 22)">
      <div class="text-4xl font-fester font-bold">Video</div>
      <div class="flex items-center gap-5 links">
        <nuxt-link v-for="(item, index) in items" :to="item.path" @click="switchPage(index)" :key="index">
          <div class="flex gap-3 font-yolk text-lg items-center cursor-pointer" ref="link_object">
            {{ item.text }}
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="text-[aliceblue] w-full">
      <NuxtPage :keepalive="{}"></NuxtPage>
    </div>
    <Transition name="background">
      <div
        v-if="addMusic"
        class="fixed w-full h-full top-0 left-0 z-20 bg-black opacity-80 transition duration-300"
        @click="toggleAddMusic"></div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const addMusic = ref(false);
const toggleAddMusic = () => {
  addMusic.value = !addMusic.value;
};

const link_object = ref(null);
const router = useRouter();
const items = ref([
  {
    text: 'Videolar',
    path: '/videos'
  },
  {
    text: 'Klasörler',
    path: '/videos/folders'
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
.background-enter-active,
.background-leave-active {
  transition: opacity 0.5s ease;
}

.background-enter-from,
.background-leave-to {
  opacity: 0;
}
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
