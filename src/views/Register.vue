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
					<v-form @submit.prevent="onSubmit" v-model="valid">
						<v-text-field
							density="compact"
							class="mb-2"
							:rules="[validator.required, validator.isEmail]"
							bg-color="surface-lighten-2"
							variant="solo"
							v-model="email"
							prepend-inner-icon="mdi-email"
							required
							label="E-Mail"
							placeholder="musterman@gmail.com"
							type="email"
							clearable
						></v-text-field>
						<v-text-field
							density="compact"
							class="mb-2"
							:rules="[
								validator.required,
								validator.min(displayName, 3),
								validator.max(displayName, 32),
							]"
							bg-color="surface-lighten-2"
							variant="solo"
							v-model="displayName"
							prepend-inner-icon="mdi-account"
							required
							label="Anzeigename"
							placeholder="Max Mustermann"
							clearable
						></v-text-field>
						<v-text-field
							density="compact"
							class="mb-2"
							:rules="[
								validator.required,
								validator.min(pw, 8),
								validator.max(pw, 32),
								validator.containsLowercase,
								validator.containsUppercase,
								validator.containsNumber,
								validator.containsSpecialCharacter,
							]"
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
						<v-text-field
							density="compact"
							class="mb-2"
							:rules="[validator.required, validator.matches(pw, pwConfirmation)]"
							bg-color="surface-lighten-2"
							variant="solo"
							v-model="pwConfirmation"
							@click:append-inner="
								showPasswordConfirmation = !showPasswordConfirmation
							"
							prepend-inner-icon="mdi-lock"
							:append-inner-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
							required
							label="Passwort bestätigen"
							:type="showPasswordConfirmation ? 'text' : 'password'"
						></v-text-field>
						<v-alert
							icon="mdi-alert-circle"
							v-if="apiError.status"
							class="mb-4"
							color="error"
							dense
						>
							{{ apiError.message }}
						</v-alert>
						<v-checkbox v-model="eula">
							<template v-slot:label>
								<div>
									Ich habe die
									<a
										class="text-decoration-none text-indigo-lighten-1"
										@click.stop
										target="_blank"
										href="https://soulforger.net/legal/privacy-agreement"
										>Datenschutzerklärung</a
									>
									gelesen und akzeptiere diese.
								</div>
							</template>
						</v-checkbox>
						<v-btn
							class="mb-4"
							append-icon="mdi-account-plus"
							color="indigo-darken-2"
							style="width: 100%"
							type="submit"
							>Registrieren</v-btn
						>
						<v-btn
							append-icon="mdi-login"
							color="indigo-lighten-3"
							style="width: 100%"
							type="submit"
							variant="text"
							>Anmelden</v-btn
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
import * as validator from "@/validators";

const store = useAppStore();
const $cookies = inject("$cookies") as VueCookies;

const router = useRouter();
const apiError = reactive({
	status: false,
	message: "",
});
const valid = ref(false);
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);

const email = ref("");
const displayName = ref("");
const pw = ref("");
const pwConfirmation = ref("");
const eula = ref(false);

function onSubmit() {}
</script>

<style scoped></style>
