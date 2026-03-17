<template>
  <v-card rounded="lg" elevation="0" border>
    <v-card-text class="pa-5">
      <div class="text-sm text-gray-500 mb-2">{{ label }}</div>
      <div class="text-4xl font-bold text-gray-900 mb-2">{{ value }} <span class="text-2xl font-semibold">{{ unit }}</span></div>
      <div class="text-sm" :class="trend < 0 ? 'text-green-600' : 'text-red-500'">
        {{ trend > 0 ? '+' : '' }}{{ trend }}% vs année précédente
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  unit:  { type: String, default: '' },
  trend: { type: Number, default: 0 },
})
</script>