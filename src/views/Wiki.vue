<script setup lang="ts">
import InputField from '@/components/global/inputField.vue';
import FloatingHomeButton from '@/components/global/floatingHomeButton.vue';
import PageSplitter from '@/components/global/pageSplitter.vue';
import SearchableInputField from '@/components/global/searchableInputField.vue';
import EntryElement from '@/components/wiki/entryElement.vue';
import Button from '@/components/global/button.vue';
import type { WikiEntry } from '@/interfaces/wiki';
import type { AxiosInstance } from 'axios';
import { computed, inject, onMounted, ref, type ComputedRef, type Ref, watch } from 'vue';
import TagElement from '@/components/wiki/tagElement.vue';

const api: AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;

let entries: Ref<WikiEntry[]> = ref<WikiEntry[]>([]);

let titles: Ref<string[]> = ref<string[]>([]);
let categories: string[] = ['Spezies','Kulturen','Professionen','Sonderfertigkeiten','Vor- und Nachteile','Magie','Götterwirken','Rüstkammer','Bestiarium','Herbarium','Gifte und Krankheiten'];
let sub_categories: Ref<string[]> = ref<string[]>([]);

let current_title: Ref<string> = ref<string>('');
let current_category: Ref<string> = ref<string>('');
let current_sub_category: Ref<string> = ref<string>('');

let tags: Ref<string[]> = ref<string[]>([]);

let results_container = ref();

onMounted(() => {
    api.get('/wiki/titles').then((data: any) => {
        titles.value = data.data;
    })
})

function get_entries(tags: string[]){
    api.post('/wiki/search',{tags:tags}).then((data)=>{
        let recieved_entries: WikiEntry[] = data.data;
        entries.value = recieved_entries;
        (results_container.value as HTMLElement).scrollTop = 0;
    })
}

watch(current_category,()=>{
    if(current_category.value === ''){
        return [];
    }
    let result: string[] = [];
    api.get('/wiki/sub-categories',{params:{category:current_category.value}}).then((data)=>{
        result = data.data as string[];
        sub_categories.value = result;
        console.log(current_category.value);
        console.log(sub_categories.value);
    }).catch((error)=>{
        console.log(error);
    });
})

</script>


<template>
    <FloatingHomeButton></FloatingHomeButton>
    <div class="wiki-main-container">
        <div class="filter-container">
            <div class="subtitle-container">
                <h3>soulforger wiki</h3>
                <div></div>
            </div>
            <SearchableInputField 
                :options="titles" 
                :flex="0" 
                placeholder="Titel durchsuchen..."
                @completed="val=>{current_title = val; get_entries([val])}"
            ></SearchableInputField>
            <div class="subtitle-container">
                <h3 style="">Kategorische suche</h3>
                <div></div>
            </div>
            <SearchableInputField 
                :search-at="0" 
                :flex="0" 
                placeholder="Kategorie durchsuchen..."
                :options="categories"
                @completed="val=>current_category = val"
            ></SearchableInputField>
            <SearchableInputField 
                :search-at="0"
                :flex="0" 
                placeholder="Unterkategorie hinzufügen..."
                :options="sub_categories"
                @completed="val=>{current_sub_category=val; tags.push(val)}"
            ></SearchableInputField>
            <div class="tags-container">
                <TagElement v-for="tag in tags" @pressed="tags.splice(tags.indexOf(tag),1)" :icon="'fa-solid fa-delete-left'">{{ tag }}</TagElement>
            </div>
            <Button @pressed="entries = []; tags = []; current_category= ''; current_sub_category=''" :low-c-t-a="true">Filter zurücksetzen</Button>
            <Button @pressed="get_entries(tags)">Filter anwenden</Button>
            <p>
                <strong>WARNUNG: </strong>Die aktuelle Version des Wikis ist eine leistungsstarke Suchmaschine, die auf das ursprüngliche Wiki 
                aufgesetzt wurde. Die vollständige Implementierung des Wikis ist für ein zukünftiges Update geplant und hängt stark von der 
                Unterstützung der Community ab. <br><br>
                <em>Alle Inhalte sind Eigentum der "Ulisses Medien & Spiel Distribution GmbH".</em>
            </p>
        </div>
        <div class="results-container">
            <EntryElement v-for="entry in entries" :entry="entry"></EntryElement>
        </div>
    </div>
</template>


<style scoped>
em{
    margin-top: 16px;
    font-weight: 400;
    color: var(--accent2);
    font-size: 14px;
}

p{
    margin-top: 16px;
    font-weight: 300;
    color: var(--text0);
    font-size: 14px;
}

strong{
    font-weight: 600;
    color: var(--text4);
    font-size: 14px;
}

.tags-container{
    gap: 8px;
    padding: 8px;
    align-items: start;
    display: flex;
    flex-direction: column;
    height: 24vh;
    overflow-y: auto;
    width: 100%;
    border: solid 1px var(--accent0);
    border-radius: 8px;
    margin-bottom: 16px;
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

.filter-container{
    gap: 8px;
    flex: 2;
    padding: 16px;
    border-radius: 8px;
    border: solid 1px var(--bg5);
    display: flex;
    flex-direction: column;
    background-color: var(--bg1);
}

.results-container{
    gap: 8px;
    border: solid 1px var(--bg5);
    border-radius: 8px;
    flex: 4;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    min-height: 100%;
    background-color: var(--bg1);
    padding: 16px;
}

.wiki-main-container{
    gap: 16px;
    padding-left: 8vw;
    padding-right: 8vw;
    padding-top: 4vh;
    padding-bottom: 4vh;
    display: flex;
    height: 100vh;
    width: 100vw;
}

@media only screen and (max-width: 1200px) {
    .wiki-main-container{
        gap: 16px;
        padding-left: 8vw;
        padding-right: 8vw;
        padding-top: 4vh;
        padding-bottom: 4vh;
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
    }
}
</style>