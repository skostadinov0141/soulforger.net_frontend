<template>
    <div class="subtitle-container">
        <h3><slot></slot></h3>
        <div></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
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
</style>