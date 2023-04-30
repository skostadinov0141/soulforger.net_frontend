<script setup lang="ts">

interface Props{
    label:string
    modelValue?:string | number
    hint?:string
    type?:string
    flex?:number
    placeholder?:string
    errors?: string[]
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(),{
    type:'text',
    flex:1,
    placeholder:'Hier schreiben...',
    errors: () => []
});

function getId(){
    return `input-${props.label}`;
}

</script>


<template>
    <div class="container">
        <label :for="getId()">{{ label }}</label>
        <input 
        :class="(errors?.length === 0)? '' : 'error'"
        :placeholder="placeholder"
        :type="type" 
        :id="getId()"
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)">
        <small v-if="hint !== undefined">{{ hint }}</small>
    </div>
    <ul>
       <li v-for="i in errors">
        {{ i }}
       </li> 
    </ul>
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
    border-radius: 8px;
    color: var(--text3);
    transition: 150ms;
}

.error{
    border: 1px solid var(--error0);
}

li{
    color: var(--error0);
    font-size: 12px;
}

input:focus{
    border: 1px solid var(--accent3);
}

.container{
    flex: v-bind(flex);
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