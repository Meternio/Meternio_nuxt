<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { throttle } from "@/functions/main";

const showDrawer = ref(false);
let isHeaderSticky = ref(false);

function toggleDrawer() {
  showDrawer.value = !showDrawer.value;
}

function toggleHeaderTransparency() {
  if (window.scrollY > 20 && !isHeaderSticky.value) {
    isHeaderSticky.value = true;
  } else if (window.scrollY <= 20 && isHeaderSticky.value) {
    isHeaderSticky.value = false;
  }
}

const throttledHeaderTransparency = throttle(toggleHeaderTransparency, 30);

onMounted(() => {
  window.addEventListener("scroll", throttledHeaderTransparency);
});

onUnmounted(() => {
  window.addEventListener("scroll", throttledHeaderTransparency);
});
</script>

<template>
  <header
    class="header fixed w-full top-0 z-50 transition-all"
    :class="{
      'is-sticky bg-slate shadow-[0_10px_15px_1px_rgba(0,0,0,0.75)]':
        isHeaderSticky,
        'pt-5':
        !isHeaderSticky,
    }"
  >
    <div
      class="header-container container flex items-center justify-between py-5"
    >
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
      <nav
        class="header-main-nav text-white no-underline font-bold md:block hidden last:m-3"
        role="navigation"
      >
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
        <NuxtLink :to="switchLocalePath('en')" v-if="$i18n.locale == 'de'">{{
          $t("header.language.en")
        }}</NuxtLink>
        <NuxtLink :to="switchLocalePath('de')" v-if="$i18n.locale == 'en'">{{
          $t("header.language.de")
        }}</NuxtLink>
      </nav>
      <button
        class="header-menu-toggle transparent border-0 text-white cursor-pointer md:hidden"
        @click="toggleDrawer"
        aria-expanded="false"
        aria-controls="drawer"
      >
        <Icon name="fa6-solid:bars" />
        <span class="sr-only">{{ $t("header.toggle") }}</span>
      </button>
      <div
        class="header-drawer fixed top-0 -right-80 bottom-0 w-80 overflow-auto z-50 transition-all md:hidden"
        :class="{ 'right-0': showDrawer }"
      >
        <nav
          class="header-drawer-nav bg-gray z-50 relative h-full"
          tabindex="-1"
          role="menu"
          aria-hidden="true"
        >
          <NuxtLink
            :to="localePath('/')"
            class="m-auto block py-5"
            role="menuitem"
            :aria-label="$t('header.home')"
          >
            <nuxt-img
              src="img/logo_white.webp"
              height="40"
              :alt="$t('header.logo')"
              class="m-auto"
            />
          </NuxtLink>
          <NuxtLink
            :to="localePath('/experience')"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >{{ $t("header.experience") }}</NuxtLink
          >
          <NuxtLink
            :to="localePath('/portfolio')"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >{{ $t("header.portfolio") }}</NuxtLink
          >
          <NuxtLink
            :to="localePath('/contact')"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >{{ $t("header.contact") }}</NuxtLink
          >
          <NuxtLink
            :to="localePath('/blog')"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >{{ $t("header.blog") }}</NuxtLink
          >
          <Icon
            name="fa6-solid:xmark"
            class="header-drawer-close absolute top-5 right-5 text-white cursor-pointer"
            @click="toggleDrawer"
            :aria-label="$t('header.close')"
          />
        </nav>
        <div
          class="header-drawer-background left-0 top-0 right-0 bottom-0 fixed bg-black opacity-60 z-40 md:hidden cursor-pointer"
          :class="{ block: showDrawer, hidden: !showDrawer }"
          @click="toggleDrawer"
        ></div>
      </div>
    </div>
  </header>
</template>
