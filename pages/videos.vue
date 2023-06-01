<template>
  <div class="w-full">
    <div class="w-full sticky flex items-center h-24 gap-5 text-[aliceblue]">
      <div class="text-4xl font-fester font-bold">Video</div>
      <div v-for="(item, index) in items" class="flex gap-3 font-yolk text-lg items-center cursor-pointer">
        {{ item }}
      </div>
    </div>
    <div class="w-full text-white">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const items = ref(['Tüm Videolar', 'Klasörler']);

const axios = useNuxtApp().$axios;
const audioSource = ref(
  'https://rr8---sn-u0g3uxax3-pnuk.googlevideo.com/videoplayback?expire=1685228667&ei=GzhyZOLFCJT21wKH-5cg&ip=95.10.200.199&id=o-AAoTN1lnr5vBQkJNl36cO2nmcp-72y1V5E_OR0voZLK5&itag=251&source=youtube&requiressl=yes&mh=48&mm=31%2C29&mn=sn-u0g3uxax3-pnuk%2Csn-nv47znel&ms=au%2Crdu&mv=m&mvi=8&pcm2cms=yes&pl=21&initcwndbps=880000&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=VryL3zPeHsiSRROq5yq9WrsN&gir=yes&clen=8921058&dur=516.101&lmt=1625605086820889&mt=1685206607&fvip=1&keepalive=yes&fexp=24007246%2C24362685&c=WEB&txp=5432434&n=-zLb3N6nL87X3A&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgGdR7MKA0i19NLUCRhQf6m03vUBiwPQ7mJvvaS0fQBFECIQCssrJNkeGvufEKWRs3nUmP2bOA5yBYiTr006Ye2PrrAQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgTJEMjl5_8BqcfMM3y1X06_e9wUbs669TDR8djXAW05kCIDeq-oNFjRykF5XIo3F6SmdoX4WBCZO5JWt9xOncNJJX'
);
const audioPlayer = ref(null);

const playAudio = async () => {
  let response = await axios.get('/api/audio_link');
  audioSource.value = response.data.message;
  console.log(audioSource.value);
  audioPlayer.value.load();
  audioPlayer.value.play();
};
const fetchData = async () => {
  const link = 'https://www.youtube.com/watch?v=QvqjVCWT_4g';
  let response = await $fetch(`/api/audio_data?url=${link}`);
  console.log(response);
};
</script>
