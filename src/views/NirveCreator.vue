<script setup lang="ts">
import { DeepReadonly, onMounted } from "vue";
import SearchCard from "@/components/NirveCreator/SearchCard.vue";

function getItems() {}

onMounted(() => {
  getItems();
});
</script>

<template>
  <v-row align="center" class="h-100 pa-4">
    <v-col cols="12" md="4">
      <SearchCard />
    </v-col>
  </v-row>
</template>

<style scoped></style>
