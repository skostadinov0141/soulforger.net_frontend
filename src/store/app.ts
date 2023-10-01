// Utilities
import API from "@/functional_components/API/api";
import { CProfile } from "@/functional_components/controllers/CProfile";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAppStore = defineStore("app", () => {
	const api: API = reactive(new API());
	const profile = reactive(new CProfile());
	const page = ref<string>("");

	return {
		api,
		profile,
	};
});
