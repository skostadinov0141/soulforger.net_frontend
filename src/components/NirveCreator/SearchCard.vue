<template>
  <v-card color="surface-lighten-1" title="Nirve Suche">
    <v-divider />
    <v-card-text>
      <v-sheet rounded color="surface-lighten-1">
        <v-data-table
          class="mt-2 pb-2"
          select-strategy="all"
          show-select
          item-value="_id"
          :headers="headers"
          :items="searchResults"
        />
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { NirveTypes } from "@/functional_components/API/nirve-creator/dto/nirve-common.dto";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import { useApiStore } from "@/store/api";
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";

const apiStore = useApiStore();

const selectedCategories = ref<string[]>([
  "bending-skill",
  "character-class",
  "disadvantage",
  "item",
  "race",
  "religion",
  "skill",
  "spell"
]);
const search = ref<string>("");
const searchResults = ref<NirveCommon[]>([]);

const nirveTypes = [
  { title: "Bändiger Fähigkeiten", value: "bending-skill" },
  { title: "Klassen", value: "character-class" },
  { title: "Nachteile", value: "disadvantage" },
  { title: "Ausrüstung", value: "item" },
  { title: "Rassen", value: "race" },
  { title: "Religionen", value: "religion" },
  { title: "Fähigkeiten", value: "skill" },
  { title: "Zauber", value: "spell" }
];
const headers = [
  { title: "Name", value: "name" },
  {
    title: "Typ",
    key: "type",
    value: (item: Record<string, any>) =>
      nirveTypes.find((i) => i.value === item.type)?.title
  },
  {
    title: "Erstellungsdatum",
    key: "createdAt",
    value: (item: Record<string, any>) =>
      new Date(item.createdAt).toLocaleString("de-DE")
  },
  {
    title: "Letzte Änderung",
    key: "updatedAd",
    value: (item: Record<string, any>) =>
      new Date(item.createdAt).toLocaleString("de-DE")
  }
];

function getItems() {
  apiStore.api.nirveCreatorService
    .search({
      type: {
        $in: selectedCategories.value!
      },
      name: {
        $regex: search.value!
      }
    })
    .then((res) => {
      searchResults.value = res;
    });
}

const emits = defineEmits(["select-for-edit"]);
defineExpose({
  getItems
});

function selectItemForEdit(item: NirveCommon) {
  emits("select-for-edit", item);
}
</script>

<style scoped></style>
