<script setup>
import {
  ref, onMounted, onUnmounted,
} from 'vue';
import { throttle } from '@/functions/main';

const props = defineProps({
  title: String,
  description: String,
  image: String,
  parallax: Boolean,
});

const target = ref(null);
const backgroundPosition = ref('50% 50%');

function checkInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom >= 0
  );
}

function parallax() {
  if (checkInViewport(target.value)) {
    backgroundPosition.value = `50% ${50 - (window.scrollY / 100) * 3}%`;
  }
}

const throttledScroll = throttle(parallax, 20);

onMounted(() => {
  if (props.parallax) {
    window.addEventListener('scroll', throttledScroll);
  }
});

onUnmounted(() => {
  if (props.parallax) {
    window.removeEventListener('scroll', throttledScroll);
  }
});
</script>

<template>
  <section class="hero w-full h-[calc(100vh_-_5rem)] flex items-center flex-row flex-wrap" ref="target">
    <div
      class="hero-image absolute top-0 left-0 bottom-0 right-0 bg-cover bg-no-repeat"
      :class="{
        'hero-image--parallax bg-fixed': props.parallax,
      }"
      :style="{
        'background-position': backgroundPosition,
        'background-image': `url(${props.image})`,
      }"
    ></div>
    <div class="hero-text-wrapper max-w-xl z-10 text-white">
      <h1>{{ props.title }}</h1>
      <p>{{ props.description }}</p>
    </div>
  </section>
</template>
