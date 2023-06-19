<template>
  <div class="w-full h-auto flex flex-wrap gap-3 p-5">
    <div v-for="group in sortedItems" class="w-full flex flex-wrap">
      <div class="w-full flex text-xl sticky top-24" style="z-index: 2; background-color: rgb(5, 14, 22)" :id="group.letter">
        <div class="cursor-pointer" @click="toggleSelector">
          {{ group.letter }}
        </div>
      </div>
      <NuxtLink
        :to="`/musics/artists/${item}`"
        v-for="item in group.items"
        class="h-72 w-48 flex flex-col gap-1 transition duration-200 hover:bg-slate-700 rounded-lg p-1 hover-icons">
        <div class="relative h-4/6 w-full">
          <!-- Image -->
          <div class="h-full w-full rounded-lg object-contain">
            <img class="object-cover w-full h-full object-center image rounded-[50%]" src="@/assets/photos/mctonight.png" />
          </div>
          <!-- Checkbox -->
          <div class="absolute top-1 left-1 icons cursor-pointer">
            <font-awesome :icon="['fas', 'square-check']" />
          </div>
          <!-- Play Button -->
          <div class="absolute bottom-1 left-2 icons cursor-pointer">
            <font-awesome :icon="['fas', 'play']"></font-awesome>
          </div>

          <!-- More Options Button -->
          <div class="absolute bottom-1 right-2 icons cursor-pointer">
            <font-awesome :icon="['fas', 'ellipsis']" />
          </div>
        </div>

        <!-- Remaining content -->
        <div class="flex-grow w-full flex justify-center rounded-lg p-2 overflow-hidden">
          {{ item }}
        </div>
      </NuxtLink>
    </div>
    <Transition name="background">
      <div
        v-if="selectorOn"
        class="fixed w-full h-full top-0 left-0 z-20 bg-black opacity-80 transition duration-300"
        @click="toggleSelector"></div>
    </Transition>
    <Transition name="background">
      <div v-if="selectorOn" class="fixed w-full h-full top-0 left-0 z-20 pointer-events-none flex items-center justify-center">
        <div class="pointer-events-auto">
          <LetterSelector :letters="letters" @scrollToLetter="scrollToLetter"></LetterSelector>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const selectorOn = ref(false);
const scrollToLetter = item => {
  selectorOn.value = false;
  let element = document.getElementById(item);

  element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
};

const toggleSelector = () => {
  selectorOn.value = !selectorOn.value;
};

const items = ref(['Chistopher Larkin', 'Hans Zimmer', 'Bach', 'Mozart']);
const sortedItems = computed(() => {
  const sorted = [...items.value].sort(); // Sort the items alphabetically
  const grouped = sorted.reduce((acc, item) => {
    const firstLetter = item[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([key, value]) => ({
    letter: key,
    items: value
  }));
});
const letters = ref([]);
sortedItems.value.forEach(element => {
  letters.value.push(element.letter);
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
.icons {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.image {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
.hover-icons:hover .image {
  opacity: 0.7;
}
.hover-icons:hover .icons {
  opacity: 1;
}
</style>
