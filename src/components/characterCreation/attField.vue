<script setup lang="ts">

export interface Props{
    modelValue?: number,
    fieldName: string
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(),{
    
});

function getIdText(){
    return `att-input-${props.fieldName}`;
}

</script>


<template>
<div class="main-container">
    <div class="secondary-container">
        <label :for="getIdText()">{{ fieldName }}</label>
        <input 
        type="number" 
        :value="modelValue" 
        :id="getIdText()"
        @input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)">
    </div>
</div>
</template>


<style scoped>
.main-container{
    padding: 5px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23E08A00FF' stroke-width='2' stroke-dasharray='100' stroke-dashoffset='50' stroke-linecap='square'/%3e%3c/svg%3e");
}

.secondary-container{
    height: 90px;
    width: 90px;
    border: 1px solid var(--accent0);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

input{
    width: 100%;
    height: 100%;
    text-align: center;
    outline: none;
    border: none;
    background-color: transparent;
    color: var(--text3);
    font-size: 32px;
    padding-bottom: 8px;
}

label{
    font-weight: 300;
    font-size: 12px;
    color: var(--text0);
    padding-top: 5px;
}

</style>