<template>
	<div>
		<input v-model="uname" type="text" />
		<input v-model="pw" type="password" />
		<button @click="store.api.login(uname, pw, $cookies)">login</button>
		<p></p>
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { inject, ref } from "vue";
import { VueCookies } from "vue-cookies";

const store = useAppStore();
const $cookies = inject("$cookies") as VueCookies;

const uname = ref("");
const pw = ref("");
</script>

<style scoped>
input {
	background-color: white;
	color: black;
}
</style>
