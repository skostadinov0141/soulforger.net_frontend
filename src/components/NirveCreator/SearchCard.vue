<template>
  <v-card
    :elevation="5"
    title="Suchen"
    subtitle="Hier kannst du die Datenbank an erstellte Nirve elemente durchsuchen."
  >
    <v-divider />
    <v-card-text>
      <v-text-field
        label="Suchbegriff"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
      />
      <p class="text-subtitle-1 text-left" style="flex: 1">Weitere Filter</p>
      <v-divider />
      <v-select
        v-model="selectedCategories"
        variant="outlined"
        multiple
        class="mt-6"
        chips
        :items="nirveTypes"
        label="Kategorien"
      />
      <div class="d-flex flex-md-row flex-column align-stretch">
        <v-text-field
          v-model="createdAfter"
          class="mr-0 mr-md-2"
          type="date"
          label="Erstellt nach"
          variant="outlined"
        />
        <v-text-field
          v-model="updatedAfter"
          class="mr-0 mr-md-2"
          type="date"
          label="Zuletzt geändert nach"
          variant="outlined"
        />
      </div>
      <v-btn
        variant="elevated"
        text="Suchen"
        block
        color="primary"
        append-icon="mdi-magnify"
        @click="getItems"
      />
      <v-list elevation="4" class="mt-6 rounded" bg-color="surface-lighten-1">
        <v-list-item
          v-for="item in searchResults"
          :key="item._id"
          class="py-2"
          @click="selectItemForEdit(item)"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ nirveTypes.find((t) => t.value === item.type)?.title }}
          </v-list-item-subtitle>
          <template #append>
            <v-tooltip
              location="start"
              :text="`Erstellt am: ${date.format(
                item.createdAt,
                'normalDateWithWeekday'
              )} ----- Letzte Änderung: ${date.format(
                item.updatedAt,
                'normalDateWithWeekday'
              )}`"
            >
              <template #activator="{ props }">
                <v-icon v-bind="props"> mdi-information-outline </v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { NirveTypes } from "@/functional_components/API/nirve-creator/dto/nirve-common.dto";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import { NirveCreatorSearchQuery } from "@/functional_components/API/nirve-creator/nirve-creator.service";
import { useApiStore } from "@/store/api";
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useDate } from "vuetify/labs/date";

const apiStore = useApiStore();
const date = useDate();

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
const createdAfter = ref<Date>();
const updatedAfter = ref<Date>();
const searchResults = ref<NirveCommon[]>([]);
const loading = ref<boolean>(false);

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

function getItems() {
  let query: NirveCreatorSearchQuery = {};
  query.type = {
    $in: selectedCategories.value!
  };
  query.name = {
    $regex: search.value!
  };
  if (createdAfter.value) {
    query.createdAt = {
      $gte: createdAfter.value
    };
  }
  if (updatedAfter.value) {
    query.updatedAt = {
      $gte: updatedAfter.value
    };
  }
  apiStore.api.nirveCreatorService.search(query).then((res) => {
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

<style scoped>
.v-data-table__tr {
  background-color: rgb(var(--v-theme-surface-lighten-2)) !important;
}
</style>
