<script setup lang="ts">
import Query from "@/functional_components/API/queryConstructor";
import BaseModel from "@/functional_components/nirve/nirve_character_v4/CBaseModel";
import { useAppStore } from "@/store/app";
import { DeepReadonly, onMounted } from "vue";
import { Ref, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const reactiveModel = reactive(new BaseModel());
const store = useAppStore();
const output: Ref<string> = ref<string>("");
const route = useRoute();
const router = useRouter();
const types: Ref<string[]> = ref([
	"bending-skills",
	"items",
	"spells",
	"character-classes",
	"disadvantages",
	"races",
	"religions",
	"skills",
]);
const perPage = ref(10);
const page = ref(1);
const datatableName = (route.params.type as string).toLocaleUpperCase();
const items = ref<any[]>([]);
const search = ref<string>("");
const headers = [
	{ title: "Name", key: "name" },
	{ title: "Description", key: "description" },
	{ title: "Actions", key: "actions", sortable: false },
];

function submit() {
	store.api
		.getAxios()
		.post(`/nirve/creator/${route.params.type}`, reactiveModel)
		.then((value) => {
			output.value = value.data;
		});
}

function getItems() {
	store.api
		.getAxios()
		.get(`/nirve/creator/${route.params.type}`, {
			params: {
				query: new Query("_id", [{ operator: "exists", value: true }]).toString(),
			},
		})
		.then((res) => {
			items.value = res.data;
		});
}

onMounted(() => {
	if (!types.value.includes(route.params.type as string)) {
		router.push("/error");
		return;
	}
	getItems();
});

function editItem(item: any) {
	// TODO: Implement edit functionality
}

function deleteItem(item: any) {
	// TODO: Implement delete functionality
}
</script>

<template>
	<v-row style="height: 100%">
		<v-col align-self="center" v-for="n in 3" :key="n" cols="12" lg="4">
			<v-card
				class="text-secondary ma-8 ma-lg-0"
				variant="elevated"
				rounded="md"
				elevation="3"
				color="surface-lighten-1"
				v-if="n == 1"
			>
				<v-card-title>
					{{ datatableName }}
					<v-spacer />
					<v-text-field
						single-line
						hide-details
						label="Suche"
						class="mb-2"
						bg-color="surface-lighten-2"
						prepend-inner-icon="mdi-magnify"
						v-model="search"
					></v-text-field>
				</v-card-title>
				<!-- <v-data-table
                    :headers="headers"
                    :items="items"
                    :search="search"
                    :items-per-page="perPage"
                    :page.sync="page"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-btn color="primary" @click="Edit(item)">Edit</v-btn>
                        <v-btn color="error" @click="Delete(item)">Delete</v-btn>
                    </template>
                </v-data-table> -->
			</v-card>

			<v-card
				class="text-secondary ma-8 ma-lg-0"
				variant="elevated"
				rounded="md"
				elevation="3"
				color="surface-lighten-1"
				v-if="n == 2"
			>
				<v-card-item class="pb-4 pt-6">
					<v-form>
						<v-textarea
							v-model="reactiveModel.name"
							rows="1"
							label="Name"
							class="mb-2"
							bg-color="surface-lighten-2"
							prepend-inner-icon="mdi-pencil"
						>
						</v-textarea>
						<v-textarea
							rows="1"
							v-model="reactiveModel.description"
							label="Beschreibung"
							class="mb-2"
							bg-color="surface-lighten-2"
							prepend-inner-icon="mdi-text-box-edit"
							auto-grow
						>
						</v-textarea>
						<v-btn
							width="100%"
							bg-color="indigo-lighten-2"
							color="indigo-darken-2"
							@click="submit"
						>
							Speichern
						</v-btn>
					</v-form>
				</v-card-item>
			</v-card>
		</v-col>
	</v-row>
</template>

<style scoped></style>
