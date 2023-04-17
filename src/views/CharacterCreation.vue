<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import axios from 'axios';

import type { DSACharacter } from '../interfaces/characterschema';
import attField from '../components/characterCreation/attField.vue';
import pageSplitter from '../components/pageSplitter.vue';
import inputField from '../components/inputField.vue';
import talentEditorElement from '../components/characterCreation/talentEditorElement.vue';
import talentTableDefinition from '../components/characterCreation/talentTableDefinition.vue';

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
            <inputField label="Name" v-model="characterSchema.name" hint="hello there mr bond"></inputField>
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
            Hier kannst du die FWs für die Talente deines Charakters angeben. Wenn du suchen willst kann ich dir Strg+F empfehlen.
            <br>TAB-Taste funktioniert hier auch.
        </pageSplitter>
        <div class="horizontal-container gapped">
            <div class="vertical-container gapped-vertical">
                <div class="vertical-container gapped-vertical">
                    <h4 class="talent-splitter">Körpertalente</h4>
                    <talentTableDefinition></talentTableDefinition>
                    <talentEditorElement
                    v-for="e in characterSchema.talents.filter((item) => { return item.category === 'Körpertalente'; })"
                    :name="e.name"
                    :fw="e.fw"
                    :att1-name="e.att_1"
                    :att1-value="characterSchema.primary_attributes[e.att_1]"
                    :att2-name="e.att_2"
                    :att2-value="characterSchema.primary_attributes[e.att_2]"
                    :att3-name="e.att_3"
                    :att3-value="characterSchema.primary_attributes[e.att_3]"
                    v-model="e.fw"
                    ></talentEditorElement>
                </div>
                <div class="vertical-container gapped-vertical">
                    <h4 class="talent-splitter">Gesellschaftstalente</h4>
                    <talentTableDefinition></talentTableDefinition>
                    <talentEditorElement
                    v-for="e in characterSchema.talents.filter((item) => { return item.category === 'Gesellschaftstalente'; })"
                    :name="e.name"
                    :fw="e.fw"
                    :att1-name="e.att_1"
                    :att1-value="characterSchema.primary_attributes[e.att_1]"
                    :att2-name="e.att_2"
                    :att2-value="characterSchema.primary_attributes[e.att_2]"
                    :att3-name="e.att_3"
                    :att3-value="characterSchema.primary_attributes[e.att_3]"
                    v-model="e.fw"
                    ></talentEditorElement>
                </div>
                <div class="vertical-container gapped-vertical">
                    <h4 class="talent-splitter">Naturtalente</h4>
                    <talentTableDefinition></talentTableDefinition>
                    <talentEditorElement
                    v-for="e in characterSchema.talents.filter((item) => { return item.category === 'Naturtalente'; })"
                    :name="e.name"
                    :fw="e.fw"
                    :att1-name="e.att_1"
                    :att1-value="characterSchema.primary_attributes[e.att_1]"
                    :att2-name="e.att_2"
                    :att2-value="characterSchema.primary_attributes[e.att_2]"
                    :att3-name="e.att_3"
                    :att3-value="characterSchema.primary_attributes[e.att_3]"
                    v-model="e.fw"
                    ></talentEditorElement>
                </div>
            </div>
            <div class="vertical-container gapped-vertical">
                <div class="vertical-container gapped-vertical">
                    <h4 class="talent-splitter">Wissenstalente</h4>
                    <talentTableDefinition></talentTableDefinition>
                    <talentEditorElement
                    v-for="e in characterSchema.talents.filter((item) => { return item.category === 'Wissenstalente'; })"
                    :name="e.name"
                    :fw="e.fw"
                    :att1-name="e.att_1"
                    :att1-value="characterSchema.primary_attributes[e.att_1]"
                    :att2-name="e.att_2"
                    :att2-value="characterSchema.primary_attributes[e.att_2]"
                    :att3-name="e.att_3"
                    :att3-value="characterSchema.primary_attributes[e.att_3]"
                    v-model="e.fw"
                    ></talentEditorElement>
                </div>
                <div class="vertical-container gapped-vertical">
                    <h4 class="talent-splitter">Handwerkstalente</h4>
                    <talentTableDefinition></talentTableDefinition>
                    <talentEditorElement
                    v-for="e in characterSchema.talents.filter((item) => { return item.category === 'Handwerkstalente'; })"
                    :name="e.name"
                    :fw="e.fw"
                    :att1-name="e.att_1"
                    :att1-value="characterSchema.primary_attributes[e.att_1]"
                    :att2-name="e.att_2"
                    :att2-value="characterSchema.primary_attributes[e.att_2]"
                    :att3-name="e.att_3"
                    :att3-value="characterSchema.primary_attributes[e.att_3]"
                    v-model="e.fw"
                    ></talentEditorElement>
                </div>
                <div style="flex: 1;"></div>
            </div>
        </div>
        <pageSplitter title="Kampffähigkeiten und Waffen" margin-top="72px">
            Hier kannst du deine Kampffähigkeiten und deine Waffen eintragen. 
            <br>TAB-Taste funktioniert im Waffen Teil bedingt gut da man da immer mal wieder zur ersten Elemente zurückspringen muss was man mit der TAB-Taste nicht machen kann. Durch die Kampffähigkeiten kannst du aber ohne Probleme springen!
        </pageSplitter>
    </div>
</template>


<style scoped>

.talent-splitter{
    display: flex;
    height: 42px;
    align-items: center;
    font-weight: 600;
}

.gapped{
    gap:32px
}

.gapped-vertical{
    gap:8px;
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
    max-width: 100%;
    display: flex;
    justify-content: space-between;
}

.vertical-container{
    flex: 1;
    display: flex;
    flex-direction: column;
}

</style>