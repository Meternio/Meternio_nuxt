// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@nuxt/image",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    "nuxt-icon",
  ],
  i18n: {
    locales: ["de", "en"], // used in URL path prefix
    defaultLocale: "de", // default locale of your project for Nuxt pages and routings
  },
  css: ["@/styles/main.less"],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: 'true; @import "@/styles/global.less"',
          },
        },
      },
    },
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ["C:/Users/Florian/node_modules/@iconify"],
      },
    },
  },
  image: {
    // The screen sizes predefined by `@nuxt/image`:
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xxl": 2560,
    },
  },
});
