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
const headers = [
  { title: 'Site', key: 'site' },
  { title: 'Surface (m²)', key: 'surface', align: 'end' },
  { title: 'Employés', key: 'employees', align: 'end' },
  { title: 'CO₂ total (t)', key: 'co2_total', align: 'end' },
  { title: 'CO₂ / m² (kg)', key: 'co2_m2', align: 'end' },
  { title: 'CO₂ / employé (t)', key: 'co2_employee', align: 'end' }
]

const sites = [
  {
    site: 'Site Paris Ouest',
    surface: '12 500',
    employees: 450,
    co2_total: '4 800',
    co2_m2: 0.38,
    co2_employee: 10.7
  },
  {
    site: 'Site Lyon Centre',
    surface: '8 200',
    employees: 320,
    co2_total: '3 200',
    co2_m2: 0.39,
    co2_employee: 10.0
  },
  {
    site: 'Site Marseille Sud',
    surface: '9 500',
    employees: 280,
    co2_total: '3 600',
    co2_m2: 0.38,
    co2_employee: 12.9
  },
  {
    site: 'Site Bordeaux',
    surface: '6 800',
    employees: 210,
    co2_total: '2 700',
    co2_m2: 0.40,
    co2_employee: 12.9
  },
  {
    site: 'Site Lille Nord',
    surface: '10 200',
    employees: 380,
    co2_total: '3 900',
    co2_m2: 0.38,
    co2_employee: 10.3
  }
]
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