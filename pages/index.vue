<script setup>
const tourStarted = ref(false);

function startTour() {
  tourStarted.value = true;
}
</script>

<template>
  <div class="home bg-slate h-[100dvh]">
    <LoadingScreen :start="startTour"/>
    <HeroImageThree v-if="tourStarted"
      image="/img/main_home3.jpg"
      :segments="[
        {
          href: '/about',
          text: 'About',
          segment: [500, 60, 40, -0.938, 0.3, 1.64, 0.2, 0.02],
        },
        {
          href: '/home',
          text: 'Home',
          segment: [500, 60, 40, -0.72, 0.65, 1.27, 0.2],
        },
        {
          href: '/test',
          text: 'Test',
          segment: [500, 60, 40, 0.82, 0.1, 1.61, 0.13],
        },
      ]"
    />
  </div>
</template>
