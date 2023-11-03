<script setup>
import { useDialogStore } from '@/stores/dialogStore';

const dialogStore = useDialogStore();
const tourStarted = ref(false);
const homeDialog = ref(null);

function startTour(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  tourStarted.value = true;
}

function closeTour() {
  tourStarted.value = false;
}

function closeDialog(e) {
  dialogStore.closeDialog(homeDialog.value.$el, e, true, closeTour);
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
        dialogId: 'homeDialog',
        segment: [500, 60, 40, 0.4, 0.3, 1.41, 0.7, 0],
      }
    ]"
    :standupAnimation="true">
      <Dialog id="portfolioDialog">
        <h2 tabindex="0">Portofolio</h2>
        <p class="mt-1">In meinem Portfolio findest du eine Auswahl an Projekten, an denen ich in den letzten Jahren gearbeitet habe.
          Diese Projekte repräsentieren meine Leidenschaft für innovative Technologie und meine Fähigkeit, vielfältige
          Herausforderungen anzunehmen. Hier sind einige meiner herausragenden Referenzen:</p>
        <ul class="list-disc m-0">
          <li>
            <a href="https://qoyo.io" class="font-bold" target="_blank">qoyo.io</a><br>
            qoyo.io ist eine unabhängige Plattform, die ich mit Next (React) entwickelt habe, und wir auch als
            White-Label-Lösung anbiete. Hierbei handelt es sich um eine wegweisende Plattform, die Licht ins dunkle
            bringen soll und Marketing revolutioniert. Als CTO bin ich zuständig für die technische Vision und Strategie
            des Unternehmens und die Umsetzung.
          </li>
          <li>
            <a href="https://coop.ch" class="font-bold" target="_blank">coop.ch</a><br>
            Bei coop.ch spiele ich eine Schlüsselrolle als Lead Frontend Developer. Diese Website ist das Aushängeschild
            eines der führenden Unternehmen im E-Commerce. Ich arbeite daran, die Benutzererfahrung zu optimieren und
            innovative Frontend-Lösungen zu entwickeln. Auch hier bin ich als CTO Tätig für die Firma Raffiniert Media AG und somit verantwortlich für das
            Management und Weiterentwicklung der Webseite.
          </li>
          <li>
            <a href="https://handtherapie-seefeld.ch" class="font-bold" target="_blank">handtherapie-seefeld.ch</a><br>
            Dieses Projekt war eine herausfordernde Aufgabe, bei der wir eine hochwertige Website für Handtherapie und
            Rehabilitation mit einem begrenzten Budget entwickelt haben. Es war spannend, eine maßgeschneiderte Lösung zu
            schaffen, die den Bedürfnissen unserer Kunden entsprach.
          </li>
          <li>
            <a href="https://the-finance-guy.ch" class="font-bold" target="_blank">the-finance-guy.ch</a><br>
            Dieses Projekt zeigt, wie kreative Lösungen auch bei begrenztem Budget realisierbar sind. Hier haben wir eine
            ansprechende Website für Finanzdienstleistungen entwickelt, die dennoch benutzerfreundlich und informativ ist.
          </li>
        </ul>
        <p>
          Diese Projekte sind nur einige Beispiele für meine vielfältige Arbeit in der Welt der Softwareentwicklung und
          des Webdesigns. Wenn du weitere Informationen zu einem dieser Projekte wünschst oder Interesse an einer
          Zusammenarbeit hast, zögere nicht, mich zu kontaktieren. Ich freue mich darauf, über weitere spannende Projekte
          zu sprechen.
        </p>
        <NuxtLink
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          :to="localePath('/contact')">Zum Kontakt</NuxtLink>
        <NuxtLink class="underline font-bold py-2 px-4 rounded-lg mt-3 inline-block" :to="localePath('/portfolio')">
          weitere Portfolio</NuxtLink>
      </Dialog>
      <Dialog id="aboutDialog">
        <h2 tabindex="0">Über Mich</h2>
        <p class="mt-1">Hallo, ich bin Florian Hitz, und ich möchte mich kurz vorstellen. Als Entwickler mit über 10 Jahren
          Berufserfahrung bin ich leidenschaftlich daran interessiert, innovative Lösungen zu entwickeln und die digitale
          Welt zu gestalten. Gegenwärtig arbeite ich in drei verschiedenen spannenden Positionen:</p>
        <ul class="list-disc m-0">
          <li>
            <strong>Meternio - Selbstständig</strong><br>
            Als Gründer und Geschäftsführer von Meternio konzentriere ich mich auf maßgeschneiderte Softwarelösungen. Mein
            Ziel ist es, Transparenz und Fairness in der Technologiebranche zu schaffen. Ich verstehe die Bedürfnisse
            meiner Kunden und entwickle Lösungen, die nicht nur ihren Anforderungen entsprechen, sondern auch ihr Geschäft
            positiv beeinflussen. Kundenzufriedenheit steht bei Meternio an erster Stelle, und ich arbeite hart daran,
            innovative Lösungen zu entwickeln, die Erwartungen übertreffen.
          </li>
          <li>
            <strong>QOYO Innovations - Teilinhaber und CTO</strong><br>
            Bei QOYO bin ich nicht nur Teilinhaber, sondern auch der Chief Technology Officer (CTO). Diese Position
            ermöglicht es mir, aktiv die technische Vision und Strategie des Unternehmens zu gestalten. Bei QOYO versuchen
            wir Marketing zu revolutionieren.
          </li>
          <li>
            <strong>Raffiniert Media AG - CTO und Lead Frontend von coop.ch</strong><br>
            Darüber hinaus bin ich stolz darauf, die Position des Chief Technology Officer bei der Firma Raffiniert Media
            AG und Lead Frontend Developer bei
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
          :to="localePath('/contact')">Zum Kontakt</NuxtLink>
        <NuxtLink class="underline font-bold py-2 px-4 rounded-lg mt-3 inline-block" :to="localePath('/portfolio')">
          Zum Portfolio</NuxtLink>
      </Dialog>
      <Dialog id="blogDialog">
        <h2 tabindex="0">Willkommen zu meinem Blog!</h2>
        <p class="mt-1">
          In meinem Blog findest du einen Einblick in meine Welt als erfahrener Entwickler und Unternehmer. Hier teile
          ich nicht nur meine Arbeiten und Projekte, sondern auch meine kontinuierlichen Lernfortschritte und aktuellen
          Umsetzungen.
        </p>
        <p class="mt-3">
          Egal, ob du an inspirierenden Projekten, technischen Einblicken oder Tipps zur beruflichen Weiterentwicklung
          interessiert bist, mein Blog bietet eine Vielfalt an Inhalten. Ich freue mich darauf, meine Erfahrungen,
          Herausforderungen und Erfolge mit dir zu teilen.
        </p>
        <p class="mt-3">
          Bleib dran, um mehr über meine Arbeit, meine aktuellen Projekte und meine Reise als Entwickler zu erfahren. Ich
          lade dich herzlich ein, Teil meiner Entwicklungsreise zu sein und hoffe, dass du genauso viel Freude beim Lesen
          hast wie ich beim Teilen meiner Geschichten.
        </p>
        <NuxtLink
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          :to="localePath('/blog')">Zum Blog</NuxtLink>
      </Dialog>
      <Dialog id="contactDialog">
        <h2 tabindex="0">Kontaktiere mich für Aufträge</h2>
        <p class="mt-1">
          Ich freue mich darauf, von dir zu hören und darüber zu sprechen, wie ich dir bei deinem nächsten Projekt helfen
          kann. Egal, ob du eine maßgeschneiderte Softwarelösung benötigst, Unterstützung bei der Umsetzung deiner Ideen
          suchst oder einfach nur Fragen hast, zögere nicht, mich zu kontaktieren.
        </p>
        <p class="mt-3">
          Deine Vision und Anforderungen sind für mich von höchster Bedeutung, und ich bin bereit, gemeinsam
          mit dir innovative Lösungen zu entwickeln. Lass uns zusammenarbeiten, um das Beste aus deinem Vorhaben
          herauszuholen.
        </p>
        <p class="mt-3">
          Schicke mir eine Nachricht, und ich werde mich so schnell wie möglich bei dir melden. Du kannst
          mir auch eine E-Mail schreiben oder mich über die angegebenen sozialen Medien kontaktieren.
        </p>
        <p class="mt-3">
          Dein nächstes Projekt verdient die Expertise und das Engagement eines erfahrenen Entwicklers. Ich
          freue mich darauf, mit dir zusammenzuarbeiten und gemeinsam großartige Ergebnisse zu erzielen.
        </p>
        <NuxtLink
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
        :to="localePath('/contact')">Zum Kontakt</NuxtLink>
    </Dialog>
    <Dialog id="homeDialog" ref="homeDialog">
      <h2 tabindex="0">Virutelles Büro verlassen</h2>
      <p class="mt-1">Willst du das Virutelle Büro verlassen?</p>
      <a @click="(e) => dialogStore.closeDialog(homeDialog.$el, e, true)"
        class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block">Bleiben</a>
      <a class="underline font-bold py-2 px-4 rounded-lg mt-3 inline-block" @click="closeDialog">
        Verlassen</a>
    </Dialog>
  </HeroImageThree>
</div></template>
