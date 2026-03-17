<template>
  <v-container class="fill-height d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card class="pa-6" rounded="xl" elevation="2" width="400">
      <div class="text-h5 font-weight-bold mb-6">Connexion</div>

      <v-form @submit.prevent="login">
        <v-text-field
          v-model="username"
          label="Username"
          variant="outlined"
          :error-messages="usernameError"
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          variant="outlined"
          :error-messages="passwordError"
          class="mb-4"
        />

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

        <div class="text-center mt-4 text-sm text-gray-500">
          Pas encore de compte ?
          <RouterLink to="/register" class="text-primary font-medium">S'inscrire</RouterLink>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth'
import { loginUser } from '../../../api/authApi'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

const usernameError = ref('')
const passwordError = ref('')
const loginError = ref('')

async function login() {
  usernameError.value = ''
  passwordError.value = ''
  loginError.value = ''

  if (!username.value) usernameError.value = 'Le username est obligatoire'
  if (!password.value) passwordError.value = 'Le password est obligatoire'

  if (usernameError.value || passwordError.value) return

  try {
    const data = await loginUser({ username: username.value, password: password.value })
    authStore.setAuth(data.token, data.user)
    router.push('/')
  } catch (err) {
    loginError.value = err.response?.data?.message || 'Username ou password incorrect'
  }
}
</script>