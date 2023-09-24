<script setup lang="ts">
    import BaseModel from '@/functional_components/nirve/nirve_character_v4/CBaseModel';
import { useAppStore } from '@/store/app';
import { onMounted } from 'vue';
import { Ref, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
    const reactiveModel = reactive(new BaseModel());
    const store = useAppStore();
    const output: Ref<string> = ref<string>("");
    const route = useRoute();
    const router = useRouter();
    const types: string[] = [
        "bending-skills",
        "items",
        "spells",
        "character-classes",
        "disadvantages",
        "races",
        "religions",
        "skills"
    ];

        
    function Submit(){
        store.api.getAxios().post(`/nirve/creator/${route.params.type}`,
        reactiveModel).then((value)=>{
            output.value = value.data;
        })
    }

    onMounted(()=>{
        if(!types.includes(route.params.type as string))
        {
            router.push("/error")
            console.log(route.params.type);
        }
    })

</script>




<template>
    <div class="container-form">
        <input 
            class="input-field"
            v-model="reactiveModel.name"
            placeholder="Name"
        />
        <input
            class="input-field"
            v-model="reactiveModel.description"
            placeholder="Description"
        />
        <button 
            class="button-style"
            @click="Submit"
        >
            Create
        </button>
        <p>
            {{ output }}
        </p>
    </div>
</template>




<style scoped>
    .input-field{
        color: black;
        background-color: white;
    }
    .button-style{
        color: white;
        background-color: gray;
    }
    .container-form{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>