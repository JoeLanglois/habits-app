import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/rpc': {
        target: 'https://vitejs-vite-enevqv--1234.local-corp.webcontainer.io',
      },
    },
  },
});
