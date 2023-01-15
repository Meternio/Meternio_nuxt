import simpleParallax from "simple-parallax-js";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('simpleParallax', simpleParallax);
});
