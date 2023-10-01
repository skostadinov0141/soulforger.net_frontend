<template>
	<v-container class="h-100">
		<v-row align="center" class="h-100" no-gutters>
			<v-col cols="12" md="6" offset-md="3">
				<v-card color="surface-lighten-1">
					<v-card-title class="text-error">Ein Fehler ist aufgetreten!</v-card-title>
					<v-card-text>
						{{ `${error.config?.baseURL}${error.config?.url}` }}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { AxiosError } from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const error = ref<AxiosError>(new AxiosError());

onMounted(() => {
	if (route.query.error) {
		error.value = JSON.parse(route.query.error as string);
	} else {
		error.value = new AxiosError();
	}
});
</script>

<style scoped></style>
