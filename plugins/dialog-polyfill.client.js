import dialogPolyfill from 'dialog-polyfill';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('dialogPolyfill', dialogPolyfill);
});
