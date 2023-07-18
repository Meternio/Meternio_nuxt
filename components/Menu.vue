<script setup>
const showOverlay = ref(false);
</script>

<template>
  <header class="menu">
    <button
      class="menu-trigger space-y-2 absolute top-4 right-4 group"
      @click="showOverlay = !showOverlay"
    >
      <span class="block w-8 h-0.5 bg-white"></span>
      <span class="block w-8 h-0.5 bg-white"></span>
      <span
        class="block w-5 transition-all group-hover:w-8 h-0.5 bg-white"
      ></span>
    </button>
    <nav
      class="menu-overlay fixed top-0 left-0 w-full h-full z-50 bg-gray flex items-center justify-center flex-col"
      :class="{
        hidden: !showOverlay,
      }"
    >
      <button
        class="menu-close absolute h-6 w-7 top-4 right-4 group"
        @click="showOverlay = !showOverlay"
      >
        <span class="block w-8 h-0.5 bg-white transition-transform rotate-45 group-hover:rotate-12 absolute"></span>
        <span class="block w-8 h-0.5 bg-white transition-transform -rotate-45 group-hover:-rotate-12 absolute"></span>
      </button>
      <div class="menu-overlay-header">
        <NuxtLink
          :to="localePath('/')"
          :aria-label="$t('header.home')"
          class="header-logo"
        >
          <nuxt-img
            src="img/logo_white.webp"
            preload
            height="60"
            class="h-10"
            :alt="$t('header.logo')"
          />
        </NuxtLink>
      </div>
      <div class="menu-overlay-content text-white flex flex-col">
        <NuxtLink
          :to="localePath('/experience')"
          role="menuitem"
          class="mr-2"
          >{{ $t("header.experience") }}</NuxtLink
        >
        <NuxtLink :to="localePath('/portfolio')" role="menuitem" class="mr-2">{{
          $t("header.portfolio")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" role="menuitem" class="mr-2">{{
          $t("header.contact")
        }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')" role="menuitem" class="mr-2">{{
          $t("header.blog")
        }}</NuxtLink>
      </div>
      <div class="menu-overlay-footer text-white">
        <NuxtLink :to="switchLocalePath('en')">{{
          $t("header.language.en")
        }}</NuxtLink>
        <NuxtLink :to="switchLocalePath('de')">{{
          $t("header.language.de")
        }}</NuxtLink>
      </div>
    </nav>
  </header>
</template>
