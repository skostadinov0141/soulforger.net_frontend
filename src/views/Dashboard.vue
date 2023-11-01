<script setup lang="ts">
import {
	AndQuery,
	EqualsQuery,
	LessThanQuery,
} from "@/functional_components/API/queryConstructor";
import { useApiStore } from "@/store/api";

const appStore = useApiStore();

async function test() {
	await appStore.api.refreshToken();
	const profile = await appStore.api.profileService.search({
		owner: new EqualsQuery(appStore.api.decodeToken().sub),
		createdAt: new LessThanQuery(new Date(Date.now() - 3600 * 1000 * 24 * 7)),
	});
	console.log({
		owner: new EqualsQuery(appStore.api.decodeToken().sub).parse(),
		createdAt: new LessThanQuery(Date.now() - 3600 * 1000 * 24 * 7).parse(),
	});
	console.log(profile);
	// let constructedQuery = new AndQuery([
	// 	new OrQuery([new EqualsQuery("owner")]),
	// 	new ExistQuery(true),
	// ]);
	// console.log(constructedQuery.parse());
}
</script>

<template>
	<div class="input-container">
		<v-btn variant="flat" color="primary" @click="test">TEST</v-btn>
	</div>
</template>
