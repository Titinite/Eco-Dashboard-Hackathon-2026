<template>
  <v-footer padless color="white" class="px-6">
    <v-row dense>
      <v-col class="text-center text-sm-start text-md-start">
        <span class="text-gray-500 text-sm">© 2022 CarbonSite</span>
      </v-col>
      <v-col class="text-center text-sm-end text-md-end">
        <v-btn
          v-for="social in socials"
          :key="social.icon"
          variant="text"
          rounded="lg"
          icon
          class="mx-1"
        >
          <v-icon size="18">{{ social.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
const socials = [
  { icon: 'mdi-facebook', url: '#' },
  { icon: 'mdi-twitter', url: '#' },
  { icon: 'mdi-linkedin', url: '#' },
  { icon: 'mdi-instagram', url: '#' },
]
</script>