<template>
  <div class="w-full flex flex-col gap-5 p-2">
    <div
      v-if="datasReady"
      v-for="(item, index) in tracksData"
      :key="index"
      :class="{ shadow: currentPlaying == index }"
      @click="playAudio(index, item.link)">
      <div
        class="w-full flex flex-wrap items-center gap-2 p-1 hover-link cursor-pointer rounded-md"
        style="border-color: rgba(197, 197, 197, 0.4)">
        <div class="h-full w-16">
          <img class="w-full h-full object-center object-cover rounded-sm" :src="item.thumbnail" />
        </div>
        <div class="w-2/5">{{ item.title }}</div>
        <div>Bilinmeyen Albüm</div>
        <div class="ml-auto">Bilinmeyen Tarz</div>
        <div class="ml-auto">
          {{ calculateDuration(item.duration) }}
        </div>
        <div class="absolute top-0 left-0 w-full" style="height: calc(100% + 2px)">
          <div class="underline"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const tracksData = ref(computed(() => store.state.tracksData));

const datasReady = ref(false);
onMounted(async () => {
  setTimeout(() => {
    datasReady.value = true;
  }, 10);
});
const currentPlaying = ref(null);
const playAudio = (index, link) => {
  store.dispatch('getTrackLink', { link: link, index: index });
};
watch(
  () => store.state.playingNowIndex,
  index => {
    currentPlaying.value = index;

    console.log(index);
  }
);
const duration_ref = ref({});
const calculateDuration = parameter => {
  let duration = parameter;
  let minutes = null;
  let seconds = null;
  let hours = null;
  if (duration.hours == 0) {
    hours = 0;
  } else if (duration.hours < 10) {
    hours = '0' + duration.hours;
  } else {
    hours = duration.hours;
  }
  if (duration.minutes == 0) {
    minutes = '00';
  } else if (duration.minutes < 10) {
    minutes = '0' + duration.minutes;
  } else {
    minutes = duration.minutes;
  }
  if (duration.seconds == 0) {
    seconds = '00';
  } else if (duration.seconds < 10) {
    seconds = '0' + duration.seconds;
  } else {
    seconds = duration.seconds;
  }
  if (hours == 0) {
    return minutes + ':' + seconds;
  } else {
    return hours + ':' + minutes + ':' + seconds;
  }
};
</script>
<style scoped>
.shadow {
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  opacity: 100%;
}

.shadow::before,
.shadow::after {
  content: '';
  pointer-events: none;
  position: absolute;
  border-radius: 0.375rem;
  top: -2px;
  left: -2px;
  --bg-size: 300%;
  --color-one: rgb(222, 26, 26);
  --color-two: rgb(77, 126, 211);
  background: linear-gradient(-45deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 / var(--bg-size) 100%;
  width: calc(100% + 8px);
  height: calc(100% + 4px);
  z-index: -1;
  animation: animate 30s linear infinite;
  mix-blend-mode: difference;
}

.shadow::after {
  filter: blur(25px);
}

@keyframes animate {
  0% {
    background-position: 300% 0;
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
  transition: transform 0.5s ease-out;
  animation: animate 10s linear infinite;
  filter: blur(1px);
}
.hover-link:hover .underline {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
