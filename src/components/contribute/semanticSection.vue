<template>
    <div class="semantic-section-container">
        <InputField :flex="1" v-model="title" label="" placeholder="Titel" :autofill="false"></InputField>
        <InputField v-model="content" label="" placeholder="Inhalt" :multiline="true" :rows="6" :autofill="false"></InputField>
        <div style="margin-top: 4px; display: flex;">
            <div style="flex: 1;"></div>
            <Button>Abschnitt entfernen</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputField from '../global/inputField.vue';
import Button from '../global/button.vue';
import { type Ref, ref, watch } from 'vue';

const emits = defineEmits(['update-title','update-content']);

const title:Ref<string> = ref<string>('');
const content:Ref<string> = ref<string>('');

watch(title,()=>{
    emits('update-title', title.value)
})

watch(content,()=>{
    emits('update-content', content.value)
})

</script>

<style scoped>

.semantic-section-container{
    margin-top: 16px;
    gap: 4px;
    display: flex;
    flex-direction: column;
}

</style>