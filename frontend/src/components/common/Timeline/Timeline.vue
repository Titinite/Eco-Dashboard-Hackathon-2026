<template>
  <v-timeline align="start" density="comfortable">
    <v-timeline-item
      v-for="item in items"
      :key="item.year"
      dot-color="primary"
    >
      <template #opposite>
        <span class="text-sm font-semibold text-gray-500">{{ item.year }}</span>
      </template>

      <div>
        <div class="font-semibold text-gray-900">{{ item.title }}</div>
        <div class="text-sm text-gray-500 mt-0.5">{{ item.description }}</div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>