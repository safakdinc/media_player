import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faSquareCheck,
  faPlay,
  faEllipsis,
  faShuffle,
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faVolumeHigh,
  faFolderPlus,
  faVolumeLow,
  faVolumeXmark,
  faHome,
  faMusic,
  faVideo
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faSquareCheck,
  faPlay,
  faEllipsis,
  faShuffle,
  faBackwardStep,
  faForwardStep,
  faRepeat,
  faVolumeHigh,
  faFolderPlus,
  faFolderPlus,
  faVolumeLow,
  faVolumeXmark,
  faHome,
  faMusic,
  faVideo
);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('font-awesome', FontAwesomeIcon, {});
});
