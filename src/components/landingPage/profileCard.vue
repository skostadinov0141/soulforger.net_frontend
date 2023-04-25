<script setup lang="ts">

import Button from '../button.vue'

interface Props{
    row_span? : number,
    column_span? : number,
    profile_name? : string
}

const props = withDefaults(defineProps<Props>(),{
    row_span: 1,
    column_span: 2,
    profile_name: 'Profil'
})

</script>


<template>
    <div class="profile-card-container">
        <div style="display: flex; justify-self: stretch; gap: 16px;">
            <div class="profile-picture-container">
                <font-awesome-icon icon="fa-solid fa-user-secret" size="6x" style="margin-top: 16px; color: var(--accent0); filter: drop-shadow(4px 4px 3px rgba(0,0,0,0.5));"/>
            </div>
            <div class="profile-title-container">
                <h3>{{ profile_name }}</h3>
                <div class="splitter"></div>
            </div>
        </div>
        <div class="info-container">
            <p>Es sieht so aus, als hättest du dich noch nicht angemeldet. Um Soulforger zu benutzen, musst du angemeldet sein. Warum loggst du dich also nicht ein, bevor du loslegst? Falls du noch kein Profil erstellt hast, keine Sorge, es dauert nur eine Minute!</p>
            <div class="button-container">
                <Button :low-c-t-a="true">Profil erstellen</Button>
                <Button>Anmelden</Button>
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

.profile-title-container{
    flex: 1;
    justify-self: stretch;
    gap: 16px;
    display: flex;
    align-items: center;
}

h3{
    font-size: 24px;
    font-weight: 200;
    color: var(--text3);
}

.profile-picture-container{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100000px;
    border: solid 2px var(--bg3);
    width: 110px;
    height: 110px;
    overflow: hidden;
    background-color: var(--bg2);
}

img{
    object-fit: contain;
    height: 108px;
    width: 108px;
    margin-top: 16px;
    filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.5));
}

.profile-card-container{
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

</style>