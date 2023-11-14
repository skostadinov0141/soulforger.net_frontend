<template>
  <!-- DESKTOP -->
  <v-navigation-drawer width="350" color="surface-lighten-1" v-model="drawer">
    <v-list base-color="secondary" bg-color="surface-lighten-1">
      <v-list>
        <v-list-item
          color="surface-lighten-1"
          title=""
          prepend-avatar="/logo.png"
        >
          <v-list-item-action style="display: flex; gap: 8px">
            <v-btn size="small" variant="plain" to="/register">
              Registrieren
            </v-btn>
            <v-btn
              size="small"
              color="indigo-darken-3"
              variant="elevated"
              to="/login"
            >
              Anmelden
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list base-color="secondary" density="compact" nav>
        <v-list-item
          color="surface-lighten-1"
          v-for="location in locations"
          :key="location.id"
          :to="location.path"
          :prepend-icon="location.icon"
          :title="location.title"
        >
        </v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar class="d-xs-flex d-lg-none" v-if="windowSize.width.value < 1280">
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
  <v-main>
    <slot></slot>
  </v-main>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { useWindowSize } from "vue-window-size";
import { v4 } from "uuid";

interface Location {
  id: string;
  title: string;
  path: string;
  icon: string;
}

const windowSize = useWindowSize();

const drawer = ref<boolean>(true);

const locations = ref<Location[]>([
  { id: v4(), title: "Dashboard", path: "/", icon: "mdi-home" },
  {
    id: v4(),
    title: "Autorenbereich",
    path: "/",
    icon: "mdi-fountain-pen-tip",
  },
]);
</script>
