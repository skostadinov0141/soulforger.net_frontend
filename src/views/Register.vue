<script setup lang="ts">

import { inject, ref, type Ref } from 'vue';
import InputField from '../components/inputField.vue';
import PageSplitter from '@/components/pageSplitter.vue';
import CheckBox from '@/components/checkBox.vue';
import Button from '@/components/button.vue';
import type axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import { computed } from '@vue/reactivity';
import type { Account, Login, RegistrationError } from '@/interfaces/authentification';
import type { ApiError } from '@/interfaces/general';
import { useRoute, useRouter } from 'vue-router';
import FloatingHomeButton from '@/components/floatingHomeButton.vue';

let email: Ref<string> = ref('');
let displayName: Ref<string> = ref('');
let password: Ref<string> = ref('');
let passwordConfirm: Ref<string> = ref('');
let eula: Ref<boolean> = ref(false);

let emailE: Ref<Array<string>> = ref([]);
let passwordE: Ref<Array<string>> = ref([]);
let passwordConfE: Ref<Array<string>> = ref([]);
let eulaE: Ref<Array<string>> = ref([]);
let displayNameE: Ref<Array<string>> = ref([]);

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

    emailE.value = [];
    passwordE.value = [];
    eulaE.value = [];
    passwordConfE.value = [];
    displayNameE.value = [];

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
    }).catch((error: AxiosError) => {
        (error.response?.data as ApiError).detail.forEach((element: RegistrationError) => {
            (element.category === 'email')? emailE.value.push(element.detail) : undefined;
            (element.category === 'password')? passwordE.value.push(element.detail) : undefined;
            (element.category === 'password_confirmation')? passwordConfE.value.push(element.detail) : undefined;
            (element.category === 'eula')? eulaE.value.push(element.detail) : undefined;
            (element.category === 'display_name')? displayNameE.value.push(element.detail) : undefined;
        });
        loading.value = false;
    });
}

</script>


<template>
    <FloatingHomeButton></FloatingHomeButton>
    <div class="main-container">
        <div class="form-container">
            <PageSplitter title="Account Erstellen" margin-top="0" margin-bottom="24px">Das Anlegen eines Accounts ist kostenlos, dauert nur eine Minute und macht Schluss mit den Schwierigkeiten beim Verwalten und Spielen von DSA.</PageSplitter>
            <InputField :errors="emailE" label="E-Mail" placeholder="" type="email" v-model="email"></InputField>
            <InputField :errors="displayNameE" label="Anzeigename" placeholder="" v-model="displayName"></InputField>
            <InputField :errors="passwordE" label="Passwort" placeholder="" type="password" v-model="password"></InputField>
            <InputField :errors="passwordConfE" label="Passwort Bestätigen" placeholder="" type="password" v-model="passwordConfirm"></InputField>
            <div style="height: 8px;"></div>
            <CheckBox :errors="emailE" @checked="eula = !eula" tag="eula">Ich bin damit einverstanden, dass meine E-Mail zum Zwecke der Kommunikation und Passwortwiederherstellung gespeichert wird.</CheckBox>
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
    width: 416px;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 8px;
}

</style>