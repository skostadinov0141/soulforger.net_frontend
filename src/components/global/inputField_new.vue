<script setup lang="ts">
import { Validate } from '@/frameworks/validation/validation'
import { ref, type Ref } from 'vue'


interface Props{
    validations?: string[]
    label:string
    modelValue?:string
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
    validations: () => [],
    type:'text',
    flex:1,
    placeholder:'Hier schreiben...',
    errors: () => [],
    multiline: false,
    autofill:true,
    disabled: false,
    rows:15
});

let validator: Validate = new Validate(props.validations);
const validations_list: Ref<string[]> = ref(validator.getValidationsContent());
const errors: Ref<string[]> = ref([]);
const focused: Ref<boolean> = ref(false);

function getId(): string{
    return 'input-' + props.label;
}

function validate(value : string){
    errors.value = [];
    errors.value = validator.validate(value);
}

</script>


<template>
    <div :class="{
        'container':true,
        'error':errors.length > 0,
        'container__typing':focused,
    }">
        <label :for="getId">{{ label }}</label>
        <input 
        @focus="focused = true"
        @blur="focused = false"
        :id="getId()" 
        :type="type"
        @input="emits('update:modelValue', $event.target.value);validate($event.target.value);"
        :value="modelValue"
        :placeholder="placeholder">
        <div class="error-block" v-if="validations.length > 0">
            <ul>
                <li v-for="validation in validations_list"
                :class="{'error-text' : errors.find((val)=>val === validation) !== undefined}">{{ validation }}</li>
            </ul>
        </div>
    </div>
</template>


<style scoped lang="scss">

    .error{
        border: 1px solid var(--error0);
    }

    .error-text{
        color: var(--error0);
    }

    .error-block{
        border-top: 1px solid var(--bg4);
        padding: 8px;
        margin-top: 8px;
        background-color: transparentize($color: #242D56, $amount: 0.7);
        &>ul{
            padding-left: 8px;
            font-size: 12px;
            font-weight: 300;
            color: var(--text0);
            list-style-position: inside;
        }
    }

    .container{
        transition: 150ms;
        font-family: 'Roboto';
        flex: v-bind(flex);
        display: flex;
        flex-direction: column;
        padding: 0px;
        border: 1px solid var(--bg4);
        border-radius: 8px;
        &__typing{
            border: 1px solid var(--outline1);
        }
        &>label{
            margin: 4px 8px;
            font-size: 12px;
            font-weight: 300;
            color: var(--text0);
            margin-bottom: 4px;
        }
        &>input{
            margin: 4px 8px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text3);
            padding: 0;
        }
    }

</style>