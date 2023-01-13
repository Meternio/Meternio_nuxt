// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        '@nuxt/image-edge',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            }
        ],
        'nuxt-icon'
    ],
    css: ['@/styles/main.less'],
    vite: {
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: 'true; @import "@/styles/global.less"',
                    }
                },
            },
        },
    }
});
