<template>
  <div class="w-full">
    <div class="w-full">
      <div class="w-full flex items-center h-24 gap-5 text-[aliceblue] sticky top-0 left-0 z-10" style="background-color: rgb(5, 14, 22)">
        <div class="text-4xl font-fester font-bold">Müzik</div>
        <div class="flex items-center gap-5 links">
          <nuxt-link v-for="(item, index) in items" :to="item.path" @click="switchPage(index)" :key="index">
            <div class="flex gap-3 font-yolk text-lg items-center cursor-pointer" ref="link_object">
              {{ item.text }}
            </div>
          </nuxt-link>
          <button @click="deneme">Deneme</button>
        </div>
        <div class="flex-grow flex justify-end pr-3">
          <div
            class="flex items-center justify-center rounded-lg hover:bg-slate-400 cursor-pointer transition-colors duration-300 bg-opacity-30 p-2 gap-2"
            @click="toggleAddMusic">
            <ClientOnly> <font-awesome :icon="['fas', 'folder-plus']" /></ClientOnly>
            <div class="font-yolk text-lg hidden sm:flex">Müzik ekle</div>
          </div>
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
      <Transition name="background">
        <div v-if="addMusic" class="fixed w-full h-full top-0 left-0 z-20 pointer-events-none flex items-center justify-center">
          <div class="pointer-events-auto">
            <AddMusic :keepalive="{}" @close-modal="toggleAddMusic"></AddMusic>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();

async function deneme() {
  const { data, error } = await useFetch('/api/deneme', {
    params: { deneme: 'deneme' }
  });
  console.log(toRaw(data.value));
}

/*const pageTransition = ref('page');



onMounted(() => {
  pageTransition.value = 'page';
});

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    console.log(computePageNumber(oldValue), computePageNumber(newValue));
    if (computePageNumber(oldValue) == null || computePageNumber(newValue) == null) {
      pageTransition.value = 'page';
    } else {
      if (computePageNumber(oldValue) < computePageNumber(newValue)) {
        pageTransition.value = 'slide-left';
      }
      if (computePageNumber(oldValue) > computePageNumber(newValue)) {
        pageTransition.value = 'slide-right';
      }
    }
  }
);

function computePageNumber(path) {
  let matchedValue = null;
  items.value.forEach(item => {
    if (item.path === path) {
      matchedValue = item.value;
    }
  });

  return matchedValue;
}
*/
const addMusic = ref(false);
const toggleAddMusic = () => {
  addMusic.value = !addMusic.value;
};

const link_object = ref(null);

const items = ref([
  {
    value: 1,
    text: 'Müzikler',
    path: '/musics'
  },
  {
    value: 2,
    text: 'Albümler',
    path: '/musics/albums'
  },
  {
    value: 3,
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
