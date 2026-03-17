<template>
  <v-container class="fill-height d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card class="pa-6" rounded="xl" elevation="2" width="400">
      <div class="text-h5 font-weight-bold mb-6">Créer un compte</div>

      <v-form @submit.prevent="register">
        <v-text-field
          v-model="username"
          label="Nom d'utilisateur"
          variant="outlined"
          :error-messages="usernameError"
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          label="Mot de passe"
          type="password"
          variant="outlined"
          :error-messages="passwordError"
          class="mb-4"
        />

        <v-text-field
          v-model="confirmPassword"
          label="Confirmer le mot de passe"
          type="password"
          variant="outlined"
          :error-messages="confirmPasswordError"
          class="mb-4"
        />

        <v-btn color="primary" block size="large" type="submit">
          S'inscrire
        </v-btn>

        <div class="text-center mt-4 text-sm text-gray-500">
          Déjà un compte ?
          <RouterLink to="/login" class="text-primary font-medium">Se connecter</RouterLink>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

function validate() {
  usernameError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  let valid = true

  if (!username.value) {
    usernameError.value = 'Le nom d\'utilisateur est obligatoire'
    valid = false
  }

  if (!password.value) {
    passwordError.value = 'Le mot de passe est obligatoire'
    valid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Le mot de passe doit faire au moins 6 caractères'
    valid = false
  }

  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Veuillez confirmer le mot de passe'
    valid = false
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
    valid = false
  }

  return valid
}

function register() {
  if (!validate()) return

  authStore.setAuth('fake-token', {
    username: username.value,
  })
  router.push('/')
}
</script>