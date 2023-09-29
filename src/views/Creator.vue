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

    <v-row 
        style="height: 100%"
    >
        <v-col 
            align-self="center" v-for="n in 3" :key="n" cols="12" lg="4"
        >
            <v-card
                class="text-secondary ma-8 ma-lg-0"
				variant="elevated"
				rounded="md"
				elevation="3"
				color="surface-lighten-1"
                v-if="n == 2"
            >
                <v-card-item class="pb-4 pt-6">
                    <v-form>
                        <v-textarea
                            v-model="reactiveModel.name"
                            rows="1"
                            label="Name"
							class="mb-2"
                            bg-color="surface-lighten-2"
                            prepend-inner-icon="mdi-pencil"
                        >

                        </v-textarea>
                        <v-textarea
                            rows="1"
                            v-model="reactiveModel.description"
                            label="Beschreibung"
							class="mb-2"
                            bg-color="surface-lighten-2"
                            prepend-inner-icon="mdi-text-box-edit"
                            auto-grow
                        >
                        
                        </v-textarea>
                        <v-btn 
                            width="100%"
                            bg-color="indigo-lighten-2"
                            color="indigo-darken-2"
                            @click="Submit"
                        >
                        Speichern
                        </v-btn>
                    </v-form>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>

</template>

<style scoped>

</style>
