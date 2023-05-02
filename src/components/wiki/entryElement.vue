<script setup lang="ts">
import type { WikiEntry } from '@/interfaces/wiki';
import { ref } from 'vue';


interface Props{
    entry: WikiEntry
}

const props = withDefaults(defineProps<Props>(),{

})

function getPath():string{
    let res:string = props.entry.category_path.filter((element:string) => {
        if(element !== props.entry.title){return element;};
    }).join(' > ');
    console.log(res);
    return res;
}

let link = ref();

</script>


<template>
    <button class="entry-element-container" @click="link.click()">
        <a 
        ref="link"
        style="display: none;"
        :href="entry.link" 
        target="_blank" 
        rel="noopener noreferrer"
        class="splitter-a"></a>
        <h4>{{ entry.title }}</h4>
        <h5>Pfad: {{ getPath() }}</h5>
    </button>
</template>


<style scoped>

.entry-element-container{
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 16px;
    background-color: var(--bg1);
    border: solid 1px var(--bg5);
    color: var(--text0);
}

</style>