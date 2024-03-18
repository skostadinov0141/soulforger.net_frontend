<script setup lang="ts">
import { useApiStore } from "@/store/api";

const appStore = useApiStore();

async function test() {
  // let constructedQuery = new AndQuery([
  // 	new OrQuery([new EqualsQuery("owner")]),
  // 	new ExistQuery(true),
  // ]);
  // console.log(constructedQuery.parse());
}
</script>

<template>
  <div class="input-container">
    <v-btn
      variant="flat"
      color="primary"
      @click="test"
    >
      TEST
    </v-btn>
  </div>
</template>
