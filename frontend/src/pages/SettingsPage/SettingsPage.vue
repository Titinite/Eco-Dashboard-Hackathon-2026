<template>
  <div class="grid gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="Objectifs carbones">
        <div class="space-y-4">

          <div>
            <label class="block mb-1 text-sm font-medium text-slate-600">
              Objectif de réduction annuel (%)
            </label>
            <v-text-field
              v-model.number="annualReduction"
              type="number"
              density="compact"
              variant="outlined"
              hide-details
              class="rounded-lg"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-slate-600">
              Année cible neutralité carbone
            </label>
            <v-text-field
              v-model.number="targetYear"
              type="number"
              density="compact"
              variant="outlined"
              hide-details
              class="rounded-lg"
            />
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Paramètres de calcul">
        <div class="space-y-3">
          <div
            v-for="(item, index) in factors"
            :key="index"
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-50 rounded-xl px-4 py-3"
          >
            <div class="flex-1">
              <div class="text-sm font-semibold text-slate-900">
                {{ item.title }}
              </div>
              <div class="text-xs text-slate-500">
                {{ item.subtitle }}
              </div>
            </div>

            <div class="flex justify-end md:w-32">
              <v-text-field
                v-model.number="item.value"
                type="number"
                density="compact"
                variant="outlined"
                hide-details
                class="w-full"
              />
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard title="Export de données">
        <div class="flex flex-col sm:flex-row gap-3">
          <v-btn
            color="primary"
            rounded="lg"
            class="h-10 text-sm font-semibold"
          >
            Exporter en CSV
          </v-btn>

          <v-btn
            color="grey-lighten-3"
            rounded="lg"
            elevation="0"
            class="h-10 text-sm font-medium text-slate-700"
          >
            Exporter en PDF
          </v-btn>
        </div>
      </ChartCard>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChartCard from '../../components/common/Cards/ChartCard/ChartCard.vue';

const annualReduction = ref(7)
const targetYear = ref(2040)

const factors = ref([
  {
    title: "Facteur d'émission électricité (kg CO₂/kWh)",
    subtitle: 'France - Mix énergétique national',
    value: 0.057,
    min: 0,
    max: 4000,
  },
  {
    title: "Facteur d'émission gaz naturel (kg CO₂/kWh)",
    subtitle: 'Chauffage et eau chaude',
    value: 0.228,
    min: 0,
    max: 4000,
  },
  {
    title: 'Facteur transport (kg CO₂/km/personne)',
    subtitle: 'Trajets domicile-travail',
    value: 0.195,
    min: 0,
    max: 4000,
  },
])

window.scrollTo(0, 0)
</script>