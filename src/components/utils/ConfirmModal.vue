<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { VueFinalModal } from 'vue-final-modal'
import ButtonVue from "./Button.vue"

defineProps<{
  title?: string
  confirmText: string
  cancelText: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center text-black"
    content-class="flex flex-col p-4 bg-white dark:bg-black rounded border border-gray-100 dark:border-gray-800"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="flex items-center h-10">
      <h1 v-if="title" class="text-2xl">
        {{ title }}
      </h1>
      <button class="ml-auto" @click="emit('update:modelValue', false)">
        <Icon icon="clarity:window-close-line" class="w-10 h-10 transition ease-in-out duration-300 hover:text-red-400" style="" />
      </button>
    </div>
    <slot />

    <div class="flex flex-row">
      <ButtonVue @click="emit('update:modelValue', false)" class="bg-red-500 focus:ring-red-800 ml-auto" inner-class="text-black bg-white group-hover:text-white">
        {{ cancelText }}
      </ButtonVue>
      <ButtonVue @click="emit('confirm')" class="bg-green-500 focus:ring-green-800 ml-2" inner-class="text-black bg-white group-hover:text-white">
        {{ confirmText }}
      </ButtonVue>
    </div>
  </VueFinalModal>
</template>
