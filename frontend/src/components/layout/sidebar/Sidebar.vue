<template>
  <v-navigation-drawer permanent width="240" elevation="0" style="top: 61px; height: calc(100% - 61px);">
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
</template>

<script setup>
const navItems = [
  { to: '/',         icon: 'mdi-office-building-outline', label: 'Sites'       },
  { to: '/compare',  icon: 'mdi-chart-bar',               label: 'Comparaison' },
  { to: '/history',  icon: 'mdi-history',                 label: 'Historique'  },
  { to: '/gestion',  icon: 'mdi-file-cog-outline',        label: 'Gestion'     },
  { to: '/settings', icon: 'mdi-cog-outline',             label: 'Paramètres'  },
]
</script>
