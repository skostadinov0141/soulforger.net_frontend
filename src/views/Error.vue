<template>
	<p style="white-space: pre-wrap">
		{{ JSON.stringify(error, null, 4) }}
	</p>
</template>

<script setup lang="ts">
import { AxiosError } from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const error = ref<AxiosError>(
	new AxiosError(JSON.parse(route.query.error as string))
);
</script>

<style scoped></style>
