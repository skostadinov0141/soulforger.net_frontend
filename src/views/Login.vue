<script setup lang="ts">

import { inject, ref, type Ref } from 'vue';
import InputField from '../components/inputField.vue';
import PageSplitter from '@/components/pageSplitter.vue';
import CheckBox from '@/components/checkBox.vue';
import Button from '@/components/button.vue';
import axios, { AxiosError } from 'axios';
import { computed } from '@vue/reactivity';
import type { RegistrationError } from '@/interfaces/authentication';
import type { ApiError } from '@/interfaces/general';

let email: Ref<string> = ref('');
let password: Ref<string> = ref('');

let emailE: Ref<Array<string>> = ref([]);
let passwordE: Ref<Array<string>> = ref([]);

let loading: Ref<boolean> = ref(false);

const api = inject('apiBase');

function createAccount(){
    loading.value = true;
    console.log(loading.value);
    let data = {
        email:email.value,
        password:password.value,
    }

    emailE.value = [];
    passwordE.value = [];

    axios.post(`${api}/auth/register`, data, {
        headers:{
            Accept:'application/json'
        }
    }).then((data) => {
        loading.value = false;
    }).catch((error: AxiosError) => {
        (error.response?.data as ApiError).detail.forEach((element: RegistrationError) => {
            (element.category === 'email')? emailE.value.push(element.detail) : undefined;
            (element.category === 'password')? passwordE.value.push(element.detail) : undefined;
        });
        loading.value = false;
    });
}

</script>


<template>
    <div class="main-container">
        <div class="form-container">
            <PageSplitter title="Anmelden" margin-top="0" margin-bottom="16px">Logge dich in dein Account ein, um die volle Kapazität von Soulforger zu nutzen.</PageSplitter>
            <InputField :errors="emailE" label="E-Mail" placeholder="" type="email" v-model="email"></InputField>
            <InputField :errors="passwordE" label="Passwort" placeholder="" type="password" v-model="password"></InputField>
            <div style="height: 8px;"></div>
            <Button :loading="loading" @pressed="createAccount()">Anmelden</Button>
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
    width: 416px;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 8px;
}

</style>