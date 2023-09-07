// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    'nuxt-headlessui',
    'nuxt-lodash',
    'nuxt-icon',
    'nuxt-icons'
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss', '~/assets/css/tippy.scss'],
  tailwindcss: {
    cssPath: '~/assets/css/main.scss'
  },
  headlessui: {
    prefix: 'Headless'
  }
})
