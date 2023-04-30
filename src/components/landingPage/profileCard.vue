<script setup lang="ts">

import type { Profile } from '@/interfaces/profiles';
import Button from '../button.vue'
import InputField from '../inputField.vue';
import ProfilePicturePicker from '../landingPage/profilePicturePicker.vue';
import { faBiohazard } from '@fortawesome/free-solid-svg-icons';

interface Props{
    row_span? : number,
    column_span? : number,
    loading? : boolean,
    profile? : Profile,
    editing? : boolean
}

const props = withDefaults(defineProps<Props>(),{
    loading: false,
    row_span: 1,
    column_span: 2,
    profile: undefined,
    editing: false
})

const emits = defineEmits(['lowCtaPressed',
    'ctaPressed',
    'lowCtaPressedLoggedIn',
    'ctaPressedLoggedIn',
    'ctaPressedLoggedInEditing',
    'lowCtaPressedLoggedInEditing',
])

</script>


<template>
    <div v-if="loading === true" class="profile-card-container">
        <span style="align-self: center; margin-top: auto; margin-bottom: auto;" class="loader"></span>
    </div>
    <div v-else-if="profile" class="profile-card-container">
        <div style="display: flex; justify-self: stretch; gap: 16px;">
            <div v-if="editing === false" class="profile-picture-container">
                <font-awesome-icon v-if="profile.profile_picture === ''" icon="fa-solid fa-user-secret" size="6x" style="margin-top: 16px; color: var(--accent0); filter: drop-shadow(4px 4px 3px rgba(0,0,0,0.5));"/>
                <img v-else :src="profile.profile_picture" alt="Profile Picture" class="profile-picture">
            </div>
            <ProfilePicturePicker @image-uploaded="(image) => profile!.profile_picture = image" v-else ></ProfilePicturePicker>
            <div class="profile-title-container-logged-in">
                <h3 v-if="editing == false">{{ profile.display_name }}</h3>
                <InputField v-else label="Anzeigename" type="text" v-model="profile.display_name"></InputField>
                <div class="splitter-logged-in"></div>
                <small>Beigetreten am: {{ new Date(Date.parse(profile.joined_on)).toLocaleDateString() }}</small>
            </div>
        </div>
        <div class="info-container">
            <h4 v-if="editing == false">Über mich:</h4>
            <p v-if="editing == false">{{ profile.bio }}</p>
            <InputField v-else label="Über mich" type="text" :multiline="true" v-model="profile.bio"></InputField>
            <div class="button-container">
                <Button v-if="!editing" @pressed="emits('lowCtaPressedLoggedIn')" :low-c-t-a="true">Profil bearbeiten</Button>
                <Button v-if="editing" @pressed="emits('lowCtaPressedLoggedInEditing')" :low-c-t-a="true">Abbrechen</Button>
                <Button v-if="!editing" @pressed="emits('ctaPressedLoggedIn')">Anmelden</Button>
                <Button v-if="editing" @pressed="emits('ctaPressedLoggedInEditing')">Speichern</Button>
            </div>
        </div>
    </div>
    <div v-else class="profile-card-container">
        <div style="display: flex; justify-self: stretch; gap: 16px;">
            <div class="profile-picture-container">
                <font-awesome-icon icon="fa-solid fa-user-secret" size="6x" style="margin-top: 16px; color: var(--accent0); filter: drop-shadow(4px 4px 3px rgba(0,0,0,0.5));"/>
            </div>
            <div class="profile-title-container">
                <h3>Profil</h3>
                <div class="splitter"></div>
            </div>
        </div>
        <div class="info-container">
            <p>Es sieht so aus, als hättest du dich noch nicht angemeldet. Um Soulforger zu benutzen, musst du angemeldet sein. Warum loggst du dich also nicht ein, bevor du loslegst? Falls du noch kein Profil erstellt hast, keine Sorge, es dauert nur eine Minute!</p>
            <div class="button-container">
                <Button @pressed="emits('lowCtaPressed')" :low-c-t-a="true">Profil erstellen</Button>
                <Button @pressed="emits('ctaPressed')">Anmelden</Button>
            </div>
        </div>
    </div>
</template>


<style scoped>

.profile-picture{
    object-fit: cover;
    height: 100%;
    width: 100%;
    margin-top: 0px;
}

/* LOADER */
.loader {
    width: 48px;
    height: 48px;
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

.splitter-logged-in{
    height: 1px;
    align-self: stretch;
    background-color: var(--bg4);
}

.profile-title-container{
    flex: 1;
    justify-self: stretch;
    gap: 16px;
    display: flex;
    align-items: center;
}

.profile-title-container-logged-in{
    flex: 1;
    justify-self: stretch;
    align-self: center;
    gap: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: center;
}

.profile-title-container-logged-in small{
    color: var(--text0);
    font-weight: 300;
    font-size: 12px;
}

h3{
    font-size: 24px;
    font-weight: 200;
    color: var(--text3);
}

h4{
    font-size: 14px;
    font-weight: 600;
    color: var(--text2);
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