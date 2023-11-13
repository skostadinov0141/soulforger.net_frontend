<template>
  <v-card color="surface-lighten-1" title="Nirve Suche">
    <v-divider />
    <v-card-text>
      <v-autocomplete
        label="Suche"
        variant="solo"
        bg-color="surface-lighten-2"
        prepend-inner-icon="mdi-magnify"
      />
      <v-expansion-panels>
        <v-expansion-panel
          bg-color="surface-lighten-2"
          title="Erweiterte Suche"
        >
          <v-expansion-panel-text class="pt-4">
            <v-select
              variant="solo"
              bg-color="surface-lighten-3"
              multiple
              chips
              :items="nirveTypes"
              label="Erlaubte Kategorien"
              v-model="selectedCategories"
            />
            <div class="">

            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
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
  "spell",
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
  { title: "Zauber", value: "spell" },
];
const headers = [
  { title: "Name", key: "name" },
  {
    title: "Typ",
    key: "type",
    value: (item: Record<string, any>) =>
      nirveTypes.find((i) => i.value === item.type)?.title,
  },
  {
    title: "Erstellungsdatum",
    key: "createdAt",
    value: (item: Record<string, any>) =>
      new Date(item.createdAt).toLocaleString("de-DE"),
  },
  {
    title: "Letzte Änderung",
    key: "updatedAt",
    value: (item: Record<string, any>) =>
      new Date(item.updatedAt).toLocaleString("de-DE"),
  },
];

function getItems() {
  apiStore.api.nirveCreatorService
    .search({
      type: {
        $in: selectedCategories.value!,
      },
      name: {
        $regex: search.value!,
      },
    })
    .then((res) => {
      searchResults.value = res;
    });
}

const emits = defineEmits(["select-for-edit"]);
defineExpose({
  getItems,
});

function selectItemForEdit(item: NirveCommon) {
  emits("select-for-edit", item);
}
</script>

<style scoped>
.v-data-table__tr {
  background-color: rgb(var(--v-theme-surface-lighten-2)) !important;
}
</style>
