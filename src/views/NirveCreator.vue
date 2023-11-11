<script setup lang="ts">
import { DeepReadonly, onMounted } from "vue";
import SearchCard from "@/components/NirveCreator/SearchCard.vue";

function getItems() {}

onMounted(() => {
  getItems();
});
</script>

<template>
  <v-row align="center">
    <v-col cols="12" md="6">
      <SearchCard></SearchCard>
    </v-col>
  </v-row>
</template>

<style scoped></style>
