<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

import type { DSACharacter } from '../interfaces/characterschema';
import attField from '../components/attField.vue';
import pageSplitter from '../components/pageSplitter.vue';
import inputField from '../components/inputField.vue';

let schemeLoaded : Ref<boolean> = ref(false);
let characterSchema : Ref<DSACharacter> = ref({} as DSACharacter);
const apiBase = inject<string>('apiBase');

onMounted(()=>{

    let headers : Object = {
        headers:{
            Authorization:'2e12e96f-d40c-4c39-854d-f8290b79b412%235831368456732672',
            accept:'application/json'
        }
    }

    axios
        .get(`${apiBase}/characters/creation/get_schema`,headers)
        .then((response) => {
            characterSchema.value = response.data as DSACharacter;
            schemeLoaded.value = true;
        })
        .catch((error) => {
            console.log(error);
        })
})

</script>


<template>
    <h1 v-if="!schemeLoaded">LOADING!!!!!!</h1>
    <div v-else class="main-content-container">
        <pageSplitter title="Grundeigenschaften" margin-top="0px">
            Hier kannst du die wichtigsten Aspekte deines Charakters beschreiben. Dinge wie Name, Geburtsdatum, Spezies und Profession gehören hierher. Keines dieser Felder, außer dem Namen, muss ausgefüllt werden, aber es erleichtert dir die Suche in deiner vielleicht riesigen Sammlung von Charakteren.
        </pageSplitter>
        <inputField label="Name"></inputField>
        <inputField label="Spezies"></inputField>
        <pageSplitter title="Primäreigenschaften">
            Hier kannst du die Primäreigenschaften deines Charakters angeben.
            <br>Protip: Wenn du schneller navigieren möchtest benutze die TAB-Taste um zum nächsten Feld zu springen.
        </pageSplitter>
        <div class="attribute-container">
            <attField field-name="MU" v-model="characterSchema.primary_attributes.MU"/>
            <attField field-name="KL" v-model="characterSchema.primary_attributes.KL"/>
            <attField field-name="IN" v-model="characterSchema.primary_attributes.IN"/>
            <attField field-name="CH" v-model="characterSchema.primary_attributes.CH"/>
            <attField field-name="FF" v-model="characterSchema.primary_attributes.FF"/>
            <attField field-name="KO" v-model="characterSchema.primary_attributes.KO"/>
            <attField field-name="KK" v-model="characterSchema.primary_attributes.KK"/>
        </div>
        <pageSplitter title="Sekundäreigenschaften" margin-top="72px">
            Hier kannst du die Sekundäreigenschaften deines Charakters angeben.
            <br>TAB-Taste funktioniert hier auch.
        </pageSplitter>
        <div class="attribute-container">
            <attField field-name="LeP" v-model="characterSchema.secondary_attributes.LEP.max"/>
            <attField field-name="AsP" v-model="characterSchema.secondary_attributes.ASP.max"/>
            <attField field-name="KaP" v-model="characterSchema.secondary_attributes.KAP.max"/>
            <attField field-name="SK" v-model="characterSchema.secondary_attributes.SK.max"/>
            <attField field-name="ZK" v-model="characterSchema.secondary_attributes.ZK.max"/>
            <attField field-name="AW" v-model="characterSchema.secondary_attributes.AW.max"/>
            <attField field-name="INI" v-model="characterSchema.secondary_attributes.INI.max"/>
            <attField field-name="GES" v-model="characterSchema.secondary_attributes.GES.max"/>
            <attField field-name="WS" v-model="characterSchema.secondary_attributes.WS.max"/>
        </div>
    </div>
</template>


<style scoped>

.main-content-container{
    min-width: 100%;
    min-height: 100vh;
}

.attribute-container{
    min-width: 100%;
    display: flex;
    justify-content: space-between;
}

</style>