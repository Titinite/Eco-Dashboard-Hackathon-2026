<template>
  <DefaultLayout v-if="authStore.isAuthenticated">
    <RouterView />
  </DefaultLayout>

  <RouterView v-else />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import DefaultLayout from './components/layout/DefaultLayout.vue'

const authStore = useAuthStore()
</script>

<style>
.v-btn { text-transform: none !important; letter-spacing: 0 !important; }
</style>