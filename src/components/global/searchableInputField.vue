<script setup lang="ts">
import { faL } from '@fortawesome/free-solid-svg-icons';
import { type Ref, ref, computed, type ComputedRef, watch, onMounted, watchEffect, onUnmounted } from 'vue';


interface Props{
    deleteOnComplete?: boolean
    flex?: number
    options?: string[]
    searchAt?: number
    placeholder?: string
    completeOnDistinct?: boolean
    modelValue?:string
}

const emit = defineEmits([
    'completed',
]);

const props = withDefaults(defineProps<Props>(),{
    options: () => [],
    searchAt: 1,
    placeholder: 'Hier schreiben...',
    flex: 1,
    completeOnDistinct: false,
    deleteOnComplete: false
})

let current_element_index: Ref<number> = ref<number>(-1);
let search_term: Ref<string> = ref<string>('');
let show_suggestions: Ref<boolean> = ref<boolean>(false);
let options_ref = ref([]);

let filtered_options: ComputedRef<string[]> = computed<string[]>(() => {
    current_element_index.value = -1;
    if(search_term.value.length < props.searchAt){
        return [];
    }
    let result = props.options.filter((element: string) => {
        return element.substring(0,search_term.value.length).toLowerCase() === search_term.value.toLowerCase()
    });
    if(result.length === 1 && props.completeOnDistinct){
        submitByValue(result[0]);
        return [];
        // TODO: autofill
    }
    return result;
});

function submit(){
    emit('completed',filtered_options.value[current_element_index.value])
    if(props.deleteOnComplete === false){
        search_term.value = filtered_options.value[current_element_index.value];
    }else{
        search_term.value = '';
    }
}

function submitByValue(value: string){
    emit('completed',value)
    if(props.deleteOnComplete === false){
        search_term.value = value;
    }else{
        search_term.value = '';
    }
}

function scrollUp(){
    if(current_element_index.value > 0){
        current_element_index.value--;
        (options_ref.value[current_element_index.value] as HTMLElement).scrollIntoView(
            {
                behavior:'smooth',
                block:'nearest',
                inline:'nearest'
            }
        );
    }
}

function scrollDown(){
    if(current_element_index.value < filtered_options.value.length -1){
        current_element_index.value++;
        (options_ref.value[current_element_index.value] as HTMLElement).scrollIntoView(
            {
                behavior:'smooth',
                block:'nearest',
                inline:'nearest'
            }
        );
    }
}
</script>


<template>
    <div class="search-bar-container">
        <label><slot></slot></label>
        <input
            :class="{'search-results-found':filtered_options.length >= 2 && show_suggestions === true}"
            @keydown.enter="submit()"
            @keydown.up.prevent="scrollUp()"
            @keydown.down.prevent="scrollDown()"
            @input="search_term = ($event.target as HTMLInputElement).value"
            @focus="search_term = ''; show_suggestions = true;"
            @blur="show_suggestions = false"
            :placeholder="placeholder"
            type="text" 
            autocomplete="off"
            :value="search_term"
        />
        <ul v-show="show_suggestions && filtered_options.length >= 2">
            <li 
                v-for="option in filtered_options"
                @mousedown="submitByValue(option)"
                ref="options_ref"
                :class="{highlighted: current_element_index === filtered_options.indexOf(option)}"
            >
                {{ option }}
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

li{
    /* border-top: 1px solid var(--bg4); */
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    color: var(--text0);
    transition: 150ms;
    font-size: 14px;
    background-color: var(--bg2);
    width: 100%;
}

.highlighted{
    padding-left: 12px;
    border-left: 4px solid var(--accent0);
    background-color: var(--bg3);
}

li:hover{
    padding-left: 12px;
    border-left: 4px solid var(--accent0);
    background-color: var(--bg3);
    cursor: pointer;
}

label{
    padding-left: 8px;
    color: var(--text3);
    font-size: 14px;
    padding-bottom: 2px;
    font-weight: 300;
}

ul{
    border-left: 1px solid var(--bg5);
    border-right: 1px solid var(--bg5);
    border-bottom: 1px solid var(--bg5);
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

.search-results-found{
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

input:focus{
    border: 1px solid var(--accent3);
}

</style>