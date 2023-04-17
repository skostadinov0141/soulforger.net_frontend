<script setup lang="ts">

import { ref, type Ref } from 'vue';
import InputField from '../components/inputField.vue';

let email: Ref<string> = ref('');
let displayName: Ref<string> = ref('');
let password: Ref<string> = ref('');
let eula: Ref<boolean> = ref(true);

</script>


<template>
    <div class="main-container">
        <div class="form-container">
            <InputField label="E-Mail" type="email"></InputField>
            <InputField label="Anzeigename"></InputField>
            <InputField label="Passwort" type="password"></InputField>
            <InputField label="Passwort Bestätigen" type="password"></InputField>
        </div>
    </div>
</template>


<style scoped>

.main-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
}

.form-container{
    width: 416px;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 8px;
}

</style>