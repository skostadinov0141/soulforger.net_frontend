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
        <font-awesome-icon icon="fa-solid fa-link" size="2x" style="color: var(--accent1); filter: drop-shadow(4px 4px 2px rgba(0,0,0,0.5)); margin-right: 16px;" />
        <div class="entry-info">
            <a 
            ref="link"
            style="display: none;"
            :href="entry.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="splitter-a"></a>
            <h4>{{ entry.title }}</h4>
            <h5><strong>Pfad: </strong>{{ getPath() }}</h5>
        </div>
        <font-awesome-icon icon="fa-solid fa-arrow-right" size="2x" style="color: var(--bg4); margin-right: 16px;" />
    </button>
</template>


<style scoped>

.entry-info{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: start;
}

strong{
    font-weight: 600;
    color: var(--text2);
}

h4{
    font-weight: 600;
    color: var(--text3);
    font-size: 14px;
}

h5{
    margin-top: 4px;
    font-weight: 200;
    color: var(--text0);
    font-size: 14px;
}

.entry-element-container{
    align-items: center;
    cursor: pointer;
    display: flex;
    width: 100%;
    padding: 16px;
    background-color: var(--bg1);
    border: solid 1px var(--bg5);
    color: var(--text0);
    border-radius: 8px;
    transition: 150ms;
}

.entry-element-container:hover{
    background-color: var(--bg2);
    border: solid 1px var(--outline1);
}

</style>