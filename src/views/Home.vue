<template>
  <v-card class="ma-4 ma-sm-10 pa-2 pa-sm-4" color="surface-lighten-1">
    <v-card-title class="text-secondary">
      Was ist Soulforger?
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-secondary">
      Egal, ob du ein unerschrockener Held bist, der in den dunklen Wäldern von Aventurien wandelt, ein futuristischer Runner, der durch die neonbeleuchteten Straßen einer dystopischen Metropole schleicht, oder ein magiebegabter Cyberschamane, der sich durch Matrix und Realität bewegt - unsere Website ist dein Tor zu all diesen fantastischen Universen.
      <br/>
      <br/>
      Erstelle und verwalte spielend leicht deine Charaktere, entdecke umfangreiche Regelwerke, erkunde spannende Geschichten und hole dir wertvolle Ressourcen für dein Abenteuer. Unser Ziel ist es, dir das ultimative Werkzeug an die Hand zu geben, um deine Spielerfahrung auf das nächste Level zu heben.
      <br/>
      <br/>
      Sei bereit für grenzenlose Fantasie, packende Quests und die Möglichkeit, deine eigene Legende zu schmieden. Komm und werde Teil unserer leidenschaftlichen Community von Rollenspiel-Enthusiasten. Schließe dich uns an und erlebe die Magie, die nur in den Seiten der Regelbücher und deiner Vorstellungskraft existiert.
      <br/>
      <br/>
      Bereit, deinen inneren Helden zu entfesseln? Lass uns zusammen aufbrechen und Abenteuer erleben, die die Grenzen der Realität überschreiten!
    </v-card-text>
  </v-card>
  <v-card class="ma-4 ma-sm-10 pa-2 pa-sm-4" color="surface-lighten-1">
    <v-card-title class="text-secondary">
      Regelwerke
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col
          v-for="item in rulebooks"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <v-card class="rounded rounded-md d-flex flex-column" color="surface-lighten-2" elevation="4" height="100%">
            <v-img
              :src="item.img"
              min-height="300"
              max-height="300"
              cover
            />

            <v-card-title class="text-secondary">
              {{ item.title }}
            </v-card-title>

            <v-divider></v-divider>

            <v-card-subtitle class="d-flex flex-wrap">
              <v-chip variant="outlined" color="error" label class="mr-2 mt-4">WIP</v-chip>
              <v-chip variant="outlined" color="secondary-darken-1" label v-for="tag in item.tags" class="mr-2 mt-4">{{ tag }}</v-chip>
            </v-card-subtitle>

            <v-card-text class="text-secondary flex-grow-1">
              {{ item.description }}
            </v-card-text>

            <v-card-actions>
              <v-btn color="secondary">
                Mehr erfahren
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const heroSections = ref([
  {
    title: 'Was ist Soulforger?',
    content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
  },
  {
    title: 'Was ist Soulforger?',
    content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
  },
  {
    title: 'Was ist Soulforger?',
    content: 'Soulforger ist eine digitale Plattform, die darauf abzielt, die Komplexität von Rollenspielen zu verringern. Sie unterstützt mehrere Regelwerke mit dem gleichen Funktionsumfang für jedes einzelne.',
  },
]);

const rulebooks = ref([
  {
    title: 'Das Schwarze Auge 5',
    description: 'Egal, ob du als von Hisinde gesegneter Magier die Bibliotheken der magischen Gilden erkunden, die Schwere deines Hammers in einer von den Feuern Angroschs erhitzten Schmiede spüren oder auf der Suche nach einem Opfer durch die Straßen Gareths streifen willst, um deine von Phex geschenkten, lange trainierten Fähigkeiten zu testen, Aventurien bietet dir all diese Möglichkeiten und noch viel mehr. Erforsche dieses umfangreiche und detaillierte System mit Soulforger an deiner Seite, der dir einen Großteil der Komplexität bei der Erstellung eines Charakters und der Verwaltung einer Kampagne abnimmt.',
    img: '/dsa_background1_lq.jpg',
    tags:['Low Fantasy', 'Mittelalter', 'Magie', 'Götter']
  },
  {
    title: 'Nirve',
    description: 'Egal, ob du als von Hisinde gesegneter Magier die Bibliotheken der magischen Gilden erkunden, die Schwere ',
    img: '/nirve_background1_lq.jpg',
    tags:['High Fantasy', 'Mittelalter', 'Magie', 'Götter']
  },
  {
    title: 'Shadowrun 6',
    description: 'Tauche ein in die düstere Zukunft von Shadowrun, einer Welt, in der Megakonzerne die Regeln bestimmen und Magie mit Hightech verschmilzt. Als Shadowrunner navigierst du durch die neonbeleuchteten Straßen einer cyberpunkesken Metropole und stellst dich gefährlichen Aufträgen, in denen Magie, Technologie und Intrigen aufeinandertreffen. Bist du bereit, deine Fähigkeiten zu nutzen und dich in diesem dystopischen Universum zu behaupten?',
    img: '/shadowrun_background1_lq.jpg',
    tags:['High Fantasy', 'Cyberpunk', 'Magie', 'Dystopie']
  },
  {
    title: 'Cyberpunk Red',
    description: 'Willkommen in der rauen und futuristischen Welt von Cyberpunk. Hier verschmilzt Technologie mit der Dunkelheit der Nacht, während du dich als Street Samurai oder Netrunner in den Straßen einer dystopischen Metropole behauptest. Spüre den Puls der Cyberpunk-Ära, in der jeder Augenblick dein letzter sein könnte. Bist du bereit, dich dem Kampf gegen die Mächte der Konzerne anzuschließen und deine eigene Legende zu schreiben?',
    img: '/cyberpunk_background1_lq.jpg',
    tags:['High Fantasy', 'Cyberpunk', 'Dystopie']
  },
  {
    title: 'Fading Suns',
    description: 'Tauche ein in die faszinierende Welt von Fading Suns, einem düsteren Science-Fiction-Universum, in dem das Licht des Sternenimperiums langsam verblasst. Als Teil eines interstellaren Reiches erlebst du politische Intrigen, mystische Geheimnisse und gefährliche Missionen in einer Zeit des Niedergangs und der Hoffnung. Bist du bereit, dich den Herausforderungen dieser kosmischen Saga zu stellen und deine Bestimmung zu erfüllen?',
    img: '/fadingsuns_background1_lq.jpg',
    tags:['High Fantasy', 'Low Fantasy', 'Mittelalter', 'Sci-Fi', 'Aliens', 'Distopie']
  }
])

</script>
