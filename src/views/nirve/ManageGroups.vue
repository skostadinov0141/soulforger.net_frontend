<!--suppress ALL -->
<template>
  <v-container>
    <v-dialog width="500" v-model="dialogOpen">
      <v-sheet class="pa-4">
        <v-form v-model="editValid">
          <v-row no-gutters>
            <v-col cols="12" class="d-flex align-center">
              <v-text-field
                  @keydown.enter.prevent="editGroup"
                  hint="Drücke Enter zum Speichern"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Gruppenname"
                  class="ma-2"
                  :rules="[required]"
                  v-model="editingGroup!.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="d-flex align-center">
              <v-textarea
                  :no-resize="true"
                  rows="5"
                  hide-details="auto"
                  hint="Feld ist optional"
                  variant="solo-filled"
                  density="comfortable"
                  label="Beschreibung"
                  class="ma-2"
                  v-model="editingGroup!.description"
              ></v-textarea>
            </v-col>
            <v-col class="ma-2">
              <v-btn color="primary" @click="editGroup" :block="true"
              >Speichern
              </v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>
    </v-dialog>
    <v-sheet color="surface pa-2 mb-4 mt-8" rounded>
      <v-form v-model="createValid" @submit.prevent="createGroup">
        <v-row no-gutters>
          <v-col cols="12" class="d-flex align-start">
            <v-text-field
                hint="Drücke Enter zum Erstellen"
                hide-details="auto"
                @keydown.enter.prevent="createGroup"
                variant="solo-filled"
                density="comfortable"
                label="Gruppenname"
                class="ma-2"
                v-model="group.name"
                :rules="[required]"
            ></v-text-field>
            <v-btn
                rounded
                type="submit"
                height="50"
                class="ma-2"
                icon="mdi-plus"
                color="primary"
            >
            </v-btn>
          </v-col>
          <v-col cols="12" class="d-flex align-center">
            <v-textarea
                hint="Feld ist optional"
                :no-resize="true"
                rows="5"
                hide-details="auto"
                variant="solo-filled"
                density="comfortable"
                label="Beschreibung"
                class="ma-2"
                v-model="group.description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
    <v-sheet color="surface mb-4 d-flex align-center" rounded>
      <v-data-table
          :headers="headers"
          :items="groups"
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
          <v-btn variant="text" icon @click="deleteGroup(item)">
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
import {useApiStore} from "@/store/api";
import {onMounted, ref} from "vue";
import {NirveGroup} from "@/functional_components/API/nirve-group/nirve-group.class";
import {VDataTable} from "vuetify/labs/VDataTable";
import {CreateNirveGroupDto} from "@/functional_components/API/nirve-group/dto/create-nirve-group.dto";
import {required} from "@/validators";

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
  {title: "Gruppe", value: "name"},
  {title: "Erstellt am", value: "createdAt"},
  {title: "Bearbeitet am", value: "updatedAt"},
  {title: "Aktionen", value: "actions", sortable: false},
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
      .then((tag) => {
        group.value = {name: "", description: ""};
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
  editingGroup.value = {...group};
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
