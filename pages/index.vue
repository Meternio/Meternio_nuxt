<template>
  <div class="home bg-slate h-[100dvh]">
    <HeroImageThree image="/img/main_home3.jpg" :polygons="[
      {
        href: '/about',
        text: 'About',
        coordinates: [
          { x: 10, y: 850, z: 0 },
          { x: 500, y: 850, z: 0  },
          { x: 520, y: 1130, z: 0  },
          { x: 50, y: 1300, z: 0  }
        ]
      },
      {
        href: '/home',
        text: 'Home',
        coordinates: [
          { x: 1530, y: 840, z: 0  },
          { x: 2050, y: 820, z: 100  },
          { x: 2050, y: 1270, z: 200  },
          { x: 1530, y: 1130, z: 300  }
        ]
      },
      {
        href: '/test',
        text: 'Test',
        coordinates: [
          { x: 1340, y: 1100, z: 0  },
          { x: 1410, y: 1100, z: 0  },
          { x: 1410, y: 1180, z: 0  },
          { x: 1340, y: 1180, z: 0  }
        ]
      }
    ]" />
  </div>
</template>