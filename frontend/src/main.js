import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './style.css'
import App from './App.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login',    component: () => import('./pages/Auth/LoginPage/LoginPage.vue'),       meta: { public: true } },
    { path: '/register', component: () => import('./pages/Auth/RegisterPage/RegisterPage.vue'), meta: { public: true } },
    { path: '/',         component: () => import('./pages/DashboardPage/DashboardPage.vue') },
    { path: '/gestion',  component: () => import('./pages/GestionPage/GestionPage.vue')  },
    { path: '/compare',  component: () => import('./pages/ComparePage/ComparePage.vue')   },
    { path: '/history',  component: () => import('./pages/HistoryPage/HistoryPage.vue')   },
    { path: '/settings', component: () => import('./pages/SettingsPage/SettingsPage.vue')  },
    { path: '/profil', component: () => import('./pages/ProfilPage/ProfilPage.vue') },
  ]
})

// Guard : redirige vers /login si non authentifié
router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (!to.meta.public && !token) {
    return { path: '/login' }
  }
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary:    '#3D7AF5',
          background: '#F3F4F6',
          surface:    '#FFFFFF',
        }
      }
    }
  }
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
