<script setup lang="ts">

const props = defineProps<{
  innerClass: string,
}>();

const emit = defineEmits<{
  click: []
}>();

</script>

<template>
<button class="relative inline-flex items-center justify-center p-0.5 mx-2 my-2 overflow-hidden text-sm rounded-lg group focus:ring-4 focus:outline-none"
    @click="emit('click')">
  <span class="relative px-3 py-1.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 font-bold" :class="innerClass">
    <slot />
  </span>
</button>
</template>
