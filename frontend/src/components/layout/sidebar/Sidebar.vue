<template>
  <v-navigation-drawer
    v-if="!isMobile"
    permanent
    width="240"
    elevation="0"
    style="top: 61px; height: calc(100% - 61px);"
  >
    <v-list nav density="comfortable" class="px-3 pt-5">
      <v-list-item
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.label"
        rounded="lg"
        color="primary"
        class="mb-1"
      />
    </v-list>
  </v-navigation-drawer>

  <!-- Bottom nav mobile -->
  <v-bottom-navigation
    v-if="isMobile"
    v-model="activeTab"
    color="primary"
    grow
  >
    <v-btn
      v-for="item in navItems"
      :key="item.to"
      :value="item.to"
      :to="item.to"
      :prepend-icon="item.icon"
    >
      <span>{{ item.label }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const navItems = [
  { to: '/',         icon: 'mdi-office-building-outline', label: 'Sites'       },
  { to: '/compare',  icon: 'mdi-chart-bar',               label: 'Comparaison' },
  { to: '/history',  icon: 'mdi-history',                 label: 'Historique'  },
  { to: '/gestion',  icon: 'mdi-file-cog-outline',        label: 'Gestion'     },
  { to: '/settings', icon: 'mdi-cog-outline',             label: 'Paramètres'  },
]

const route = useRoute()
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value < 960)
const activeTab = computed(() => route.path)

const onResize = () => { windowWidth.value = window.innerWidth }
onMounted(() => window.addEventListener('resize', onResize))
onUnmounted(() => window.removeEventListener('resize', onResize))
</script>