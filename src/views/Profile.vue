<template>
	<div>{{ own }}</div>
</template>

<script setup lang="ts">
import { CProfile } from "@/functional_components/controllers/CProfile";
import { useAppStore } from "@/store/app";
import { plainToClassFromExist } from "class-transformer";
import { inject } from "vue";
import { onMounted, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRoute, useRouter } from "vue-router";
import jwt_decode from "jwt-decode";

const $cookies: VueCookies = inject("$cookies") as VueCookies;
const store = useAppStore();
const route = useRoute();
const router = useRouter();
const own = ref(false);

onMounted(() => {
	if (route.query.id === undefined) {
		let profile: CProfile = new CProfile();
		store.api
			.getAxios()
			.get("/user/profile")
			.then((response) => {
				plainToClassFromExist(profile, response.data);
				router.replace({ path: "/profile", query: { id: profile.owner } });
			});
	}
	let token = $cookies.get("authToken");
	let decodedToken: any = jwt_decode(token);
	if (decodedToken.sub === route.query.id) {
		own.value = true;
	}
});
</script>

<style scoped></style>
