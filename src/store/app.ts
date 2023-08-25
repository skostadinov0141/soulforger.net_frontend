// Utilities
import API from "@/functional_components/API/api";
import { CProfile } from "@/functional_components/controllers/CProfile";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAppStore = defineStore("app", () => {
	const api: API = reactive(new API());
	const profile = reactive(new CProfile());

	return {
		api,
		profile,
	};
});
