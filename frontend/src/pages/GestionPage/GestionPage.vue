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
              <v-btn icon variant="text" @click.stop="openEditSiteModal(site)">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
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
            <v-simple-table class="excel-table">
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
                    <v-btn icon variant="text" @click="openEditEntryModal(entry)">
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
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

    <v-dialog v-model="openEditSite" max-width="480">
      <v-card>
        <v-card-title>Modifier le nom du site</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editSiteName"
            label="Nom du site"
            placeholder="Ex: Site Lyon"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="openEditSite = false">Annuler</v-btn>
          <v-btn color="primary" @click="saveSiteName">Enregistrer</v-btn>
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
      :onClose="closeAddEntry"
      :onSave="handleAddEntry"
      :initialData="editingEntry"
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

const openEditSite = ref(false)
const editedSite = ref(null)
const editSiteName = ref('')

const openAddEntry = ref(false)
const editingEntry = ref(null)

const confirmDeleteOpen = ref(false)
const confirmMessage = ref('')
const confirmAction = ref(null)

function createSite() {
  siteStore.addSite(newSiteName.value || '')
  newSiteName.value = ''
  openCreateSite.value = false
}

function openEditSiteModal(site) {
  editedSite.value = site
  editSiteName.value = site.name
  openEditSite.value = true
}

function saveSiteName() {
  if (editedSite.value) {
    siteStore.updateSiteName(editedSite.value.id, editSiteName.value.trim() || editedSite.value.name)
  }
  openEditSite.value = false
}

function openEditEntryModal(entry) {
  editingEntry.value = entry
  openAddEntry.value = true
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

function closeAddEntry() {
  editingEntry.value = null
  openAddEntry.value = false
}

function handleAddEntry(data) {
  if (editingEntry.value) {
    siteStore.updateEntry(siteStore.selectedSiteId, editingEntry.value.id, data)
    editingEntry.value = null
  } else {
    siteStore.addEntry(siteStore.selectedSiteId, data)
  }
  openAddEntry.value = false
}
</script>

<style scoped>
.gestion-page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
}

.gestion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.gestion-header h1 {
  margin: 0 0 0.2rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.gestion-header p {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
}

:deep(.v-card) {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 0.75rem !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05) !important;
}

:deep(.v-card-title) {
  font-size: 1rem !important;
  font-weight: 600 !important;
  color: #1e293b !important;
  padding: 1rem 1.25rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

:deep(.v-list-item) {
  border-radius: 0.5rem !important;
}

:deep(.v-list-item--active) {
  background-color: #eff6ff !important;
  color: #2563eb !important;
}

:deep(.v-list-item-title) {
  font-weight: 600 !important;
  font-size: 0.9rem !important;
  color: #1e293b;
}

:deep(.v-list-item-subtitle) {
  font-size: 0.78rem !important;
  color: #94a3b8 !important;
}

:deep(.v-btn) {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0 !important;
  border-radius: 0.5rem !important;
  font-size: 0.875rem !important;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

:deep(.excel-table table) {
  border-collapse: collapse !important;
  width: 100% !important;
}

:deep(.excel-table thead tr th) {
  padding: 0.75rem 1rem !important;
  border: 1px solid #94a3b8 !important;
  border-bottom: 2px solid #94a3b8 !important;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  color: #1e293b !important;
  background-color: #e2e8f0 !important;
  white-space: nowrap !important;
  text-align: left !important;
}

:deep(.excel-table tbody tr td) {
  padding: 0.7rem 1rem !important;
  border: 1px solid #cbd5e1 !important;
  font-size: 0.875rem !important;
  color: #334155 !important;
  background-color: #ffffff !important;
  text-align: left !important;
  vertical-align: middle !important;
}

:deep(.excel-table tbody tr:nth-child(even) td) {
  background-color: #f1f5f9 !important;
}

:deep(.excel-table tbody tr:hover td) {
  background-color: #dbeafe !important;
}

:deep(.excel-table tbody tr td:first-child) {
  color: #64748b !important;
  font-weight: 600 !important;
  background-color: #f8fafc !important;
  border-right: 2px solid #94a3b8 !important;
  text-align: center !important;
}

:deep(.excel-table tbody tr td:last-child) {
  text-align: center !important;
  white-space: nowrap !important;
}

:deep(.v-dialog .v-card) {
  border-radius: 0.75rem !important;
}

:deep(.v-dialog .v-card-title) {
  font-size: 1.05rem !important;
  font-weight: 700 !important;
  padding: 1.25rem 1.5rem 0.5rem !important;
}

:deep(.v-dialog .v-card-text) {
  padding: 0.75rem 1.5rem !important;
}

:deep(.v-dialog .v-card-actions) {
  padding: 0.75rem 1.5rem 1.25rem !important;
  gap: 0.5rem;
}
</style>
