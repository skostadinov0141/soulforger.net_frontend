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
let if_focused: Ref<boolean> = ref<boolean>(false);

let filtered_options: ComputedRef<string[]> = computed<string[]>(() => {
    current_element_index.value = -1;
    if(current_input.value.length < props.searchAt){
        return [];
    }
    let result = props.options.filter((element: string) => {
        return element.substring(0,current_input.value.length).toLowerCase() === current_input.value.toLowerCase()
    });
    if(result.length === 1){
        selectElement(result[0]);
    }
    return result;
});

function selectElement(val: string){
    let element = optionsRef.value.find((element: HTMLElement) => {if(element.id === val){ return element; }});
    current_input.value = val;
    emit('valueSelected',val)
    search_field.value?.blur();
}

watch(current_element_index,()=>{
    optionsRef.value.forEach((element: HTMLElement) => {
        element.style.backgroundColor = 'var(--bg2)';
    });
    let element = (optionsRef.value[current_element_index.value] as HTMLElement);
    element.style.backgroundColor = 'var(--bg4)';
    element.scrollIntoView({
        block:'center'
    });

});

watch(if_focused,()=>{
    if(if_focused.value === true){
        if(filtered_options.value.includes(current_input.value)){
            current_input.value = '';
        }
    }
})

</script>


<template>
    <div class="search-bar-container">
        <label for="searchbar-input-field"><slot></slot></label>
        <input
        @focus="if_focused = true"
        @blur="if_focused = false"
        :placeholder="placeholder"
        id="searchbar-input-field"
        ref="search_field"
        type="text" 
        autocomplete="off"
        v-model="current_input"/>
        <ul v-show="if_focused && filtered_options.length !== 0 && filtered_options.length !== 1">
            <li v-for="option in filtered_options">
                <button :id="option" ref="optionsRef" @mousedown="selectElement(option)" @click="selectElement(option)">
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