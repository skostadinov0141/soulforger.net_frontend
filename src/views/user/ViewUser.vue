<template>
  <v-container class="h-100">
    <v-row
      class="h-100"
      align="center"
    >
      <v-col cols="6">
        <BasicInfoCard :user-profile="userProfile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApiStore } from '@/store/api'
import { Profile } from '@/functional_components/API/profile/profile.class'
import { useSnackbarStore } from '@/store/snackbar'
import BasicInfoCard from '@/components/user/BasicInfoCard.vue'

const route = useRoute();
const router = useRouter();
const apiStore = useApiStore();
const snackbarStore = useSnackbarStore();

const userProfile = ref<Profile>(new Profile());
const ownUser = ref<boolean>(false);

onMounted(() => {
  const userId: string = (route.query.userId ?? apiStore.api.decodeToken().sub) as string;
  if (userId === apiStore.api.decodeToken().sub) {
    ownUser.value = true;
  }
  apiStore.api.userService.getProfileByUserId(userId).then((profile) => {
    userProfile.value = profile;
    // add the userId to the url
    router.replace({ query: { userId: userId } });
  }).catch(() => {
    snackbarStore.snackbar = {
      title: "Fehler",
      message: "Nutzer wurde nicht gefunden.",
      type: "error",
    }
  });
});

</script>

<style scoped>

</style>
