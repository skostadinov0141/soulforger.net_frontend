<script setup lang="ts">
import type { Profile } from '@/interfaces/profiles';
import Compressor from 'compressorjs';
import { ref, type Ref } from 'vue';

let image: Ref<string | undefined> = ref<string | undefined>('');

const emits = defineEmits(['imageUploaded']);

function createCompressedImage(event: Event){
    let compressor = new Compressor((event.target as HTMLInputElement).files![0],{
        maxHeight: 200,
        maxWidth: 200,
        quality: 0.5,
        success(result: File){
            const reader = new FileReader();
            // Encode the file using the FileReader API
            reader.onloadend = () => {
                // Use a regex to remove data url part
                const base64String = (reader.result as string);
                emits("imageUploaded", base64String);
                image.value = base64String;
                // image.value = base64String;
                // Logs wL2dvYWwgbW9yZ...
            };
            reader.readAsDataURL(result);
        }
    });
}

</script>


<template>
    <div class="image-picker-container">
        <img v-if="image" :src="image">
        <label for="file-upload" style="position: absolute;">
            <font-awesome-icon
            icon="fa-solid fa-pen-to-square" 
            size="2x" style="color: var(--accent4); filter: drop-shadow(4px 4px 3px rgba(0,0,0,0.5));"/>
        </label>
        <input @change="createCompressedImage($event)" id="file-upload" type="file" ref="file" style="display: none;" accept="image/*">
    </div>
</template>


<style scoped>

img{
    object-fit:contain;
    height: 100%;
    width: 100%;
}

.image-picker-container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100000px;
    border: solid 2px var(--bg3);
    width: 110px;
    height: 110px;
    overflow: hidden;
    background-color: var(--bg2);
}

</style>