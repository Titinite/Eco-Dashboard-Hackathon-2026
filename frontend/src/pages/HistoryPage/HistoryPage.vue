<template>
  <div class="gap-6 grid grid-cols-1">
    <ChartCard title="Évolution historique (2020-2025)">
      <div style="height: 400px; width: 100%;">
        <LineChart
          :labels="['2020', '2021', '2022', '2023', '2024', '2025']"
          :datasets="[
            { label: 'Total',        data: [52000, 48000, 46000, 44500, 42000, 39000], borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
            { label: 'Construction', data: [18000, 16500, 15800, 15000, 14200, 13500], borderColor: '#10b981', backgroundColor: '#10b981' },
            { label: 'Exploitation', data: [22000, 20500, 19500, 18800, 17500, 16000], borderColor: '#f59e0b', backgroundColor: '#f59e0b' },
            { label: 'Transport',    data: [12000, 11000, 10700, 10700, 10300,  9500], borderColor: '#ef4444', backgroundColor: '#ef4444' },
          ]"
        />
      </div>
    </ChartCard>
    <ChartCard title="Jalons et initiatives">
      <CarbonTimeline
        :items="[
          { year: 2020, title: 'Audit initial carbone', description: 'Mise en place du suivi des émissions'},
          { year: 2021, title: 'Plan de réduction CO₂', description: 'Objectif -25% sur 5 ans'},
          { year: 2022, title: 'Isolation des bâtiments', description: 'Rénovation énergétique de 3 sites'},
          { year: 2023, title: 'Énergies renouvelables', description: 'Installation de panneaux solaires'},
          { year: 2024, title: 'Flotte électrique', description: 'Conversion de 60% des véhicules'},
          { year: 2025, title: 'Certification ISO 14001', description: 'Obtention de la certification environnementale'},
        ]"
      />
    </ChartCard>
  </div>
</template>

<script setup>
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue';
import CarbonTimeline from '../../components/common/Timeline/Timeline.vue';
import LineChart from '../../components/common/Cards/ChartCard/LineChart/LineChart.vue';
</script>