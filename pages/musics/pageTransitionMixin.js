import { definePage, ref } from 'nuxt';

export default function pageTransitionMixin() {
  definePage(({ middleware }) => {
    middleware(({ to, from }) => {
      const links = ref([
        {
          path: '/musics',
          index: 1
        },
        {
          path: '/musics/albums',
          index: 2
        },
        {
          path: '/musics/artists',
          index: 3
        }
      ]);
      const to_link = ref(null);
      const from_link = ref(null);
      links.value.forEach(element => {
        if (element.path == to.fullPath) {
          to_link.value = element.index;
        }
        if (element.path == from.fullPath) {
          from_link.value = element.index;
        }
        if (to_link.value > from_link.value) {
          to.meta.pageTransition.name = 'slide-left';
        } else {
          to.meta.pageTransition.name = 'slide-right';
        }
      });
    });
  });
}
