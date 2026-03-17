<template>
  <v-app-bar flat color="white" height="75" :elevation="0" style="z-index: 1004; left: 0 !important; border-bottom: 2px solid #e5e7eb !important;">

    <div class="flex items-center gap-2 px-5">
      <span class="text-xl">🌿</span>
      <span class="text-[20px] font-bold tracking-tight text-gray-900 ml-4">Calculer l'empreinte carbone d'un site physique</span>
    </div>

    <template #append>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="outlined"
            rounded="lg"
            size="small"
            prepend-icon="mdi-office-building-outline"
            append-icon="mdi-chevron-down"
            color="grey-darken-1"
            class="mr-5 font-normal"
          >
            {{ selectedSite ? selectedSite.name : 'Tous les sites' }}
          </v-btn>
        </template>

        <v-list density="compact" rounded="lg" elevation="3" min-width="200">
          <v-list-item
            title="Tous les sites"
            :active="!selectedSite"
            active-color="primary"
            rounded="lg"
            @click="selectSite(null)"
          />
          <v-divider class="my-1" />
          <v-list-item
            v-for="site in sites"
            :key="site.id"
            :title="site.name"
            :active="selectedSite?.id === site.id"
            active-color="primary"
            rounded="lg"
            @click="selectSite(site)"
          />
        </v-list>
      </v-menu>
    </template>

  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteStore } from '../../../stores/siteStore'

const emit = defineEmits(['add'])
const siteStore = useSiteStore()

const selectedSite = computed(() => siteStore.selectedSite)
const sites = computed(() => siteStore.sites)

function selectSite(site) {
  siteStore.setSelectedSite(site.id)
}
</script>
