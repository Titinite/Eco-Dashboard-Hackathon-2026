<template>
  <v-container class="gestion-page">
    <div class="gestion-header">
      <div>
        <h1 class="text-h5">Gestion des sites</h1>
        <p class="text-body-2">Créez des sites, consultez leurs données et supprimez des éléments.</p>
      </div>

      <v-btn color="primary" variant="tonal" @click="openCreateSite = true">
        + Nouveau site
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Sites</v-card-title>
          <v-divider />

          <v-list density="comfortable">
            <v-list-item
              v-for="site in siteStore.sites"
              :key="site.id"
              :active="siteStore.selectedSiteId === site.id"
              @click="siteStore.setSelectedSite(site.id)"
              rounded="lg"
              class="mb-1"
            >
              <v-list-item-content>
                <v-list-item-title>{{ site.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ site.entries.length }} donnée(s)</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon variant="text" @click.stop="confirmDeleteSite(site)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item v-if="!siteStore.sites.length" class="justify-center">
              <span class="text-body-2">Aucun site créé pour le moment.</span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card v-if="siteStore.selectedSite">
          <v-card-title class="justify-space-between">
            <div>
              <h2 class="text-h6 mb-1">{{ siteStore.selectedSite.name }}</h2>
              <div class="text-body-2">{{ siteStore.selectedSite.entries.length }} donnée(s)</div>
            </div>

            <div class="d-flex gap-4 action-buttons">
              <v-btn color="secondary" variant="tonal" @click="openAddEntry = true">
                + Ajouter des données
              </v-btn>
              <v-btn color="error" variant="tonal" @click="confirmDeleteSite(siteStore.selectedSite)">
                Supprimer le site
              </v-btn>
            </div>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Surface (m²)</th>
                  <th class="text-left">Parking</th>
                  <th class="text-left">Énergie (kWh/an)</th>
                  <th class="text-left">Employés</th>
                  <th class="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(entry, index) in siteStore.selectedSite.entries"
                  :key="entry.id"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ entry.surface ?? '—' }}</td>
                  <td>{{ entry.parking ?? '—' }}</td>
                  <td>{{ entry.energy ?? '—' }}</td>
                  <td>{{ entry.employees ?? '—' }}</td>
                  <td>
                    <v-btn icon variant="text" color="error" @click="confirmDeleteEntry(entry)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>

                <tr v-if="!siteStore.selectedSite.entries.length">
                  <td colspan="6" class="text-center">Aucune donnée enregistrée pour ce site.</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>

        <v-card v-else class="pa-6">
          <div class="text-center">
            <p class="text-body-2">Sélectionnez un site pour afficher ses données.</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="openCreateSite" max-width="480">
      <v-card>
        <v-card-title>Créer un nouveau site</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newSiteName"
            label="Nom du site"
            placeholder="Ex: Site Lyon"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="openCreateSite = false">Annuler</v-btn>
          <v-btn color="primary" @click="createSite">Créer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmDeleteOpen" max-width="520">
      <v-card>
        <v-card-title>Confirmation</v-card-title>
        <v-card-text>
          <p>{{ confirmMessage }}</p>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="confirmDeleteOpen = false">Annuler</v-btn>
          <v-btn color="error" @click="performDelete">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <AddDataModal
      v-if="openAddEntry && siteStore.selectedSite"
      :onClose="() => (openAddEntry = false)"
      :onSave="handleAddEntry"
    />
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteStore } from '../../stores/siteStore'
import AddDataModal from '../../components/AddDataModal.vue'

const siteStore = useSiteStore()

const openCreateSite = ref(false)
const newSiteName = ref('')
const openAddEntry = ref(false)

const confirmDeleteOpen = ref(false)
const confirmMessage = ref('')
const confirmAction = ref(null)

function createSite() {
  siteStore.addSite(newSiteName.value || '')
  newSiteName.value = ''
  openCreateSite.value = false
}

function confirmDeleteSite(site) {
  confirmMessage.value = `Voulez-vous vraiment supprimer le site « ${site.name} » ? Cette action est irréversible.`
  confirmAction.value = () => {
    siteStore.removeSite(site.id)
    confirmDeleteOpen.value = false
  }
  confirmDeleteOpen.value = true
}

function confirmDeleteEntry(entry) {
  confirmMessage.value = `Supprimer ces données ? Cela ne pourra pas être annulé.`
  confirmAction.value = () => {
    siteStore.removeEntry(siteStore.selectedSiteId, entry.id)
    confirmDeleteOpen.value = false
  }
  confirmDeleteOpen.value = true
}

function performDelete() {
  if (confirmAction.value) confirmAction.value()
}

function handleAddEntry(data) {
  siteStore.addEntry(siteStore.selectedSiteId, data)
  openAddEntry.value = false
}
</script>

<style scoped>
.gestion-page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem 0 2rem;
}

.gestion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}

.gestion-header h1 {
  margin: 0;
  font-weight: 700;
}

.gestion-header p {
  margin: 0.25rem 0 0;
  color: rgba(55, 65, 81, 0.8);
}

.v-card {
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
  border-radius: 0.75rem;
}

/* ✅ Clé : :deep() pour percer l'encapsulation Vuetify */
:deep(.v-simple-table) {
  border-collapse: collapse !important;
  width: 100%;
  border: 2px solid #cbd5e1 !important;
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.v-simple-table table) {
  border-collapse: collapse !important;
  width: 100%;
}

:deep(.v-simple-table th),
:deep(.v-simple-table td) {
  padding: 0.75rem 1rem !important;
  border: 1px solid #cbd5e1 !important;
  text-align: left !important;
  vertical-align: middle !important;
}

:deep(.v-simple-table thead th) {
  font-weight: 700 !important;
  color: #334155 !important;
  background-color: #f1f5f9 !important;
  border-bottom: 2px solid #94a3b8 !important;
}

:deep(.v-simple-table tbody td) {
  color: rgba(55, 65, 81, 0.85);
}

:deep(.v-simple-table tbody tr:nth-child(odd)) {
  background-color: #f8fafc;
}

:deep(.v-simple-table tbody tr:hover) {
  background-color: #e2e8f0 !important;
  transition: background-color 0.15s ease;
}

:deep(.v-simple-table tbody tr td:last-child) {
  text-align: center !important;
}

.gestion-page .v-btn {
  border-radius: 0.5rem;
  text-transform: none;
  font-weight: 600;
}

.action-buttons {
  gap: 1.25rem;
}
</style>

