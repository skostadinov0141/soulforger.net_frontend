// Utilities
import API from "@/functional_components/API/api";
import SnackBar from "@/functional_components/interfaces/snackbar";
import { CProfile } from "@/functional_components/controllers/CProfile";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore("app", () => {
	const api: API = reactive(new API());
	const profile = reactive(new CProfile());

	return {
		api,
		profile,
	};
});
