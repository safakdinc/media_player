import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { tailwind } from '@/assets/icons/tailwind.js';

library.add(tailwind);
library.add(fas);
library.add(far);
library.add(fab);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('font-awesome', FontAwesomeIcon, {});
});
