<template>
  <v-card color="surface-lighten-1">
    <v-card-title primary-title> Suche </v-card-title>
    <v-card-text>
      <v-select
        bg-color="surface-lighten-2"
        variant="solo"
        item-title="title"
        item-value="value"
        label="Kategorie"
        :items="nirveTypes"
        density="compact"
      ></v-select>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { NirveTypes } from "@/functional_components/API/nirve-creator/dto/nirve-common.dto";

const nirveTypes = [
  { title: "Bändiger Fähigkeiten", value: NirveTypes["bending-skill"] },
  { title: "Klassen", value: NirveTypes["character-class"] },
  { title: "Nachteile", value: NirveTypes["disadvantage"] },
  { title: "Ausrüstung", value: NirveTypes["item"] },
  { title: "Rassen", value: NirveTypes["race"] },
  { title: "Religionen", value: NirveTypes["religion"] },
  { title: "Fähigkeiten", value: NirveTypes["skill"] },
  { title: "Zauber", value: NirveTypes["spell"] },
];
</script>

<style scoped></style>
