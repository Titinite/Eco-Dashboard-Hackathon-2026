
<template>
  <v-container class="pa-6 bg-grey-lighten-4 fill-height">
    <!-- Objectifs carbone -->
    <v-card rounded="xl" elevation="2" class="pa-6 mb-8">
      <div class="section-title mb-6">Objectifs carbone</div>

      <div class="mb-6">
        <label class="field-label">Objectif de réduction annuel (%)</label>
        <v-text-field
          v-model.number="annualReduction"
          type="number"
          step="1"
          min="0"
          max="100"
          variant="outlined"
          density="comfortable"
          hide-details
          class="rounded-field"
        />
      </div>

      <div>
        <label class="field-label">Année cible neutralité carbone</label>
        <v-text-field
          v-model.number="targetYear"
          type="number"
          step="1"
          min="2000"
          max="4000"
          variant="outlined"
          density="comfortable"
          hide-details
          class="rounded-field"
        />
      </div>
    </v-card>

    <!-- Paramètres de calcul -->
    <v-card rounded="xl" elevation="2" class="pa-6 mb-8">
      <div class="section-title mb-6">Paramètres de calcul</div>

      <div
        v-for="(item, index) in factors"
        :key="index"
        class="factor-row mb-5"
      >
        <div>
          <div class="factor-title">{{ item.title }}</div>
          <div class="factor-subtitle">{{ item.subtitle }}</div>
        </div>

        <v-text-field
          v-model.number="item.value"
          type="number"
          step="0.001"
          :min="item.min"
          :max="item.max"
          variant="outlined"
          density="comfortable"
          hide-details
          class="factor-input"
        />
        
      </div>
      <v-btn
          color="grey-lighten-3"
          size="x-large"
          rounded="xl"
          class="export-btn text-none text-grey-darken-3"
          elevation="0"
        >
          Bouton
        </v-btn>
    </v-card>

    <!-- Export -->
    <v-card rounded="xl" elevation="2" class="pa-6">
      <div class="section-title mb-6">Export de données</div>

      <div class="d-flex flex-wrap ga-4">
        <v-btn
          color="primary"
          size="x-large"
          rounded="xl"
          class="export-btn"
        >
          Exporter en CSV
        </v-btn>

        <v-btn
          color="grey-lighten-3"
          size="x-large"
          rounded="xl"
          class="export-btn text-none text-grey-darken-3"
          elevation="0"
        >
          Exporter en PDF
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

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
</script>

<style scoped>
.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.field-label {
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #334155;
}

.factor-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  background: #f8fafc;
  border-radius: 20px;
  padding: 22px 28px;
}

.factor-title {
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}

.factor-subtitle {
  font-size: 15px;
  color: #64748b;
  margin-top: 4px;
}

.factor-input {
  max-width: 180px;
  min-width: 160px;
}

.export-btn {
  min-width: 260px;
  height: 78px;
  font-size: 22px;
  font-weight: 700;
  text-transform: none;
}

:deep(.rounded-field .v-field),
:deep(.factor-input .v-field) {
  border-radius: 18px;
}

:deep(.rounded-field input),
:deep(.factor-input input) {
  font-size: 20px;
  font-weight: 500;
  color: #0f172a;
}

@media (max-width: 768px) {
  .factor-row {
    flex-direction: column;
    align-items: stretch;
  }

  .factor-input {
    max-width: 100%;
  }

  .export-btn {
    width: 100%;
    min-width: unset;
  }
}
</style>

