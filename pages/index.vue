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
  <div class="home bg-slate h-screen h-[100dvh] flex items-center justify-center">
    <MainMenu :start="startTour" v-if="!tourStarted" />
    <HeroImageThree v-if="tourStarted" image="/img/main_home_8.jpg" :segments="[
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
    ]">
      <Dialog id="portfolioDialog">
        <h2>Portofolio</h2>
        <p>Test</p>
      </Dialog>
      <Dialog id="aboutDialog">
        <h2>Über Mich</h2>
        <p>Hallo, ich bin Florian Hitz, und ich möchte mich kurz vorstellen. Als Entwickler mit über 10 Jahren
          Berufserfahrung bin ich leidenschaftlich daran interessiert, innovative Lösungen zu entwickeln und die digitale
          Welt zu gestalten. Gegenwärtig arbeite ich in drei verschiedenen spannenden Positionen:</p>
        <ul class="list-disc m-0">
          <li>
            Meternio - Selbstständig
            Als Gründer und Geschäftsführer von Meternio konzentriere ich mich auf maßgeschneiderte Softwarelösungen. Mein
            Ziel ist es, Transparenz und Fairness in der Technologiebranche zu schaffen. Ich verstehe die Bedürfnisse
            meiner Kunden und entwickle Lösungen, die nicht nur ihren Anforderungen entsprechen, sondern auch ihr Geschäft
            positiv beeinflussen. Kundenzufriedenheit steht bei Meternio an erster Stelle, und ich arbeite hart daran,
            innovative Lösungen zu entwickeln, die Erwartungen übertreffen. </li>
          <li>
            QOYO Innovations - Teilinhaber und CTO
            Bei QOYO bin ich nicht nur Teilinhaber, sondern auch der Chief Technology Officer (CTO). Diese Position
            ermöglicht es mir, aktiv die technische Vision und Strategie des Unternehmens zu gestalten. Bei QOYO versuchen
            wir Marketing zu revolutionieren.
          </li>
          <li>
            Raffiniert Media AG - CTO und Lead Frontend von coop.ch
            Darüber hinaus bin ich stolz darauf, die Position des Chief Technology Officer bei der Firma Raffiniert Media AG und Lead Frontend Developer bei
            coop.ch zu bekleiden. Hier spiele ich eine entscheidende Rolle bei der Entwicklung und Umsetzung von
            wegweisenden technischen Lösungen für eines der führenden Unternehmen im Bereich E-Commerce.
          </li>
        </ul>
        <p>
          Meine jahrelange Erfahrung und meine Leidenschaft für innovative Technologien haben mich dazu gebracht, in
          diesen unterschiedlichen Rollen tätig zu sein. Ich bin stets bestrebt, Grenzen zu erweitern und innovative
          Lösungen zu schaffen, die den Anforderungen meiner Kunden und Partner gerecht werden.
        </p>
        <p class="mt-3">
          Wenn du mehr über meine Arbeit oder meine Projekte erfahren möchtest, stehe ich gerne zur Verfügung. Zögere
          nicht, mich zu kontaktieren!
        </p>
        <NuxtLink
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          :to="localePath('/contact')"
          >Zum Kontakt</NuxtLink>
      </Dialog>
      <Dialog id="blogDialog">
        <h2>Blog</h2>
        <p>Test2</p>
      </Dialog>
      <Dialog id="contactDialog">
        <h2>Kontakt</h2>
        <p>Test3</p>
      </Dialog>
    </HeroImageThree>
  </div>
</template>
