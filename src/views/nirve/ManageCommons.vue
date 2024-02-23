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
        @create="openCreateDialog"
      />
    </v-sheet>
    <v-sheet color="surface mt-4 mb-4 d-flex align-center" rounded>
      <NirveCommonDataTable
        :commons="commons"
        @edit="openEditDialog"
        @delete="deleteCommon"
      />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import SearchComponent from "@/components/nirve/SearchComponent.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useApiStore } from "@/store/api";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { useSnackbarStore } from "@/store/snackbar";
import { NirveCommonQuery } from "@/functional_components/API/nirve-creator/nirve-creator.service";
import CommonDataDialog from "@/components/nirve/CommonDataDialog.vue";
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import NirveCommonDataTable from "@/components/nirve/NirveCommonDataTable.vue";

const apiStore = useApiStore();
const snackbarStore = useSnackbarStore();

const tags = ref<NirveTag[]>([]);
const groups = ref<NirveGroup[]>([]);
const dialogOpen = ref(false);
const dialogMode = ref<"create" | "edit">("create");
const lastExecutedQuery = ref<NirveCommonQuery>({});

const createCommon = reactive<NirveCreateDto>({
  name: "",
  description: "",
  creatorNotes: "",
  type: "bending-skill",
  tags: [],
  groups: [],
});
let editCommon = reactive<NirveCommon>(new NirveCommon());
const commons = ref<NirveCommon[]>([]);

onMounted(() => {
  Promise.all([
    apiStore.api.nirveTagService.search(),
    apiStore.api.nirveGroupService.search(),
    search({}),
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

function openEditDialog(common: NirveCommon) {
  dialogMode.value = "edit";
  editCommon = reactive<NirveCommon>({ ...common });
  dialogOpen.value = true;
}

function submitDialog(mode: string) {
  if (mode === "create") {
    create();
  } else {
    edit();
  }
}

function deleteCommon(common: NirveCommon) {
  apiStore.api.nirveCreatorService
    .deleteById(common._id)
    .then(() => {
      search(lastExecutedQuery.value);
      snackbarStore.snackbar = {
        title: "Erfolg",
        message: "Eintrag erfolgreich gelöscht",
        type: "success",
      };
    })
    .catch(() => {
      snackbarStore.snackbar = {
        title: "Fehler",
        message: "Fehler beim Löschen des Eintrags",
        type: "error",
      };
    });
}

function edit() {
  apiStore.api.nirveCreatorService
    .patch(editCommon._id, editCommon)
    .then(() => {
      search(lastExecutedQuery.value);
      dialogOpen.value = false;
      snackbarStore.snackbar = {
        title: "Erfolg",
        message: "Eintrag erfolgreich bearbeitet",
        type: "success",
      };
    })
    .catch(() => {
      snackbarStore.snackbar = {
        title: "Fehler",
        message: "Fehler beim Bearbeiten des Eintrags",
        type: "error",
      };
    });
}

watch(dialogOpen, (value) => {
  if (!value) {
    resetCreateCommon();
  }
});

function create() {
  apiStore.api.nirveCreatorService
    .post(createCommon)
    .then(() => {
      resetCreateCommon();
      search(lastExecutedQuery.value);
      dialogOpen.value = false;
      snackbarStore.snackbar = {
        title: "Erfolg",
        message: "Eintrag erfolgreich erstellt",
        type: "success",
      };
    })
    .catch(() => {
      snackbarStore.snackbar = {
        title: "Fehler",
        message: "Fehler beim Erstellen des Eintrags",
        type: "error",
      };
    });
}

function resetCreateCommon() {
  createCommon.name = "";
  createCommon.description = "";
  createCommon.creatorNotes = "";
  createCommon.type = "bending-skill";
  createCommon.tags = [];
  createCommon.groups = [];
}

function openCreateDialog() {
  dialogMode.value = "create";
  dialogOpen.value = true;
}

async function search(query: NirveCommonQuery) {
  lastExecutedQuery.value = query;
  commons.value = await apiStore.api.nirveCreatorService.search(query);
}
</script>

<style scoped></style>
