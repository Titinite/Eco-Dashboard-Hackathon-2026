<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

import { Bar } from 'vue-chartjs'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['Construction', 'Exploitation', 'Transport'],
  datasets: [
    {
      data: [5200, 9000, 3300],
      backgroundColor: '#3b82f6',
      borderRadius: 8
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>