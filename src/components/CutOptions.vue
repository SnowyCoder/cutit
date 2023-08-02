<script setup lang="ts">
import EditableText from './utils/EditableText.vue';
import ButtonVue from './utils/Button.vue';

import type { CutOptions } from '@/data';
import { ref } from 'vue';

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

    <div class="text-center text-xl font-bold">Max pieces</div>
    <EditableText placeholder="15" type="int"
        v-model="maxPieces"
        @update:model-value="onUpdate()"
         />
    <ButtonVue @click="emit('share')" class="bg-cyan-500 focus:ring-cyan-800" inner-class="text-white bg-slate-800">
      Share
    </ButtonVue>
  </div>
</template>
