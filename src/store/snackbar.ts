// Utilities
import SnackBar from "@/functional_components/interfaces/snackbar";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbar = reactive<SnackBar>({
    title: "",
    message: "",
    type: "success",
  });

  return {
    snackbar,
  };
});
