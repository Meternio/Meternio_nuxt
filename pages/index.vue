<template>
  <div class="home bg-slate h-[100dvh]">
    <HeroImageThree image="/img/main_home.png" id="hero_home" :polygons="[
      {
        href: '/about',
        text: 'About',
        coordinates: [
          { x: 10, y: 850 },
          { x: 500, y: 850 },
          { x: 520, y: 1130 },
          { x: 50, y: 1300 }
        ]
      },
      {
        href: '/home',
        text: 'Home',
        coordinates: [
          { x: 1530, y: 840 },
          { x: 2050, y: 820 },
          { x: 2050, y: 1270 },
          { x: 1530, y: 1130 }
        ]
      },
      {
        href: '/test',
        text: 'Test',
        coordinates: [
          { x: 1340, y: 1100 },
          { x: 1410, y: 1100 },
          { x: 1410, y: 1180 },
          { x: 1340, y: 1180 }
        ]
      }
    ]" />
  </div>
</template>