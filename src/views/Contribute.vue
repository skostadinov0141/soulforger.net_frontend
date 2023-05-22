<template>
    <div class="contribute-container">
        <div class="db-entries-container">
            <div class="subtitle-container">
                <h3>datenbankeinträge</h3>
                <div></div>
            </div>
            <SearchableInputField 
            :search-at="0" 
            :flex="0" 
            placeholder="Kategorie durchsuchen..."
            :options="['Spezies','Kulturen','Professionen','Sonderfertigkeiten','Vorteil','Nachteile','Magie','Götterwirken']"
            v-model="search_category"
            @completed="(val:string)=>{search_category = val;getEntries([val])}"></SearchableInputField>
            <div class="entries-container">
                <DbEntry v-for="entry in selected_entries" @selected="setDefaults(entry)" :name="entry.title" :status="getEntryStatus(entry.title)"></DbEntry>
            </div>
        </div>
        <div class="contribution-panel-container">
            <PageSplitter title="Semantischer Teil" margin-top="0px" margin-bottom="0px">
                Dieser Teil wird verwendet, um die Semantik eines 
                bestimmten Eintrags zu beschreiben. Vereinfacht ausgedrückt ist dies der Teil, der später im Wiki oder in den Infoboxen 
                zum Eintrag angezeigt wird. Daher hat nichts von dem, was hier steht, Auswirkungen auf den programmatischen Teil eines 
                Eintrags. 
            </PageSplitter>
            <InputField 
            v-model="entry.title"
            label="Titel" 
            :disabled="true" 
            :flex="0"
            hint="Dieses Feld kann nicht bearbeitet werden, da die Daten schon vorhanden sind."></InputField>
            <InputField 
            v-model="entry.tags"
            label="Kategorien" 
            :disabled="true" 
            :flex="0"
            hint="Dieses Feld kann nicht bearbeitet werden, da die Daten schon vorhanden sind."></InputField>
            <InputField 
            v-model="entry.link"
            label="Link" 
            :disabled="true" 
            :flex="0"
            hint="Dieses Feld kann nicht bearbeitet werden, da die Daten schon vorhanden sind."></InputField>
            <SemanticSectionE 
            v-for="section in entry.semantics"
            @update-title="(val:string)=>section.title=val" 
            @update-content="(val:string)=>section.content=val"></SemanticSectionE>
            <div style="align-self: flex-end; margin-top: 4px;">
                <Button @pressed="addSection()">Abschnitt hinzufügen</Button>
            </div>
            <PageSplitter title="Framework Info" margin-top="24px" margin-bottom="0px">
                Dieser Teil beschreibt alle Dinge, die für soulforger's framework benötigt werden, um einen Eintrag zu beschreiben. 
                Diese Dinge können beinhalten, sind aber nicht beschränkt auf: AP-Kosten, Reichweiten, Wirkungsdauer, Zielkategorien, ASP-Kosten etc.
            </PageSplitter>
            <SearchableInputField 
            :search-at="0" 
            :flex="0" 
            placeholder="Eintragstyp..."
            :options="[
                'Spezies','Kultur','Profession','Sonderfertigkeit','Vorteil','Nachteil','Ritual','Zauber','Magische Handlung','Zauberlied',
                'Liturgie','Zeremonie'
            ]"
            v-model="framework_type"
            @completed="(val:string)=>{framework_type = val;}"></SearchableInputField>
            <SpeciesFramework v-if="framework_type==='Spezies'" :entry="entry"></SpeciesFramework>
            <PageSplitter title="Modifikationen" margin-top="24px" margin-bottom="0px">
                Hier kannst du alle Änderungen beschreiben, die beim Erwerb der in diesem Eintrag beschriebenen Sache wirksam werden sollen.
            </PageSplitter>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/global/button.vue';
import SearchableInputField from '@/components/global/searchableInputField.vue';
import InputField from '@/components/global/inputField.vue';
import PageSplitter from '@/components/global/pageSplitter.vue';
import DbEntry from '@/components/contribute/dbEntry.vue';
import SemanticSectionE from '@/components/contribute/semanticSection.vue';
import SpeciesFramework from '@/components/contribute/speciesFramework.vue';
import { type Ref, ref, inject, watch, reactive, ReactiveEffect } from 'vue';
import type { AxiosInstance } from 'axios';
import type { WikiEntry } from '@/interfaces/wiki';
import type { IDbEntry, 
    SemanticSection, 
    Species, 
    Culture, 
    Profession, 
    AdvantageDisadvantageSkill,
    SupernaturalAbility,
    MagicalSong
} from '@/interfaces/contribute';

const api: AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;

const search_category: Ref<string> = ref<string>('');
const selected_entries: Ref<WikiEntry[]> = ref<WikiEntry[]>([]);
const staged_entries: Ref<string[]> = ref<string[]>([]);
const comitted_entries: Ref<string[]> = ref<string[]>([]);
const framework_type: Ref<string> = ref<string>('');

const entry = reactive<IDbEntry>({
    title:'',
    tags:'',
    link:'',
    semantics:[{title:'',content:''}],
    framework_data: undefined
});

function getEntries(tags:string[]){
    api.get('/community/contribute/staged/unique-titles').then(response=>{
        staged_entries.value=response.data
        api.get('/community/contribute/comitted/unique-titles').then(response=>{
            comitted_entries.value=response.data
            api.post('/wiki/search',{tags:tags}).then(response => {
                selected_entries.value = response.data;
            });
        });
    });
}

function getEntryStatus(title:string): number{
    if(staged_entries.value.find(element=>element === title)){
        return 1
    }
    if(comitted_entries.value.find(element=>element === title)){
        return 2
    }
    return 0;
}

function addSection(){
    entry.semantics.push({title:'',content:''});
}

function setDefaults(wikiEntry: WikiEntry){
    resetEntry();
    entry.title = wikiEntry.title;
    entry.tags = wikiEntry.category_path.join(', ');
    entry.link = wikiEntry.link;
}

function resetEntry(){
    entry.title = '';
    entry.tags = '';
    entry.link = '';
    entry.semantics = [{title:'',content:''}];
    entry.framework_data = undefined;
    framework_type.value = '';
}

watch(framework_type,()=>{
    switch (framework_type.value) {
        case 'Spezies':
            entry.framework_data = <Species>{
                category:'species',
                requirements:[],
                modifiers:[],
                ap_cost:0,
                lep_base:0,
                sk_base:0,
                zk_base:0,
                gs_base:0,
                usual_cultures:[],
                highly_recommended_advantages:[],
                highly_recommended_disadvantages:[],
                usual_advantages:[],
                usual_disadvantages:[],
                unusual_advantages:[],
                unusual_disadvantages:[]
            }
            break;

        case 'Kultur':
            entry.framework_data = <Culture>{
                category:'culture',
                requirements:[],
                modifiers:[],
                language:[],
                written_language:[],
                social_status:'',
                usual_professions:[],
                usual_advantages:[],
                usual_disadvantages:[],
                unusual_advantages:[],
                unusual_disadvantages:[],
                usual_talents:[],
                unusual_talents:[]
            }
            break;
    
        case 'Profession':
            entry.framework_data = <Profession>{
                category:'profession',
                requirements:[],
                modifiers:[],
                ap_cost:0,
                language_ap_bank:0,
                usual_advantages:[],
                usual_disadvantages:[],
                unusual_advantages:[],
                unusual_disadvantages:[]
            }
            break;

        case 'Sonderfertigkeit':
            entry.framework_data = <AdvantageDisadvantageSkill>{
                category:'skill',
                requirements:[],
                modifiers:[],
                ap_mod:0
            }
            break;

        case 'Vorteil':
            entry.framework_data = <AdvantageDisadvantageSkill>{
                category:'advantage',
                requirements:[],
                modifiers:[],
                ap_mod:0
            }
            break;

        case 'Nachteil':
            entry.framework_data = <AdvantageDisadvantageSkill>{
                category:'disadvantage',
                requirements:[],
                modifiers:[],
                ap_mod:0
            }
            break;

        case 'Ritual':
            entry.framework_data = <SupernaturalAbility>{
                category:'ritual',
                requirements:[],
                modifiers:[],
                check:['MU','MU','MU'],
                ignore_check:false,
                difficulty_modifier:undefined,
                asp_cost:undefined,
                kap_cost:undefined,
                ticking_cost:false,
                cost_multiplication:false,
                leveling_factor:'',
                extensions:[]
            }
            break;

        case 'Zauber':
            entry.framework_data = <SupernaturalAbility>{
                category:'spell',
                requirements:[],
                modifiers:[],
                check:['MU','MU','MU'],
                ignore_check:false,
                difficulty_modifier:undefined,
                asp_cost:undefined,
                kap_cost:undefined,
                ticking_cost:false,
                cost_multiplication:false,
                leveling_factor:'',
                extensions:[]
            }
            break;

        case 'Magische Handlung':
            entry.framework_data = <SupernaturalAbility>{
                category:'magical_action',
                requirements:[],
                modifiers:[],
                check:['MU','MU','MU'],
                ignore_check:false,
                difficulty_modifier:undefined,
                asp_cost:undefined,
                kap_cost:undefined,
                ticking_cost:false,
                cost_multiplication:false,
                leveling_factor:'',
                extensions:[]
            }
            break;

        case 'Zauberlied':
            entry.framework_data = <MagicalSong>{
                category:'magic_song',
                requirements:[],
                modifiers:[],
                check:['MU','MU','MU'],
                ignore_check:false,
                difficulty_modifier:undefined,
                asp_cost:undefined,
                kap_cost:undefined,
                ticking_cost:false,
                cost_multiplication:false,
                leveling_factor:'',
                extensions:[],
                base_talent:[]
            }
            break;

        case 'Liturgie':
            entry.framework_data = <SupernaturalAbility>{
                category:'liturgy',
                requirements:[],
                modifiers:[],
                check:['MU','MU','MU'],
                ignore_check:false,
                difficulty_modifier:undefined,
                asp_cost:undefined,
                kap_cost:undefined,
                ticking_cost:false,
                cost_multiplication:false,
                leveling_factor:'',
                extensions:[],
            }
            break;

        case 'Zeremonie':
            entry.framework_data = <SupernaturalAbility>{
                category:'ceremony',
                requirements:[],
                modifiers:[],
                check:['MU','MU','MU'],
                ignore_check:false,
                difficulty_modifier:undefined,
                asp_cost:undefined,
                kap_cost:undefined,
                ticking_cost:false,
                cost_multiplication:false,
                leveling_factor:'',
                extensions:[],
            }
            break;

        default:
            entry.framework_data = undefined;
            break;
    }
})

</script>

<style scoped>

.entries-container{
    gap: 8px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.contribution-panel-container{
    gap: 8px;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: solid 1px var(--bg5);
    background-color: var(--bg1);
    flex: 3;
}

.db-entries-container{
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border-radius: 8px;
    border: solid 1px var(--bg5);
    background-color: var(--bg1);
    flex: 1;
}

.contribute-container{
    gap: 16px;
    padding: 4vh 4vw;
    display: flex;
    min-width: 100vw;
    height: 100vh;
}

.subtitle-container > div{
    height: 1px;
    background-color: var(--bg3);
    flex: 1;
}
.subtitle-container > h3{
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    color: var(--text4);
}

.subtitle-container{
    gap: 8px;
    display: flex;
    align-items: center;
}

</style>