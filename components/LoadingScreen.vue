<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
  loadingText: {
    type: String,
    default: 'Loading...'
  }
});
const emit = defineEmits();
const closingAnimation = ref(false);

onMounted(() => {
  setTimeout(() => {
    closingAnimation.value = true;
  }, 3000);
  setTimeout(() => {
    emit('loadingFinished');
  }, 4000);
});

onUnmounted(() => { });
</script>

<template>
  <div :class="{
      'animate-[disappearAnimation_1s_ease-in-out_forwards]': closingAnimation,
    }" class="loading-screen font-pressStart bg-slate text-white absolute h-full w-full flex items-center justify-center flex-col gap-5 z-20">
    <span class="text-3xl font-bold text-center">{{props.loadingText}}</span>
    <div class="loading-screen__progress block relative w-72 h-8 rounded-full border-2 before:content-[''] before:absolute before:bg-primary before:rounded-full before:m-[2px] before:inset-[0_100%_0_0] before:animate-[fillBar_3s_forwards]"></div>
  </div>
</template>