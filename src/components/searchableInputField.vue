<script setup lang="ts">
import { faL } from '@fortawesome/free-solid-svg-icons';
import { type Ref, ref, computed, type ComputedRef, watch, onMounted, watchEffect, onUnmounted } from 'vue';


onMounted(()=>{
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        if(e.key === 'ArrowDown'){
            e.preventDefault();
            if(current_element_index.value === filtered_options.value.length - 1){
                return;
            }
            current_element_index.value++;
        }
        if(e.key === 'ArrowUp'){
            e.preventDefault();
            if(current_element_index.value === 0){
                return;
            }
            current_element_index.value--;
        }
        if(e.key === 'Enter'){
            let element: HTMLElement = optionsRef.value[current_element_index.value]! as HTMLElement;
            element.click();
        }
        if(e.key === 'Tab'){
            e.preventDefault();
            let element: HTMLElement = optionsRef.value[current_element_index.value]! as HTMLElement;
            element.click();
        }
    })
});

onUnmounted(()=>{
    window.removeEventListener('keydown',()=>{});
})

interface Props{
    flex?: number
    options?: string[]
    searchAt?: number
    placeholder?: string
}

const emit = defineEmits(['valueSelected']);

const props = withDefaults(defineProps<Props>(),{
    options: () => [],
    searchAt: 1,
    placeholder: 'Hier schreiben...',
    flex: 1
})

let current_input: Ref<string> = ref<string>('');
let current_element_index: Ref<number> = ref<number>(-1);
let optionsRef = ref<HTMLElement[]>([]);
let search_field = ref<HTMLElement>();
let completed: Ref<boolean> = ref<boolean>(true);


let filtered_options: ComputedRef<string[]> = computed<string[]>(() => {
    current_element_index.value = -1;
    if(current_input.value.length < props.searchAt){
        return [];
    }
    let result = props.options.filter((element: string) => {
        return element.substring(0,current_input.value.length).toLocaleLowerCase() === current_input.value.toLowerCase()
    });
    if(result.length === 1){
        selectElement(result[0]);
        // current_input.value = result[0];
        // search_field.value?.blur();
        // emit('valueSelected',result[0])
        // completed.value = true;
        // return [];
    }
    return result;
});

function selectElement(value: string){
    completed.value = true;
    let if_element: HTMLElement = search_field.value! as HTMLElement;
    if(if_element !== undefined || if_element !== null){if_element.blur();}
    current_input.value = value;
    emit('valueSelected', current_input.value);
}

// function decideIfCompleted(){
//     if(completed)
// }

watch(completed,()=>{
    if(completed.value === false){
        current_input.value = '';
    }
})

watch(current_element_index,()=>{
    if(filtered_options.value.length === 0){
        return;
    }
    optionsRef.value.forEach((element: HTMLElement) => {if(element !== undefined){ element.style.backgroundColor = 'rgba(0,0,0,0)'; }})
    let element: HTMLElement = optionsRef.value[current_element_index.value]!;
    if(element !== undefined){
        element.style.backgroundColor = 'var(--bg4)';
        element.scrollIntoView(<ScrollIntoViewOptions>{
            behavior:'smooth',
            block:'center',
        })
    }
});
</script>


<template>
    <div class="search-bar-container">
        <label for="searchbar-input-field"><slot></slot></label>
        <input
        :placeholder="placeholder"
        @focus="completed = false"
        @blur="if(completed === false){current_input = ''; completed = true;}"
        id="searchbar-input-field"
        ref="search_field"
        type="text" 
        autocomplete="off"
        v-model="current_input"/>
        <ul v-if="filtered_options.length !== 0 && completed === false">
            <li v-for="option in filtered_options">
                <button ref="optionsRef" @click="selectElement(option)">
                    {{ option }}
                </button>
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
    font-size: 12px;
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