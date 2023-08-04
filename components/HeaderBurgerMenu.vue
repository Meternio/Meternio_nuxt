<script setup>
const showOverlay = ref(false);
const closingAnimation = ref(false);
const openingAnimation = ref(true);

function toggleOverlay() {
  if (!showOverlay.value) {
    showOverlay.value = !showOverlay.value;
    openingAnimation.value = true;
    setTimeout(() => {
      openingAnimation.value = false;
    }, 300);
  } else {
    closingAnimation.value = true;
    setTimeout(() => {
      closingAnimation.value = false;
      showOverlay.value = !showOverlay.value;
    }, 300);
  }
}

function toggleOverlayWithDelay() {
  setTimeout(() => {
    showOverlay.value = !showOverlay.value;
  }, 500);
}
</script>

<template>
  <header class="menu">
    <button
      class="menu-trigger space-y-2 absolute top-4 right-4 group"
      @click="toggleOverlay"
    >
      <span class="block w-8 h-0.5 bg-white"></span>
      <span class="block w-8 h-0.5 bg-white"></span>
      <span
        class="block w-5 transition-all group-hover:w-8 h-0.5 bg-white"
      ></span>
    </button>
    <nav
      class="menu-overlay fixed top-0 left-0 w-full h-full z-50 bg-gray flex items-center justify-center flex-col gap-8 text-2xl"
      :class="{
        hidden: !showOverlay,
        'animate-container-enter': openingAnimation,
        'animate-container-exit': closingAnimation,
      }"
    >
      <button
        class="menu-close absolute h-6 w-7 top-4 right-4 group"
        @click="toggleOverlay"
      >
        <span
          class="block w-8 h-0.5 bg-white transition-transform rotate-45 group-hover:rotate-12 absolute"
        ></span>
        <span
          class="block w-8 h-0.5 bg-white transition-transform -rotate-45 group-hover:-rotate-12 absolute"
        ></span>
      </button>
      <div class="menu-overlay-header">
        <NuxtLink
          :to="localePath('/')"
          :aria-label="$t('header.home')"
          class="header-logo"
          @click="toggleOverlayWithDelay"
        >
          <nuxt-img
            src="img/logo_white.webp"
            height="64"
            class="h-16"
            :alt="$t('header.logo')"
          />
        </NuxtLink>
      </div>
      <div class="menu-overlay-content text-white flex flex-col text-center">
        <NuxtLink
          :to="localePath('/experience')"
          role="menuitem"
          @click="toggleOverlayWithDelay"
          >{{ $t("header.experience") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/portfolio')"
          role="menuitem"
          @click="toggleOverlayWithDelay"
          >{{ $t("header.portfolio") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/contact')"
          role="menuitem"
          @click="toggleOverlayWithDelay"
          >{{ $t("header.contact") }}</NuxtLink
        >
        <NuxtLink
          :to="localePath('/blog')"
          role="menuitem"
          @click="toggleOverlayWithDelay"
          >{{ $t("header.blog") }}</NuxtLink
        >
      </div>
      <div class="menu-overlay-footer text-white flex flex-row gap-2">
        <NuxtLink :to="switchLocalePath('de')">{{
          $t("header.language.de")
        }}</NuxtLink>
        <div class="w-px h-7 bg-white"></div>
        <NuxtLink :to="switchLocalePath('en')">{{
          $t("header.language.en")
        }}</NuxtLink>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="less">
.menu {
  &-overlay{
    &.animate-container-enter {
      animation: openContainerAnimation 0.3s ease-in-out, fullScreenAnimation 0.3s ease-in-out;
    }

    &.animate-container-exit {
      animation: closeContainerAnimation 0.3s ease-in-out, smallScreenAnimation 0.3s ease-in-out;
    }
  }
}
</style>
