<template>
  <v-app class="d-flex flex-column fill-height">
    <Header @add="showModal = true" />
    <Sidebar />

    <AddDataModal
      v-if="showModal"
      :onClose="() => (showModal = false)"
      :onSave="handleSave"
    />

    <v-main class="grow" style="background-color: #f3f4f6;">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteStore } from '../../stores/siteStore'
import Sidebar from './sidebar/Sidebar.vue'
import Header from './header/Header.vue'
import Footer from './footer/Footer.vue'
import AddDataModal from '../AddDataModal.vue'

const siteStore = useSiteStore()
const showModal = ref(false)

function handleSave(data) {
  if (!siteStore.selectedSiteId) {
    console.warn('Aucun site sélectionné pour ajouter des données.')
    showModal.value = false
    return
  }

  siteStore.addEntry(siteStore.selectedSiteId, data)
  showModal.value = false
}
</script>
