<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

const props = defineProps({
  labels:   { type: Array, default: () => [] },
  datasets: { type: Array, default: () => [] },
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((d) => ({
    tension: 0.4,
    pointRadius: 4,
    borderWidth: 2,
    ...d,
  })),
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 20,
        font: { size: 12 },
      },
    },
    tooltip: {
      backgroundColor: 'white',
      titleColor: '#111827',
      bodyColor: '#6b7280',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 10,
      boxPadding: 4,
    },
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
    y: { grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af' }, beginAtZero: false },
  },
}
</script>