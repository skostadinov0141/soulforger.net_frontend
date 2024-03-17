<template>
  <v-card
    rounded="lg"
    class="h-100"
  >
    <v-card-title>
      Über mich
    </v-card-title>
    <v-divider />
    <v-card-text>
      {{ userProfile.bio }}
    </v-card-text>
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
