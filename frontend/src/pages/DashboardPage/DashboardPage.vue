<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <KpiCard label="CO₂ total" value="18 200" unit="t" :trend="-8" />
      <KpiCard label="CO₂ / m²" value="0.39" unit="kg" :trend="-5" />
      <KpiCard label="CO₂ / employé" value="11.1" unit="t" :trend="-12" />
    </div>
    <div class="grid grid-cols-2 gap-4 mt-6">
      <ChartCard title="Évolution des émissions">
        <div style="height: 300px;">
          <LineChart
            :labels="['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']"
            :datasets="[
              { label: 'Émissions t CO₂', data: [4300, 3800, 4100, 3900, 3500, 3300, 3450, 3200, 3600, 3800, 3950, 3700], borderColor: '#3b82f6', backgroundColor: '#3b82f6' }
            ]"
          />
        </div>
      </ChartCard>
      <ChartCard title="Répartition par catégorie">
        <div style="height: 300px;">
          <BarChart
            :labels="['Construction', 'Exploitation', 'Transport']"
            :datasets="[{ label: 'CO₂', data: [5200, 9000, 3300], backgroundColor: '#3b82f6' }]"
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
import KpiCard from '../../components/common/Cards/KpiCard/KpiCard.vue';
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue';
import LineChart from '../../components/common/Cards/ChartCard/LineChart/LineChart.vue';
import BarChart from '../../components/common/Cards/ChartCard/BarChart/BarChart.vue';
import SitesTable from '../../components/common/SitesTable/SitesTable.vue';
</script>