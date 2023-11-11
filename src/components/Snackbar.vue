<template>
  <v-snackbar v-model="showSnackbar" variant="tonal" :color="snackbarColor">
    {{ snackbarStore.snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/store/snackbar";
import { ref } from "vue";

const snackbarStore = useSnackbarStore();

const showSnackbar = ref(false);
const snackbarColor = ref("error");

snackbarStore.$subscribe((mutation, state) => {
  showSnackbar.value = true;
  snackbarColor.value = state.snackbar.type;
});
</script>

<style scoped></style>
