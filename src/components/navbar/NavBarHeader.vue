<template>
  <v-list v-if="!showHeader">
    <v-list-item
      prepend-avatar="/logo.png"
      class="d-flex"
    >
      <v-btn
        size="small"
        variant="text"
        to="/register"
        class="mr-2"
      >
        Registrieren
      </v-btn>
      <v-btn
        size="small"
        color="primary"
        variant="elevated"
        to="/login"
      >
        Anmelden
      </v-btn>
    </v-list-item>
  </v-list>
  <v-list v-else>
    <v-sheet class="d-flex align-center w-100 px-3 py-2">
      <v-avatar
        :image="userProfile?.avatarUrl === '' ? undefined : userProfile?.avatarUrl"
        :icon="userProfile?.avatarUrl === '' ? 'mdi-account' : undefined"
        size="40"
      />
      <v-sheet class="ml-4 d-flex align-center w-100">
        <span
          class="overflow-hidden"
          style="max-width: 170px"
        >
          <p>
            {{ userProfile?.displayName }}
          </p>
          <p class="text-caption">
            {{ currentTime }}
          </p>
        </span>
        <div class="flex-fill" />
        <v-tooltip
          location="bottom"
          text="Profil bearbeiten"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              size="small"
              variant="text"
              color="secondary"
              :icon="true"
            >
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip
          location="bottom"
          text="Abmelden"
        >
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              size="small"
              variant="text"
              color="error"
              :icon="true"
              @click="logout"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-sheet>
    </v-sheet>
  </v-list>
</template>

<script setup lang="ts">
import { useApiStore } from "@/store/api";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import User from '@/functional_components/API/user/user.class'
import { Profile } from '@/functional_components/API/user/profile.class'

const apiStore = useApiStore();
const router = useRouter();

const showHeader = ref(false);
const userProfile = ref<Profile | undefined>(undefined);
const currentTime = ref(new Date().toLocaleString());

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleString();
  }, 1000);
});

function logout() {
  apiStore.api.logout();
  router.push("/login");
}

watch(storeToRefs(apiStore).authed, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    apiStore.api.userService.getProfileByUserId(apiStore.api.decodeToken().sub).then((res) => {
      userProfile.value = res;
    });
    showHeader.value = true;
  } else if (!newVal && oldVal) {
    showHeader.value = false;
  }
})
</script>

<style scoped></style>
