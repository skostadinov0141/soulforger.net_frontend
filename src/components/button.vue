<script setup lang="ts">
import { watch, type Ref, toRef } from 'vue';


interface Props{
    enabled?: boolean,
    loading?: boolean
}

const emits = defineEmits(['pressed']);
const props = withDefaults(defineProps<Props>(),{
    enabled: true,
    loading: false
});

</script>


<template>
    <div>
        <button :enabled="enabled" @click="emits('pressed')">
            <slot v-if="!loading"></slot>
            <span v-else class="loader"></span>
        </button>
    </div>
</template>


<style scoped>

button{
    width: 100%;
    padding: 8px 16px;
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    cursor: pointer;
    background-color: var(--accent0);
    color: var(--text3);
    transition: 150ms;
}

button:hover{
    background-color: var(--accent2);
}


/* LOADER */
.loader {
    width: 16px;
    height: 16px;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 

</style>