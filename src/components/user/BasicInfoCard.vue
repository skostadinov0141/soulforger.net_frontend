<template>
  <v-card
    :title="userProfile.displayName"
    :subtitle="new Date(userProfile.createdAt).toLocaleString()"
    class="py-1"
    rounded="lg"
  >
    <template #subtitle>
      <p class="text-secondary">
        Beigetreten am: {{ new Date(userProfile.createdAt).toLocaleString() }}
        <br>
        Lieblingsregelwerk: {{ userProfile.favoriteRulebook ?? "Alle" }}
        <br>
        Präferierte Sprache: {{ userProfile.preferredLanguage ?? "Deutsch" }}
      </p>
      <div class="d-flex flex-wrap mt-2">
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
    <template #append>
      <v-btn
        v-if="ownUser"
        class="align-self-start"
        color="secondary"
        variant="text"
        icon
        @click="openDialog"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template #prepend>
      <v-avatar
        size="160"
        :image="userProfile.avatarUrl"
      />
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
            <v-card-text>
              <v-form v-model="valid">
                <v-file-input
                  v-model="newProfileImage"
                  :multiple="false"
                  label="Profilbild"
                  variant="solo-filled"
                  density="comfortable"
                  hide-details="auto"
                />
                <!--TODO: Show the new profile image-->
                <v-img
                  v-if="newProfileImage !== undefined"
                  :image="newProfileImage[0]"
                  height="200"
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
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { Profile } from '@/functional_components/API/profile/profile.class'
import { ref, watch } from 'vue'
import { max, min, required } from '@/validators'

const props = defineProps<{
  ownUser: boolean;
}>();
const userProfile = defineModel<Profile>("userProfile", { required: true });

const dialogOpen = ref<boolean>(false);
const workingCopyProfile = ref<Profile>(new Profile());
const valid = ref<boolean>(false);
const newProfileImage = ref<File[]>();

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

function openDialog() {
  workingCopyProfile.value = {... userProfile.value };
  dialogOpen.value = true;
}

</script>

<style scoped>

</style>
