<script setup lang="ts">
import { watch, type Ref, toRef } from 'vue';


interface Props{
    enabled?: boolean,
    loading?: boolean,
    lowCTA?: boolean
}

const emits = defineEmits(['pressed']);
const props = withDefaults(defineProps<Props>(),{
    enabled: true,
    loading: false,
    lowCTA: false
});

</script>


<template>
    <div>
        <button 
        :class="(lowCTA)? 'low-CTA' : undefined" 
        :disabled="!enabled" 
        @click="emits('pressed')"
        :title="(!enabled)? 'Work in progress' : undefined">
            <slot v-if="!loading"></slot>
            <span v-else class="loader"></span>
            <img v-if="!loading" src="../assets/images/arrow.svg" alt="arrow">
        </button>
    </div>
</template>


<style scoped>

.low-CTA{
    background-color: rgba(255, 255, 255, 0);
}

.low-CTA:hover{
    background-color: rgba(255, 255, 255, 0.1);
}

.low-CTA:disabled{
    background-color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
}

button{
    gap: 4px;
    display: flex;
    align-content: center;
    width: 100%;
    padding: 8px 16px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: var(--accent0);
    color: var(--text3);
    transition: 150ms;
}

button:hover{
    background-color: var(--accent2);
}

button:disabled{
    background-color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
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