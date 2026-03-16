<template>
  <v-app>
    <Header />
    <Sidebar />

    <v-main style="background-color: #f3f4f6;">
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script setup>
import Sidebar from './sidebar/Sidebar.vue'
import Header from './header/Header.vue'
import Footer from './footer/Footer.vue';
</script>