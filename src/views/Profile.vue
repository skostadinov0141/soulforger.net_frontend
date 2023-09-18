<template>
	<div>
		<v-img :src="store.profile.profile_picture">

		</v-img>
	</div>
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
		store.api
			.getAxios()
			.get("/user/profile")
			.then((response) => {
				plainToClassFromExist(store.profile, response.data);
				store.profile.setApi(store.api);
				router.push({ path: "/profile", query: { id: store.profile.owner } });
				let decodedToken: any = jwt_decode(store.api.getAuthToken());
				if (decodedToken.sub === store.profile.owner) {
					own.value = true;
				}
			});
	}
	let decodedToken: any = jwt_decode(store.api.getAuthToken());
	if (decodedToken.sub === route.query.id) {
		own.value = true;
	}
});
</script>

<style scoped></style>
