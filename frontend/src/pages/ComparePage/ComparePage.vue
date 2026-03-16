<template>
  <v-row>
    <SiteSelector
      v-model="site1"
      title="Site 1"
      :sites="sites"
    />
    <SiteSelector
      v-model="site2"
      title="Site 2"
      :sites="sites"
    />
  </v-row>
  <div class="grid grid-cols-3 gap-4 mt-6">
    <MultiKpiCard
      title="CO₂ total"
      :items="[
        { label: 'Site Paris Ouest', value: '4 800', unit: 't', trend: 5 },
        { label: 'Site Lyon Centre', value: '3 200', unit: 't' }
      ]"
    />
    <MultiKpiCard
      title="CO₂ total"
      :items="[
        { label: 'Site Paris Ouest', value: '4 800', unit: 't', trend: 5 },
        { label: 'Site Lyon Centre', value: '3 200', unit: 't' }
      ]"
    />
    <MultiKpiCard
      title="CO₂ total"
      :items="[
        { label: 'Site Paris Ouest', value: '4 800', unit: 't', trend: 5 },
        { label: 'Site Lyon Centre', value: '3 200', unit: 't' }
      ]"
    />
  </div>
  <div class="grid grid-cols-2 gap-4 mt-6">
    <ChartCard title="Répartition par catégorie">
      <BarChart
        :labels="['Construction', 'Exploitation', 'Transport']"
        :datasets="[
          { label: 'Site Paris Ouest', data: [1650, 1950, 850], backgroundColor: '#3b82f6' },
          { label: 'Site Lyon Centre', data: [1700, 2150, 900], backgroundColor: '#10b981' },
        ]"
      />
    </ChartCard>
    <ChartCard title="Performance par domaine">
      <RadarChart
        style="height: 300px;"
        :labels="['Énergie', 'Transport', 'Déchets', 'Eau', 'Matériaux']"
        :datasets="[
          { label: 'Site Paris Ouest', data: [65, 70, 55, 60, 75], backgroundColor: 'rgba(59,130,246,0.2)', borderColor: '#3b82f6', pointBackgroundColor: '#3b82f6' },
          { label: 'Site Lyon Centre', data: [80, 85, 70, 75, 90], backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#10b981', pointBackgroundColor: '#10b981' },
        ]"
      />
    </ChartCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SiteSelector from '../../components/common/SiteSelector/SiteSelector.vue'
import MultiKpiCard from '../../components/common/Cards/MultiKpiCard/MultiKpiCard.vue'
import BarChart from '../../components/common/Cards/ChartCard/BarChart/BarChart.vue'
import RadarChart from '../../components/common/Cards/ChartCard/RadarChart/RadarChart.vue'
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue'

const sites = [
  'Site Paris Ouest',
  'Site Lyon Centre',
  'Site Marseille Sud',
  'Site Bordeaux',
  'Site Lille Nord'
]

const site1 = ref('Site Paris Ouest')
const site2 = ref('Site Lyon Centre')
</script>