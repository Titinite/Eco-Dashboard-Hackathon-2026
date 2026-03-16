<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup>
import { RouterView } from 'vue-router'
import DefaultLayout from './components/layout/DefaultLayout.vue'
</script>

<style>
.v-btn { text-transform: none !important; letter-spacing: 0 !important; }
</style>