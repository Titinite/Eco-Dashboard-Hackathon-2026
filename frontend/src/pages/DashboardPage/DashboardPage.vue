<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <KpiCard label="CO₂ total" value="18 200" unit="t" :trend="-8" />
      <KpiCard label="CO₂ / m²" value="0.39" unit="kg" :trend="-5" />
      <KpiCard label="CO₂ / employé" value="11.1" unit="t" :trend="-12" />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-6">
      <v-col cols="12" md="6">
        <DashboardCard title="Évolution des émissions">
          <LineChart />
        </DashboardCard>
      </v-col>

      <v-col cols="12" md="6">
        <DashboardCard title="Répartition par catégorie">
          <BarChart />
        </DashboardCard>
      </v-col>
    </div>
    <div class="mt-6">
      <SitesTable />
    </div>
  </div>
</template>

<script setup>
import KpiCard from '../../components/common/Cards/KpiCard/KpiCard.vue';
import DashboardCard from '../../components/common/Cards/ChartCard/ChartCard.vue';
import LineChart from '../../components/common/Cards/ChartCard/LineChart/LineChart.vue';
import BarChart from '../../components/common/Cards/ChartCard/BarChart/BarChart.vue';
import SitesTable from '../../components/common/SitesTable/SitesTable.vue';
</script>