<template>
  <v-col cols="12" md="6">
    <v-card class="pa-6" rounded="lg" elevation="0" border>
      <div class="mb-6 text-lg font-medium">{{ title }}</div>

      <v-select
        v-model="model"
        :items="sites"
        label="Choisir un site"
        variant="outlined"
        density="comfortable"
        rounded="lg"
      />
    </v-card>
  </v-col>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  sites: Array,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>