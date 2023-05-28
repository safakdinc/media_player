import axios from 'axios';

// Create an instance of Axios with a base URL
const instance = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 30000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default defineNuxtPlugin(async () => {
  return {
    provide: {
      axios: instance
    }
  };
});
