<template>
  <v-dialog :model-value="true" @update:modelValue="close" max-width="640">
    <v-card>
      <v-card-title class="justify-space-between">
        Ajouter des données
        <v-btn icon variant="text" @click="close" aria-label="Fermer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.surface"
                label="Surface (m²)"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.parking"
                label="Places de parking"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.energy"
                label="Consommation énergie (kWh/an)"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="form.employees"
                label="Nombre d'employés"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model.number="form.beton"
                label="Béton (kg)"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model.number="form.acier"
                label="Acier (kg)"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model.number="form.verre"
                label="Verre (kg)"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field
                v-model.number="form.bois"
                label="Bois (kg)"
                type="number"
                :rules="[rules.nonNegative]"
              />
            </v-col>
          </v-row>

          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="close">Annuler</v-btn>
            <v-btn color="primary" type="submit">Enregistrer</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  onClose: {
    type: Function,
    required: true,
  },
  onSave: {
    type: Function,
    required: true,
  },
})

const formRef = ref(null)

const form = reactive({
  surface: null,
  parking: null,
  energy: null,
  employees: null,
  beton: null,
  acier: null,
  verre: null,
  bois: null,
})

const rules = {
  nonNegative: (value) => value === null || value === undefined || value >= 0 || 'Doit être positif',
}

function close() {
  props.onClose()
}

function handleSubmit() {
  props.onSave({ ...form })
  close()
}
</script>
