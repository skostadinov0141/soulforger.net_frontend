<script setup lang="ts">
import InputField from '@/components/inputField.vue';
import FloatingHomeButton from '@/components/floatingHomeButton.vue';
import PageSplitter from '@/components/pageSplitter.vue';
import SearchableInputField from '@/components/searchableInputField.vue';
import EntryElement from '@/components/wiki/entryElement.vue';
import type { WikiEntry } from '@/interfaces/wiki';
import type { AxiosInstance } from 'axios';
import { computed, inject, onMounted, ref, type Ref } from 'vue';

const api: AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;

let options: Ref<string[]> = ref<string[]>([]);
let more_info: Ref<boolean> = ref<boolean>(false);
let entries: Ref<WikiEntry[]> = ref<WikiEntry[]>([]);
let current_category: Ref<string> = ref<string>('');

let results_container = ref();

onMounted(() => {
    api.get('/wiki/tags').then((data: any) => {
        options.value = data.data;
    })
})

function get_entries(tag: string[]){
    api.post('/wiki/search',{tags:tag}).then((data)=>{
        let recieved_entries: WikiEntry[] = data.data;
        entries.value = recieved_entries;
        (results_container.value as HTMLElement).scrollTop = 0;
    })
}

</script>


<template>
    <FloatingHomeButton></FloatingHomeButton>
    <div class="wiki-main-container">
        <div class="wiki-container">
            <div class="search-container">
                <div class="title-search-container">
                    <PageSplitter title="Wiki" margin-top="0px" margin-bottom="32px">
                        <p class="splitter-p" v-if="!more_info">Wenn du dir nicht sicher bist, wie das Wiki funktioniert, findest du unter diesem Text einen freundlichen orangefarbenen Knopf.</p>
                        <p v-if="more_info" class="splitter-p">
                            Ich bin froh, dass du dich entschieden hast, Soulforger's Wiki auszuprobieren! Lass uns ein paar Dinge klären, bevor du mit der 
                            Suche beginnst. <br><br>
                            <strong>Wie die Suchleiste funktioniert:</strong><br>
                            Die Suchleiste ist ein bisschen speziell, sie wurde im Interesse der Geschwindigkeit entwickelt und funktioniert 
                            vielleicht anders als andere Suchleisten, die du vielleicht kennst. Sobald der Suchbegriff offensichtlich wird, indem er nur mit 
                            einem einzigen Titel oder Tag im Wiki übereinstimmt, reagiert Soulforger, indem er den Rest des Suchbegriffs ausfüllt und dir die 
                            Ergebnisse liefert. <br><br>
                            <strong>Entwicklungsstand:</strong> <br>
                            Nun, da wir das geklärt haben, ist es erwähnenswert, dass das voll ausgestattete Wiki nicht implementiert ist 
                            und auch nicht in nächster Zeit implementiert wird. Die Geschwindigkeit, mit der das voll ausgestattete Wiki kommt, hängt von der 
                            Unterstützung der Community ab, genauer gesagt davon, wie viele Leute sich dazu entschließen, zu dem Projekt beizutragen, indem 
                            sie das Original-Wiki so übersetzen, dass Soulforger mit den Daten arbeiten kann. Das derzeitige Wiki ist eher eine leistungsfähige 
                            Suchmaschine, die dann auf die Original-Wiki-Seite weiterleitet.
                        </p>
                        <a href="#" @click="more_info = !more_info" class="splitter-a">{{ more_info? 'Info ausblenden' : 'Info anzeigen' }}</a>
                    </PageSplitter>
                    <div style="display: flex; gap: 8px;">
                        <SearchableInputField 
                            :flex="7"
                            @value-selected="(value) => get_entries([value])" 
                            :options="options"
                            placeholder="mind. einen Buchstaben eingeben">
                            Suche
                        </SearchableInputField>
                    </div>
                </div>
            </div>
            <div class="results-container" ref="results_container">
                <p v-if="entries.length === 0">Sobald du einen Suchbegriff eingegeben hast, werden deine Ergebnisse hier angezeigt.</p>
                <EntryElement v-for="entry in entries" :entry="entry"></EntryElement>
            </div>
        </div>
    </div>
</template>


<style scoped>

.title-search-container{
    position: relative;
}

.results-container{
    flex: 1;
    overflow-y: auto;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    border: solid 1px var(--accent0);
    border-radius: 8px;
}

.splitter-p{
    font-size: 14px;
    font-weight: 400;
    color: var(--text0);
}

strong{
    font-size: 14px;
    font-weight: 800;
    color: var(--text0);
}

.splitter-a{
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    color: var(--accent0);
}

.wiki-main-container{
    padding-left: 8vw;
    padding-right: 8vw;
    padding-top: 4vh;
    padding-bottom: 4vh;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    height: 100vh;
    width: 100vw;
}

.wiki-container{
    padding: 16px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    min-width: 100%;
    /* border: solid 1px var(--bg5); */
    border-radius: 8px;
    overflow: clip;
}

.search-container{
    display: flex;
    flex-direction: column;
    justify-content: stretch;
}

</style>