import API from "@/functional_components/API/api";
import { defineStore } from "pinia";
import { inject, reactive } from "vue";
import { VueCookies } from "vue-cookies";

export const useApiStore = defineStore("api", () => {
	const cookies: VueCookies = inject<VueCookies>("$cookies")!;

	const api = reactive(new API(cookies));

	return {
		api,
	};
});
