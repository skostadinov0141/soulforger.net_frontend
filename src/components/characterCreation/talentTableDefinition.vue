<template>
    <div class="container">
        <div class="name-container">
            Name
        </div>
        <div class="check-container">
            Probe
        </div>
        <div class="fw-container">
            <div style="padding-right: 16px;">
                FW
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.container{
    display: flex;
    padding: 8px;
    color: var(--accent0);
    border-bottom: solid 1px var(--accent0);
    border-top: solid 1px var(--accent0);
}

.name-container{
    flex: 7;
}

.check-container{
    flex:3;
}

.fw-container{
    flex: 1;
    text-align: end;
}

</style>