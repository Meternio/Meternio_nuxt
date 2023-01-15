<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { throttle } from "@/functions/main";

const props = defineProps({
  title: String,
  description: String,
  image: String,
  parallax: Boolean,
});

const nuxtApp = useNuxtApp();
const target = ref(null);
const heroImage = ref(null);
const backgroundPosition = ref("50% 50%");
let parallaxInstance;

/*function checkInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom >= 0;
}

function parallax() {
  if (checkInViewport(target.value)) {
    backgroundPosition.value = `50% ${50 - (window.scrollY / 100) * 3}%`;
  }
}

const throttledScroll = throttle(parallax, 30);*/

onMounted(() => {
  if (props.parallax) {
    parallaxInstance = new nuxtApp.$simpleParallax(heroImage.value.$el);
    //window.addEventListener("scroll", throttledScroll);
  }
});

onUnmounted(() => {
  if (props.parallax) {
    parallaxInstance.destroy();
    //window.removeEventListener("scroll", throttledScroll);
  }
});
</script>

<template>
  <section
    class="hero relative h-[calc(100vh_+_1rem)] -top-28 overflow-hidden"
    ref="target"
  >
    <div class="container h-full flex items-center flex-row flex-wrap">
      <!--<div
        class="hero-image absolute -top-28 left-0 bottom-0 right-0 bg-cover bg-no-repeat"
        :class="{
          'hero-image--parallax bg-fixed': props.parallax,
        }"
        :style="{
          'background-position': backgroundPosition,
          'background-image': `url(${props.image})`,
        }"
      ></div>-->
      <nuxt-img :src="props.image" ref="heroImage" preload width="2048" height="2048" sizes="sm:640 md:768 lg:1024 xl:1280 xxl:1536 2xxl:2048" class="absolute top-0 left-0 w-full h-[calc(100vh_+_2rem)] object-cover" :alt="$t('header.logo')" />
      <div class="hero-text-wrapper max-w-xl z-10 text-white relative top-12">
        <h1>{{ props.title }}</h1>
        <p>{{ props.description }}</p>
      </div>
    </div>
  </section>
</template>
