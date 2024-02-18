<template>
  <v-snackbar
    v-model="showSnackbar"
    timeout="3000"
    variant="tonal"
    :color="snackbarColor"
  >
    {{ snackbarStore.snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/store/snackbar";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

const snackbarStore = useSnackbarStore();

const showSnackbar = ref(false);
const snackbarColor = ref("error");

watch(storeToRefs(snackbarStore).snackbar, (newVal) => {
  showSnackbar.value = true;
  snackbarColor.value = newVal.type;
});
</script>

<style scoped></style>
