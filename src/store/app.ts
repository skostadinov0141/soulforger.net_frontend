// Utilities
import API from "@/functional_components/API/api";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAppStore = defineStore("app", () => {
	const api: API = undefined as unknown as API;

	return {
		api,
	};
});
