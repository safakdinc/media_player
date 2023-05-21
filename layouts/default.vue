<template>
  <div class="w-full body flex flex-col fixed top-0 left-0 h-full">
    <div class="flex-1 flex overflow-y-auto">
      <div
        class="w-12 lg:w-[20%] xl:w-[17%] h-full sticky top-0 left-0 background flex flex-col flex-shrink-0 z-10"
        ref="sideNav">
        <SideNav></SideNav>
      </div>
      <!-- Main Content -->
      <div class="w-full p-3">
        <slot></slot>
      </div>
    </div>
    <!--Footer-->
    <div class="w-full h-28 sticky bottom-0 flex flex-col justify-start p-1 gap-1 text-[aliceblue]">
      <div class="w-full h-4 flex text-xs items-center gap-2 px-1">
        <div>00:00:00</div>
        <div class="flex-grow">
          <div
            class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
            id="progressBarContainer"
            @click="updateProgressBar()">
            <div id="progressBar" class="bg-blue-600 h-2.5 rounded-full" style="width: 0%"></div>
          </div>
        </div>
        <div>00:05:59</div>
      </div>
      <div class="flex-grow flex gap-2 justify-start">
        <!-- Name and thumbnail -->
        <div class="flex-grow flex gap-2 flex-1">
          <div class="h-full w-32">
            <img
              class="w-full h-full object-cover object-center rounded-md"
              src="@/assets/photos/example.jpg" />
          </div>
          <div class="h-full w-full flex items-center p-2 text-white"></div>
        </div>
        <div class="flex-grow flex-1">
          <div class="h-full w-full">
            <audio controls ref="audioRef">
              <source src="@/assets/example.mp3" type="audio/ogg" />
            </audio>
          </div>
        </div>
        <div class="flex-grow flex-1">
          <div class="h-full w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

import { useStore } from 'vuex';
const store = useStore();

const audioRef = ref(null);
watch(
  () => store.state.isPlaying,
  newIsPlaying => {
    if (newIsPlaying) {
      audioRef.value.play();
      console.log(audioRef.value.duration);
    } else {
      audioRef.value.pause();
    }
  }
);

const audioFileName = ref('');
const audioDuration = ref('');
const audioCurrentTime = ref('');

onMounted(async () => {
  // Retrieve current time
  setTimeout(() => {
    audioRef.value.addEventListener('timeupdate', () => {
      console.log(audioRef.value.currentTime);
    });
  }, 1000);
});

const emits = defineEmits(['toggleSidenav']);

const sideNav = ref(null);

const updateProgressBar = () => {
  let element = document.getElementById('progressBar');
  let progressBar = document.getElementById('progressBarContainer').offsetWidth;
  let offsetX = event.offsetX;
  let newWidth = (offsetX / progressBar) * 100;
  console.log(newWidth);
  element.style.width = newWidth + '%';
  console.log(progressBar.style.width);
  /*
  const progressBar = document.getElementById('progressBar');
  const progressBarWidth = progressBar.clientWidth;
  const clickedX = event.clientX - progressBar.getBoundingClientRect().left;
  const newWidth = (clickedX / progressBarWidth) * 100;
  progressBar.style.width = newWidth + '%';*/
};
</script>

<style scoped>
.background {
  background: linear-gradient(0deg, rgb(92, 77, 144) 0%, rgb(125, 107, 157) 100%);
}
</style>
<style>
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #212121;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(190, 190, 190);
}
</style>
