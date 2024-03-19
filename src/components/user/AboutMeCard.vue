<template>
  <v-card
    rounded="lg"
    class="h-100 d-flex flex-column"
  >
    <v-card-title>
      Über mich
    </v-card-title>
    <v-divider />
    <v-card-text
      :class="ownUser ? 'overflow-auto' : 'overflow-auto mb-4'"
      style="max-height: 250px;"
    >
      {{ userProfile.bio }}
    </v-card-text>
    <v-divider v-if="ownUser" />
    <v-card-actions v-if="ownUser">
      <v-spacer />
      <v-btn
        color="secondary"
        variant="text"
        append-icon="mdi-pencil"
        @click="openDialog"
      >
        Bearbeiten
      </v-btn>
    </v-card-actions>
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
                <v-textarea
                  v-model="userProfileWorkingCopy.bio"
                  label="Über mich"
                  :rules="[(v) => max(v, 2000)]"
                  :no-resize="true"
                  rows="16"
                  :persistent-counter="true"
                  variant="solo-filled"
                  counter="2000"
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
import { max, min, required } from '@/validators'
import { ref } from 'vue'
import { UpdateProfileDto } from '@/functional_components/API/user/dto/update-profile.dto'
import { useApiStore } from '@/store/api'
import { useSnackbarStore } from '@/store/snackbar'

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
const valid = ref<boolean>(false);
const userProfileWorkingCopy = ref<UpdateProfileDto>({
  bio: userProfile.value.bio,
});

function openDialog() {
  userProfileWorkingCopy.value = {
    bio: userProfile.value.bio,
  };
  dialogOpen.value = true;
}

function saveProfile() {
  apiStore.api.userService.updateUserProfile(userProfile.value.owner, userProfileWorkingCopy.value).then((profile) => {
    emit('saved', profile);
    snackbarStore.snackbar = {
      title: "Erfolg",
      message: "Profil wurde gespeichert.",
      type: "success",
    }
    dialogOpen.value = false;
  }).catch(() => {
    snackbarStore.snackbar = {
      title: "Fehler",
      message: "Profil konnte nicht gespeichert werden.",
      type: "error",
    }
  });
}

</script>

<style scoped>

</style>
