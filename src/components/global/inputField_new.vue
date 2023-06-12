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
    autocomplete?: boolean
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
    autocomplete:false,
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
        'container__typing':focused,
        'container__error':(errors.length > 0),
    }">
        <label :for="getId">{{ label }}</label>
        <input 
        :autocomplete="autocomplete? 'on' : 'off'"
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
        border: 1px solid lighten($color: $error, $amount: 10);
    }

    .error-text{
        color: lighten($color: $error, $amount: 10);
    }

    .error-block{
        border-top: 1px solid lighten($color: $bg, $amount: 20);
        padding: 8px;
        margin-top: 8px;
        background-color: transparentize($color: transparentize(lighten($bg,30),0.2), $amount: 0.7);
        &>ul{
            padding-left: 8px;
            font-size: 12px;
            font-weight: 300;
            color: $text;
            list-style-position: inside;
        }
    }

    .container{
        overflow: hidden;
        transition: 150ms;
        font-family: 'Roboto';
        flex: v-bind(flex);
        display: flex;
        flex-direction: column;
        padding: 0px;
        border: 1px solid lighten($color: $bg, $amount: 20);
        border-radius: 8px;
        &__typing{
            border: 1px solid lighten($color: $bg, $amount: 30);
        }
        &__error{
            border: 1px solid lighten($color: $error, $amount: 5);
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