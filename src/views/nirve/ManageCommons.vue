<template>
  <v-container class="mt-6">
    <CommonDataDialog
      v-model:create-common="createCommon"
      v-model:edit-common="editCommon"
      v-model:mode="dialogMode"
      v-model="dialogOpen"
      :groups="groups"
      :tags="tags"
      @on-submit="submitDialog"
    />
    <v-sheet color="surface pa-2">
      <SearchComponent
        :tags="tags"
        :groups="groups"
        @search="(value) => search(value)"
      />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import SearchComponent from "@/components/nirve/SearchComponent.vue";
import { onMounted, reactive, ref } from "vue";
import { useApiStore } from "@/store/api";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { useSnackbarStore } from "@/store/snackbar";
import { NirveCommonQuery } from "@/functional_components/API/nirve-creator/nirve-creator.service";
import CommonDataDialog from "@/components/nirve/CommonDataDialog.vue";
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";

const apiStore = useApiStore();
const snackbarStore = useSnackbarStore();

const tags = ref<NirveTag[]>([]);
const groups = ref<NirveGroup[]>([]);
const dialogOpen = ref(true);
const dialogMode = ref<"create" | "edit">("create");

const createCommon = reactive<NirveCreateDto>({
  name: "",
  description: "",
  creatorNotes: "",
  type: "bending-skill",
  tags: [],
  groups: [],
});
const editCommon = reactive<NirveCommon>(new NirveCommon());

onMounted(() => {
  Promise.all([
    apiStore.api.nirveTagService.search(),
    apiStore.api.nirveGroupService.search(),
  ])
    .then(([tagsRes, groupsRes]) => {
      tags.value = tagsRes;
      groups.value = groupsRes;
    })
    .catch(() => {
      snackbarStore.snackbar = {
        title: "Fehler",
        message: "Fehler beim Laden der Tags und Gruppen",
        type: "error",
      };
    });
});

function submitDialog(mode: string) {
  if (mode === "create") {
    console.log(createCommon);
  } else {
    console.log(editCommon);
  }
}

async function search(query: NirveCommonQuery) {
  console.log(query);
  await apiStore.api.nirveCreatorService.search(query);
}
</script>

<style scoped></style>
