<template>
    <div class="framework-data-container">
        <div class="number-data">
            <InputField type="number" label="AP-Kosten" v-model="(entry.framework_data as Species).ap_cost"></InputField>
            <InputField type="number" label="LeP-Grundwert" v-model="(entry.framework_data as Species).lep_base"></InputField>
            <InputField type="number" label="SK-Grundwert" v-model="(entry.framework_data as Species).sk_base"></InputField>
            <InputField type="number" label="ZK-Grundwert" v-model="(entry.framework_data as Species).zk_base"></InputField>
            <InputField type="number" label="GS-Grundwert" v-model="(entry.framework_data as Species).gs_base"></InputField>
        </div>
        <ListSelector :options="['test','test1']"></ListSelector>
    </div>
</template>

<script setup lang="ts">
import type { IDbEntry, Species } from '@/interfaces/contribute';
import { onMounted, watch } from 'vue';
import InputField from '../global/inputField.vue';
import ListSelector from '../global/listSelector.vue';

interface Props{
    entry:IDbEntry
}

const props = defineProps<Props>();

watch(props.entry,()=>{
    console.log(props.entry);
})

</script>

<style scoped>
.number-data{
    display: flex;
    gap: 8px;
}

.framework-data-container{
    gap: 8px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
}
</style>