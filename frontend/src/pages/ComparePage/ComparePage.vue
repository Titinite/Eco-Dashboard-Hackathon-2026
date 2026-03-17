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

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
    <MultiKpiCard
      title="CO₂ total"
      :items="co2Items"
    />
    <MultiKpiCard
      title="CO₂ / m²"
      :items="co2M2Items"
    />
    <MultiKpiCard
      title="CO₂ / employé"
      :items="co2EmployeeItems"
    />
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
    <ChartCard title="Répartition par catégorie">
      <BarChart
        :labels="['Construction', 'Exploitation', 'Transport']"
        :datasets="distributionDatasets"
      />
    </ChartCard>

    <ChartCard title="Performance par domaine">
      <RadarChart
        style="height: 300px;"
        :labels="['Énergie', 'Transport', 'Déchets', 'Eau', 'Matériaux']"
        :datasets="performanceDatasets"
      />
    </ChartCard>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSiteStore } from '../../stores/siteStore'
import SiteSelector from '../../components/common/SiteSelector/SiteSelector.vue'
import MultiKpiCard from '../../components/common/Cards/MultiKpiCard/MultiKpiCard.vue'
import BarChart from '../../components/common/Cards/ChartCard/BarChart/BarChart.vue'
import RadarChart from '../../components/common/Cards/ChartCard/RadarChart/RadarChart.vue'
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue'

const siteStore = useSiteStore()
const sites = computed(() => siteStore.sites.map((s) => s.name))

const site1 = ref(sites.value[0] ?? null)
const site2 = ref(sites.value[1] ?? null)

const selectedSite1 = computed(() => siteStore.sites.find((s) => s.name === site1.value) || null)
const selectedSite2 = computed(() => siteStore.sites.find((s) => s.name === site2.value) || null)

const latestEntry = (site) => {
  const entries = site?.entries ?? []
  return entries.length ? entries[entries.length - 1] : null
}

const computeTrend = (entries) => {
  if (!entries?.length || entries.length < 2) return 0
  const last = entries[entries.length - 1]?.energy ?? 0
  const prev = entries[entries.length - 2]?.energy ?? 0
  if (!prev) return 0
  return Math.round(((last - prev) / prev) * 100)
}

const co2Items = computed(() => [
  {
    label: selectedSite1.value?.name ?? '—',
    value: latestEntry(selectedSite1.value)?.energy ?? 0,
    unit: 't',
    trend: computeTrend(selectedSite1.value?.entries),
  },
  {
    label: selectedSite2.value?.name ?? '—',
    value: latestEntry(selectedSite2.value)?.energy ?? 0,
    unit: 't',
    trend: computeTrend(selectedSite2.value?.entries),
  },
])

const co2M2Items = computed(() => [
  {
    label: selectedSite1.value?.name ?? '—',
    value: (() => {
      const entry = latestEntry(selectedSite1.value)
      if (!entry?.energy || !entry?.surface) return 0
      return +(entry.energy / entry.surface).toFixed(2)
    })(),
    unit: 'kg',
    trend: computeTrend(selectedSite1.value?.entries),
  },
  {
    label: selectedSite2.value?.name ?? '—',
    value: (() => {
      const entry = latestEntry(selectedSite2.value)
      if (!entry?.energy || !entry?.surface) return 0
      return +(entry.energy / entry.surface).toFixed(2)
    })(),
    unit: 'kg',
    trend: computeTrend(selectedSite2.value?.entries),
  },
])

const co2EmployeeItems = computed(() => [
  {
    label: selectedSite1.value?.name ?? '—',
    value: (() => {
      const entry = latestEntry(selectedSite1.value)
      if (!entry?.energy || !entry?.employees) return 0
      return +(entry.energy / entry.employees).toFixed(2)
    })(),
    unit: 't',
    trend: computeTrend(selectedSite1.value?.entries),
  },
  {
    label: selectedSite2.value?.name ?? '—',
    value: (() => {
      const entry = latestEntry(selectedSite2.value)
      if (!entry?.energy || !entry?.employees) return 0
      return +(entry.energy / entry.employees).toFixed(2)
    })(),
    unit: 't',
    trend: computeTrend(selectedSite2.value?.entries),
  },
])

const distributionDatasets = computed(() => {
  const toData = (site, color) => {
    const entry = latestEntry(site)
    const total = entry?.energy ?? 0
    const construction = Math.round(total * 0.35)
    const exploitation = Math.round(total * 0.45)
    const transport = Math.max(0, total - construction - exploitation)

    return {
      label: site?.name ?? '—',
      data: [construction, exploitation, transport],
      backgroundColor: color,
    }
  }

  return [
    toData(selectedSite1.value, '#3b82f6'),
    toData(selectedSite2.value, '#10b981'),
  ]
})

const performanceDatasets = computed(() => {
  const toData = (site, colors) => {
    const entry = latestEntry(site)
    return {
      label: site?.name ?? '—',
      data: [
        entry?.energy ?? 0,
        entry?.parking ?? 0,
        entry?.surface ?? 0,
        entry?.employees ?? 0,
        50,
      ],
      backgroundColor: colors.background,
      borderColor: colors.border,
      pointBackgroundColor: colors.point,
    }
  }

  return [
    toData(selectedSite1.value, {
      background: 'rgba(59,130,246,0.2)',
      border: '#3b82f6',
      point: '#3b82f6',
    }),
    toData(selectedSite2.value, {
      background: 'rgba(16,185,129,0.2)',
      border: '#10b981',
      point: '#10b981',
    }),
  ]
})
</script>
