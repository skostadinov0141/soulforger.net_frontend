<template>
  <v-data-table
    :headers="headers"
    :items="commons"
    :items-per-page="20"
    :items-per-page-options="[]"
    class="elevation-1"
  >
    <template #[`item.createdAt`]="{ item }">
      <span>{{ new Date(item.createdAt).toLocaleString("DE-de") }}</span>
    </template>
    <template #[`item.updatedAt`]="{ item }">
      <span>{{ new Date(item.updatedAt).toLocaleString("DE-de") }}</span>
    </template>
    <template #[`item.type`]="{ item }">
      <span>{{ types.find((v) => v.value === item.type)!.title }}</span>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-btn
        variant="text"
        icon
        @click="emit('delete', item)"
      >
        <v-icon color="error">
          mdi-delete
        </v-icon>
      </v-btn>
      <v-btn
        variant="text"
        icon
        @click="emit('edit', item)"
      >
        <v-icon color="secondary">
          mdi-pencil
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import { ref } from "vue";

const props = defineProps<{
  commons: NirveCommon[];
}>();

const emit = defineEmits<{
  (event: "edit", payload: NirveCommon): void;
  (event: "delete", payload: NirveCommon): void;
}>();

const headers = ref([
  { title: "Titel", value: "name" },
  { title: "Kategorie", value: "type" },
  { title: "Erstellt am", value: "createdAt" },
  { title: "Bearbeitet am", value: "updatedAt" },
  { title: "Aktionen", value: "actions", sortable: false },
]);

const types = [
  { value: "bending-skill", title: "Bändigerkünst" },
  { value: "character-class", title: "Klasse" },
  { value: "disadvantage", title: "Nachteil" },
  { value: "item", title: "Ausrüstung" },
  { value: "race", title: "Rasse" },
  { value: "religion", title: "Religion" },
  { value: "skill", title: "Fähigkeit" },
  { value: "spell", title: "Zauber" },
];
</script>

<style scoped></style>
