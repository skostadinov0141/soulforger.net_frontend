<template>
  <v-container>
    <v-dialog v-model="dialogOpen">
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet class="pa-4">
            <v-form
              v-model="editValid"
              @submit.prevent="editTag"
            >
              <v-text-field
                v-model="editTagName"
                hide-details="auto"
                hint="Drücke Enter zum Speichern"
                variant="solo-filled"
                density="comfortable"
                label="Tag Name bearbeiten"
                class="mb-2"
                :rules="[required]"
              />
              <v-btn
                color="primary"
                :block="true"
              >
                Speichern
              </v-btn>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-dialog>
    <v-sheet
      color="surface pa-2 mb-4 mt-8"
      rounded
    >
      <v-form
        v-model="createValid"
        class="d-flex align-start"
        @submit.prevent="createTag"
      >
        <v-text-field
          v-model="tagName"
          hide-details="auto"
          hint="Drücke Enter zum Erstellen"
          variant="solo-filled"
          density="comfortable"
          label="Tag Name"
          class="ma-2"
          :rules="[required]"
          @keydown.enter.prevent="createTag"
        />
        <v-btn
          type="submit"
          rounded
          height="50"
          class="ma-2"
          icon="mdi-plus"
          color="primary"
        />
      </v-form>
    </v-sheet>
    <v-sheet
      color="surface mb-4 d-flex align-center"
      rounded
    >
      <v-data-table
        :headers="headers"
        :items="tags"
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
        <template #[`item.actions`]="{ item }">
          <v-btn
            variant="text"
            icon
            @click="deleteTag(item)"
          >
            <v-icon color="error">
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            variant="text"
            icon
            @click="openEditDialog(item)"
          >
            <v-icon color="secondary">
              mdi-pencil
            </v-icon>
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
import { required } from "@/validators";

const apiStore = useApiStore();

const tags = ref<NirveTag[]>([]);
const tagName = ref<string>("");
const dialogOpen = ref(false);
const editingTag = ref<NirveTag | null>(null);
const editTagName = ref<string>("");
const createValid = ref(false);
const editValid = ref(false);

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
  if (!createValid.value) return;
  apiStore.api.nirveTagService
    .post({ tag: tagName.value })
    .then(() => {
      tagName.value = "";
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
  if (!editValid.value) return;
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
