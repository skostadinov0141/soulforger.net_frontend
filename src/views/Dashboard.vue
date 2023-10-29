<script setup lang="ts">
import { EqualsQuery } from "@/functional_components/API/queryConstructor";
import { useApiStore } from "@/store/api";
import { useAppStore } from "@/store/app";

const appStore = useApiStore();

async function test() {
	await appStore.api.refreshToken();
	const profile = appStore.api.profileService.search({
		owner: new EqualsQuery(appStore.api.decodeToken().sub),
	});
}
</script>

<template>
	<div class="input-container">
		<v-btn variant="flat" color="primary" @click="test">TEST</v-btn>
	</div>
</template>
