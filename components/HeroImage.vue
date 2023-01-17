<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { throttle, debounce } from "@/functions/main";

const props = defineProps({
  title: String,
  description: String,
  image: String,
  imageBackground: String,
  parallax: Boolean,
  width: Number,
  height: Number,
  reverseZoom: Boolean,
  maxScroll: Number,
});

const nuxtApp = useNuxtApp();
const heroImage = ref(null);
const containerHeight = ref(0);
let parallaxInstance;
let journeyOver = false;
let inlineCssMain = ref(
  props.reverseZoom ? "transform: scale(3);" : "transform: scale(1.0);"
);
let inlineCssBackground = ref(
  props.reverseZoom ? "transform: scale(1.3);" : "transform: scale(0.8);"
);

function setInlineCssMain(inlineCssMainValue, scrollTop) {
  if (!props.reverseZoom) {
    inlineCssMainValue = 1 + (scrollTop / 1000) * 1.9;
  } else {
    inlineCssMainValue = 3 - (scrollTop / 1000) * 3;
  }
  return inlineCssMainValue;
}

function setInlineCssBackground(inlineCssBackgroundValue, scrollTop) {
  if (!props.reverseZoom) {
    inlineCssBackgroundValue = 0.8 + scrollTop / 1000 / 3;
  } else {
    inlineCssBackgroundValue = 1.3 - scrollTop / 1000 / 1.9;
  }
  return inlineCssBackgroundValue;
}

function heroZoom() {
  let scrollTop = window.scrollY;
  let inlineCssMainValue;
  let inlineCssBackgroundValue;

  if (scrollTop < props.maxScroll) {
    journeyOver = false;

    inlineCssMainValue = setInlineCssMain(inlineCssMainValue, scrollTop);
    inlineCssBackgroundValue = setInlineCssBackground(
      inlineCssBackgroundValue,
      scrollTop
    );

    inlineCssMain.value = `transform: scale(${inlineCssMainValue});`;
    inlineCssBackground.value = `transform: scale(${inlineCssBackgroundValue});`;
  } else if (!journeyOver) {
    journeyOver = true;

    inlineCssBackgroundValue = setInlineCssBackground(
      inlineCssBackgroundValue,
      props.maxScroll
    );

    inlineCssMain.value = "";
    inlineCssBackground.value = `transform: scale(${inlineCssBackgroundValue}); top: ${props.maxScroll}px;`;
  }
}

function calculateContainerHeight() {
  containerHeight.value = props.maxScroll + window.innerHeight;
}

const throttledHeroZoom = throttle(heroZoom, 30);
const debouncedCalculation = debounce(calculateContainerHeight, 400);

onMounted(() => {
  if (props.imageBackground) {
    containerHeight.value = props.maxScroll + window.innerHeight;
    window.addEventListener("resize", debouncedCalculation);
    window.addEventListener("scroll", throttledHeroZoom);
  }

  if (props.parallax) {
    parallaxInstance = new nuxtApp.$simpleParallax(heroImage.value.$el, {
      delay: 0.6,
      transition: "cubic-bezier(0,0,0,1)",
      scale: 1.3,
    });
  }
});

onUnmounted(() => {
  if (props.imageBackground) {
    window.removeEventListener("resize", debouncedCalculation);
    window.removeEventListener("scroll", throttledHeroZoom);
  }

  if (props.parallax) {
    parallaxInstance.destroy();
  }
});
</script>

<template>
  <section
    class="hero relative overflow-hidden block"
    :class="{ 'h-screen': !props.imageBackground }"
    :style="props.imageBackground ? `height: ${containerHeight}px;` : ''"
  >
    <nuxt-img
      v-if="props.imageBackground"
      :src="props.imageBackground"
      preload
      :width="props.width"
      :height="props.height"
      sizes="sm:640 md:768 lg:1024 xl:1280 xxl:1536 2xxl:2560"
      class="hero-background top-0 left-0 w-full object-cover object-center overflow-visible"
      :class="{
        'fixed h-full': !journeyOver,
        'absolute h-screen': journeyOver,
      }"
      :alt="$t('home.heroImage.alt')"
      :style="props.imageBackground ? inlineCssBackground : ''"
    />
    <nuxt-img
      :src="props.image"
      ref="heroImage"
      preload
      :width="props.width"
      :height="props.height"
      sizes="sm:640 md:768 lg:1024 xl:1280 xxl:1536 2xxl:2560"
      class="hero-main w-full h-full top-0 left-0 object-cover object-center"
      :class="{
        fixed: props.imageBackground,
        absolute: !props.imageBackground,
        hidden: props.imageBackground && journeyOver,
      }"
      :alt="$t('home.heroImage.alt')"
      :style="props.imageBackground ? inlineCssMain : ''"
    />
    <div class="hero-text-wrapper container relative z-10" v-if="props.title">
      <div class="hero-text max-w-xl z-10 text-white">
        <h1>{{ props.title }}</h1>
        <p>{{ props.description }}</p>
      </div>
    </div>
  </section>
</template>

<style>
.simpleParallax {
  height: 100%;
  position: absolute;
  width: 100%;
}
</style>
