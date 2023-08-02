<script setup lang="ts">
import Header from './components/Header.vue'
import Project from './components/Project.vue'
import { ModalsContainer } from 'vue-final-modal'
</script>

<template>
  <div class="md:container md:mx-auto pt-10">
    <Header />

    <main>
      <Project />
    </main>
  </div>
  <ModalsContainer />
</template>
