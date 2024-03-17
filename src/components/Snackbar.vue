<template>
  <v-snackbar
    v-model="showSnackbar"
    timeout="3000"
    variant="tonal"
    :color="snackbarColor"
  >
    <div class="d-flex">
      <v-icon
        size="24"
        class="mt-1 mr-2"
      >
        {{ icon }}
      </v-icon>
      <div class="d-flex flex-column">
        <p class="text-h6">
          {{ snackbarStore.snackbar.title }}
        </p>
        <p class="text-body-1">
          {{ snackbarStore.snackbar.message }}
        </p>
      </div>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "@/store/snackbar";
import { computed, ref, watch } from 'vue'
import { storeToRefs } from "pinia";

const snackbarStore = useSnackbarStore();

const showSnackbar = ref(false);
const snackbarColor = ref("error");

const icon = computed(() => {
  switch (snackbarStore.snackbar.type) {
    case "error":
      return "mdi-alert-circle";
    case "success":
      return "mdi-check-circle";
    case "info":
      return "mdi-information";
    case "warning":
      return "mdi-alert";
    default:
      return "mdi-information";
  }
});

watch(storeToRefs(snackbarStore).snackbar, (newVal) => {
  showSnackbar.value = true;
  snackbarColor.value = newVal.type;
});
</script>

<style scoped></style>
