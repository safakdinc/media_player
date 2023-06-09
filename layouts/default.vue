<template>
  <div class="w-full body flex flex-col fixed top-0 left-0 h-full">
    <div class="flex-1 flex overflow-y-auto">
      <div class="w-12 lg:w-[20%] xl:w-[17%] h-full sticky top-0 left-0 background flex flex-col flex-shrink-0 z-10" ref="sideNav">
        <SideNav></SideNav>
      </div>
      <!-- Main Content -->
      <div class="w-full p-3 pt-0 overflow-x-hidden">
        <slot></slot>
      </div>
    </div>
    <!--Footer-->
    <div class="w-full h-28 sticky bottom-0 flex flex-col justify-start p-1 gap-1 text-[aliceblue]">
      <TimeSlider v-model="playbackTime" :playbackTime="playbackTime" :audio-duration="audioDuration" @update="updateTime" />
      <div class="flex-grow flex justify-start">
        <!-- Name and thumbnail -->
        <div class="flex-grow flex gap-2 flex-1">
          <div class="h-full w-32">
            <img v-if="thumbnail" class="w-full h-full object-cover object-center rounded-md" :src="thumbnail" />
          </div>
          <div class="h-full w-full flex items-center p-2 text-white">{{ title }}</div>
        </div>
        <div class="flex-grow flex-1">
          <div class="h-full w-full flex justify-center items-center gap-1">
            <!-- Hide the default audio player -->
            <div>
              <audio style="display: none" ref="player" id="player">
                <source id="audioSource" :src="audioSource" type="audio/ogg" />
              </audio>
            </div>

            <div class="icons-button flex justify-center items-center cursor-pointer">
              <ClientOnly> <font-awesome :icon="['fas', 'shuffle']" class="text-xl cursor-pointer" /></ClientOnly>
            </div>
            <div class="icons-button flex justify-center items-center cursor-pointer" @click="previousTrack()">
              <ClientOnly> <font-awesome :icon="['fas', 'backward-step']" class="text-xl cursor-pointer"></font-awesome></ClientOnly>
            </div>
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

            <div class="icons-button flex justify-center items-center cursor-pointer" @click="nextTrack()">
              <ClientOnly> <font-awesome :icon="['fas', 'forward-step']" class="text-xl cursor-pointer"></font-awesome></ClientOnly>
            </div>
            <div class="icons-button flex justify-center items-center cursor-pointer" @click="deneme">
              <ClientOnly><font-awesome :icon="['fas', 'repeat']" class="text-xl" /></ClientOnly>
            </div>
          </div>
        </div>
        <div class="flex-grow flex-1">
          <div class="h-full w-full flex justify-end items-center gap-3 pr-3">
            <Popover class="relative">
              <PopoverButton>
                <ClientOnly>
                  <font-awesome v-if="volumeValue == 0" :icon="['fas', 'volume-xmark']" />
                  <font-awesome v-else-if="audioMuted" :icon="['fas', 'volume-xmark']" />
                  <font-awesome v-else-if="volumeValue > 0 && volumeValue < 50" :icon="['fas', 'volume-low']" />
                  <font-awesome v-else-if="volumeValue >= 50" :icon="['fas', 'volume-high']"
                /></ClientOnly>
              </PopoverButton>
              <transition
                @enter="setVolume_enter"
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-10 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-10 opacity-0">
                <PopoverPanel class="h-8 bg-gray-800 p-3 rounded-md flex items-center absolute bottom-14 right-0 z-10">
                  <AudioSlider :volume="volumeValue" :player="player" @setVolume="setVolume" @muteAudio="muteAudio"></AudioSlider>
                </PopoverPanel>
              </transition>
            </Popover>
            <ClientOnly> <font-awesome :icon="['fas', 'ellipsis']" class="text-xl cursor-pointer" /></ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';

import { useStore } from 'vuex';

const store = useStore();
onMounted(() => {
  store.dispatch('getTracksData');
});
const audioSource = ref(store.state.playingNow);
const thumbnail = ref(store.state.playingNowthumbnail);
const title = ref(store.state.playingNow.title);
watch(
  () => store.state.playingNow,
  async newPlayingNow => {
    audioSource.value = newPlayingNow.source;
    thumbnail.value = newPlayingNow.thumbnail;
    title.value = newPlayingNow.title;
    resetPlayer();
  }
);
const nextTrack = () => {
  store.commit('nextTrack');
};
const previousTrack = () => {
  store.commit('previousTrack');
};

const showButtons = ref(false);
onMounted(async () => {
  setTimeout(() => {
    showButtons.value = true;
    window.addEventListener('keydown', event => {
      if (event.code === 'Space') {
        event.preventDefault();
        toggleAudio();
      }
    });
  }, 10);
});

const resetPlayer = () => {
  let audio = player.value;
  audio.load();
  playbackTime.value = 0;
  audioDuration.value = Math.round(audio.duration);
  isPlaying.value = true;
  if (audio) {
    // Check if audio is not null
    audio.addEventListener('loadedmetadata', () => {
      initSlider();
    });
    audio.addEventListener('canplay', () => {
      audioLoaded.value = true;
    });
  }
  audio.play();
};

const audioMuted = ref(false);
const volumeValue = ref(100);
const playbackTime = ref(0);
const audioDuration = ref(null);
const audioLoaded = ref(true);
const isPlaying = ref(false);
let listenerActive = false;
const player = ref(null);

const updateTime = value => {
  playbackTime.value = value;
};

const setVolume = volume => {
  let audio = player.value;
  volumeValue.value = volume;
  audioMuted.value = false;
  audio.muted = false;
  audio.volume = volume / 100;
};

const muteAudio = () => {
  let audio = player.value;
  if (audio && audio.muted == false) {
    audioMuted.value = true;
    audio.muted = true;
  } else {
    audioMuted.value = false;
    audio.muted = false;
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
.icons-button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  background-color: rgba(0, 0, 0, 0);
}
.icons-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
.background {
  background: linear-gradient(0deg, rgb(92, 77, 144) 0%, rgb(125, 107, 157) 100%);
}

.play-button {
  height: 45px;
}
</style>

<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(190, 190, 190);
}
</style>
