// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/sass/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  },
  app: {
    head: {
      title: 'Dynamic form with Nuxt and Vuetify - Gerson Ruiz',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        { hid: 'description', name: 'description', content: 'Dynamic form with Nuxt and Vuetify by Gerson Ruiz' },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'Dynamic form, Gerson Ruiz, kato94, Front-end, Back-end, Full-stack, Developer, Portfolio, Vue, Vuetify, Nuxt',
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
      ],
    },
  },
})
