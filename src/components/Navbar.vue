<template>
    <!-- MOBILE -->
    <v-app-bar elevation="4" color="surface-lighten-2">
        <v-img 
            src="/logo.png"
            class="mx-1"
            max-height="32"
            max-width="32"
            contain
        />
        <v-app-bar-title 
            align-center
            class="text-uppercase font-weight-light text-secondary mx-2 pt-1 text-h7"
        >
            soulforger
        </v-app-bar-title>
        <template v-slot:prepend>
            <v-app-bar-nav-icon 
                color="secondary" 
                @click="drawer = !drawer" 
                class="d-lg-none d-xl-none d-xxl-none"   
            />
        </template>
    </v-app-bar>
    <v-navigation-drawer
        color="surface-lighten-1"
        temporary
        v-model="drawer"
    >
        <v-list>
            <v-list-item
                v-for="item in items"
                base-color="secondary"
                :title="item.title"
                :append-icon="item.icon"
                :value="item.to"
            />
        </v-list>
    </v-navigation-drawer>
    <!-- DESKTOP -->
    <v-navigation-drawer
        color="surface-lighten-1"
        rail
        expand-on-hover
    >
        <v-list>
            <v-list-item
                v-for="item in items"
                base-color="secondary"
                :title="item.title"
                :prepend-icon="item.icon"
                :value="item.to"
            />
        </v-list>
    </v-navigation-drawer>
    <v-main>
        <slot></slot>
    </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref<boolean>(false);

const items = ref([
    {
        title: 'Home',
        icon: 'mdi-home',
        to: '/'
    },
    {
        title: 'About',
        icon: 'mdi-information',
        to: '/about'
    },
    {
        title: 'Contact',
        icon: 'mdi-email',
        to: '/contact'
    }
])

</script>
