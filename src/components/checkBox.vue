<script setup lang="ts">

interface Props {
    tag: string,
    errors?: Array<string>
}

const props = withDefaults(defineProps<Props>(),{
    errors: () => []
});
const emits = defineEmits(['checked']);

</script>


<template>
    <div>
        <input type="checkbox" :id="`checkbox-${tag}`" :name="`checkbox-${tag}`"
        @change="emits('checked')">
        <label :class="(errors.length === 0)? '':'error'" :for="`checkbox-${tag}`">
            <slot></slot>
        </label>
    </div>
</template>


<style scoped>
label{
    color: var(--text0);
}

.error{
    color: var(--error0);
}

input{
    margin-right: 8px;
}
</style>