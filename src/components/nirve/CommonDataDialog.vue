<template>
  <v-dialog v-model="dialogOpen">
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-sheet class="pa-4">
          <v-form
            v-model="valid"
            @submit.prevent="emit('save')"
          >
            <v-row no-gutters>
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-text-field
                  v-model="createCommon.name"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Name"
                  class="ma-2"
                  :rules="[required]"
                />
              </v-col>
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-select
                  v-model="createCommon.type"
                  :hide-details="true"
                  variant="solo-filled"
                  density="comfortable"
                  label="Kategorie"
                  :items="nirveTypes"
                  item-title="title"
                  item-value="value"
                  class="ma-2"
                  :rules="[required]"
                />
              </v-col>
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-autocomplete
                  v-model="createCommon.tags"
                  :multiple="true"
                  :chips="true"
                  :hide-details="true"
                  variant="solo-filled"
                  density="comfortable"
                  label="Tags"
                  :items="tags"
                  item-title="tag"
                  item-value="_id"
                  class="ma-2"
                />
              </v-col>
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-autocomplete
                  v-model="createCommon.groups"
                  :multiple="true"
                  :chips="true"
                  :hide-details="true"
                  variant="solo-filled"
                  density="comfortable"
                  label="Gruppen"
                  :items="groups"
                  item-title="name"
                  item-value="_id"
                  class="ma-2"
                />
              </v-col>
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-textarea
                  v-model="createCommon.description"
                  :no-resize="true"
                  rows="5"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Beschreibung"
                  class="ma-2"
                />
              </v-col>
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-textarea
                  v-model="createCommon.creatorNotes"
                  :no-resize="true"
                  rows="5"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Notizen des Erstellers"
                  class="ma-2"
                />
              </v-col>
              <v-col class="ma-2">
                <v-btn
                  color="primary"
                  :block="true"
                  type="submit"
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
</template>

<script setup lang="ts">
import { required } from "@/validators";
import { ref, defineModel } from "vue";
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";

const valid = ref<boolean>(false);
const dialogOpen = defineModel<boolean>({ required: true });
const mode = defineModel<"create" | "edit">("mode", { required: true });
const createCommon = defineModel<NirveCreateDto>("createCommon", {
  required: true,
});
const editCommon = defineModel<NirveCommon>("editCommon", { required: true });

const nirveTypes = [
  { value: "bending-skill", title: "Bändigerkunst" },
  { value: "character-class", title: "Klasse" },
  { value: "disadvantage", title: "Nachteil" },
  { value: "item", title: "Ausrüstung" },
  { value: "race", title: "Rasse" },
  { value: "religion", title: "Religion" },
  { value: "skill", title: "Fähigkeit" },
  { value: "spell", title: "Zauber" },
];

const props = defineProps<{
  tags: NirveTag[];
  groups: NirveGroup[];
}>();

const emit = defineEmits<{
  (event: "save"): void;
}>();
</script>

<style scoped></style>
