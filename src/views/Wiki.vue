<script setup lang="ts">
import InputField from '@/components/inputField.vue';
import PageSplitter from '@/components/pageSplitter.vue';
import SearchableInputField from '@/components/wiki/searchableInputField.vue';
import type { WikiEntry } from '@/interfaces/wiki';
import type { AxiosInstance } from 'axios';
import { inject, onMounted, ref, type Ref } from 'vue';

const api: AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;

let options: Ref<string[]> = ref<string[]>([]);
let more_info: Ref<boolean> = ref<boolean>(false);
let entries: Ref<WikiEntry[]> = ref<WikiEntry[]>([]);

onMounted(() => {
    api.get('/wiki/tags').then((data: any) => {
        options.value = data.data;
    })
})

function get_entries(tag: string[]){
    api.post('/wiki/search',{tags:tag}).then((data)=>{
        let recieved_entries: WikiEntry[] = data.data;
        entries.value = recieved_entries;
    })
}

</script>


<template>
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
                    <SearchableInputField @value-selected="(value) => get_entries([value])" :options="options">
                        Suchen:
                    </SearchableInputField>
                </div>
                <!-- <a href="https://ulisses-regelwiki.de/Best_Bornlaender.html" target="_blank" rel="noopener noreferrer">WordPress Homepage</a> -->
            </div>
            <div class="results-container">
                <a 
                v-for="entry in entries" 
                :href="entry.link" 
                target="_blank" 
                rel="noopener noreferrer"
                class="splitter-a">{{ entry.title }}</a>
            </div>
        </div>
    </div>
</template>


<style scoped>

.title-search-container{
    position: relative;
}

.results-container{
    display: flex;
    flex-direction: column;
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

.results-container{
    flex: 1;
    overflow-y: auto;
}

</style>