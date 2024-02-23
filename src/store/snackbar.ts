// Utilities
import SnackBar from "@/functional_components/interfaces/snackbar";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbar = ref<SnackBar>({
    title: "",
    message: "",
    type: "success",
  });

  return {
    snackbar,
  };
});
