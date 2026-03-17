import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

function generateId() {
  return `${Date.now()}-${Math.round(Math.random() * 1e6)}`
}

function createSampleEntries({ baseEnergy, baseSurface, baseEmployees, baseParking }) {
  const entries = []
  const now = new Date()

  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(now)
    day.setDate(now.getDate() - i)
    const createdAt = day.toISOString()

    const trend = (i - 3) * 0.04
    const noise = (Math.random() - 0.5) * 0.1

    const energy = Math.round(baseEnergy * (1 + trend + noise))
    const surface = Math.round(baseSurface * (1 + trend * 0.05 + noise * 0.5))
    const parking = Math.round(baseParking * (1 + trend * 0.05 + noise * 0.5))
    const employees = Math.round(baseEmployees * (1 + trend * 0.03 + noise * 0.3))

    entries.push({
      id: generateId(),
      createdAt,
      energy,
      surface,
      parking,
      employees,
    })
  }

  return entries
}

function createSampleSites() {
  return [
    {
      id: generateId(),
      name: 'Site Paris Ouest',
      createdAt: new Date().toISOString(),
      entries: createSampleEntries({ baseEnergy: 4800, baseSurface: 12500, baseEmployees: 450, baseParking: 120 }),
    },
    {
      id: generateId(),
      name: 'Site Lyon Centre',
      createdAt: new Date().toISOString(),
      entries: createSampleEntries({ baseEnergy: 3200, baseSurface: 8200, baseEmployees: 320, baseParking: 80 }),
    },
  ]
}

export const useSiteStore = defineStore('site', () => {
  const sites = ref(createSampleSites())
  const selectedSiteId = ref(sites.value.length ? sites.value[0].id : null)

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

  function updateSiteName(id, name) {
    const site = sites.value.find((s) => s.id === id)
    if (!site) return null
    site.name = name
    return site
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

  function updateEntry(siteId, entryId, updates) {
    const site = sites.value.find((s) => s.id === siteId)
    if (!site) return null

    const entryIndex = site.entries.findIndex((e) => e.id === entryId)
    if (entryIndex === -1) return null

    site.entries[entryIndex] = {
      ...site.entries[entryIndex],
      ...updates,
    }

    return site.entries[entryIndex]
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
    updateSiteName,
    addEntry,
    updateEntry,
    removeEntry,
    setSelectedSite,
  }
})
