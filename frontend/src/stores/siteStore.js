import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

function generateId() {
  return `${Date.now()}-${Math.round(Math.random() * 1e6)}`
}

export const useSiteStore = defineStore('site', () => {
  const sites = ref([])
  const selectedSiteId = ref(null)

  const selectedSite = computed(() => {
    return sites.value.find((s) => s.id === selectedSiteId.value) || null
  })

  function addSite(name) {
    const site = {
      id: generateId(),
      name: name.trim() || `Site ${sites.value.length + 1}`,
      createdAt: new Date().toISOString(),
      entries: [],
    }
    sites.value.push(site)
    selectedSiteId.value = site.id
    return site
  }

  function removeSite(id) {
    sites.value = sites.value.filter((s) => s.id !== id)
    if (selectedSiteId.value === id) {
      selectedSiteId.value = sites.value.length ? sites.value[0].id : null
    }
  }

  function addEntry(siteId, entry) {
    const site = sites.value.find((s) => s.id === siteId)
    if (!site) return null

    const newEntry = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...entry,
    }
    site.entries.push(newEntry)
    return newEntry
  }

  function removeEntry(siteId, entryId) {
    const site = sites.value.find((s) => s.id === siteId)
    if (!site) return
    site.entries = site.entries.filter((e) => e.id !== entryId)
  }

  function setSelectedSite(id) {
    selectedSiteId.value = id
  }

  return {
    sites,
    selectedSiteId,
    selectedSite,
    addSite,
    removeSite,
    addEntry,
    removeEntry,
    setSelectedSite,
  }
})
