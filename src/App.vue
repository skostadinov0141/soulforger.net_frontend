<template>
	<v-app>
		<Snackbar />
		<Navbar>
			<RouterView />
		</Navbar>
	</v-app>
</template>

<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import Navbar from "./components/Navbar.vue";
import { useAppStore } from "./store/app";
import { VueCookies } from "vue-cookies";
import { useRoute } from "vue-router";
import Snackbar from "./components/Snackbar.vue";

const $cookies: VueCookies = inject("$cookies") as VueCookies;
const store = useAppStore();

onMounted(() => {
	if ($cookies.isKey("authToken")) {
		store.api.authorize($cookies.get("authToken"));
	}
});
</script>
