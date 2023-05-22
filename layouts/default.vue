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
        <div v-html="elapsedTime()"></div>
        <div class="flex-grow flex items-center">
          <input
            v-model="playbackTime"
            type="range"
            min="0"
            :max="audioDuration"
            class="slider w-full h-full"
            id="position"
            name="position" />
        </div>
        <div v-html="totalTime()"></div>
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
          <div class="h-full w-full flex justify-center items-center gap-3">
            <!-- Hide the default audio player -->
            <div>
              <audio style="display: none" ref="player" id="player">
                <source src="@/assets/strange.mp3" type="audio/ogg" />
              </audio>
            </div>
            <font-awesome :icon="['fas', 'backward-step']" class="text-xl"></font-awesome>
            <div v-if="showButtons">
              <svg
                @click="toggleAudio"
                v-if="!isPlaying"
                class="play-button text-gray-400"
                :class="{
                  'text-orange-600': audioLoaded,
                  'hover:text-orange-400': audioLoaded,
                  'cursor-pointer': audioLoaded
                }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clip-rule="evenodd" />
              </svg>
              <svg
                @click="toggleAudio"
                v-else
                class="play-button text-orange-400 hover:text-orange-400 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd" />
              </svg>
            </div>

            <font-awesome :icon="['fas', 'forward-step']" class="text-xl"></font-awesome>
          </div>
        </div>
        <div class="flex-grow flex-1">
          <div class="h-full w-full flex justify-end items-center gap-3 pr-3">
            <Popover class="relative">
              <PopoverButton
                ><font-awesome :icon="['fas', 'volume-high']" class="text-xl cursor-pointer"
              /></PopoverButton>
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-10 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-10 opacity-0">
                <PopoverPanel
                  class="w-72 h-8 bg-gray-800 p-3 rounded-md flex items-center absolute bottom-14 right-0 z-10">
                  <div class="flex-grow flex items-center gap-2">
                    <div
                      v-if="showButtons"
                      class="w-7 h-full flex items-center justify-center cursor-pointer hover:text-orange-400"
                      style="transition: color 0.2s ease"
                      @click="muteAudio">
                      <font-awesome
                        v-if="volumeValue == 0 || audioMuted"
                        :icon="['fas', 'volume-xmark']" />
                      <font-awesome
                        v-else-if="volumeValue > 0 && volumeValue < 50"
                        :icon="['fas', 'volume-low']" />
                      <font-awesome v-else-if="volumeValue >= 50" :icon="['fas', 'volume-high']" />
                    </div>
                    <input
                      v-model="volumeValue"
                      type="range"
                      min="0"
                      max="100"
                      @input="setVolume"
                      class="slider w-full h-full"
                      id="position"
                      name="position" />
                    <div class="text-sm w-7 flex justify-center">{{ volumeValue }}</div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>
            <font-awesome :icon="['fas', 'ellipsis']" class="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

import { useStore } from 'vuex';

const showButtons = ref(false);
onMounted(async () => {
  setTimeout(() => {
    showButtons.value = true;
    window.addEventListener('keydown', event => {
      if (event.code === 'Space') {
        toggleAudio();
      }
    });
  }, 10);
});

const audioMuted = ref(false);
const volumeValue = ref(50);
const playbackTime = ref(0);
const audioDuration = ref(100);
const audioLoaded = ref(true);
const isPlaying = ref(false);
let listenerActive = false;
const player = ref(null);

const setVolume = () => {
  let audio = player.value;
  if (audio) {
    audio.volume = volumeValue.value / 100;
  }
};
const muteAudio = () => {
  let audio = player.value;
  if (audio && audio.muted == false) {
    audioMuted.value = false;
    audio.muted = true;
  } else {
    audioMuted.value = true;
    audio.muted = false;
  }
};

const convertTime = seconds => {
  const format = val => `0${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  return [minutes, seconds % 60].map(format).join(':');
};

const totalTime = () => {
  const audio = player.value;
  if (audio) {
    const seconds = audio.duration;
    return convertTime(seconds);
  } else {
    return '00:00';
  }
};

const elapsedTime = () => {
  const audio = player.value;
  if (audio) {
    const seconds = audio.currentTime;
    return convertTime(seconds);
  } else {
    return '00:00';
  }
};

const initSlider = () => {
  const audio = player.value;
  if (audio) {
    audioDuration.value = Math.round(audio.duration);
  }
};
onMounted(() => {
  initSlider();
  elapsedTime();
  totalTime();
});
const playbackListener = e => {
  const audio = player.value;
  playbackTime.value = audio.currentTime;
  audio.addEventListener('ended', endListener);
  audio.addEventListener('pause', pauseListener);
};

const pauseListener = () => {
  isPlaying.value = false;
  listenerActive = false;
  cleanupListeners();
};

const endListener = () => {
  isPlaying.value = false;
  listenerActive = false;
  cleanupListeners();
};

const cleanupListeners = () => {
  const audio = player.value;
  audio.removeEventListener('timeupdate', playbackListener);
  audio.removeEventListener('ended', endListener);
  audio.removeEventListener('pause', pauseListener);
};

const toggleAudio = () => {
  const audio = player.value;
  if (audio.paused) {
    audio.play();
    isPlaying.value = true;
  } else {
    audio.pause();
    isPlaying.value = false;
  }
};

watch(isPlaying, newVal => {
  if (newVal) {
    const audio = player.value;
    initSlider();
    if (!listenerActive && audio) {
      // Check if audio is not null
      listenerActive = true;
      audio.addEventListener('timeupdate', playbackListener);
    }
  }
});

watch(playbackTime, () => {
  const audio = player.value;
  const diff = Math.abs(playbackTime.value - audio.currentTime);
  if (diff > 0.01) {
    audio.currentTime = playbackTime.value;
  }
});

nextTick(() => {
  const audio = player.value;
  if (audio) {
    // Check if audio is not null
    audio.addEventListener('loadedmetadata', () => {
      initSlider();
    });
    audio.addEventListener('canplay', () => {
      audioLoaded.value = true;
    });
  }
});
</script>

<style scoped>
.progressBar {
  position: relative;
}
.progressBar::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 100%;
  background: #21201f;
  border-radius: 50% 50%;
}
.progressBar::after:hover {
  cursor: pointer;
  background: #ffffff;
}
.background {
  background: linear-gradient(0deg, rgb(92, 77, 144) 0%, rgb(125, 107, 157) 100%);
}

.play-button {
  height: 45px;
}

input[type='range'] {
  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 5px;
  cursor: pointer;
  outline: none;
  border-radius: 0; /* iOS */
  background: transparent;
}

input[type='range']:focus {
  outline: none;
}

::-webkit-slider-runnable-track {
  background: #fff;
}

/* 1. Set to 0 width and remove border for a slider without a thumb */
::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0; /* 1 */
  height: 40px;
  background: #fff;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  border: none; /* 2px solid #999; */
}

::-moz-range-track {
  height: 40px;
  background: #ddd;
}

::-moz-range-thumb {
  background: #fff;
  height: 40px;
  width: 0; /* 20px; */
  border: none; /* 3px solid #999; */
  border-radius: 0 !important;
  box-shadow: -100vw 0 0 100vw dodgerblue;
  box-sizing: border-box;
}

::-ms-fill-lower {
  background: dodgerblue;
}

::-ms-thumb {
  background: #fff;
  border: 2px solid #999;
  height: 40px;
  width: 20px;
  box-sizing: border-box;
}

::-ms-ticks-after {
  display: none;
}

::-ms-ticks-before {
  display: none;
}

::-ms-track {
  background: #ddd;
  color: transparent;
  height: 40px;
  border: none;
}

::-ms-tooltip {
  display: none;
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
