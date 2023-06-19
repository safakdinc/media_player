function computePageNumber(path) {
  if (path.path === '/musics') {
    return 1;
  }
  if (path.path === '/musics/albums') {
    return 2;
  }
  if (path.path === '/musics/artists') {
    return 3;
  }
}

export default defineNuxtRouteMiddleware((to, from) => {
  if (from.path.startsWith('/musics')) {
    console.log(computePageNumber(to), computePageNumber(from));
    console.log(to);
  }
});
