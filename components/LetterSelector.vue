<template>
  <div class="w-full h-full text-white flex justify-center items-center">
    <div class="w-[400px] flex flex-wrap gap-1">
      <div v-for="(item, index) in items" :key="index" class="w-10 h-10 rounded-lg">
        <div
          v-if="shouldDisplayItem(item)"
          class="h-full w-full flex justify-center items-center rounded-lg transition duration-200 hover:bg-slate-700 cursor-pointer"
          @click="$emit('scrollToLetter', item)">
          {{ item }}
        </div>
        <div
          v-else
          class="h-full w-full flex justify-center items-center rounded-lg transition duration-200 hover:bg-slate-700 pointer-events-none"
          style="color: rgb(163, 163, 163)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  letters: Array
});

const items = [
  '&',
  '#',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '...'
];
const shouldDisplayItem = item => {
  return props.letters.includes(item);
};
</script>

<style scoped></style>
