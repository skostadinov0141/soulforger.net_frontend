<template>
  <v-container class="mt-6">
    <v-sheet color="surface pa-2">
      <SearchComponent :tags="tags" :groups="groups" />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import SearchComponent from "@/components/NirveCreator/SearchComponent.vue";
import { onMounted, ref } from "vue";
import { useApiStore } from "@/store/api";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import {useSnackbarStore} from "@/store/snackbar";

const apiStore = useApiStore();
const snackbarStore = useSnackbarStore();

const tags = ref<NirveTag[]>([]);
const groups = ref<NirveGroup[]>([]);

onMounted(() => {
  Promise.all([
    apiStore.api.nirveTagService.search(),
    apiStore.api.nirveGroupService.search(),
  ]).then(([tagsRes, groupsRes]) => {
    tags.value = tagsRes;
    groups.value = groupsRes;
  }).catch(() => {
    snackbarStore.snackbar = {
      title: "Fehler",
      message: "Fehler beim Laden der Tags und Gruppen",
      type: "error"
    }
  })
});
</script>

<style scoped></style>
