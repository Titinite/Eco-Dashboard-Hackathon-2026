<template>
  <Radar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({
  labels:   { type: Array, default: () => [] },
  datasets: { type: Array, default: () => [] },
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets,
}))

const chartOptions = {
  responsive: true,
	maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: { usePointStyle: true, pointStyle: 'rect', padding: 20 },
    },
  },
  scales: {
    r: {
      grid: { color: '#e5e7eb' },
      pointLabels: { font: { size: 12 }, color: '#6b7280' },
      ticks: { display: false },
    },
  },
}
</script>