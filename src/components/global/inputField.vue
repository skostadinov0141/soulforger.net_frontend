<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, ref, type Ref } from 'vue'

interface Validation{
    content: string
    valid: boolean
}

interface Props{
    validations?: Validation[]
    label:string
    modelValue?:string
    hint?:string
    flex?:number
    placeholder?:string
    autocomplete?: boolean
    disabled?:boolean
    hidden?:boolean
}

const emits = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(),{
    validations: () => [],
    flex:1,
    placeholder:'Hier schreiben...',
    errors: () => [],
    autocomplete:false,
    disabled: false,
    hidden: false
});

const validations_list: Ref<string[]> = ref(props.validations.map((val) => val.content));
const errors: Ref<string[]> = ref([]);
const focused: Ref<boolean> = ref(false);
const show: Ref<boolean> = ref(false);

const icon = computed(() => {
    if(show.value){
        return 'fa-solid fa-eye-slash';
    }else{
        return 'fa-solid fa-eye';
    }
});

function getId(): string{
    return 'input-' + props.label;
}

const type = computed(() => {
    if(props.hidden === false){
        return 'text';
    }else{
        if(show.value){
            return 'text';
        }else{
            return 'password';
        }
    }
});

</script>


<template>
    <div :class="{
        'container':true,
        'container__typing':focused,
        'container__error':(validations.find((val)=>val.valid === false) !== undefined),
    }">
        <label :for="getId()">{{ label }}</label>
        <div class="input-area">
            <input 
                :disabled="disabled"
                :autocomplete="autocomplete? 'on' : 'off'"
                @focus="focused = true"
                @blur="focused = false"
                :id="getId()" 
                :type="type"
                @input="emits('update:modelValue', ($event.target as HTMLInputElement).value);"
                :value="modelValue"
                :placeholder="placeholder"
            >
            <button v-if="hidden" @click="show = !show"><FontAwesomeIcon :icon="icon" style="color: var(--text0);"></FontAwesomeIcon></button>
        </div>
        <div class="error-block" v-if="validations.length > 0">
            <ul>
                <li v-for="validation in validations_list"
                :class="{'error-text' : validations.find((val)=>val.content === validation)?.valid === false}">{{ validation }}</li>
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
        margin-top: 0px;
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
        &>.input-area{
            display: flex;
            margin-left: 8px;
            margin-right: 8px;
            gap: 8px;
        }
        &>.input-area>button{
            border: none;
            background-color: transparent;
            transition: 150ms;
            cursor: pointer;
        }
        &>label{
            margin-left: 8px;
            margin-top: 4px;
            margin-bottom: 0px;
            font-size: 12px;
            font-weight: 300;
            color: var(--text0);
        }
        &>.input-area>input{
            flex: 1;
            margin-right: 8px;
            margin-bottom: 8px;
            margin-top: 4px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text3);
            padding: 0;
            &::placeholder{
                color: darken($color: $text, $amount: 30);
            }
        }
    }

</style>