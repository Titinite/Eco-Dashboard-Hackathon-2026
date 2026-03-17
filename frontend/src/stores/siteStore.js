import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

function generateId() {
  return `${Date.now()}-${Math.round(Math.random() * 1e6)}`
}

function createSampleEntries({ baseEnergy, baseSurface, baseEmployees, baseParking, baseBeton, baseAcier, baseVerre, baseBois, noiseSet = 0 }) {
  const entries = []
  const now = new Date()

  const noiseSets = {
    0: {
      energy:    [0.12, -0.06,  0.08, -0.03,  0.05],
      surface:   [0.08, -0.04,  0.06, -0.02,  0.04],
      parking:   [-0.05,  0.06, -0.03,  0.05, -0.01],
      employees: [0.03, -0.02,  0.04, -0.01,  0.02],
      materials: [0.05, -0.03,  0.07, -0.02,  0.04],
    },
    1: {
      energy: [-0.10, -0.06, 0.02, -1.10, 1.15],
      surface:   [0.02,  0.010,  -0.09, -0.06, -0.01],
      parking:   [ 0.07, 0.05,  0.02,  0.08, -0.04],
      employees: [ 0.01,  -0.06, -0.04,  0.02, 0.06],
      materials: [ 0.08, -0.08,  0.03, -0.02,  0.06],
    },

  }

  const noise = noiseSets[noiseSet]

  for (let offset = 4; offset >= 0; offset -= 1) {
    const date = new Date(now)
    date.setFullYear(now.getFullYear() - offset)
    const createdAt = date.toISOString()

    const trend = (offset - 2) * 0.02

    const energy    = Math.round(baseEnergy    * (1 + trend + noise.energy[offset]))
    const surface   = Math.round(baseSurface   * (1 + trend * 0.05 + noise.surface[offset]))
    const parking   = Math.round(baseParking   * (1 + trend * 0.05 + noise.parking[offset]))
    const employees = Math.round(baseEmployees * (1 + trend * 0.03 + noise.employees[offset]))
    const beton     = Math.round(baseBeton     * (1 + trend * 0.03 + noise.materials[offset]))
    const acier     = Math.round(baseAcier     * (1 + trend * 0.03 + noise.materials[offset]))
    const verre     = Math.round(baseVerre     * (1 + trend * 0.03 + noise.materials[offset]))
    const bois      = Math.round(baseBois      * (1 + trend * 0.03 + noise.materials[offset]))

    entries.push({
      id: generateId(),
      createdAt,
      energy,
      surface,
      parking,
      employees,
      beton,
      acier,
      verre,
      bois,
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
      entries: createSampleEntries({
        baseEnergy: 4800,
        baseSurface: 12500,
        baseEmployees: 450,
        baseParking: 120,
        baseBeton: 15000,
        baseAcier: 3500,
        baseVerre: 1200,
        baseBois: 800,
        noiseSet: 0,
      }),
    },
    {
      id: generateId(),
      name: 'Site Lyon Centre',
      createdAt: new Date().toISOString(),
      entries: createSampleEntries({
        baseEnergy: 3200,
        baseSurface: 8200,
        baseEmployees: 320,
        baseParking: 80,
        baseBeton: 11000,
        baseAcier: 2800,
        baseVerre: 900,
        baseBois: 650,
        noiseSet: 1,
      }),
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
