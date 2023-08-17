<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  start: Function,
});

const tutorialButton = ref(null);
const iconLoading = ref(true);

function onIconLoad() {
  iconLoading.value = false;
}

onMounted(() => {});

onUnmounted(() => {});
</script>

<template>
  <div class="main-menu font-pressStart">
    <div class="main-menu-additional-info absolute right-16 top-5">
      <Icon name="mdi:arrow-right-top-bold" class="text-white w-auto h-14 animate-bounce" />
      <p class="text-white text-sm absolute left-0 -translate-x-1/4 top-16">
        für ein schnelles Navigieren
      </p>
    </div>
    <div class="main-menu-title flex gap-3 items-baseline">
      <h1 class="text-white text-3xl">meternio</h1>
      <SkeletonLoader type="circle" class="w-[71px] h-16 -mr-3" v-if="iconLoading"/>
      <nuxt-img
        src="img/icon.webp"
        preload
        loading="auto"
        height="64"
        class="h-16 transition-opacity duration-300"
        :class="iconLoading ? 'h-0 w-0 opacity-0' : 'opacity-100'"
        :alt="$t('header.logo')"
        @load="onIconLoad"
      />
    </div>
    <div class="main-menu-action flex flex-col gap-3 mt-5">
      <button
        class="main-menu-action-start text-white font-bold py-2 px-4 rounded-lg bg-primary"
        @click="props.start"
      >
        Start
      </button>
      <button
        ref="tutorialButton"
        class="main-menu-action-tutorial text-white font-bold py-2 px-4 rounded-lg bg-light"
      >
        Tutorial
      </button>
    </div>
    <Dialog :trigger="tutorialButton" :key="tutorialButton">
      <h2>Tutorial</h2>
      <p>
        Nutze die Maus, um dich umzusehen. Grau markierte Bereiche sind
        interaktiv. Bewege die Maus darüber, um Hinweise zu sehen, klicke um zu
        interagieren und weiterzukommen. Viel Spaß beim Spielen!
      </p>
    </Dialog>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  &-action {
    &-start {
      box-shadow: 0 0.2em theme("colors.dark");

      &:active {
        box-shadow: none;
        position: relative;
        top: 0.2em;
      }
    }

    &-tutorial {
      box-shadow: 0 0.2em theme("colors.dark");

      &:active {
        box-shadow: none;
        position: relative;
        top: 0.2em;
      }
    }
  }
}
</style>
