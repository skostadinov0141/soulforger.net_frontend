<template>
  <!-- DESKTOP -->
  <v-navigation-drawer v-model="drawer" width="350">
    <v-list>
      <NavbarLoggedInHeader />
      <v-divider />
      <v-list density="compact" :nav="true" color="secondary">
        <v-list-item
          :key="locations[0].id"
          :to="locations[0].path"
          :prepend-icon="locations[0].icon"
          :title="locations[0].title"
        />
        <v-list-group :value="locations[1].title">
          <template #activator="{ props }">
            <v-list-item
              prepend-icon="mdi-fountain-pen-tip"
              v-bind="props"
              :title="locations[1].title"
            />
          </template>
          <v-list-group
            v-for="subLocation in locations[1].subLocations"
            :key="subLocation.id"
          >
            <template #activator="{ props }">
              <v-list-item v-bind="props" :title="subLocation.title" />
            </template>
            <v-list-item
              v-for="subSubLocation in subLocation.subLocations"
              :key="subSubLocation.id"
              :to="subSubLocation.path"
              :title="subSubLocation.title"
              :prepend-icon="subSubLocation.icon"
            />
          </v-list-group>
        </v-list-group>
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
import NavbarLoggedInHeader from "@/components/navbar/NavbarLoggedInHeader.vue";

interface Location {
  id: string;
  title: string;
  path?: string;
  icon?: string;
  subLocations?: Location[];
}

const windowSize = useWindowSize();

const drawer = ref<boolean>(true);

const locations = ref<Location[]>([
  { id: v4(), title: "Dashboard", path: "/", icon: "mdi-home" },
  {
    id: v4(),
    title: "Autorenbereich",
    icon: "mdi-fountain-pen-tip",
    subLocations: [
      {
        id: v4(),
        title: "Nirve",
        subLocations: [
          {
            id: v4(),
            title: "Commons verwalten",
            path: "/nirve/manage-commons",
            icon: "mdi-cogs",
          },
          {
            id: v4(),
            title: "Tags verwalten",
            path: "/nirve/manage-tags",
            icon: "mdi-tag",
          },
          {
            id: v4(),
            title: "Gruppen verwalten",
            path: "/nirve/manage-groups",
            icon: "mdi-account-group",
          },
        ],
      },
    ],
  },
]);
</script>
