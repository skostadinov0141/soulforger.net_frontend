<template>
	<v-row style="height: 100%">
		<v-col v-for="n in 3" :key="n" cols="12" lg="4" align-self="center">
			<v-card
				class="text-secondary ma-8 ma-lg-0"
				variant="elevated"
				rounded="md"
				elevation="3"
				color="surface-lighten-1"
				v-if="n == 2"
			>
				<v-img
					height="160px"
					cover
					src="https://cdn.midjourney.com/4555e0ec-4fa3-4bb0-af76-098dc9ee2993/0_0.png"
				></v-img>
				<v-card-item class="pb-4 pt-6">
					<v-form :disabled="loading" @submit.prevent="onSubmit" v-model="valid">
						<v-text-field
							density="compact"
							class="mb-2"
							:rules="[required]"
							bg-color="surface-lighten-2"
							variant="solo"
							v-model="uname"
							prepend-inner-icon="mdi-account"
							required
							label="E-Mail"
							placeholder="musterman@gmail.com"
							type="email"
							clearable
						></v-text-field>
						<v-text-field
							density="compact"
							:rules="[required]"
							bg-color="surface-lighten-2"
							variant="solo"
							v-model="pw"
							@click:append-inner="showPassword = !showPassword"
							prepend-inner-icon="mdi-lock"
							:append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
							required
							label="Passwort"
							:type="showPassword ? 'text' : 'password'"
						></v-text-field>
						<v-checkbox
							:disabled="loading"
							label="Angemeldet bleiben"
							v-model="remember"
						></v-checkbox>
						<v-alert
							icon="mdi-alert-circle"
							v-if="apiError.status"
							class="mb-4"
							color="error"
							dense
						>
							{{ apiError.message }}
						</v-alert>
						<v-btn
							class="mb-4"
							append-icon="mdi-login"
							color="indigo-darken-2"
							style="width: 100%"
							type="submit"
							>Anmelden</v-btn
						>
						<v-btn
							append-icon="mdi-account-plus"
							color="indigo-lighten-3"
							style="width: 100%"
							type="submit"
							variant="text"
							>Registrieren</v-btn
						>
					</v-form>
				</v-card-item>
			</v-card>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import API from "@/functional_components/API/api";
import { useAppStore } from "@/store/app";
import { AxiosError } from "axios";
import { reactive } from "vue";
import { inject, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";

const store = useAppStore();
const $cookies = inject("$cookies") as VueCookies;

const router = useRouter();
const apiError = reactive({
	status: false,
	message: "",
});
const valid = ref(false);
const showPassword = ref(false);
const uname = ref("");
const pw = ref("");
const remember = ref(false);
const loading = ref(false);

function required(value: string) {
	if (value) {
		return true;
	}
	return "Feld darf nicht leer sein";
}

function onSubmit() {
	loading.value = true;
	if (valid.value) {
		store.api
			.login(uname.value, pw.value, remember.value, $cookies)
			.then((res: boolean) => {
				loading.value = false;
				router.push("/profile");
			})
			.catch((err: AxiosError) => {
				apiError.status = true;
				apiError.message = "E-Mail oder Passwort falsch";
				loading.value = false;
			});
	}
}
</script>

<style scoped></style>
