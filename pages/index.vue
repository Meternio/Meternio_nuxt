<script setup>
import { useDialogStore } from "@/stores/dialogStore";

const dialogStore = useDialogStore();
const tourStarted = ref(false);
const leaveTourDialog = ref(null);
const leaveTourButton = ref(null);

function startTour(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  tourStarted.value = true;
}

function leaveTour() {
  tourStarted.value = false;
}

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Press%20Start%202P",
    },
  ],
});

useSeoMeta({
  title: 'Meternio',
  ogTitle: 'Meternio',
  description: 'Ihr Informatiker aus der Nachbarschaft. Ich entwickeln massgeschneiderte Softwarelösungen für Ihr Unternehmen und optimiere ihren Prozess.',
  ogDescription: 'Ihr Informatiker aus der Nachbarschaft. Ich entwickeln massgeschneiderte Softwarelösungen für Ihr Unternehmen und optimiere ihren Prozess.',
})
</script>

<template>
  <div class="home bg-slate flex items-center justify-center">
    <MainMenu :start="startTour" v-if="!tourStarted" />
    <HeroImageThree
      v-if="tourStarted"
      @leave-tour="leaveTour"
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
          //functionToCall: 'leaveAnimation',
          //href: '/',
          dialogId: 'leaveTourDialog',
          segment: [500, 60, 40, 0.4, 0.3, 1.41, 0.7, 0],
        },
      ]"
      :bind-leave-tour="leaveTourButton"
      :standupAnimation="true"
    >
      <Dialog id="portfolioDialog">
        <h2 tabindex="0">Portofolio</h2>
        <p class="mt-1">
          In meinem Portfolio findest du eine Auswahl an Projekten, an denen ich
          in den letzten Jahren gearbeitet habe. Diese Projekte repräsentieren
          meine Leidenschaft für innovative Technologie und meine Fähigkeit,
          vielfältige Herausforderungen anzunehmen. Hier sind einige meiner
          herausragenden Referenzen:
        </p>
        <ul class="list-disc m-0">
          <li>
            <a href="https://qoyo.io" class="font-bold" target="_blank"
              >qoyo.io</a
            ><br />
            qoyo.io ist eine unabhängige Plattform, die ich mit Next (React)
            entwickelt habe, und wir auch als White-Label-Lösung anbiete.
            Hierbei handelt es sich um eine wegweisende Plattform, die Licht ins
            dunkle bringen soll und Marketing revolutioniert. Als CTO bin ich
            zuständig für die technische Vision und Strategie des Unternehmens
            und die Umsetzung.
          </li>
          <li>
            <a href="https://coop.ch" class="font-bold" target="_blank"
              >coop.ch</a
            ><br />
            Bei coop.ch spiele ich eine Schlüsselrolle als Lead Frontend
            Developer. Diese Website ist das Aushängeschild eines der führenden
            Unternehmen im E-Commerce. Ich arbeite daran, die Benutzererfahrung
            zu optimieren und innovative Frontend-Lösungen zu entwickeln. Auch
            hier bin ich als CTO Tätig für die Firma Raffiniert Media AG und
            somit verantwortlich für das Management und Weiterentwicklung der
            Webseite.
          </li>
          <li>
            <a
              href="https://handtherapie-seefeld.ch"
              class="font-bold"
              target="_blank"
              >handtherapie-seefeld.ch</a
            ><br />
            Dieses Projekt war eine herausfordernde Aufgabe, bei der wir eine
            hochwertige Website für Handtherapie und Rehabilitation mit einem
            begrenzten Budget entwickelt haben. Es war spannend, eine
            maßgeschneiderte Lösung zu schaffen, die den Bedürfnissen unserer
            Kunden entsprach.
          </li>
          <li>
            <a
              href="https://the-finance-guy.ch"
              class="font-bold"
              target="_blank"
              >the-finance-guy.ch</a
            ><br />
            Dieses Projekt zeigt, wie kreative Lösungen auch bei begrenztem
            Budget realisierbar sind. Hier haben wir eine ansprechende Website
            für Finanzdienstleistungen entwickelt, die dennoch
            benutzerfreundlich und informativ ist.
          </li>
        </ul>
        <p>
          Diese Projekte sind nur einige Beispiele für meine vielfältige Arbeit
          in der Welt der Softwareentwicklung und des Webdesigns. Wenn du
          weitere Informationen zu einem dieser Projekte wünschst oder Interesse
          an einer Zusammenarbeit hast, zögere nicht, mich zu kontaktieren. Ich
          freue mich darauf, über weitere spannende Projekte zu sprechen.
        </p>
        <a
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          href="mailto:info@meternio.ch?subject=Auftrag&body=Ich bin interessiert an..."
          >Kontakt aufnehmen</a
        >
      </Dialog>
      <Dialog id="aboutDialog">
        <h2 tabindex="0">Über Mich</h2>
        <p class="mt-1">
          Hallo, ich bin Florian Hitz, und ich möchte mich kurz vorstellen. Als
          Entwickler mit über 10 Jahren Berufserfahrung bin ich leidenschaftlich
          daran interessiert, innovative Lösungen zu entwickeln und die digitale
          Welt zu gestalten. Gegenwärtig arbeite ich in drei verschiedenen
          spannenden Positionen:
        </p>
        <ul class="list-disc m-0">
          <li>
            <strong>Meternio - Selbstständig</strong><br />
            Als Gründer und Geschäftsführer von Meternio konzentriere ich mich
            auf maßgeschneiderte Softwarelösungen. Mein Ziel ist es, Transparenz
            und Fairness in der Technologiebranche zu schaffen. Ich verstehe die
            Bedürfnisse meiner Kunden und entwickle Lösungen, die nicht nur
            ihren Anforderungen entsprechen, sondern auch ihr Geschäft positiv
            beeinflussen. Kundenzufriedenheit steht bei Meternio an erster
            Stelle, und ich arbeite hart daran, innovative Lösungen zu
            entwickeln, die Erwartungen übertreffen.
          </li>
          <li>
            <strong>QOYO Innovations - Teilinhaber und CTO</strong><br />
            Bei QOYO bin ich nicht nur Teilinhaber, sondern auch der Chief
            Technology Officer (CTO). Diese Position ermöglicht es mir, aktiv
            die technische Vision und Strategie des Unternehmens zu gestalten.
            Bei QOYO versuchen wir Marketing zu revolutionieren.
          </li>
          <li>
            <strong
              >Raffiniert Media AG - CTO und Lead Frontend von coop.ch</strong
            ><br />
            Darüber hinaus bin ich stolz darauf, die Position des Chief
            Technology Officer bei der Firma Raffiniert Media AG und Lead
            Frontend Developer bei coop.ch zu bekleiden. Hier spiele ich eine
            entscheidende Rolle bei der Entwicklung und Umsetzung von
            wegweisenden technischen Lösungen für eines der führenden
            Unternehmen im Bereich E-Commerce.
          </li>
        </ul>
        <p>
          Meine jahrelange Erfahrung und meine Leidenschaft für innovative
          Technologien haben mich dazu gebracht, in diesen unterschiedlichen
          Rollen tätig zu sein. Ich bin stets bestrebt, Grenzen zu erweitern und
          innovative Lösungen zu schaffen, die den Anforderungen meiner Kunden
          und Partner gerecht werden.
        </p>
        <p class="mt-3">
          Wenn du mehr über meine Arbeit oder meine Projekte erfahren möchtest,
          stehe ich gerne zur Verfügung. Zögere nicht, mich zu kontaktieren!
        </p>
        <a
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          href="mailto:info@meternio.ch?subject=Auftrag&body=Ich bin interessiert an..."
          >Kontakt aufnehmen</a
        >
      </Dialog>
      <Dialog id="blogDialog">
        <h2 tabindex="0">Technologie-Stack</h2>
        <p class="mt-1">
          In meiner Entwicklungsreise konzentriere ich mich auf hochmoderne
          Webanwendungen, und dabei spiele React und Vue eine Schlüsselrolle.
          Mit diesen Frameworks gestalte ich moderne, performante und
          skalierbare Benutzeroberflächen.
        </p>
        <ul class="list-disc m-0">
          <li>
            <strong>HTML, JS, CSS</strong><br />
            Die essenziellen Bausteine für jede ansprechende Benutzeroberfläche.
          </li>
          <li>
            <strong>Next.js und Nuxt.js</strong><br />
            Diese Frameworks erweitern meine Fähigkeiten, indem sie zusätzliche
            Features wie Server-Side Rendering und Routing bieten.
          </li>
          <li>
            <strong>Firebase</strong><br />
            Mein Go-to für schnelles Backend-as-a-Service (BaaS) und
            Echtzeitdatenbanken.
          </li>
          <li>
            <strong>Storyblok, Wordpress</strong><br />
            Ich setze auf Storyblok und WordPress für effizientes Content
            Management, wobei Storyblok als leistungsstarkes Headless CMS und
            WordPress für flexibles serverseitiges Skripting und
            Content-Management dient.
          </li>
          <li>
            <strong>Allgemein</strong><br />
            Du kannst darauf vertrauen, dass ich mich ständig weiterbilde, um
            immer auf dem neuesten Stand der Technologien zu sein und dir so die
            bestmöglichen Lösungen bieten zu können. Zusätzlich bilde ich mich
            gezielt für dein Projekt weiter, um sicherzustellen, dass meine
            Fähigkeiten und Kenntnisse optimal auf die Anforderungen und Ziele
            deines Projekts ausgerichtet sind.
          </li>
        </ul>
        <a
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          href="mailto:info@meternio.ch?subject=Auftrag&body=Ich bin interessiert an..."
          >Kontakt aufnehmen</a
        >
      </Dialog>
      <Dialog id="contactDialog">
        <h2 tabindex="0">Kontaktiere mich für Aufträge</h2>
        <p class="mt-1">
          Ich freue mich darauf, von dir zu hören und darüber zu sprechen, wie
          ich dir bei deinem nächsten Projekt helfen kann. Egal, ob du eine
          maßgeschneiderte Softwarelösung benötigst, Unterstützung bei der
          Umsetzung deiner Ideen suchst oder einfach nur Fragen hast, zögere
          nicht, mich zu kontaktieren.
        </p>
        <p class="mt-3">
          Deine Vision und Anforderungen sind für mich von höchster Bedeutung,
          und ich bin bereit, gemeinsam mit dir innovative Lösungen zu
          entwickeln. Lass uns zusammenarbeiten, um das Beste aus deinem
          Vorhaben herauszuholen.
        </p>
        <p class="mt-3">
          Schicke mir eine Nachricht, und ich werde mich so schnell wie möglich
          bei dir melden. Du kannst mir auch eine E-Mail schreiben oder mich
          über die angegebenen sozialen Medien kontaktieren.
        </p>
        <p class="mt-3">
          Dein nächstes Projekt verdient die Expertise und das Engagement eines
          erfahrenen Entwicklers. Ich freue mich darauf, mit dir
          zusammenzuarbeiten und gemeinsam großartige Ergebnisse zu erzielen.
        </p>
        <a
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          href="mailto:info@meternio.ch?subject=Auftrag&body=Ich bin interessiert an..."
          >Kontakt aufnehmen</a
        >
        <a
          href="https://github.com/meternios"
          target="_blank"
          class="underline font-bold py-2 pl-4 rounded-lg mt-3 inline-block"
          ><Icon name="fa6-brands:github"
        /></a>
        <a
          href="https://www.instagram.com/meternio/"
          target="_blank"
          class="underline font-bold py-2 pl-2 rounded-lg mt-3 inline-block"
          ><Icon name="fa6-brands:instagram"
        /></a>
        <a
          href="https://wa.me/41762047832"
          target="_blank"
          class="underline font-bold py-2 pl-2 rounded-lg mt-3 inline-block"
          ><Icon name="fa6-brands:whatsapp"
        /></a>
        <a
          href="https://www.linkedin.com/company/meternio"
          target="_blank"
          class="underline font-bold py-2 pl-2 rounded-lg mt-3 inline-block"
          ><Icon name="fa6-brands:linkedin"
        /></a>
      </Dialog>
      <Dialog id="leaveTourDialog" ref="leaveTourDialog">
        <h2 tabindex="0">Virtuelles Büro verlassen</h2>
        <p class="mt-1">
          Möchtest du das Virtuelle Büro verlassen und zur Startseite
          zurückkehren?<br />
          Wenn du das Büro verlässt, musst du erneut starten, um zurückzukehren.
        </p>
        <a
          @click="(e) => dialogStore.closeDialog(leaveTourDialog.$el, e, true)"
          class="text-white hover:text-white hover:bg-dark font-bold py-2 px-4 rounded-lg bg-primary mt-3 inline-block"
          >Bleiben</a
        >
        <a
          ref="leaveTourButton"
          class="underline font-bold py-2 px-4 rounded-lg mt-3 inline-block"
        >
          Verlassen</a
        >
      </Dialog>
    </HeroImageThree>
  </div>
</template>

<style lang="less" scoped>
.home {
  /* Fallback */
  height: 100vh;
  height: 100svh;
}
</style>
