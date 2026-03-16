<template>
  <v-container class="pa-6">
    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="2" class="pa-6">
          <div class="text-h5 mb-6">Site 1</div>

          <v-select
            v-model="site1"
            :items="sites"
            label="Choisir un site"
            variant="outlined"
            density="comfortable"
            rounded="xl"
          />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="2" class="pa-6">
          <div class="text-h5 mb-6">Site 2</div>

          <v-select
            v-model="site2"
            :items="sites"
            label="Choisir un site"
            variant="outlined"
            density="comfortable"
            rounded="xl"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const sites = [
  'Site Paris Ouest',
  'Site Lyon Centre',
  'Site Marseille Sud',
  'Site Bordeaux',
  'Site Lille Nord',
]

const site1 = ref('Site Paris Ouest')
const site2 = ref('Site Lyon Centre')
</script>