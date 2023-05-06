<template>
    <button @click="emit('pressed')">
        <p><slot></slot></p>
        <font-awesome-icon :icon="icon" size="lg" style="color: rgb(196, 85, 77);" />
    </button>
</template>

<script setup lang="ts">

interface Props{
    icon:string
}

const porps = defineProps<Props>();
const emit = defineEmits(['pressed'])

</script>

<style scoped>
p{
    margin-right: 8px;
}

button{
    border-radius: 8px;
    display: flex;
    border: none;
    padding: 8px;
    background-color: var(--bg2);
    font-size: 14px;
    font-weight: 300;
    color: var(--text4);
    transition: 150ms;
}

button:hover{
    background-color: var(--bg3);
    cursor: pointer;
}
</style>