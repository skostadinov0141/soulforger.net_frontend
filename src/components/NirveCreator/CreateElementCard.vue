<template>
  <v-dialog v-model="opened" width="1024">
    <v-card :elevation="5" :title="id ? 'Bearbeiten' : 'Erstellen'">
      <v-divider />
      <v-card-text>
        <v-form v-model="valid">
          <v-autocomplete
            v-model="modal.type"
            variant="outlined"
            item-title="title"
            item-value="value"
            label="Kategorie"
            :items="nirveTypes"
            :clearable="true"
            :rules="[required]"
            :loading="loading"
            class="mb-1"
          />
          <v-text-field
            v-model="modal.name"
            class="mb-1"
            label="Name"
            variant="outlined"
            :clearable="true"
            :loading="loading"
            :rules="[required]"
            autocomplete="off"
          />
          <v-textarea
            v-model="modal.description"
            autocomplete="off"
            class="mb-1"
            rows="8"
            label="Beschreibung"
            variant="outlined"
            :clearable="true"
            :loading="loading"
            :rules="[required]"
          />
          <v-textarea
            v-model="modal.creatorNotes"
            autocomplete="off"
            class="mb-1"
            rows="8"
            label="Ersteller Notizen"
            variant="outlined"
            :clearable="true"
            :loading="loading"
            :rules="[required]"
          />
          <div class="d-flex justify-end">
            <v-btn
              variant="text"
              append-icon="mdi-close-box-outline"
              :loading="loading"
              color="error"
              text="Felder zurücksetzen"
              class="mb-2 mr-4"
              @click.prevent="reset"
            />
            <v-btn
              :append-icon="
                id ? 'mdi-content-save-outline' : 'mdi-plus-box-outline'
              "
              :loading="loading"
              color="success"
              :text="id ? 'Änderungen speichern' : 'Erstellen'"
              @click.prevent="submit"
            />
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";
import { useApiStore } from "@/store/api";
import { useSnackbarStore } from "@/store/snackbar";
import { required } from "@/validators";
import { reactive, ref } from "vue";

const apiStore = useApiStore();
const snackbarStore = useSnackbarStore();

const valid = ref(false);
const id = ref<string | undefined>(undefined);
const loading = ref(false);
const modal = reactive<NirveCreateDto>({
  name: "",
  description: "",
  type: "bending-skill",
  creatorNotes: "",
  updatedAt: new Date(),
});
const opened = ref(false);

const nirveTypes = [
  { title: "Bändiger Fähigkeiten", value: "bending-skill" },
  { title: "Klassen", value: "character-class" },
  { title: "Nachteile", value: "disadvantage" },
  { title: "Ausrüstung", value: "item" },
  { title: "Rassen", value: "race" },
  { title: "Religionen", value: "religion" },
  { title: "Fähigkeiten", value: "skill" },
  { title: "Zauber", value: "spell" },
];

defineExpose({
  reset,
  load,
  openDialog,
});

const emit = defineEmits(["submit-success"]);

function submit() {
  if (!valid.value) {
    snackbarStore.snackbar.message = "Bitte fülle alle Felder aus";
    snackbarStore.snackbar.type = "error";
    snackbarStore.snackbar.title = "Fehler";
    return;
  }
  if (id.value) {
    apiStore.api.nirveCreatorService.patch(id.value, modal).then(() => {
      loading.value = false;
      emit("submit-success");
    });
  } else {
    apiStore.api.nirveCreatorService.post(modal).then(() => {
      loading.value = false;
      emit("submit-success");
    });
  }
}

function reset() {
  modal.name = "";
  modal.description = "";
  modal.type = "bending-skill";
  modal.creatorNotes = "";
  modal.updatedAt = new Date();
  id.value = undefined;
}

function load(loadFrom: NirveCommon) {
  modal.name = loadFrom.name;
  modal.description = loadFrom.description;
  modal.type = loadFrom.type;
  modal.creatorNotes = loadFrom.creatorNotes;
  modal.updatedAt = new Date();
  id.value = loadFrom._id;
}

function openDialog() {
  opened.value = true;
}
</script>

<style scoped></style>
