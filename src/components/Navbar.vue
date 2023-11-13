<template>
  <!-- DESKTOP -->
  <v-navigation-drawer
    width="350"
    color="surface-lighten-1"
    v-model="drawer"
  >
    <v-list base-color="secondary">
      <v-list>
        <v-list-item title="" prepend-avatar="/logo.png">
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
      <v-list-group value="Autorenbereich">
        <template v-slot:activator="{ props }">
          <v-list-item
            title="Autorenbereich"
            prepend-icon="mdi-script-text"
            v-bind="props"
          />
        </template>
        <v-list-group value="Nirve">
          <template v-slot:activator="{ props }">
            <v-list-item
              title="Nirve"
              prepend-icon="mdi-dice-d20"
              v-bind="props"
            />
          </template>
          <v-list-item
            v-for="([title, icon, to], i) in authorNirve"
            :key="i"
            :title="title"
            :to="to"
            :prepend-icon="icon"
            :value="title"
          />
        </v-list-group>
      </v-list-group>
      <!-- <v-list-item
				:key="v4()"
				title="Nirve"
				:to="subItem.to"
				:prepend-icon="subItem.icon"
			/> -->
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

const windowSize = useWindowSize();

const drawer = ref<boolean>(true);

const authorNirve = ref([["Erstellen", "mdi-pencil", "/creator/nirve/"]]);
</script>
