<template>
  <v-card
    :title="userProfile.displayName"
    :subtitle="new Date(userProfile.createdAt).toLocaleString()"
    class="py-1"
    rounded="lg"
  >
    <template #subtitle>
      <p class="text-secondary text-wrap">
        Beigetreten am: {{ new Date(userProfile.createdAt).toLocaleString() }}
        <br>
        Lieblingsregelwerk: {{ userProfile.favoriteRulebook ?? "Alle" }}
        <br>
        Präferierte Sprache: {{ userProfile.preferredLanguage ?? "Deutsch" }}
      </p>
      <div
        v-if="!smAndDown"
        class="d-flex flex-wrap mt-2"
      >
        <v-chip
          v-for="role in 10"
          :key="role"
          size="small"
          class="ma-1"
          variant="flat"
          color="primary"
        >
          Badge
        </v-chip>
      </div>
    </template>
    <template #text>
      <div
        v-if="smAndDown"
        class="d-flex flex-wrap mt-2"
      >
        <v-chip
          v-for="role in 10"
          :key="role"
          size="small"
          class="ma-1"
          variant="flat"
          color="primary"
        >
          Badge
        </v-chip>
      </div>
    </template>
    <v-divider />
    <template #actions>
      <v-spacer />
      <v-btn
        v-if="ownUser"
        class="align-self-start"
        color="secondary"
        variant="text"
        append-icon="mdi-pencil"
        @click="openDialog"
      >
        Bearbeiten
      </v-btn>
    </template>
    <template #prepend>
      <v-avatar
        :size="avatarSize"
        :image="userProfile.avatarUrl === '' ? undefined : userProfile.avatarUrl"
        :variant="userProfile.avatarUrl === '' ? 'outlined' : 'flat'"
      >
        <v-icon
          v-if="userProfile.avatarUrl === ''"
          class="pt-4"
          :size="avatarSize + 50"
        >
          mdi-account
        </v-icon>
      </v-avatar>
    </template>
  </v-card>

  <v-dialog v-model="dialogOpen">
    <v-container class="h-100">
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-title>
              Profil bearbeiten
            </v-card-title>
            <v-divider />
            <v-form v-model="valid">
              <v-card-text>
                <v-file-input
                  v-model="newProfileImage"
                  :multiple="false"
                  label="Profilbild"
                  variant="solo-filled"
                  density="comfortable"
                  hide-details="auto"
                />
                <v-text-field
                  v-model="workingCopyProfile.displayName"
                  class="mt-3"
                  label="Anzeigename"
                  variant="solo-filled"
                  density="comfortable"
                  hide-details="auto"
                  :rules="[
                    required,
                    (v) => min(v, 4),
                    (v) => max(v, 32),
                  ]"
                />
                <v-select
                  v-model="workingCopyProfile.favoriteRulebook"
                  :items="possibleRulebooks"
                  class="mt-3"
                  label="Lieblingsregelwerk"
                  variant="solo-filled"
                  density="comfortable"
                  :hide-details="true"
                />
                <v-select
                  v-model="workingCopyProfile.preferredLanguage"
                  :items="possibleLanguages"
                  class="mt-3"
                  label="Präferierte Sprache"
                  variant="solo-filled"
                  density="comfortable"
                  :hide-details="true"
                />
                <v-select
                  v-model="workingCopyProfile.preferredRole"
                  :items="possibleRoles"
                  class="mt-3"
                  label="Rolle im Spiel"
                  variant="solo-filled"
                  density="comfortable"
                  :hide-details="true"
                />
              </v-card-text>
              <v-divider />
              <v-card-actions class="ma-2">
                <v-spacer />
                <v-btn
                  variant="text"
                  color="error"
                  append-icon="mdi-close"
                  @click="dialogOpen = false"
                >
                  Abbrechen
                </v-btn>
                <v-btn
                  variant="flat"
                  color="primary"
                  append-icon="mdi-content-save"
                  @click="saveProfile"
                >
                  Speichern
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { Profile } from '@/functional_components/API/user/profile.class'
import { computed, ref, watch } from 'vue'
import { max, min, required } from '@/validators'
import { useDisplay } from 'vuetify'
import { useApiStore } from '@/store/api'
import { UpdateProfileDto } from '@/functional_components/API/user/dto/update-profile.dto'
import { useSnackbarStore } from '@/store/snackbar'

const { smAndDown } = useDisplay();
const apiStore = useApiStore();
const snackbarStore = useSnackbarStore();

const props = defineProps<{
  ownUser: boolean;
}>();
const emit = defineEmits<{
  (e: 'saved', newProfile: Profile): void;
}>();
const userProfile = defineModel<Profile>("userProfile", { required: true });

const dialogOpen = ref<boolean>(false);
const workingCopyProfile = ref<UpdateProfileDto>(new UpdateProfileDto());
const valid = ref<boolean>(false);
const newProfileImage = ref<File[]>();
const avatarSize = computed(() => {
  if (smAndDown.value) return 80;
  return 160;
});

watch(newProfileImage, (prev, newval) => {
  console.log(prev, newval);
});

const possibleRulebooks = [
  "Nirve",
  "Das Schwarze Auge",
  "Shadowrun",
  "Dungeons & Dragons",
  "Pathfinder",
  "Call of Cthulhu",
  "Warhammer",
  "Fading Suns",
  "Cyberpunk",
];
const possibleLanguages = [
  "Deutsch",
  "Englisch",
  "Französisch",
  "Spanisch",
  "Russisch",
];
const possibleRoles = [
  "Angehender Spielleiter",
  "Spielleiter",
  "Erfahrener Spieleleiter",
  "Angehender Spieler",
  "Spieler",
  "Erfahrener Spieler",
];

function saveProfile() {
  apiStore.api.userService.updateUserProfile(userProfile.value.owner,workingCopyProfile.value).then((res) => {
    snackbarStore.snackbar = {
      title: "Erfolg",
      message: "Profil wurde erfolgreich gespeichert.",
      type: "success",
    }
    emit("saved", res);
    dialogOpen.value = false;
  });
}

function openDialog() {
  workingCopyProfile.value = {... userProfile.value };
  newProfileImage.value = undefined;
  dialogOpen.value = true;
}

</script>

<style scoped>

</style>
