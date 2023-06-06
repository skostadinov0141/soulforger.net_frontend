<template>
    <div class="framework-data-container">
        <Subtitle>Grundwerte</Subtitle>
        <div class="number-data">
            <InputField type="number" label="AP-Kosten" v-model="(entry.framework_data as Species).ap_cost"></InputField>
            <InputField type="number" label="LeP-Grundwert" v-model="(entry.framework_data as Species).lep_base"></InputField>
            <InputField type="number" label="SK-Grundwert" v-model="(entry.framework_data as Species).sk_base"></InputField>
            <InputField type="number" label="ZK-Grundwert" v-model="(entry.framework_data as Species).zk_base"></InputField>
            <InputField type="number" label="GS-Grundwert" v-model="(entry.framework_data as Species).gs_base"></InputField>
        </div>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).usual_cultures.push(val)"
        @value-removed="val=>(entry.framework_data as Species).usual_cultures.splice((entry.framework_data as Species).usual_cultures.indexOf(val),1)">
            Übliche Kulturen
        </ListSelector>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).highly_recommended_advantages.push(val)"
        @value-removed="val=>(entry.framework_data as Species).highly_recommended_advantages.splice((entry.framework_data as Species).highly_recommended_advantages.indexOf(val),1)">
            Dringend empfohlene Vorteile
        </ListSelector>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).highly_recommended_disadvantages.push(val)"
        @value-removed="val=>(entry.framework_data as Species).highly_recommended_disadvantages.splice((entry.framework_data as Species).highly_recommended_disadvantages.indexOf(val),1)">
            Dringend empfohlene Nachteile
        </ListSelector>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).usual_advantages.push(val)"
        @value-removed="val=>(entry.framework_data as Species).usual_advantages.splice((entry.framework_data as Species).usual_advantages.indexOf(val),1)">
            Typische Vorteile
        </ListSelector>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).usual_disadvantages.push(val)"
        @value-removed="val=>(entry.framework_data as Species).usual_disadvantages.splice((entry.framework_data as Species).usual_disadvantages.indexOf(val),1)">
            Typische Nachteile
        </ListSelector>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).unusual_advantages.push(val)"
        @value-removed="val=>(entry.framework_data as Species).unusual_advantages.splice((entry.framework_data as Species).unusual_advantages.indexOf(val),1)">
            Untypische Vorteile
        </ListSelector>
        <ListSelector 
        :options="autofillOptions"
        @value-added="val=>(entry.framework_data as Species).unusual_disadvantages.push(val)"
        @value-removed="val=>(entry.framework_data as Species).unusual_disadvantages.splice((entry.framework_data as Species).unusual_disadvantages.indexOf(val),1)">
            Untypische Nachteile
        </ListSelector>
        <Subtitle>Modifikatoren</Subtitle>
    </div>
</template>

<script setup lang="ts">
import type { IDbEntry, Species } from '@/interfaces/contribute';
import { inject, onMounted, watch, type Ref, ref } from 'vue';
import InputField from '../global/inputField.vue';
import ListSelector from '../global/listSelector.vue';
import type { AxiosInstance } from 'axios';
import Subtitle from '../global/subtitle.vue';

const api: AxiosInstance = inject<AxiosInstance>('apiBase') as AxiosInstance;

const autofillOptions: Ref<string[]> = ref<string[]>([]); 

onMounted(()=>{
    api.get('/wiki/titles').then(response=>autofillOptions.value=response.data);
})

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
    margin-bottom: 8px;
}

.framework-data-container{

    gap: 8px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
}
</style>