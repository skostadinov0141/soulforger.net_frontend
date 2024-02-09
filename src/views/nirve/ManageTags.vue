<!--suppress ALL -->
<template>
  <v-container>
    <v-dialog width="500" v-model="dialogOpen">
      <v-sheet class="pa-4">
        <v-text-field
          hide-details
          variant="solo-filled"
          density="comfortable"
          label="Tag bearbeiten"
          v-model="editTagName"
          class="mb-2"
        ></v-text-field>
        <v-btn color="primary" @click="editTag" :block="true">Speichern</v-btn>
      </v-sheet>
    </v-dialog>
    <v-sheet color="surface pa-2 mb-4 mt-8 d-flex align-center" rounded>
      <v-text-field
        hide-details
        variant="solo-filled"
        density="comfortable"
        label="Tag erstellen"
        class="ma-2"
        v-model="tagName"
      ></v-text-field>
      <v-btn
        rounded
        height="50"
        class="ma-2"
        icon="mdi-plus"
        color="primary"
        @click="createTag"
      >
      </v-btn>
    </v-sheet>
    <v-sheet color="surface mb-4 d-flex align-center" rounded>
      <v-data-table
        :headers="headers"
        :items="tags"
        :items-per-page="20"
        :items-per-page-options="[]"
        class="elevation-1"
      >
        <template v-slot:item.createdAt="{ item }">
          <span>{{ new Date(item.createdAt).toLocaleString("DE-de") }}</span>
        </template>
        <template v-slot:item.updatedAt="{ item }">
          <span>{{ new Date(item.updatedAt).toLocaleString("DE-de") }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn variant="text" icon @click="deleteTag(item)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
          <v-btn variant="text" icon @click="openEditDialog(item)">
            <v-icon color="secondary">mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import { useApiStore } from "@/store/api";
import { onMounted, ref } from "vue";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { VDataTable } from "vuetify/labs/VDataTable";

const apiStore = useApiStore();

const tags = ref<NirveTag[]>([]);
const tagName = ref<string>("");
const dialogOpen = ref(false);
const editingTag = ref<NirveTag | null>(null);
const editTagName = ref<string>("");

const headers = ref([
  { title: "Tag", value: "tag" },
  { title: "Erstellt am", value: "createdAt" },
  { title: "Bearbeitet am", value: "updatedAt" },
  { title: "Aktionen", value: "actions", sortable: false },
]);

onMounted(() => {
  apiStore.api.nirveTagService
    .search()
    .then((tagsRes) => {
      tags.value = tagsRes;
    })
    .catch(() => {
      console.log("Error");
    });
});

function createTag() {
  apiStore.api.nirveTagService
    .post({ tag: tagName.value })
    .then((tag) => {
      refreshTags();
    })
    .catch(() => {
      console.log("Error");
    });
}

function refreshTags() {
  apiStore.api.nirveTagService
    .search()
    .then((tagsRes) => {
      tags.value = tagsRes;
    })
    .catch(() => {
      console.log("Error");
    });
}

function deleteTag(tag: NirveTag) {
  apiStore.api.nirveTagService
    .deleteById(tag._id)
    .then(() => {
      refreshTags();
    })
    .catch(() => {
      console.log("Error");
    });
}

function openEditDialog(tag: NirveTag) {
  editingTag.value = tag;
  editTagName.value = tag.tag;
  dialogOpen.value = true;
}

function editTag() {
  if (editingTag.value) {
    apiStore.api.nirveTagService
      .patch(editingTag.value._id, { tag: editTagName.value })
      .then(() => {
        refreshTags();
        dialogOpen.value = false;
      })
      .catch(() => {
        console.log("Error");
      });
  }
}
</script>

<style scoped></style>
