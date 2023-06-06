<script setup lang="ts">

interface Props{
    title: string,
    marginTop?: string,
    marginBottom?: string
}

const props = withDefaults(defineProps<Props>(),{
    marginTop: '56px',
    marginBottom: '32px',
})

</script>


<template>
    <div class="container">
        <h3>{{ title }}</h3>
        <div class="splitter"></div>
        <p><slot></slot></p>
    </div>
</template>


<style scoped>

p{
    font-size: 14px;
    font-weight: 300;
    color: var(--text0);
    margin-top: 8px;
    margin-bottom: v-bind(marginBottom);
}

h3{
    color: var(--text3);
    font-size: 20px;
    font-weight: 300;
    text-transform: uppercase;
    margin-top: v-bind(marginTop);
    margin-bottom: 4px;
}

.container{
    min-width: 100%;
    display: flex;
    flex-direction: column;
}

.splitter{
    height: 1px;
    background-color: var(--bg2);
}
</style>