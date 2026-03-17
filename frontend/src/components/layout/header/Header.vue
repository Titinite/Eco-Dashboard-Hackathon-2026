<template>
  <v-app-bar flat color="white" border="b" height="60" :elevation="0" style="z-index: 1004; left: 0 !important; border-bottom: 1px solid #e5e7eb !important;">

    <div class="flex items-center gap-2 px-5">
      <span class="text-xl">🌿</span>
      <span class="text-[15px] font-bold tracking-tight text-gray-900">Eco Dashboard</span>
    </div>

    <v-divider vertical class="mx-3 my-3" />

    <v-app-bar-title>
      <span class="text-[17px] font-bold tracking-tight text-gray-900">Hackathon 2026</span>
    </v-app-bar-title>

    <template #append>
      <div class="flex items-center gap-3 mr-4">

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
              class="font-normal"
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

        <v-menu min-width="180">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon size="small">
              <v-avatar color="primary" size="32">
                <span class="text-white text-xs font-semibold">{{ initials }}</span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list density="compact" rounded="lg" elevation="3">
            <v-list-item disabled class="py-3">
              <v-list-item-title class="text-sm font-semibold text-gray-900">
                {{ authStore.user?.username }}
              </v-list-item-title>
            </v-list-item>
            <v-divider class="my-1" />
            <v-list-item
              prepend-icon="mdi-account-outline"
              title="Mon profil"
              rounded="lg"
              @click="router.push('/profil')"
            />
            <v-list-item
              prepend-icon="mdi-logout"
              title="Déconnexion"
              rounded="lg"
              base-color="red"
              @click="handleLogout"
            />
          </v-list>
        </v-menu>

      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { useSiteStore } from '../../../stores/siteStore'

const router    = useRouter()
const authStore = useAuthStore()
const siteStore = useSiteStore()

const emit = defineEmits(['add'])

const selectedSite = computed(() => siteStore.selectedSite)
const sites = computed(() => siteStore.sites)

const initials = computed(() => {
  const u = authStore.user
  if (!u) return '?'
  if (u.firstName && u.lastName) return `${u.firstName[0]}${u.lastName[0]}`.toUpperCase()
  if (u.email) return u.email[0].toUpperCase()
  return '?'
})

function selectSite(site) {
  siteStore.setSelectedSite(site?.id ?? null)
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>