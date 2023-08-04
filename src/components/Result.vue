<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    cuts: number[],
    results: number[][]
}>();


const { t } = useI18n();

const renderList = computed(() => {
    return props.results.map(count => {
        let desc = '';
        for (let i = 0; i < props.cuts.length; i++) {
            if (count[i] > 0) {
                if (desc != '') desc += ' + ';
                desc += count[i] + '*' + props.cuts[i].toFixed(2);
            }
        }
        return desc;
    })
})

const title = computed(() => {
    const len = props.results.length;
    if (len == 0) return t('results.foundNone');
    else return t('results.found', {'nRes': String(len) + (len == 100 ? '+' : '')});
});

</script>

<template>
<div class="pt-4">
    <div class="text-bold text-xl text-center md:text-left"> {{ title }}</div>
    <ul class="py-2  px-4" v-if="renderList.length > 0">
        <li v-for="item in renderList" class="flex flex-row">
            {{ item }}
        </li>
    </ul>
    <p v-else class="w-80  px-4 text-red-500">
        {{ $t('results.none') }}
    </p>

</div>

</template>

<style scoped lang="scss">
</style>
