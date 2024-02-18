<template>
  <v-row no-gutters>
    <v-col
      cols="12"
      md="3"
      order="1"
      order-md="0"
    >
      <v-select
        v-model="selectedType"
        hide-details
        variant="solo-filled"
        density="comfortable"
        label="Kategorie"
        class="ma-2"
        item-title="title"
        item-value="value"
        :items="types"
      />
    </v-col>
    <v-col
      class="d-flex align-center"
      order="0"
      order-md="1"
    >
      <v-text-field
        v-model="searchTerm"
        hide-details
        variant="solo-filled"
        density="comfortable"
        label="Suchbegriff"
        class="ma-2"
      />
      <v-btn
        rounded
        height="50"
        class="ma-2"
        icon="mdi-magnify"
        color="primary"
        @click="search"
      />
    </v-col>
    <v-col
      cols="12"
      order="2"
    >
      <v-autocomplete
        v-model="selectedTags"
        hide-details
        multiple
        chips
        variant="solo-filled"
        label="Tags"
        class="ma-2"
        density="comfortable"
        item-title="tag"
        item-value="_id"
        :items="tags"
      />
    </v-col>
    <v-col
      cols="12"
      order="3"
    >
      <v-autocomplete
        v-model="selectedGroups"
        multiple
        hide-details
        chips
        variant="solo-filled"
        label="Gruppen"
        class="ma-2"
        density="comfortable"
        item-title="name"
        item-value="_id"
        :items="groups"
      />
    </v-col>
    <v-col
      class="pa-2 d-flex justify-end"
      cols="12"
      order="4"
    >
      <v-btn
        variant="text"
        size="small"
        icon="mdi-refresh"
        class="mr-2"
      />
      <v-btn
        append-icon="mdi-plus-box-outline"
        color="primary"
      >
        Common erstellen
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { NirveCommonQuery } from "@/functional_components/API/nirve-creator/nirve-creator.service";
import { computed, ref } from "vue";
import { useApiStore } from "@/store/api";

const apiStore = useApiStore();
const props = defineProps<{
  groups: NirveGroup[];
  tags: NirveTag[];
}>();

const types = [
  { value: ".*", title: "Alle" },
  { value: "bending-skill", title: "Bändigerkünste" },
  { value: "character-class", title: "Klassen" },
  { value: "disadvantage", title: "Nachteil" },
  { value: "item", title: "Ausrüstung" },
  { value: "race", title: "Rasse" },
  { value: "religion", title: "Religion" },
  { value: "skill", title: "Fähigkeit" },
  { value: "spell", title: "Zauber" },
];

const selectedType = ref<string>(types[0].value);
const selectedTags = ref<string[]>([]);
const selectedGroups = ref<string[]>([]);
const searchTerm = ref<string>("");

const searchQuery = computed<NirveCommonQuery>(() => ({
  type: {
    $regex: selectedType.value,
  },
  tags:
    selectedTags.value.length === 0
      ? undefined
      : {
          $in: selectedTags.value,
        },
  groups:
    selectedGroups.value.length === 0
      ? undefined
      : {
          $in: selectedGroups.value,
        },
  name: {
    $regex: searchTerm.value || ".*",
  },
}));

const emit = defineEmits<{
  (event: "search", value: NirveCommonQuery): void;
}>();

// TODO: Outsource logic to ManageCommons.vue (emits)
async function search() {
  console.log(searchQuery.value);
  emit("search", searchQuery.value);
}
</script>

<style scoped></style>
