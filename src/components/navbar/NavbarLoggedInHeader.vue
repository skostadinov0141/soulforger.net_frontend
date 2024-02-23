<template>
  <v-list v-if="!apiStore.authed">
    <v-list-item prepend-avatar="/logo.png" class="d-flex">
      <v-btn size="small" variant="text" to="/register" class="mr-2">
        Registrieren
      </v-btn>
      <v-btn size="small" color="primary" variant="elevated" to="/login">
        Anmelden
      </v-btn>
    </v-list-item>
  </v-list>
  <v-list v-else>
    <v-sheet class="">
      <!--      TODO: User is not instantly saved in the cookies-->
      <v-btn color="error" size="small" class="mr-2" @click="logout">
        Ausloggen
      </v-btn>
    </v-sheet>
  </v-list>
</template>

<script setup lang="ts">
import { useApiStore } from "@/store/api";
import { useRouter } from "vue-router";

const apiStore = useApiStore();
const router = useRouter();

function logout() {
  apiStore.api.logout();
  router.push("/login");
}
</script>

<style scoped></style>
