<template>
  <v-row style="height: 100%">
    <v-col v-for="n in 3" :key="n" cols="12" lg="4" align-self="center">
      <v-card
        v-if="n == 2"
        class="text-secondary ma-8 ma-lg-0"
        variant="elevated"
        rounded="md"
        elevation="3"
        color="surface-lighten-1"
      >
        <v-img
          height="160px"
          cover
          src="https://cdn.midjourney.com/4555e0ec-4fa3-4bb0-af76-098dc9ee2993/0_0.png"
        />
        <v-card-item class="pb-4 pt-6">
          <v-form v-model="valid" @submit.prevent="onSubmit">
            <v-text-field
              v-model="data.email"
              density="compact"
              class="mb-2"
              :rules="[
                validator.required,
                validator.isEmail,
                validator.noWhitespace,
              ]"
              bg-color="surface-lighten-2"
              variant="solo"
              prepend-inner-icon="mdi-email"
              required
              label="E-Mail"
              placeholder="musterman@gmail.com"
              type="email"
              clearable
            />
            <v-text-field
              v-model="data.username"
              density="compact"
              class="mb-2"
              :rules="[
                validator.required,
                validator.min(data.username, 3),
                validator.max(data.username, 32),
              ]"
              bg-color="surface-lighten-2"
              variant="solo"
              prepend-inner-icon="mdi-account"
              required
              label="Anzeigename"
              placeholder="Max Mustermann"
              type="text"
              clearable
            />
            <v-text-field
              v-model="data.password"
              density="compact"
              class="mb-2"
              :rules="[
                validator.required,
                validator.min(data.password, 8),
                validator.max(data.password, 32),
                validator.containsLowercase,
                validator.containsUppercase,
                validator.containsNumber,
                validator.containsSpecialCharacter,
                validator.noWhitespace,
              ]"
              bg-color="surface-lighten-2"
              variant="solo"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required
              label="Passwort"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
            />
            <v-text-field
              v-model="pwConfirmation"
              density="compact"
              class="mb-2"
              :rules="[
                validator.required,
                validator.matches(data.password, pwConfirmation),
              ]"
              bg-color="surface-lighten-2"
              variant="solo"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="
                showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              required
              label="Passwort bestätigen"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              @click:append-inner="
                showPasswordConfirmation = !showPasswordConfirmation
              "
            />
            <v-alert
              v-if="apiError.status"
              icon="mdi-alert-circle"
              class="mb-4"
              color="error"
              dense
            >
              {{ apiError.message }}
            </v-alert>
            <v-checkbox
              color="white"
              :disabled="loading"
              :rules="[validateEula]"
            >
              <template #label>
                <p class="text-white">
                  Ich habe die
                  <a
                    class="text-decoration-none text-indigo-lighten-1"
                    target="_blank"
                    href="https://soulforger.net/legal/privacy-agreement"
                    @click.stop
                    >Datenschutzerklärung</a
                  >
                  gelesen und akzeptiere diese.
                </p>
              </template>
            </v-checkbox>
            <v-btn
              :disabled="loading"
              class="mb-4"
              append-icon="mdi-account-plus"
              color="primary"
              style="width: 100%"
              type="submit"
            >
              Registrieren
            </v-btn>
            <v-btn
              :disabled="loading"
              append-icon="mdi-login"
              color="indigo-lighten-3"
              style="width: 100%"
              type="submit"
              variant="text"
            >
              Anmelden
            </v-btn>
          </v-form>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { AxiosError } from "axios";
import { reactive } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as validator from "@/validators";
import { CreateUserDto } from "@/functional_components/API/user/dto/create-user.dto";
import { useApiStore } from "@/store/api";

const apiStore = useApiStore();

const router = useRouter();
const apiError = reactive({
  status: false,
  message: "",
});
const valid = ref(false);
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const loading = ref(false);

const data = reactive(new CreateUserDto());
const pwConfirmation = ref("");

function onSubmit() {
  loading.value = true;
  if (valid.value) {
    apiStore.api.userService.post(data).then(
      () => {
        loading.value = false;
        router.push("/login");
      },
      (error: AxiosError) => {
        loading.value = false;
        apiError.status = true;
        apiError.message = error.message;
      }
    );
  }
  loading.value = false;
}

function validateEula(value: boolean) {
  if (value) {
    return true;
  }
  return "Bitte akzeptiere die Datenschutzerklärung";
}
</script>

<style scoped></style>
