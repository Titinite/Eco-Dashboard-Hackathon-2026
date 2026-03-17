<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiCard
        label="CO₂ total"
        :value="co2Total"
        unit="t"
        :trend="trendPercent"
      />
      <KpiCard
        label="CO₂ / m²"
        :value="co2PerM2"
        unit="kg"
        :trend="trendPercent"
      />
      <KpiCard
        label="CO₂ / employé"
        :value="co2PerEmployee"
        unit="t"
        :trend="trendPercent"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <ChartCard title="Évolution des émissions">
        <div style="height: 300px;">
          <LineChart
            :labels="trendLabels"
            :datasets="[{
              label: 'Émissions (kWh)',
              data: trendData,
              borderColor: '#3b82f6',
              backgroundColor: '#3b82f6'
            }]"
          />
        </div>
      </ChartCard>

      <ChartCard title="Répartition par catégorie">
        <div style="height: 300px;">
          <BarChart
            :labels="['Construction', 'Exploitation', 'Transport']"
            :datasets="[{
              label: selectedSite?.name || '—',
              data: distributionData,
              backgroundColor: '#3b82f6'
            }]"
          />
        </div>
      </ChartCard>
    </div>

    <div class="mt-6">
      <SitesTable />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import KpiCard from '../../components/common/Cards/KpiCard/KpiCard.vue'
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue'
import LineChart from '../../components/common/Cards/ChartCard/LineChart/LineChart.vue'
import BarChart from '../../components/common/Cards/ChartCard/BarChart/BarChart.vue'
import SitesTable from '../../components/common/SitesTable/SitesTable.vue'
import { useSiteStore } from '../../stores/siteStore'

const siteStore = useSiteStore()

const selectedSite = computed(() => siteStore.selectedSite)

const latestEntry = computed(() => {
  const entries = selectedSite.value?.entries ?? []
  return entries.length ? entries[entries.length - 1] : null
})

const previousEntry = computed(() => {
  const entries = selectedSite.value?.entries ?? []
  return entries.length > 1 ? entries[entries.length - 2] : null
})

const co2Total = computed(() => latestEntry.value?.energy ?? 0)

const co2PerM2 = computed(() => {
  if (!latestEntry.value?.energy || !latestEntry.value?.surface) return 0
  return Number((latestEntry.value.energy / latestEntry.value.surface).toFixed(2))
})

const co2PerEmployee = computed(() => {
  if (!latestEntry.value?.energy || !latestEntry.value?.employees) return 0
  return Number((latestEntry.value.energy / latestEntry.value.employees).toFixed(2))
})

const trendPercent = computed(() => {
  const prev = previousEntry.value?.energy
  const curr = latestEntry.value?.energy
  if (!prev || !curr) return 0
  const diff = curr - prev
  return Math.round((diff / prev) * 100)
})

const trendLabels = computed(() => {
  const entries = selectedSite.value?.entries ?? []
  return entries.map((e) => new Date(e.createdAt).toLocaleDateString('fr-FR', { year: 'numeric' }))
})

const trendData = computed(() => {
  const entries = selectedSite.value?.entries ?? []
  return entries.map((e) => e.energy ?? 0)
})

const distributionData = computed(() => {
  const entry = latestEntry.value
  if (!entry?.energy) return [0, 0, 0]

  // Simuler une répartition simple sur les coûts (placeholder)
  const total = entry.energy
  const construction = Math.round(total * 0.35)
  const exploitation = Math.round(total * 0.45)
  const transport = total - construction - exploitation
  return [construction, exploitation, transport]
})
</script>
