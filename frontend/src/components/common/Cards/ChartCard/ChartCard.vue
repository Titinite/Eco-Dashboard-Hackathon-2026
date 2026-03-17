<template>
  <v-card class="pa-4" rounded="lg" elevation="0" border>
    <v-card-title class="mb-2 text-lg font-medium">
      {{ title }}
    </v-card-title>

    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  title: String
})
</script>