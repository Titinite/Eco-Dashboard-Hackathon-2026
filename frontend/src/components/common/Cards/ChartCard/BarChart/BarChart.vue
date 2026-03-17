<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  labels:   { type: Array, default: () => [] },
  datasets: { type: Array, default: () => [] },
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((d) => ({ ...d, borderRadius: 6 })),
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: { usePointStyle: true, pointStyle: 'rect', padding: 20 },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f3f4f6' } },
  },
}
</script>