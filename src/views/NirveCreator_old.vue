<template>
  <v-row justify="center">
    <CreateElementCard
      ref="createCardRef"
      :opened="createDialogOpen"
      @submit-success="searchCardRef?.getItems()"
    />
  </v-row>
  <v-container>
    <v-row align="center" class="h-100 pa-4">
      <v-col cols="12">
        <SearchCard
          ref="searchCardRef"
          @create="createCardRef?.openDialog()"
          @select-for-edit="(i:NirveCommon) => selectItemForEdit(i)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SearchCard from "@/components/Nirve/SearchCard_old.vue";
import CreateElementCard from "@/components/Nirve/CreateElementCard_old.vue";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";

const searchCardRef = ref<InstanceType<typeof SearchCard>>();
const createCardRef = ref<InstanceType<typeof CreateElementCard>>();
const createDialogOpen = ref<boolean>(false);

function refresh() {
  searchCardRef.value!.getItems();
}

onMounted(() => {
  refresh();
});

function selectItemForEdit(item: NirveCommon) {
  createCardRef.value?.openDialog(item);
  createCardRef.value?.load(item);
}
</script>

<style scoped></style>
