<template>
  <v-container>
    <v-row
      align="center"
      class="h-100 pa-4"
    >
      <v-col cols="12">
        <SearchCard
          ref="searchCardRef"
          @select-for-edit="(i:NirveCommon) => selectItemForEdit(i)"
        />
      </v-col>
      <v-col cols="12">
        <CreateElementCard
          ref="createCardRef"
          @submit-success="searchCardRef?.getItems()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { DeepReadonly, onMounted, ref } from "vue";
import SearchCard from "@/components/NirveCreator/SearchCard.vue";
import CreateElementCard from "@/components/NirveCreator/CreateElementCard.vue";
import { NirveCommon } from "@/functional_components/API/nirve-creator/nirve-common.class";

const searchCardRef = ref<InstanceType<typeof SearchCard>>();
const createCardRef = ref<InstanceType<typeof CreateElementCard>>();

function refresh() {
  searchCardRef.value!.getItems();
}

onMounted(() => {
  refresh();
});

function selectItemForEdit(item: NirveCommon) {
  console.log(item);
  createCardRef.value?.load(item);
}
</script>

<style scoped></style>
