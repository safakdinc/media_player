const pages = [
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
];
const transition = (to, from) => {
  var fullpath = null;
  pages.forEach(page => {
    if (from.fullPath == page.path) {
      fullpath = from.fullPath;
    }
  });
  return fullpath;
};
export default transition;
