<template>
  <v-card rounded="lg" elevation="0" border class="pa-5">
    <div class="text-subtitle-1 mb-4">{{ title }}</div>

    <div
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="d-flex align-center justify-space-between">
        <div>
          <div class="text-2xl">
            {{ item.value }}
            <span class="text-xl">{{ item.unit }}</span>
          </div>

          <div class="text-md text-grey">
            {{ item.label }}
          </div>
        </div>

        <v-icon
          v-if="item.trend !== undefined"
          :color="item.trend < 0 ? 'green' : 'red'"
        >
          {{ item.trend < 0 ? 'mdi-trending-down' : 'mdi-trending-up' }}
        </v-icon>
      </div>

      <v-divider
        v-if="index < items.length - 1"
        class="my-4"
      />
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  items: {
    type: Array,
    default: () => []
  }
})
</script>