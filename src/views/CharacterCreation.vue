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
        <div class="horizontal-container gapped vertically-gapped">
            <inputField label="Name" v-model="characterSchema.name"></inputField>
            <inputField label="Erfahrungsgrad" v-model="characterSchema.level"></inputField>
        </div>
        <div class="horizontal-container gapped vertically-gapped">
            <inputField label="Familie" v-model="characterSchema.family"></inputField>
            <inputField label="Geburtsdatum" v-model="characterSchema.birth_date"></inputField>
            <inputField label="Spezies" v-model="characterSchema.species"></inputField>
        </div>
        <div class="horizontal-container gapped vertically-gapped">
            <inputField label="Kultur" v-model="characterSchema.culture"></inputField>
            <inputField label="Profession" v-model="characterSchema.profession"></inputField>
            <inputField label="Geschlecht" v-model="characterSchema.sex"></inputField>
        </div>
        <div class="horizontal-container gapped vertically-gapped">
            <inputField label="Größe" type="number" v-model="characterSchema.height"></inputField>
            <inputField label="Alter" type="number" v-model="characterSchema.age"></inputField>
        </div>
        <pageSplitter title="Primäreigenschaften">
            Hier kannst du die Primäreigenschaften deines Charakters angeben.
            <br>Protip: Wenn du schneller navigieren möchtest benutze die TAB-Taste um zum nächsten Feld zu springen.
        </pageSplitter>
        <div class="horizontal-container">
            <attField v-for="(v,k) in characterSchema.primary_attributes" :field-name="k" v-model="characterSchema.primary_attributes[k]"/>
        </div>
        <pageSplitter title="Sekundäreigenschaften" margin-top="72px">
            Hier kannst du die Sekundäreigenschaften deines Charakters angeben.
            <br>TAB-Taste funktioniert hier auch.
        </pageSplitter>
        <div class="horizontal-container">
            <attField v-for="(v,k) in characterSchema.secondary_attributes" :field-name="k" v-model="characterSchema.secondary_attributes[k].max"/>
        </div>
        <pageSplitter title="Talente" margin-top="72px">
            Hier kannst du die FWs für die Talente deines Charakters angeben.
        </pageSplitter>
    </div>
</template>


<style scoped>

.gapped{
    gap:32px
}

.vertically-gapped{
    margin-top: 16px;
    margin-bottom: 16px;
}

.main-content-container{
    min-width: 100%;
    min-height: 100vh;
}

.horizontal-container{
    min-width: 100%;
    display: flex;
    justify-content: space-between;
}

</style>