<template>
  <v-dialog v-model="dialogOpen">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-sheet class="pa-4">
          <v-form v-model="valid" @submit.prevent="emit('save')">
            <v-row no-gutters>
              <v-col cols="12" class="d-flex align-center">
                <v-text-field
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Name"
                  class="ma-2"
                  :rules="[required]"
                  v-model="localModelValue.name"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center">
                <v-select
                  :hide-details="true"
                  variant="solo-filled"
                  density="comfortable"
                  label="Kategorie"
                  v-model="localModelValue.type"
                  :items="nirveTypes"
                  item-title="title"
                  item-value="value"
                  class="ma-2"
                  :rules="[required]"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center">
                <v-autocomplete
                  :multiple="true"
                  :chips="true"
                  :hide-details="true"
                  variant="solo-filled"
                  density="comfortable"
                  label="Tags"
                  v-model="localModelValue.tags"
                  :items="tags"
                  item-title="tag"
                  item-value="_id"
                  class="ma-2"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center">
                <v-autocomplete
                  :multiple="true"
                  :chips="true"
                  :hide-details="true"
                  variant="solo-filled"
                  density="comfortable"
                  label="Gruppen"
                  v-model="localModelValue.groups"
                  :items="groups"
                  item-title="name"
                  item-value="_id"
                  class="ma-2"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center">
                <v-textarea
                  :no-resize="true"
                  rows="5"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Beschreibung"
                  class="ma-2"
                  v-model="localModelValue.description"
                />
              </v-col>
              <v-col cols="12" class="d-flex align-center">
                <v-textarea
                  :no-resize="true"
                  rows="5"
                  hide-details="auto"
                  variant="solo-filled"
                  density="comfortable"
                  label="Notizen des Erstellers"
                  class="ma-2"
                  v-model="localModelValue.creatorNotes"
                />
              </v-col>
              <v-col class="ma-2">
                <v-btn color="primary" :block="true" type="submit">
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
import { reactive, ref, watch } from "vue";
import { NirveCreateDto } from "@/functional_components/API/nirve-creator/dto/nirve-create.dto";
import { NirveGroup } from "@/functional_components/API/nirve-group/nirve-group.class";
import { NirveTag } from "@/functional_components/API/nirve-tag/nirve-tag.class";

const dialogOpen = ref<boolean>(true);
const valid = ref<boolean>(false);

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
  modelValue: NirveCreateDto;
  tags: NirveTag[];
  groups: NirveGroup[];
}>();

const localModelValue = reactive<NirveCreateDto>(props.modelValue);

const emit = defineEmits<{
  (event: "update:modelValue", value: NirveCreateDto): void;
  (event: "save"): void;
}>();

watch(
  localModelValue,
  () => {
    emit("update:modelValue", localModelValue);
  },
  { deep: true }
);
</script>

<style scoped></style>
