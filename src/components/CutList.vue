<script setup lang="ts">
import { computed } from 'vue';
import EditableText from './EditableText.vue';


const props = defineProps<{
  modelValue: number[]
}>();

const emit = defineEmits<{
    'update:modelValue': [value: number[]],
}>();

function onChange(index: number, val: number) {
    const data = [...props.modelValue];
    data[index] = val
    emit('update:modelValue', data);
}

function onRemove(index: number) {
    const data = [...props.modelValue];
    data.splice(index, 1);
    emit('update:modelValue', data);
}

const renderList = computed(() => [...props.modelValue, undefined])
</script>

<template>
<div>
    <div class="text-center w-full">Cuts:</div>
    <ul class="py-2 pr-4 overflow-y-scroll h-full">
        <li v-for="(item, index) in renderList" class="flex flex-row">
            <EditableText placeholder="123.45" :modelValue="item"
                @update:modelValue="val => onChange(index, val)"/>
            <button
                v-if="index != renderList.length"
                type="button"
                class="bg-danger text-red-600/50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-extrabold transition hover:text-red-600 text-center align-middle w-3"
                @click="onRemove(index)">
                X
            </button>
        </li>
    </ul>
</div>


</template>
