<template>
  <v-container class="pa-6">
    <v-card rounded="xl" elevation="2" class="mb-8">
      <v-card-title class="text-h4 font-weight-bold pa-6">
        Liste des sites
      </v-card-title>

      <v-table class="site-table">
        <thead>
          <tr>
            <th>Site</th>
            <th class="text-center">Surface<br />(m²)</th>
            <th class="text-center">Employés</th>
            <th class="text-center">CO₂ total<br />(t)</th>
            <th class="text-center">CO₂ / m²<br />(kg)</th>
            <th class="text-center">CO₂ / employé<br />(t)</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="site in sites" :key="site.name">
            <td>{{ site.name }}</td>
            <td class="text-center">{{ site.surface }}</td>
            <td class="text-center">{{ site.employees }}</td>
            <td class="text-center">{{ site.co2Total }}</td>
            <td class="text-center">{{ site.co2m2 }}</td>
            <td class="text-center">{{ site.co2Employee }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-card rounded="xl" elevation="2" class="pa-6">
      <v-card-title class="text-h4 font-weight-bold mb-4">
        Jalons et initiatives
      </v-card-title>

      <v-timeline align="start" density="comfortable">
        <v-timeline-item dot-color="blue">
          <template #opposite>
            2020
          </template>

          <div>
            <strong>Audit initial carbone</strong>
            <div>Mise en place du suivi des émissions</div>
          </div>
        </v-timeline-item>

        <v-timeline-item dot-color="blue">
          <template #opposite>
            2021
          </template>

          <div>
            <strong>Plan de réduction CO₂</strong>
            <div>Objectif -25% sur 5 ans</div>
          </div>
        </v-timeline-item>

        <v-timeline-item dot-color="blue">
          <template #opposite>
            2022
          </template>

          <div>
            <strong>Isolation des bâtiments</strong>
            <div>Rénovation énergétique de 3 sites</div>
          </div>
        </v-timeline-item>

        <v-timeline-item dot-color="blue">
          <template #opposite>
            2023
          </template>

          <div>
            <strong>Énergies renouvelables</strong>
            <div>Installation de panneaux solaires</div>
          </div>
        </v-timeline-item>

        <v-timeline-item dot-color="blue">
          <template #opposite>
            2024
          </template>

          <div>
            <strong>Flotte électrique</strong>
            <div>Conversion de 60% des véhicules</div>
          </div>
        </v-timeline-item>

        <v-timeline-item dot-color="blue">
          <template #opposite>
            2025
          </template>

          <div>
            <strong>Certification ISO 14001</strong>
            <div>Obtention de la certification environnementale</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </v-container>
</template>

<script setup>
const sites = [
  {
    name: 'Site Paris Ouest',
    surface: '12 500',
    employees: 450,
    co2Total: '4 800',
    co2m2: '0.38',
    co2Employee: '10.7',
  },
  {
    name: 'Site Lyon Centre',
    surface: '8 200',
    employees: 320,
    co2Total: '3 200',
    co2m2: '0.39',
    co2Employee: '10.0',
  },
  {
    name: 'Site Marseille Sud',
    surface: '9 500',
    employees: 280,
    co2Total: '3 600',
    co2m2: '0.38',
    co2Employee: '12.9',
  },
  {
    name: 'Site Bordeaux',
    surface: '6 800',
    employees: 210,
    co2Total: '2 700',
    co2m2: '0.40',
    co2Employee: '12.9',
  },
  {
    name: 'Site Lille Nord',
    surface: '10 200',
    employees: 380,
    co2Total: '3 900',
    co2m2: '0.38',
    co2Employee: '10.3',
  },
]
</script>

<style scoped>
.site-table {
  border-top: 1px solid #e5e7eb;
}

.site-table th {
  background-color: #f3f4f6;
  color: #475569;
  font-size: 18px;
  font-weight: 700;
  padding: 24px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.site-table td {
  font-size: 20px;
  color: #0f172a;
  padding: 28px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.site-table td:first-child,
.site-table th:first-child {
  text-align: left;
  min-width: 240px;
}

.site-table tr:last-child td {
  border-bottom: none;
}
</style>