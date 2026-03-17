<template>
  <v-card class="pa-4" rounded="lg" elevation="0" border>
    <v-card-title class="text-body-1 text-lg font-medium mb-2">
      Liste des sites
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="sites"
			items-per-page-text="Sites par page"
			page-text="{0}-{1} sur {2}"
			class="table-sites"
    />
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteStore } from '../../../stores/siteStore'

const headers = [
  { title: 'Site', key: 'site' },
  { title: 'Surface (m²)', key: 'surface', align: 'end' },
  { title: 'Employés', key: 'employees', align: 'end' },
  { title: 'CO₂ total (t)', key: 'co2_total', align: 'end' },
  { title: 'CO₂ / m² (kg)', key: 'co2_m2', align: 'end' },
  { title: 'CO₂ / employé (t)', key: 'co2_employee', align: 'end' }
]

const siteStore = useSiteStore()

const sites = computed(() =>
  siteStore.sites.map((site) => {
    const latest = site.entries[site.entries.length - 1] || {}
    const surface = latest.surface ?? '—'
    const employees = latest.employees ?? '—'
    const energy = latest.energy ?? '—'

    const co2M2 = typeof surface === 'number' && typeof energy === 'number'
      ? (energy / surface).toFixed(2)
      : '—'

    const co2Employee = typeof employees === 'number' && typeof energy === 'number'
      ? (energy / employees).toFixed(2)
      : '—'

    return {
      site: site.name,
      surface,
      employees,
      co2_total: energy,
      co2_m2: co2M2,
      co2_employee: co2Employee,
    }
  })
)
</script>

<style>
.table-sites thead {
  background-color: #f8fafc;
}

.table-sites th {
  font-weight: 600;
  font-size: 13px;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
</style>
