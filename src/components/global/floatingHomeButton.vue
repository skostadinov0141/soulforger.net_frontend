<template>
    <button @click="router.push({path:'/'})">
        <font-awesome-icon :icon="['fas', 'house']" size="2x" style="color: var(--text0); filter: drop-shadow(4px 4px 2px rgba(0,0,0,0.5));" />
    </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


const router = useRouter();

</script>

<style scoped>
button{
    filter: drop-shadow(4px 4px 2px rgba(0,0,0,0.5));
    cursor: pointer;
    border: none;
    position: fixed;
    background-color: var(--bg4);
    padding: 10px 24px 24px 10px;
    border-bottom-right-radius: 100000px;
    z-index: 10000;
}

button:hover{
    background-color: var(--bg5);
}
</style>