<script setup lang="ts">
import { faL } from '@fortawesome/free-solid-svg-icons';
import { type Ref, ref, computed, type ComputedRef, watch, onMounted, watchEffect, onUnmounted } from 'vue';


interface Props{
    flex?: number
    options?: string[]
    searchAt?: number
    placeholder?: string
    completeOnDistinct?: boolean
    modelValue?:string
}

const emit = defineEmits([
    'valueSelected',
    'update:modelValue',
    'focusedOnFinished',
    'focusedOnUnfinished',
    'completed',
]);

const props = withDefaults(defineProps<Props>(),{
    options: () => [],
    searchAt: 1,
    placeholder: 'Hier schreiben...',
    flex: 1,
    completeOnDistinct: false,
})

let current_element_index: Ref<number> = ref<number>(-1);
let search_term: Ref<string> = ref<string>('');
let show_suggestions: Ref<boolean> = ref<boolean>(false);

let filtered_options: ComputedRef<string[]> = computed<string[]>(() => {
    current_element_index.value = -1;
    if(props.modelValue!.length < props.searchAt){
        return [];
    }
    let result = props.options.filter((element: string) => {
        return element.substring(0,props.modelValue!.length).toLowerCase() === props.modelValue!.toLowerCase()
    });
    if(result.length === 1 && props.completeOnDistinct){
        // TODO: autofill
    }
    return result;
});
</script>


<template>
    <div class="search-bar-container">
        <label><slot></slot></label>
        <input
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="show_suggestions = true"
        @blur="show_suggestions = false"
        :placeholder="placeholder"
        type="text" 
        autocomplete="off"
        :value="search_term"/>
        <ul v-show="/* TODO */ true">
            <li v-for="option in filtered_options">
            </li>
        </ul>
    </div>
</template>


<style scoped>

small{
    margin-top: 4px;
    margin-left: 8px;
    color: var(--text0);
    font-size: 10px;
    font-weight: 500;
}

button{
    width: 100%;
    height: 100%;
    border: none;
    background-color: var(--bg2);
    text-align: start;
    padding-left: 8px;
    padding-right: 0px;
    padding-top: 4px;
    padding-bottom: 4px;
    color: var(--text0);
    transition: 150ms;
    font-size: 14px;
}

button:hover{
    background-color: var(--bg4);
    cursor: pointer;
}

li{
    width: 100%;
}

label{
    padding-left: 8px;
    color: var(--text3);
    font-size: 14px;
    padding-bottom: 2px;
    font-weight: 300;
}

ul{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    list-style: none;
    padding-left: 0px;
    width: 100%;
    background-color: var(--bg2);
    overflow-y: auto;
    max-height: 240px;
    z-index: 10;
    position: absolute;
    top: 100%;
}

.search-bar-container{
    flex: v-bind(flex);
    position:relative;
    display: flex;
    flex-direction: column;
}

input{
    width: 100%;
    border: 1px solid var(--accent0);
    border-radius: 8px;
    color: var(--text3);
    transition: 150ms;
}


input:focus{
    border: 1px solid var(--accent3);
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

</style>