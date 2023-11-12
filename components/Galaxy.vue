<script setup>
import { onMounted, onUnmounted } from "vue";
import { throttle } from "@/functions/main";

const props = defineProps({
  maxScroll: Number,
  reverseZoom: Boolean,
});

let journeyOver = false;
const inlineCssMain = ref(
  props.reverseZoom ? "transform: scale(3);" : "transform: scale(1.0);"
);

const inlineCssStar1 = ref();
const inlineCssStar2 = ref();
const inlineCssStar3 = ref();

function setInlineCssMain(inlineCssMainValue, scrollTop, progress) {
  const angle1 = progress * 60;
  const angle2 = progress * 120;
  const angle3 = progress * 180;

  if (!props.reverseZoom) {
    inlineCssMainValue = 1 + scrollTop / 20000;
  } else {
    inlineCssMainValue = 3 - scrollTop / 20000;
  }

  inlineCssMain.value = `transform: scale(${inlineCssMainValue});`;

  if (journeyOver) {
    inlineCssMain.value += `top: ${props.maxScroll - window.innerHeight}px;`;
  }

  inlineCssStar1.value = `transform: rotate(${angle1}deg);`;
  inlineCssStar2.value = `transform: rotate(${angle2}deg);`;
  inlineCssStar3.value = `transform: rotate(${angle3}deg);`;
}

function starsRotation() {
  let scrollTop = window.scrollY;
  let inlineCssMainValue;

  // Calculate the progress as a value between 0 and 1
  const progress = Math.min(
    scrollTop / (props.maxScroll - window.innerHeight),
    1
  );

  if (scrollTop < props.maxScroll - window.innerHeight) {
    journeyOver = false;

    setInlineCssMain(inlineCssMainValue, scrollTop, progress);
  } else if (!journeyOver) {
    journeyOver = true;

    setInlineCssMain(inlineCssMainValue, scrollTop, progress);
  }
}

const throttledStarsRotation = throttle(starsRotation, 30);

onMounted(() => {
  window.addEventListener("scroll", throttledStarsRotation);
});

onUnmounted(() => {
  window.removeEventListener("scroll", throttledStarsRotation);
});
</script>

<template>
  <div
    class="galaxy overflow-hidden relative"
    :style="`height: ${props.maxScroll}px;`"
  >
    <div
      class="galaxy__wrapper bottom-0 right-0 left-0 top-0"
      :style="inlineCssMain"
      :class="{
        fixed: !journeyOver,
        absolute: journeyOver,
      }"
    >
      <div class="galaxy__stars galaxy__stars--1" :style="inlineCssStar1"></div>
      <div class="galaxy__stars galaxy__stars--2" :style="inlineCssStar2"></div>
      <div class="galaxy__stars galaxy__stars--3" :style="inlineCssStar3"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
.galaxy {
  background: radial-gradient(circle at bottom, navy 0, black 100%);
  /* Fallback */
  height: 100vh;
  height: 100dvh;

  &__stars {
    background: transparent center / 200px 200px round;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;

    &--1 {
      animation: space 1.8s linear infinite;
      background-image: radial-gradient(
          1px 1px at 25px 5px,
          white,
          rgba(255, 255, 255, 0)
        ),
        radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)),
        radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)),
        radial-gradient(1.5px 1.5px at 50px 75px, white, rgba(255, 255, 255, 0)),
        radial-gradient(2px 2px at 15px 125px, white, rgba(255, 255, 255, 0)),
        radial-gradient(
          2.5px 2.5px at 110px 80px,
          white,
          rgba(255, 255, 255, 0)
        );
    }

    &--2 {
      animation: space 2.4s ease-in infinite;
      background-image: radial-gradient(
          1px 1px at 75px 125px,
          white,
          rgba(255, 255, 255, 0)
        ),
        radial-gradient(1px 1px at 100px 75px, white, rgba(255, 255, 255, 0)),
        radial-gradient(
          1.5px 1.5px at 199px 100px,
          white,
          rgba(255, 255, 255, 0)
        ),
        radial-gradient(2px 2px at 20px 50px, white, rgba(255, 255, 255, 0)),
        radial-gradient(2.5px 2.5px at 100px 5px, white, rgba(255, 255, 255, 0)),
        radial-gradient(2.5px 2.5px at 5px 5px, white, rgba(255, 255, 255, 0));
    }

    &--3 {
      animation: space 3s ease-out infinite;
      background-image: radial-gradient(
          1px 1px at 10px 10px,
          white,
          rgba(255, 255, 255, 0)
        ),
        radial-gradient(1px 1px at 150px 150px, white, rgba(255, 255, 255, 0)),
        radial-gradient(
          1.5px 1.5px at 60px 170px,
          white,
          rgba(255, 255, 255, 0)
        ),
        radial-gradient(
          1.5px 1.5px at 175px 180px,
          white,
          rgba(255, 255, 255, 0)
        ),
        radial-gradient(2px 2px at 195px 95px, white, rgba(255, 255, 255, 0)),
        radial-gradient(
          2.5px 2.5px at 95px 145px,
          white,
          rgba(255, 255, 255, 0)
        );
    }
  }

  @keyframes space {
    40% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.25;
    }
    60% {
      opacity: 0.75;
    }
    100% {
      /*transform: rotate(360deg);*/
    }
  }
}
</style>
