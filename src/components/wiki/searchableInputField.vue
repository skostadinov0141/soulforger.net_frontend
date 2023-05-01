<script setup lang="ts">
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
            let if_element: HTMLElement = search_field.value! as HTMLElement;
            if(element !== undefined || element !== null){element.click();}
            if(if_element !== undefined || element !== null){if_element.blur();}
            completed = true;
            emit('valueSelected', current_input.value);
        }
        if(e.key === 'Tab'){
            e.preventDefault();
            let element: HTMLElement = optionsRef.value[current_element_index.value]! as HTMLElement;
            let if_element: HTMLElement = search_field.value! as HTMLElement;
            if(element !== undefined || element !== null){element.click();}
            if(if_element !== undefined || element !== null){if_element.blur();}
            completed = true;
            emit('valueSelected', current_input.value);
        }
    })
});

onUnmounted(()=>{
    window.removeEventListener('keydown',()=>{});
})



interface Props{
    options?: string[]
}

const emit = defineEmits(['valueSelected']);

const props = withDefaults(defineProps<Props>(),{
    options: () => []
})

let current_input: Ref<string> = ref<string>('');
let focused: Ref<boolean> = ref<boolean>(false);
let current_element_index: Ref<number> = ref<number>(-1);
let optionsRef = ref<HTMLElement[]>([]);
let search_field = ref<HTMLElement>();
let completed: boolean = false;

watch(focused,()=>{
    if(focused.value === true && completed === true){
        current_input.value = '';
        completed = false;
    }
})

let filtered_options: ComputedRef<string[]> = computed<string[]>(() => {
    current_element_index.value = -1;
    if(current_input.value.length < 1){
        return [];
    }
    let result = props.options.filter((element: string) => {
        return element.substring(0,current_input.value.length).toLocaleLowerCase() === current_input.value.toLowerCase()
    });
    if(result.length === 1){
        current_input.value = result[0];
        search_field.value?.blur();
        completed = true;
        emit('valueSelected',result[0])
        return [];
    }
    return result;
});

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
        id="searchbar-input-field"
        ref="search_field"
        type="text"
        @focus="focused = true"
        @blur="focused = false"
        :class="focused === false? '':'found-results'" 
        autocomplete="off"
        v-model="current_input"/>
        <ul v-if="filtered_options.length !== 0 && focused === true">
            <li @click="current_input = option" v-for="option in filtered_options" ref="optionsRef">{{ option }}</li>
        </ul>
        <div class="placeholder" v-else-if="filtered_options.length === 0 && focused === true">Bitte weiter schreiben...</div>
    </div>
</template>


<style scoped>

label{
    padding-left: 8px;
    color: var(--text3);
    font-size: 12px;
    padding-bottom: 2px;
    font-weight: 300;
}

li:hover{
    background-color: var(--bg3);
}

.placeholder{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 8px;
    width: 100%;
    background-color: var(--bg2);
    z-index: 10;
    position: absolute;
    top: 100%;
}

ul{
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 8px;
    list-style: none;
    width: 100%;
    background-color: var(--bg2);
    overflow-y: auto;
    max-height: 240px;
    z-index: 10;
    position: absolute;
    top: 100%;
}

.search-bar-container{
    position:relative;
    display: flex;
    flex-direction: column;
}

input{
    z-index: 100;
    width: 100%;
    border: 1px solid var(--accent0);
    border-radius: 8px;
    color: var(--text3);
    transition: 150ms;
}

.found-results{
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

input:focus{
    border: 1px solid var(--accent3);
}

</style>