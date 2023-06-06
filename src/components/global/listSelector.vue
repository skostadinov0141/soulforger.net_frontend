<template>
    <div class="list-selector-container">
        <SearchableInputField
        :delete-on-complete="true"
        :options="options"
        :search-at="1"
        placeholder="Suchen..."
        @completed="val=>{values.push(val); emit('valueAdded',val);}"><slot></slot></SearchableInputField>
        <div class="list-elements-container">
            <TagElement 
            v-for="value in values" 
            icon="fa-solid fa-delete-left"
            @pressed="emit('valueRemoved',value); values.splice(values.indexOf(value,1));">{{ value }}</TagElement>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import SearchableInputField from './searchableInputField.vue';
import TagElement from '../wiki/tagElement.vue';

interface Props{
    options:string[]
}

const props = defineProps<Props>();
const emit = defineEmits(['valueAdded','valueRemoved']);

const values: Ref<string[]> = ref<string[]>([]);

</script>

<style scoped>
.list-elements-container{
    gap: 8px;
    display: flex;
    flex-wrap: wrap;
}

.list-selector-container{
    gap: 8px;
    display: flex;
    flex-direction: column;
}
</style>