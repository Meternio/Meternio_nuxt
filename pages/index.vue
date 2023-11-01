<script setup>
const tourStarted = ref(false);

function startTour() {
  tourStarted.value = true;
}

useHead({
  title: "Meternio",
  meta: [
    { name: "description", content: "Ihr Informatiker aus der Nachbarschaft." },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Press%20Start%202P",
    },
  ],
});
</script>

<template>
  <div
    class="home bg-slate h-screen h-[100dvh] flex items-center justify-center"
  >
    <MainMenu :start="startTour" v-if="!tourStarted" />
    <HeroImageThree
      v-if="tourStarted"
      image="/img/main_home_8.jpg"
      :segments="[
        {
          dialogId: 'portfolioDialog',
          segment: [500, 60, 40, -0.938, 0.3, 1.64, 0.2, 0.02],
        },
        {
          dialogId: 'aboutDialog',
          segment: [500, 60, 40, -0.72, 0.65, 1.27, 0.2, 0],
        },
        {
          dialogId: 'blogDialog',
          segment: [500, 60, 40, 0.82, 0.1, 1.61, 0.13, 0],
        },
        {
          dialogId: 'contactDialog',
          segment: [500, 60, 40, -0.6, 0.1, 1.75, 0.13, 0.02],
        },
        {
          href: '/',
          segment: [500, 60, 40, 0.4, 0.3, 1.41, 0.7, 0],
        }
      ]"
    >
      <Dialog id="portfolioDialog">
        <h2>test!</h2>
        <p>Test</p>
      </Dialog>
      <Dialog id="aboutDialog">
        <h2>test1!</h2>
        <p>Test1</p>
      </Dialog>
      <Dialog id="blogDialog">
        <h2>test2!</h2>
        <p>Test2</p>
      </Dialog>
      <Dialog id="contactDialog">
        <h2>test3!</h2>
        <p>Test3</p>
      </Dialog>
    </HeroImageThree>
  </div>
</template>
