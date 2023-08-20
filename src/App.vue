<template>
	<v-app>
		<Navbar>
			<RouterView />
		</Navbar>
	</v-app>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { useAppStore } from "./store/app";
import API from "./functional_components/API/api";
import { VueCookies } from "vue-cookies";

const $cookies: VueCookies = inject("$cookies") as VueCookies;
const store = useAppStore();

onMounted(() => {
	store.api = new API($cookies.get("authToken"));
});
</script>
