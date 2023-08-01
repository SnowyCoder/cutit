<script setup lang="ts">
import type { CutOptions } from '@/data';
import EditableText from './EditableText.vue';
import { ref, type Ref } from 'vue';

const props = defineProps<{
  modelValue: CutOptions
}>();

const emit = defineEmits<{
    'update:modelValue': [value: CutOptions],
    'share': [],
}>();

const target = ref(props.modelValue.target);
const maxPieces = ref(props.modelValue.maxPieces);

function onUpdate() {
  emit('update:modelValue', {
    target: target.value,
    maxPieces: maxPieces.value,
  });
}

</script>

<template>
  <div>
    <div class="text-center text-xl font-bold">Target</div>
    <EditableText placeholder="12.34"
    v-model="target"
    @update:model-value="onUpdate()" />

    <div class="text-center text-xl font-bold">Max pieces:</div>
    <EditableText placeholder="15" type="int"
        v-model="maxPieces"
        @update:model-value="onUpdate()"
         />

    <button class="relative inline-flex items-center justify-center p-0.5 mx-2 my-2 overflow-hidden text-sm text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
      @click="emit('share')">
      <span class="relative px-3 py-1.5 transition-all ease-in duration-75 text-white bg-slate-800 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-bold">
        Share
      </span>
    </button>
  </div>
</template>
