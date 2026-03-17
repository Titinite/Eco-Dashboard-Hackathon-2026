<template>
  <v-container class="profile-page d-flex justify-center align-start pa-0">
    <v-card class="profile-card pa-8" rounded="xl" elevation="1">
      <div class="d-flex flex-column align-center">
        <v-avatar size="260" class="profile-avatar mb-8">
          <v-img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Photo de profil"
          />
        </v-avatar>

        <h1 class="profile-name mb-8">{{ fullName }}</h1>

        <div class="username-field-wrapper d-flex justify-center">
          <v-btn
            color="primary"
            size="large"
            rounded="lg"
          >
            Modifier username
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const username = ref(authStore.user?.username || 'abakaradam')

const fullName = computed(() => {
  const firstName = authStore.user?.firstName || 'Adam'
  const lastName = authStore.user?.lastName || 'Abdallah ABAKAR'
  return `${firstName} ${lastName}`
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f6f8;
}

.profile-card {
  width: 100%;
  max-width: 760px;
  background: #ffffff;
}

.profile-avatar {
  border: 2px solid #d9dde3;
}

.profile-name {
  font-size: 56px;
  font-weight: 500;
  line-height: 1.1;
  text-align: center;
  color: #1f2937;
}

.username-field-wrapper {
  width: 100%;
  max-width: 520px;
}

:deep(.v-field--disabled) {
  opacity: 1 !important;
}

:deep(.v-field--disabled .v-field__input) {
  color: #1f2937 !important;
  -webkit-text-fill-color: #1f2937 !important;
  opacity: 1 !important;
  font-size: 22px;
}

:deep(.v-input__prepend) {
  color: #1f2937;

  :deep(.v-field__input) {
  font-size: 26px;
  font-weight: 500;
}
.modify-btn {
  font-size: 20px;
  padding: 14px 28px;
}
}
</style>