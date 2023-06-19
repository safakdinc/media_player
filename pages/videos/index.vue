<template>
  <div class="w-full text-white">
    <div class="w-full h-auto flex flex-wrap gap-3 p-5">
      <div
        v-for="(item, index) in items"
        class="h-72 w-48 flex flex-col gap-1 transition duration-200 rounded-lg p-1 hover-icons relative"
        @click="handleClick(index, $event)">
        <div class="absolute top-0 left-0 w-full h-full rounded-lg transition duration-300 bg-slate-700 z-[-1] item-background"></div>
        <div
          class="absolute top-0 left-0 w-0 h-0 transition-all duration-300 bg-red-600 border-0 rounded-lg z-[-1]"
          :style="getStyle(index)"></div>
        <!--Box-->
        <div class="w-full h-full rounded-lg">
          <div class="relative h-4/6 w-full">
            <!-- Image -->
            <div class="h-full w-full rounded-lg object-contain">
              <img class="object-cover w-full h-full object-center rounded-lg image" src="@/assets/photos/mctonight.png" />
            </div>
            <!-- Checkbox -->
            <ClientOnly>
              <div v-if="isSelected(index)" class="absolute top-1 left-1 icons cursor-pointer" @click="toggleItem(index)">
                <font-awesome :icon="['fas', 'square-check']" />
              </div>
              <div v-else class="absolute top-1 left-1 icons cursor-pointer" @click="toggleItem(index)">
                <font-awesome :icon="['far', 'square']" />
              </div>
              <!-- Play Button -->
              <div class="absolute bottom-1 left-2 icons cursor-pointer">
                <font-awesome :icon="['fas', 'play']"></font-awesome>
              </div>

              <!-- More Options Button -->
              <div class="absolute bottom-1 right-2 icons cursor-pointer">
                <font-awesome :icon="['fas', 'ellipsis']" />
              </div>
            </ClientOnly>
          </div>

          <!-- Remaining content -->
          <div class="flex-grow w-full rounded-lg p-2 overflow-hidden" style="background: transparent">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const items = [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4  ' }];
onMounted(() => {
  items.forEach((item, index) => {
    item.index = index;
  });
});

const selectedItems = ref([]);
const toggleItem = index => {
  const selectedIndex = selectedItems.value.indexOf(index);
  if (selectedIndex === -1) {
    selectedItems.value.push(index);
  } else {
    selectedItems.value.splice(selectedIndex, 1);
  }
};

const handleClick = (index, event) => {
  if (event.ctrlKey) {
    toggleItem(index);
  }
};

const isSelected = index => {
  return selectedItems.value.includes(index);
};
function getStyle(index) {
  if (isSelected(index)) {
    return {
      width: '100%',
      height: '100%'
    };
  } else {
    return {};
  }
}
</script>

<style scoped>
.icons {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}
.image {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
.item-background {
  opacity: 0;
}
.hover-icons:hover .item-background {
  opacity: 1;
}
.hover-icons:hover .icons {
  opacity: 1;
}
</style>
