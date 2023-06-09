<template>
  <div class="w-full h-auto flex flex-wrap gap-3 p-5 text-white">
    <div class="w-full sticky flex items-center h-24 gap-5 text-[aliceblue]">
      <div class="text-4xl font-fester font-bold">Giriş</div>
    </div>
    <div class="w-full" style="font-family: Verdana, Geneva, Tahoma, sans-serif">Son Medya</div>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { invoke } from '@tauri-apps/api/tauri';
onMounted(() => {
  invoke('get_latest_tracks').then(response => {
    console.log(response);
  });
  // for (let i = 0; i < 35; i++) {
  //   invoke("add_latest_tracks", { path: `/oqwkeok/qoekwqokew${i}.mp3` }).then(
  //     (response) => {
  //       console.log(response);
  //     }
  //   );
  // } ekleme testi
  invoke('get_file', { path: `C:/Users/coolpc/Music/Kalimba.mp3` })
    .then(fileData => {
      console.log(fileData);
      console.log(`file data => ${fileData}`);
    })
    .catch(error => {
      console.log(`there is an error in getting file data => ${error}`);
    });
});

const items = [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4  ' }];
onMounted(() => {
  for (let index = 0; index < 20; index++) {
    items.push({ value: `${index}` });
  }
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
.selected {
  border: 1px solid blue;
}
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
