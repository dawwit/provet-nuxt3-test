// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  components: {
    global: true,
    dirs: ['components'],
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.startsWith('provet-'),
    },
  },

  ssr: false,

  devtools: { enabled: true },
});
