<template>
  <v-dialog
    v-if="mode === 'create'"
    v-model="dialogOpen"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
        offset="0"
        offset-md="3"
      >
        <v-sheet class="pa-4">
          <v-form
            v-model="valid"
            @submit.prevent="emit('on-submit', mode)"
          >
            <v-row :no-gutters="true">
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-text-field
                  v-model="createCommon.name"
                  variant="solo-filled"
                  density="comfortable"
                  label="Name"
                  class="ma-2"
                  hide-details="auto"
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
              <v-col class="ma-2 d-flex">
                <v-btn
                  variant="tonal"
                  class="flex-1-0 mr-1"
                  @click="dialogOpen = false"
                >
                  Abbrechen
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  class="flex-1-0 ml-1"
                  append-icon="mdi-content-save"
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
  <v-dialog
    v-else
    v-model="dialogOpen"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
        offset="0"
        offset-md="3"
      >
        <v-sheet class="pa-4">
          <v-form
            v-model="valid"
            @submit.prevent="emit('on-submit', mode)"
          >
            <v-row :no-gutters="true">
              <v-col
                cols="12"
                class="d-flex align-center"
              >
                <v-text-field
                  v-model="editCommon.name"
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
                  v-model="editCommon.type"
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
                  v-model="editCommon.tags"
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
                  v-model="editCommon.groups"
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
                  v-model="editCommon.description"
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
                  v-model="editCommon.creatorNotes"
                  :no-resize="true"
                  rows="5"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Notizen des Erstellers"
                  class="ma-2"
                />
              </v-col>
              <v-col class="ma-2 d-flex">
                <v-btn
                  variant="tonal"
                  class="flex-1-0 mr-1"
                  @click="dialogOpen = false"
                >
                  Abbrechen
                </v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  class="flex-1-0 ml-1"
                  append-icon="mdi-content-save"
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
import { ref } from "vue";
import {
  NirveCreateDto,
} from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";

const valid = ref<boolean>();
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  tags: NirveTag[];
  groups: NirveGroup[];
}>();

const emit = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (event: "on-submit", mode: string): void;
}>();
</script>

<style scoped></style>
