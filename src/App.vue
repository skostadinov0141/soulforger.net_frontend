<template>
  <v-app>
    <v-locale-provider locale="de">
      <Snackbar />
      <Navbar>
        <RouterView />
      </Navbar>
    </v-locale-provider>
  </v-app>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { VueCookies } from "vue-cookies";
import Snackbar from "./components/Snackbar.vue";
import { useApiStore } from "./store/api";

const $cookies: VueCookies = inject("$cookies") as VueCookies;
const apiStore = useApiStore();

onMounted(async () => {
  if ($cookies.isKey("token")) {
    await apiStore.api.getAxios();
  }
});
</script>
