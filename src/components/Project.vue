<script setup lang="ts">


import CutListVue from './CutList.vue';
import CutOptionsVue from './CutOptions.vue';
import ResultVue from './Result.vue';
import ModalVue from './utils/ConfirmModal.vue';

import { computed } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useModal } from 'vue-final-modal';

import { type CutOptions, DEFAULT_OPTIONS } from "../data";
import { computeCuts } from '@/compute';
import { useI18n } from 'vue-i18n';

const cutList = useLocalStorage<number[]>('cut-list', [1.50, 0.50]);
const cutOptions = useLocalStorage<CutOptions>('cut-options', DEFAULT_OPTIONS);

const { t } = useI18n();


function openHashLoadModal(cuts: number[], opts: CutOptions): Promise<boolean> {
  const message = t('load.message', {'nCuts': cuts.length});
  return new Promise((resolve) => {
    const modal = useModal({
      component: ModalVue,
      defaultModelValue: true,
      attrs: {
        title: t('load.title'),
        confirmText: t('load.confirm'),
        cancelText: t('load.cancel'),
        "onUpdate:modelValue": (d) => {
          console.log("CLOSED", d);
          resolve(false)
        },
        "onConfirm": () => {
          modal.close();
          resolve(true)
        }
      },
      slots: {
        default: `<p>${message}</p>`,
      },
    });
  })

}

async function loadHash() {
  try {
    const hash = location.hash.substring(1);
    if (hash != '') {
      location.hash = '';
      const data = atob(hash);
      console.log("Loading", data);
      const [list, opts] = JSON.parse(data);
      if (!Array.isArray(list) || !(list.every(x => typeof x == 'number'))) {
        throw Error("Invalid list");
      }
      if (typeof opts != 'object' || typeof opts.target != 'number' || typeof opts.maxPieces != 'number') {
        throw Error("Invalid options");
      }
      const res = await openHashLoadModal(list, opts);
      if (res) {
        cutList.value = list;
        cutOptions.value = opts;
        console.log("Loaded ", list, opts);
      }
    }
  } catch(e) {
    console.error("Error loading shared data", e);
  }
}

if (!Array.isArray(cutList.value)) {
  cutList.value = [];
}

const res = computed(() => {
  return computeCuts(cutList.value, cutOptions.value);
});

function onShare() {
  const ser = btoa(JSON.stringify([cutList.value, cutOptions.value], undefined, 0));
  const url = new URL(window.location.href);
  url.hash = ser;
  navigator.clipboard.writeText(String(url.href));
}

loadHash()
</script>

<template>
  <div class="flex flex-row w-full md:w-1/2 gap-5 h-80 my-4">
    <CutListVue class="flex-1" v-model="cutList" />
    <CutOptionsVue class="flex-1" v-model="cutOptions" @share="onShare()"/>
  </div>
  <ResultVue :cuts="cutList" :results="res" />
</template>
