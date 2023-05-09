<script setup lang="ts">
import Button from '../global/button.vue';

interface Props{
    row_span? : number,
    column_span? : number,
    icon : string,
    lowCtaEnabled? : boolean;
    ctaEnabled? : boolean;
}

const props = withDefaults(defineProps<Props>(),{
    row_span: 1,
    column_span: 2,
    lowCtaEnabled: true,
    ctaEnabled: false
})

const emits = defineEmits(['lowCtaPressed','ctaPressed',])

</script>


<template>
    <div class="function-card-container">
        <font-awesome-icon :icon="icon" size="5x" style="color: var(--accent1); filter: drop-shadow(4px 4px 2px rgba(0,0,0,0.5));" />
        <div class="function-title-container">
            <div class="splitter"></div>
            <h3><slot name="function-title"></slot></h3>
            <div class="splitter"></div>
        </div>
        <div class="info-container">
            <p><slot name="function-description"></slot></p>
            <div class="button-container">
                <Button :enabled="lowCtaEnabled" @pressed="emits('lowCtaPressed')" :low-c-t-a="true"><slot name="function-low-button"></slot></Button>
                <Button :enabled="ctaEnabled" @pressed="emits('ctaPressed')"><slot name="function-button"></slot></Button>
            </div>
        </div>
    </div>
</template>


<style scoped>

.button-container{
    gap: 8px;
    display: flex;
    margin-top: auto;
    align-self: flex-end;
}

.info-container{
    height: 100%;
    display: flex;
    flex-direction: column;
    grid-row: span 1;
    grid-column: span 4;
    font-weight: 200;
    font-size: 12px;
    color: var(--text0);
}

.splitter{
    flex: 1;
    height: 1px;
    background-color: var(--bg4);
}

.function-title-container{
    gap: 16px;
    display: flex;
    grid-row: span 1;
    grid-column: span 3;
    align-items: center;
}

h3{
    font-size: 16px;
    font-weight: 400;
    color: var(--text3);
}

.function-card-container{
    grid-row: span v-bind(row_span);
    grid-column: span v-bind(column_span);
    background-color: var(--bg1);
    outline: solid 1px var(--bg3);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

@media only screen and (max-width: 1000px) {
    .function-card-container{
        min-height: 60vh;
        grid-row: span v-bind(row_span);
        grid-column: span v-bind(column_span);
        background-color: var(--bg1);
        outline: solid 1px var(--bg3);
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
}

</style>