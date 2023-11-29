<template>
  <!-- DESKTOP -->
  <v-navigation-drawer v-model="drawer" width="350">
    <v-list base-color="secondary">
      <v-list>
        <v-list-item prepend-avatar="/logo.png">
          <v-list-item-action style="display: flex; gap: 8px">
            <v-btn size="small" variant="text" to="/register">
              Registrieren
            </v-btn>
            <v-btn size="small" color="primary" variant="elevated" to="/login">
              Anmelden
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list density="compact" :nav="true">
        <v-list-item
          v-for="location in locations"
          :key="location.id"
          :to="location.path"
          :prepend-icon="location.icon"
          :title="location.title"
        />
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar v-if="windowSize.width.value < 1280" class="d-xs-flex d-lg-none">
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
    <template #prepend>
      <v-app-bar-nav-icon
        color="secondary"
        class="d-lg-none d-xl-none d-xxl-none"
        @click="drawer = !drawer"
      />
    </template>
  </v-app-bar>
  <v-main>
    <slot />
  </v-main>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
    path: "/creator/nirve",
    icon: "mdi-fountain-pen-tip",
  },
]);
</script>
