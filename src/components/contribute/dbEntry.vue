<template>
    <button @click="emits('selected')" :class="get_status()">
        <strong>{{ name }}</strong>
        <p>Status: {{ get_status() }}</p>
    </button>
</template>

<script setup lang="ts">

interface Props{
    name:string
    status:number
}

const props = defineProps<Props>();
const emits = defineEmits(['selected']);

function get_status(){
    switch (props.status) {
        case 0:
            return 'default'

        case 1:
            return 'staged'

        case 2:
            return 'comitted'
    
        default:
            break;
    }
}

</script>

<style scoped>

strong{
    font-size: 16px;
    font-weight: 600;
}

button{
    gap: 4px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    background-color: var(--bg2);
    color: var(--text3);
    transition: 150ms;
}

button:hover{
    cursor: pointer;
    background-color: var(--bg3);
}

.default{
    border: solid 1px var(--bg5);
}

.staged{
    border: solid 1px var(--accent0);
}

.comitted{
    border: solid 1px green;
}

</style>