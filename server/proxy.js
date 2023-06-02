import { defineNuxtEventHandler } from '@nuxt/bridge';

export default defineNuxtEventHandler(async event => {
  if (event.request.path.startsWith('/api/proxy')) {
    const url = event.request.path.replace('/api/proxy', '');
    const target = 'https://rr8---sn-8vq54voxu-n5fe.googlevideo.com';

    const response = await fetch(target + url, {
      headers: {
        Referer: 'https://www.youtube.com' // Set the Referer header to bypass some restrictions
      }
    });

    return {
      status: response.status,
      headers: response.headers,
      body: response.body
    };
  }
});
