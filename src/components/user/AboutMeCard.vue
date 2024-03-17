<template>
  <v-card
    rounded="lg"
    class="h-100 d-flex flex-column"
  >
    <v-card-title>
      Über mich
    </v-card-title>
    <v-divider />
    <v-card-text
      :class="ownUser ? 'overflow-auto' : 'overflow-auto mb-4'"
      style="max-height: 250px"
    >
      {{ userProfile.bio }}
    </v-card-text>
    <v-divider v-if="ownUser" />
    <v-card-actions v-if="ownUser">
      <v-spacer />
      <v-btn
        color="secondary"
        variant="text"
        append-icon="mdi-pencil"
      >
        Bearbeiten
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { Profile } from '@/functional_components/API/user/profile.class'

const props = defineProps<{
  ownUser: boolean;
}>();
const userProfile = defineModel<Profile>("userProfile", { required: true });
</script>

<style scoped>

</style>
