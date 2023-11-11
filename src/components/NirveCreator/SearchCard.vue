<template>
  <v-card color="surface-lighten-1" title="Nirve Suche">
    <v-card-text>
      <v-select
        v-model="category"
        bg-color="surface-lighten-2"
        variant="solo"
        item-title="title"
        item-value="value"
        label="Kategorie"
        :items="nirveTypes"
        density="compact"
      />
      <v-text-field
        id="id"
        v-model="search"
        label="Suchbegriff"
        density="compact"
        bg-color="surface-lighten-2"
        variant="solo"
      />
      <v-btn
        variant="flat"
        color="indigo-darken-1"
        append-icon="mdi-magnify"
        block
      >
        Suchen
      </v-btn>
      <v-list bg-color="surface-lighten-2" rounded class="my-6" height="500">
        <v-list-item v-for="i in 1">
          <v-list-item-title>Ergebniss {{ i }}</v-list-item-title>
          <v-list-item-subtitle>
            Lorem ipsum dodsfsdlor sit amet consectetur adipisicing elit.
            Assumenda quisquam veniam, nesciunt aspernatur rerum eligendi
            laborum rem tempora eius quos cupiditate quibusdam similique, maxime
            tempore quis aliquam voluptates consectetur est.
          </v-list-item-subtitle>
          <template #append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-pencil"
              variant="text"
              class="mr-2"
            />
            <v-btn color="error" icon="mdi-delete" variant="text" />
          </template>
        </v-list-item>
      </v-list>
      <v-btn append-icon="mdi-plus-box" block color="green-darken-4">
        Erstellen
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { NirveTypes } from "@/functional_components/API/nirve-creator/dto/nirve-common.dto";
import { ref } from "vue";

const category = ref();
const search = ref();

const nirveTypes = [
  { title: "Bändiger Fähigkeiten", value: NirveTypes["bending-skill"] },
  { title: "Klassen", value: NirveTypes["character-class"] },
  { title: "Nachteile", value: NirveTypes["disadvantage"] },
  { title: "Ausrüstung", value: NirveTypes["item"] },
  { title: "Rassen", value: NirveTypes["race"] },
  { title: "Religionen", value: NirveTypes["religion"] },
  { title: "Fähigkeiten", value: NirveTypes["skill"] },
  { title: "Zauber", value: NirveTypes["spell"] }
];
</script>

<style scoped></style>
