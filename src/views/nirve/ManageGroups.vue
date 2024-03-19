<template>
  <v-container>
    <v-dialog
      v-model="dialogOpen"
      width="500"
    >
      <v-row justify="center">
        <v-col
          cols="12"
          md="6"
        >
          <v-sheet class="pa-4">
            <v-form v-model="editValid">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="d-flex align-center"
                >
                  <v-text-field
                    v-model="editingGroup!.name"
                    hint="Drücke Enter zum Speichern"
                    hide-details="auto"
                    variant="solo-filled"
                    density="comfortable"
                    label="Gruppenname"
                    class="ma-2"
                    :rules="[required]"
                    @keydown.enter.prevent="editGroup"
                  />
                </v-col>
                <v-col
                  cols="12"
                  class="d-flex align-center"
                >
                  <v-textarea
                    v-model="editingGroup!.description"
                    :no-resize="true"
                    rows="5"
                    hide-details="auto"
                    hint="Feld ist optional"
                    variant="solo-filled"
                    density="comfortable"
                    label="Beschreibung"
                    class="ma-2"
                  />
                </v-col>
                <v-col class="ma-2">
                  <v-btn
                    color="primary"
                    :block="true"
                    @click="editGroup"
                  >
                    Speichern
                  </v-btn>
                </v-col>
              </v-row>
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
        @submit.prevent="createGroup"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="d-flex align-start"
          >
            <v-text-field
              v-model="group.name"
              hint="Drücke Enter zum Erstellen"
              hide-details="auto"
              variant="solo-filled"
              density="comfortable"
              label="Gruppenname"
              class="ma-2"
              :rules="[required]"
              @keydown.enter.prevent="createGroup"
            />
            <v-btn
              rounded
              type="submit"
              height="50"
              class="ma-2"
              icon="mdi-plus"
              color="primary"
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex align-center"
          >
            <v-textarea
              v-model="group.description"
              hint="Feld ist optional"
              :no-resize="true"
              rows="5"
              hide-details="auto"
              variant="solo-filled"
              density="comfortable"
              label="Beschreibung"
              class="ma-2"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
    <v-sheet
      color="surface mb-4 d-flex align-center"
      rounded
    >
      <v-data-table
        :headers="headers"
        :items="groups"
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
            @click="deleteGroup(item)"
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
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { VDataTable } from "vuetify/labs/VDataTable";
import { CreateNirveGroupDto } from "@/functional_components/API/nirve-group/dto/create-nirve-group.dto";
import { required } from "@/validators";

const apiStore = useApiStore();

const groups = ref<NirveGroup[]>([]);
const group = ref<CreateNirveGroupDto>({
  name: "",
  description: "",
});
const dialogOpen = ref(false);
const editingGroup = ref<NirveGroup | null>(null);
const createValid = ref(false);
const editValid = ref(false);

const headers = ref([
  { title: "Gruppe", value: "name" },
  { title: "Erstellt am", value: "createdAt" },
  { title: "Bearbeitet am", value: "updatedAt" },
  { title: "Aktionen", value: "actions", sortable: false },
]);

onMounted(() => {
  apiStore.api.nirveGroupService
    .search()
    .then((tagsRes) => {
      groups.value = tagsRes;
    })
    .catch(() => {
      console.log("Error");
    });
});

function createGroup() {
  if (!createValid.value) return;
  apiStore.api.nirveGroupService
    .post(group.value)
    .then(() => {
      group.value = { name: "", description: "" };
      refreshGroups();
    })
    .catch(() => {
      console.log("Error");
    });
}

function refreshGroups() {
  apiStore.api.nirveGroupService
    .search()
    .then((tagsRes) => {
      groups.value = tagsRes;
    })
    .catch(() => {
      console.log("Error");
    });
}

function deleteGroup(group: NirveGroup) {
  apiStore.api.nirveGroupService
    .deleteById(group._id)
    .then(() => {
      refreshGroups();
    })
    .catch(() => {
      console.log("Error");
    });
}

function openEditDialog(group: NirveGroup) {
  editingGroup.value = { ...group };
  dialogOpen.value = true;
}

function editGroup() {
  if (!editValid.value) return;
  if (editingGroup.value) {
    apiStore.api.nirveGroupService
      .patch(editingGroup.value._id, {
        name: editingGroup.value.name,
        description: editingGroup.value.description,
      })
      .then(() => {
        refreshGroups();
        dialogOpen.value = false;
      })
      .catch(() => {
        console.log("Error");
      });
  }
}
</script>

<style scoped></style>
