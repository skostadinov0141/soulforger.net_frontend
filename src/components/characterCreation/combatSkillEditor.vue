<script setup lang="ts">

interface Props{
    modelValue: number
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(),{

});

</script>


<template>
    <div>
        <input type="number"
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)">
    </div>
</template>


<style scoped>

</style>