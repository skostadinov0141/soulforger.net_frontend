<script setup lang="ts">

interface Props{
    label:string
    modelValue?:string | number
    hint?:string
    type?:string
    flex?:number
    placeholder?:string
    errors?: string[]
    multiline?: boolean
    autofill?: boolean
    disabled?:boolean
    rows?:number
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(),{
    type:'text',
    flex:1,
    placeholder:'Hier schreiben...',
    errors: () => [],
    multiline: false,
    autofill:true,
    disabled: false,
    rows:15
});

function getId(){
    return `input-${props.label}`;
}

</script>


<template>
    <div class="container">
        <label :for="getId()">{{ label }}</label>
        <input v-if="multiline === false" 
        :disabled="disabled"
        :autocomplete="(autofill)? 'on' : 'off'"
        :class="(errors.length===0)? '' : 'error'"
        :placeholder="placeholder"
        :type="type" 
        :id="getId()"
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)">
        <textarea 
        v-else
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="(autofill)? 'on' : 'off'"
        :class="(errors.length===0)? '' : 'error'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target! as HTMLInputElement).value)"
        :id="getId" 
        cols="auto" 
        :rows="rows"></textarea>
        <small v-if="hint !== undefined">{{ hint }}</small>
    </div>
    <ul v-if="errors.length !== 0">
       <li v-for="i in errors">
        {{ i }}
       </li> 
    </ul>
</template>


<style scoped>

small{
    margin-left: 8px;
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

input:disabled{
    border: 1px solid var(--bg5);
    border-radius: 8px;
    color: var(--text0);
    transition: 150ms;
}

textarea{
    padding: 8px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 300;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid var(--accent0);
    border-radius: 8px;
    color: var(--text3);
    transition: 150ms;
    outline: none;
    resize: none;
}

textarea:focus{
    border: 1px solid var(--accent3);
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
    padding-left: 8px;
    color: var(--text3);
    font-weight: 300;
    font-size: 14px;
    margin-bottom: 4px;
}
</style>