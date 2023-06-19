<template>
  <div class="w-full">
    <TransitionGroup tag="div" class="flex flex-col gap-5 p-2" name="list">
      <div v-for="(item, index) in tracksData" :key="item.index" class="relative" @click="playAudio(item.index, item.link)">
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="w-full h-full opacity-0" :class="{ shadow: currentPlaying == item.index }"></div>
        </div>
        <div
          class="w-full flex flex-wrap items-center gap-2 p-1 hover-link cursor-pointer rounded-md"
          style="border-color: rgba(197, 197, 197, 0.4)">
          <div class="h-full w-16">
            <img class="w-full h-full object-center object-cover rounded-sm" :src="item.thumbnail" alt="image" />
          </div>
          <div class="w-2/5">{{ item.title }}</div>
          <div>Bilinmeyen Albüm {{ index }}</div>
          <div class="ml-auto">Bilinmeyen Tarz</div>
          <div class="ml-auto">
            {{ calculateDuration(item.duration) }}
          </div>
          <div class="absolute top-0 left-0 w-full" style="height: calc(100% + 2px)">
            <div class="underline"></div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const tracksData = ref(computed(() => store.state.tracksData));

const currentPlaying = ref(null);

const playAudio = (index, link) => {
  store.dispatch('getTrackLink', { link: link, index: index });
};
watch(
  () => store.state.playingNowIndex,
  index => {
    currentPlaying.value = index;
  }
);
const calculateDuration = parameter => {
  const hours = Math.floor(parameter / 3600);
  const minutes = Math.floor((parameter % 3600) / 60);
  const seconds = parameter % 60;
  let calculated_hours = hours + ':';
  let calculated_minutes = minutes + ':';
  let calculated_seconds = seconds;
  if (hours < 1) {
    calculated_hours = '';
  }
  if (minutes < 10) {
    calculated_minutes = '0' + minutes + ':';
  }
  if (seconds < 10) {
    calculated_seconds = '0' + seconds;
  }
  let duration = calculated_hours + '' + calculated_minutes + '' + calculated_seconds;

  return duration;
};
</script>
<style scoped>
.music-enter-active,
.music-leave-active {
  transition: 1s ease;
}
.music-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.music-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.music-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.music-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.list-leave-from,
.list-enter-to {
  opacity: 1;
  transform: translateX(0px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */

.shadow {
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  opacity: 100%;
  box-shadow: none;
  opacity: 1;
  transition: 0.5s ease;
}

.shadow::before {
  content: '';
  pointer-events: none;
  position: absolute;
  border-radius: 0.375rem;
  left: -2px;
  --bg-size: 200%;
  --color-one: rgb(222, 26, 26);
  --color-two: rgb(77, 126, 211);
  background: linear-gradient(-45deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 / var(--bg-size) 100%;
  width: calc(100% + 8px);
  height: calc(100% + 4px);
  z-index: -1;
  animation: animate 20s linear infinite;
  filter: blur(10px);
}

@keyframes animate {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: 0 0;
  }
}
.hover-link {
  position: relative;
}
.underline {
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  border-radius: 2px;
  bottom: 0px;
  left: 0;
  --bg-size: 300%;
  --color-one: rgb(222, 26, 26);
  --color-two: rgb(77, 126, 211);
  background: linear-gradient(-45deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 / var(--bg-size) 100%;
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
  animation: animate 10s linear infinite;
  filter: blur(1px);
}
.hover-link:hover .underline {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
