<template>
  <v-img 
    src="/login_background.png" 
    cover 
    gradient="0deg, rgba(6,8,14,1.0) 0%, rgba(6,8,14,0.6) 100%"
    class="align-center"
  >
    <div class="d-flex flex-row align-center pa-4 pa-sm-16 mt-16 mb-16">
      <v-card color="transparent" elevation="0">
        <v-card-title class="text-secondary text-secondary ">
          Was ist Soulforger?
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-secondary-darken-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat perspiciatis, voluptatem nihil ipsa velit accusantium, odit quod nisi tempora ullam voluptatibus enim maiores. Magni, totam. Reprehenderit sequi odio sit necessitatibus?
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio eaque porro nesciunt inventore quidem provident harum, blanditiis ea temporibus deleniti, modi nulla debitis expedita praesentium. Numquam fugiat delectus blanditiis fugit?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aut ipsa temporibus, laboriosam ut voluptas fugit aliquid qui. Quis ullam nostrum voluptates, qui culpa perferendis! Placeat voluptatibus necessitatibus a earum.
        </v-card-text>
        <v-card-actions>
          <v-btn variant="elevated" color="primary">
            Anmelden
          </v-btn>
          <v-btn>
            Profil erstellen
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-img>
  <div class="d-flex flex-column align-center" style="height: 80px;">
  </div>
  <v-card class="ma-4 ma-sm-10 pa-2 pa-sm-4" color="surface-lighten-1">
    <v-card-title class="text-secondary">
      Regelwerke
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col
          v-for="item in items"
          cols="12"
          sm="12"
          md="6"
          lg="4"
        >
          <v-card class="rounded rounded-lg d-flex flex-column" color="surface-lighten-2" elevation="4" height="100%">
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

const items = ref([
  {
    title: 'Das Schwarze Auge 5',
    description: 'Egal, ob du als von Hisinde gesegneter Magier die Bibliotheken der magischen Gilden erkunden, die Schwere deines Hammers in einer von den Feuern Angroschs erhitzten Schmiede spüren oder auf der Suche nach einem Opfer durch die Straßen Gareths streifen willst, um deine von Phex geschenkten, lange trainierten Fähigkeiten zu testen, Aventurien bietet dir all diese Möglichkeiten und noch viel mehr. Erforsche dieses umfangreiche und detaillierte System mit Soulforger an deiner Seite, der dir einen Großteil der Komplexität bei der Erstellung eines Charakters und der Verwaltung einer Kampagne abnimmt.',
    img: '/dsa_background1.jpg',
    tags:['Low Fantasy', 'Mittelalter', 'Magie', 'Götter']
  },
  {
    title: 'Nirve',
    description: 'Egal, ob du als von Hisinde gesegneter Magier die Bibliotheken der magischen Gilden erkunden, die Schwere ',
    img: '/nirve_background1.jpg',
    tags:['High Fantasy', 'Mittelalter', 'Magie', 'Götter']
  },
  {
    title: 'Shadowrun 6',
    description: 'Egal, ob du als von Hisinde gesegneter Magier die Bibliotheken der magischen Gilden erkunden, die Schwere deines Hammers in einer von den Feuern Angroschs erhitzten Schmiede spüren oder auf der Suche nach einem Opfer durch die Straßen Gareths streifen willst, um deine von Phex geschenkten, lange trainierten Fähigkeiten zu testen, Aventurien bietet dir all diese Möglichkeiten und noch viel mehr. Erforsche dieses umfangreiche und detaillierte System mit Soulforger an deiner Seite, der dir einen Großteil der Komplexität bei der Erstellung eines Charakters und der Verwaltung einer Kampagne abnimmt.',
    img: '/shadowrun_background1.jpg',
    tags:['High Fantasy', 'Cyberpunk', 'Magie', 'Dystopie']
  },
  {
    title: 'Cyberpunk Red',
    description: 'lorem ipsum dolor sit amet orem ipsum sit amet',
    img: '/cyberpunk_background1.jpg',
    tags:['High Fantasy', 'Cyberpunk', 'Dystopie']
  }
])

</script>
