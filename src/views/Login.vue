<script setup lang="ts">

import { inject, ref, type Ref } from 'vue';
import InputField from '../components/inputField.vue';
import PageSplitter from '@/components/pageSplitter.vue';
import CheckBox from '@/components/checkBox.vue';
import Button from '@/components/button.vue';
import type axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import { computed } from '@vue/reactivity';
import type { RegistrationError } from '@/interfaces/authentication';
import type { ApiError } from '@/interfaces/general';
import type { User } from '@/interfaces/authentication';
import { useRouter } from 'vue-router';
import { useCookies } from 'vue3-cookies';

let email: Ref<string> = ref('');
let password: Ref<string> = ref('');

let emailE: Ref<Array<string>> = ref([]);
let passwordE: Ref<Array<string>> = ref([]);

let loading: Ref<boolean> = ref(false);

const api : AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;
const router = useRouter();
const { cookies } = useCookies();


function login(){
    loading.value = true;
    let data = {
        email:email.value,
        password:password.value,
        keep_logged_in:false
    }

    emailE.value = [];
    passwordE.value = [];

    api.post(`/auth/login`, {}, { params : data }).then((data) => {
        loading.value = false;
        console.log(new Date((data.data as User).expires_at));
        if(cookies.isKey('user')) cookies.remove('user');
        cookies.set('user', data.data, new Date((data.data as User).expires_at));
        router.push({name:'home'});
    }).catch((error: AxiosError) => {
        let error_detail : string = (error.response?.data as ApiError).detail;
        emailE.value.push(error_detail);
        passwordE.value.push(error_detail);
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
            <Button :loading="loading" @pressed="login()">Anmelden</Button>
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