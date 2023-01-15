<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  title: String,
  description: String,
  image: String,
  parallax: Boolean,
});

const nuxtApp = useNuxtApp();
const heroImage = ref(null);
let parallaxInstance;

onMounted(() => {
  if (props.parallax) {
    parallaxInstance = new nuxtApp.$simpleParallax(heroImage.value.$el);
  }
});

onUnmounted(() => {
  if (props.parallax) {
    parallaxInstance.destroy();
  }
});
</script>

<template>
  <section
    class="hero relative h-[calc(100vh_+_1rem)] -top-28 overflow-hidden"
  >
    <div class="container h-full flex items-center flex-row flex-wrap">
      <nuxt-img :src="props.image" ref="heroImage" preload width="2048" height="2048" sizes="sm:640 md:768 lg:1024 xl:1280 xxl:1536 2xxl:2048" class="absolute top-0 left-0 w-full h-[calc(100vh_+_2rem)] object-cover" :alt="$t('home.heroImage.alt')" />
      <div class="hero-text-wrapper max-w-xl z-10 text-white relative top-12">
        <h1>{{ props.title }}</h1>
        <p>{{ props.description }}</p>
      </div>
    </div>
  </section>
</template>
