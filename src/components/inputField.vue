<script setup lang="ts">

interface Props{
    label:string
    modelValue?:string
    hint?:string
    type?:string
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(),{
    type:'text'
});

function getId(){
    return `input-${props.label}`;
}

</script>


<template>
    <div class="container">
        <label :for="getId()">{{ label }}</label>
        <input 
        :type="type" 
        :id="getId()"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target!.value)">
        <small v-if="hint !== undefined">{{ hint }}</small>
    </div>
</template>


<style scoped>

small{
    margin-top: 4px;
    font-size: 12px;
    font-weight: 400;
    color: var(--text0);
}

input{
    border: 1px solid var(--accent0);
    transition: 150ms;
}

input:focus{
    border: 1px solid var(--accent3);
}

.container{
    margin: 16px;
    display: flex;
    flex-direction: column;
}

label{
    color: var(--text3);
    font-weight: 300;
    font-size: 14px;
    margin-bottom: 4px;
}
</style>