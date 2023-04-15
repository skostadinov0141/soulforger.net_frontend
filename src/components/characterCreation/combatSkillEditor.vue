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
        @input="$emit('update:modelValue', $event.target!.value)">
    </div>
</template>


<style scoped>

</style>