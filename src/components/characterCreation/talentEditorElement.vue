<script setup lang="ts">

interface Props{
    name:string
    fw:number
    att1Name:string
    att1Value:number
    att2Name:string
    att2Value:number
    att3Name:string
    att3Value:number
    modelValue?: number,
}

const emits = defineEmits(['update:modelValue']);
const props = defineProps<Props>();

</script>


<template>
    <div class="container">
        <div class="name-container">
            {{ name }}
        </div>
        <div class="check-container">
            {{ att1Name }}/{{ att2Name }}/{{ att3Name }}  |  {{ att1Value }}/{{ att2Value }}/{{ att3Value }}
        </div>
        <div class="fw-container">
            <input @input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)" type="number" :value="modelValue">
        </div>
    </div>
</template>


<style scoped>

input{
    color: var(--accent2);
    font-weight: 600;
    width: 50px;
    padding: 0 16px 0 0;
    text-align: end;
}

.container{
    flex: 1;
    display: flex;
    padding: 8px;
    border: solid 1px var(--accent0);
}

.name-container{
    flex: 7;
}

.check-container{
    flex:3;
}

.fw-container{
    flex: 1;
}

</style>