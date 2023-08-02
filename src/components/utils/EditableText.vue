<script setup lang="ts">
import { floatFormatter, floatParser } from '@/i18n';
import { computed, ref, toRef, watch } from 'vue';

export interface Props {
  modelValue?: number
  placeholder: string
  type?: 'int' | 'float'
}

const props = withDefaults(defineProps<Props>(), {
    type: 'float'
});

const emit = defineEmits<{
    'update:modelValue': [value: number],
}>();

const fieldValue = ref(format(props.modelValue));
let focus = false;

watch(toRef(props, 'modelValue'), (value) => {
    if (!focus) {
        fieldValue.value = format(value);
    }
});

function onChange(data: string) {
    const parsed = parse(data);
    fieldValue.value = data;
    if (parsed != undefined) {
        emit('update:modelValue', parsed);
    }
}

function format(data: number | undefined): string {
    if (props.type == 'int') {
        return String(data) ?? ''
    } else {
        if (data === undefined) return ''
        return floatFormatter(data)
    }
}

function parse(data: string): number | undefined {
    if (props.type == 'float') {
        const parsed = floatParser(data);
        if (!isNaN(parsed)) {
            const formatted = Math.round(parsed * 100) / 100;
            return formatted;
        }

    } else {
        const parsed = parseInt(data);
        if (!isNaN(parsed)) {
            return parsed;
        }
    }
}

function onFocusIn() {
    focus = true;
}

function onFocusOut() {
    focus = false;
    fieldValue.value = format(props.modelValue);
}

</script>

<template>
    <div class="cnt m-0">
        <input class="hprior w-full bg-transparent"
               type="text" :placeholder="props.placeholder"
               :value="fieldValue"
                @input="onChange(($event.target as HTMLInputElement).value)"
                @focusin="onFocusIn()"
                @focusout="onFocusOut()">
        <span class="iborder"></span>
    </div>
</template>

<style scoped lang="scss">
.cnt {
    width: 100%;
    position: relative;
    margin: 5px;
}
.iborder {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    border: 1px solid transparent;
    transition: width 0.4s, border 0s 0.4s;
}
input:focus ~ .iborder {
    border-color: #4285F4;
    width: 100%;
    transition: width 0.3s;
}
input.hprior {
    margin: 3px 10px 0 10px;
    margin: 0;
    padding: 0;
    outline: none;
    display: inline-block;
}
</style>
