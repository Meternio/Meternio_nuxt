<script setup>
import { ref } from "vue";

const showDrawer = ref(false);

function toggleDrawer() {
  showDrawer.value = !showDrawer.value;
}
</script>

<template>
  <div class="h-5"></div>
  <header class="header sticky top-0 z-50">
    <div class="header-container container flex items-center justify-between py-5">
      <NuxtLink to="/" aria-label="Home" class="header-logo">
        <nuxt-img src="img/logo_white.webp" height="40" alt="Logo" />
      </NuxtLink>
      <nav
        class="header-main-nav text-white no-underline font-bold md:block hidden last:m-3"
        role="navigation"
      >
        <NuxtLink to="/" role="menuitem" class="mr-2 hover:text-primary"
          >Home</NuxtLink
        >
        <NuxtLink
          to="/experience"
          role="menuitem"
          class="mr-2 hover:text-primary"
          >Experience</NuxtLink
        >
        <NuxtLink
          to="/portfolio"
          role="menuitem"
          class="mr-2 hover:text-primary"
          >Portfolio</NuxtLink
        >
        <NuxtLink to="/contact" role="menuitem" class="mr-2 hover:text-primary"
          >Contact</NuxtLink
        >
        <NuxtLink to="/blog" role="menuitem" class="mr-0 hover:text-primary"
          >Blog</NuxtLink
        >
      </nav>
      <button
        class="header-menu-toggle transparent border-0 text-white cursor-pointer md:hidden"
        @click="toggleDrawer"
        aria-expanded="false"
        aria-controls="drawer"
      >
        <Icon name="fa6-solid:bars" />
        <span class="sr-only">Toggle mobile drawer</span>
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
            to="/"
            class="m-auto block py-5"
            role="menuitem"
            aria-label="Home"
          >
            <nuxt-img
              src="img/logo_white.webp"
              height="40"
              alt="Logo"
              class="m-auto"
            />
          </NuxtLink>
          <NuxtLink
            to="/experience"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >Experience</NuxtLink
          >
          <NuxtLink
            to="/portfolio"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >Portfolio</NuxtLink
          >
          <NuxtLink
            to="/contact"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >Contact</NuxtLink
          >
          <NuxtLink
            to="/blog"
            role="menuitem"
            class="block text-white no-underline p-2 border-b-2"
            >Blog</NuxtLink
          >
          <Icon
            name="fa6-solid:xmark"
            class="header-drawer-close absolute top-5 right-5 text-white"
            @click="toggleDrawer"
            aria-label="close menu"
          />
        </nav>
        <div
          class="header-drawer-background left-0 top-0 right-0 bottom-0 fixed bg-black opacity-60 z-40 md:hidden"
          :class="{ block: showDrawer, hidden: !showDrawer }"
          @click="toggleDrawer"
        ></div>
      </div>
    </div>
  </header>
</template>
