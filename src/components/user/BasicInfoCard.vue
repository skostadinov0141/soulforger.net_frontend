<template>
  <v-card
    :title="userProfile.displayName"
    :subtitle="new Date(userProfile.createdAt).toLocaleString()"
    class="py-1"
    rounded="lg"
  >
    <template #subtitle>
      <p class="text-secondary">
        Beigetreten am: {{ new Date(userProfile.createdAt).toLocaleString() }}
        <br>
        Lieblingsregelwerk: {{ userProfile.favoriteRulebook ?? "Alle" }}
        <br>
        Präferierte Sprache: {{ userProfile.preferredLanguage ?? "Deutsch" }}
      </p>
      <div class="d-flex flex-wrap mt-2">
        <v-chip
          v-for="role in 10"
          :key="role"
          size="small"
          class="ma-1"
          variant="flat"
          color="primary"
        >
          Badge
        </v-chip>
      </div>
    </template>
    <template #prepend>
      <v-avatar
        size="160"
        :image="userProfile.avatarUrl"
      />
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { Profile } from '@/functional_components/API/profile/profile.class'

const props = defineProps<{
  userProfile: Profile;
}>();
</script>

<style scoped>

</style>
