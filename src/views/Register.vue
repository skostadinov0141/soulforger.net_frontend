<script setup lang="ts">

import { inject, ref, type ComputedRef, type Ref, watch } from 'vue';
import InputField from '../components/global/inputField_new.vue';
import PageSplitter from '@/components/global/pageSplitter.vue';
import CheckBox from '@/components/global/checkBox.vue';
import Button from '@/components/global/button.vue';
import type axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import { computed } from '@vue/reactivity';
import type { Account, Login, RegistrationError } from '@/interfaces/authentification';
import type { ApiError } from '@/interfaces/general';
import { useRoute, useRouter } from 'vue-router';
import FloatingHomeButton from '@/components/global/floatingHomeButton.vue';
import { Validate } from '@/frameworks/validation/validation';

let email: Ref<string> = ref('');
let displayName: Ref<string> = ref('');
let password: Ref<string> = ref('');
let passwordConfirm: Ref<string> = ref('');
let eula: Ref<boolean> = ref(false);

let loading: Ref<boolean> = ref(false);

const api : AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;
const router = useRouter();

function createAccount(){
    loading.value = true;
    let data : Account = <Account>{
        email:email.value,
        display_name:displayName.value,
        password:password.value,
        password_confirmation: passwordConfirm.value,
        eula:eula.value
    }

    api.post(`/auth/register`, data).then((data) => {
        loading.value = false;
            api.post('/auth/login',<Login>{
                email: email.value,
                password: password.value,
                keep_logged_in: true
            }).then(() => {
                router.push({'name':'home'});
            }).catch(err => {
                console.log(err);
                router.push({'name':'login'});
            })
    }).catch((error: AxiosError) => {});
}

let validator: Validate = new Validate();

const emailValid: ComputedRef<boolean[]> = computed(() => {
    return [validator.validateEmailFormat(email.value)];
});

const displayNameValid: ComputedRef<boolean[]> = computed(() => {
    return [
        validator.validateNotContainsWhitespace(displayName.value),
        validator.validateMaxLength(displayName.value,32),
        validator.validateMinLength(displayName.value,6),
    ];
});

const passwordValid: ComputedRef<boolean[]> = computed(() => {
    return [
        validator.validateNotContainsWhitespace(password.value),
        validator.validateContainsLowercase(password.value),
        validator.validateContainsUppercase(password.value),
        validator.validateContainsSpecial(password.value),
        validator.validateContainsNumber(password.value),
        validator.validateMaxLength(password.value,32),
        validator.validateMinLength(password.value,8),
    ];
});

const passwordConfirmationValid: ComputedRef<boolean[]> = computed(() => {
    return [
        password.value == passwordConfirm.value
    ];
});
</script>


<template>
    <FloatingHomeButton></FloatingHomeButton>
    <div class="main-container">
        <div class="form-container">
            <PageSplitter title="Account Erstellen" margin-top="0" margin-bottom="24px">Das Anlegen eines Accounts ist kostenlos, dauert nur eine Minute und macht Schluss mit den Schwierigkeiten beim Verwalten und Spielen von DSA.</PageSplitter>
            <InputField 
                :placeholder="'E-Mail Adresse'"
                label="E-Mail Adresse"
                :validations="[{content: 'Ist eine gültige E-Mail Adresse',valid: emailValid[0],}]" 
                type="email" 
                v-model="email"
            ></InputField>
            <InputField 
                :validations="[
                    {content:'Beinhaltet keine Leerzeichen', valid: displayNameValid[0]},
                    {content:'Ist nicht länger als 32 Zeichen', valid: displayNameValid[1]},
                    {content:'Ist nicht kürzer als 6 Zeichen', valid: displayNameValid[2]},
                ]"
                label="Anzeigename" 
                placeholder="Anzeigename"
                v-model="displayName"
            ></InputField>
            <InputField 
                :validations="[
                    {content:'Beinhaltet keine Leerzeichen', valid: passwordValid[0]},
                    {content:'Beinhaltet mindestens einen Kleinbuchstaben', valid: passwordValid[1]},
                    {content:'Beinhaltet mindestens einen Großbuchstaben', valid: passwordValid[2]},
                    {content:'Beinhaltet mindestens ein Sonderzeichen', valid: passwordValid[3]},
                    {content:'Beinhaltet mindestens eine Zahl', valid: passwordValid[4]},
                    {content:'Ist nicht länger als 32 Zeichen', valid: passwordValid[5]},
                    {content:'Ist nicht kürzer als 8 Zeichen', valid: passwordValid[6]},
                ]"
                label="Passwort" 
                placeholder="Passwort" 
                type="password" 
                v-model="password"
                :hidden="true"
            ></InputField>
            <InputField 
                :validations="[
                    {content:'Passwörter stimmen überein', valid: passwordConfirmationValid[0]},
                ]"
                label="Passwort Bestätigen" 
                placeholder="Passwort Bestätigen" 
                type="password" 
                v-model="passwordConfirm"
                :hidden="true"
            ></InputField>
            <div style="height: 8px;"></div>
            <CheckBox @checked="eula = !eula" tag="eula">Ich bin damit einverstanden, dass meine E-Mail zum Zwecke der Kommunikation und Passwortwiederherstellung gespeichert wird.</CheckBox>
            <div style="height: 8px;"></div>
            <Button :loading="loading" @pressed="createAccount()">Account Erstellen</Button>
        </div>
    </div>
</template>


<style scoped>

.title{
    display: flex;
    align-items: center;
}

.main-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
}

.form-container{
    padding: 24px;
    width: 480px;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 8px;
}

</style>