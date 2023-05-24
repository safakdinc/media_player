<template>
  <div class="w-full flex flex-col gap-5 p-2">
    <div
      v-for="(item, index) in items"
      class="w-full h-14 flex items-center gap-2 pr-2 pb-1 border-b hover-link cursor-pointer rounded-md"
      style="border-color: rgba(197, 197, 197, 0.4)"
      @click="playAudio(index)">
      <div class="h-full w-16">
        <img
          class="w-full h-full object-center object-cover rounded-sm"
          src="../../assets/photos/example.jpg" />
      </div>
      <div class="w-2/5">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, eos.
      </div>
      <div>Bilinmeyen Albüm</div>
      <div class="ml-auto">Bilinmeyen Tarz</div>
      <div class="ml-auto">05:00</div>
    </div>
    <div class="w-full p-5 h-[100vh] overflow-auto"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
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
const store = useStore();

const items = [
  {
    src: '@/assets/example.mp3'
  },
  {
    src: '@/assets/strange.mp3'
  }
];
</script>

<style scoped>
.hover-link {
  position: relative;
  transition: background-color 0.25s ease-out;
  background-color: rgba(255, 255, 255, 0);
}
.hover-link:hover {
  background-color: rgb(32, 35, 39);
}
.hover-link::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}
.hover-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
<style scoped src="@/assets/css/page-transitions.css"></style>
