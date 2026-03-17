<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" rounded="xl" elevation="2" width="400">
      <div class="text-h5 font-weight-bold mb-6">Connexion</div>

      <v-form @submit.prevent="login">
        <!-- Username -->
        <v-text-field
          v-model="username"
          label="Username"
          variant="outlined"
          :error-messages="usernameError"
          class="mb-4"
        />

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          :error-messages="passwordError"
          class="mb-4"
        />

        <!-- Error message -->
        <v-alert
          v-if="loginError"
          type="error"
          class="mb-4"
          density="comfortable"
        >
          Username ou password incorrect
        </v-alert>

        <v-btn color="primary" block size="large" type="submit">
          Se connecter
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const usernameError = ref('')
const passwordError = ref('')
const loginError = ref(false)

function login() {
  usernameError.value = ''
  passwordError.value = ''
  loginError.value = false

  if (!username.value) {
    usernameError.value = 'Le username est obligatoire'
  }

  if (!password.value) {
    passwordError.value = 'Le password est obligatoire'
  }

  if (!usernameError.value && !passwordError.value) {
    // simulation login
    if (username.value === 'admin' && password.value === '1234') {
      alert('Connexion réussie')
    } else {
      loginError.value = true
    }
  }
}
</script>