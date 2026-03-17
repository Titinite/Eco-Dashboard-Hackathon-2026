<template>
  <div class="gap-6 grid grid-cols-1">
    <ChartCard :title="`Évolution historique (${selectedSite?.name ?? 'Aucun site'})`">
      <div style="height: 400px; width: 100%;">
        <LineChart
          :labels="historyLabels"
          :datasets="[
            { label: 'Émissions (kWh)', data: historyData, borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
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
import { computed } from 'vue'
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue'
import CarbonTimeline from '../../components/common/Timeline/Timeline.vue'
import LineChart from '../../components/common/Cards/ChartCard/LineChart/LineChart.vue'
import { useSiteStore } from '../../stores/siteStore'

const siteStore = useSiteStore()
const selectedSite = computed(() => siteStore.selectedSite)

const historyLabels = computed(() => {
  const entries = selectedSite.value?.entries ?? []
  return entries.map((e) => new Date(e.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }))
})

const historyData = computed(() => {
  const entries = selectedSite.value?.entries ?? []
  return entries.map((e) => e.energy ?? 0)
})
</script>
