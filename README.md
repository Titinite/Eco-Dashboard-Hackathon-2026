# 🌿 Eco Dashboard — Hackathon 2026 Capgemini × SUP de VINCI

> Plateforme fullstack de **calcul et suivi de l'empreinte carbone** d'un site physique (bâtiments, matériaux, énergie, exploitation).

---

## 📋 Table des matières

- [Contexte](#contexte)
- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation & lancement](#installation--lancement)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (Vue 3)](#frontend-vue-3)
  - [Mobile (React Native / Expo)](#mobile-react-native--expo)
- [Variables d'environnement](#variables-denvironnement)
- [API REST](#api-rest)
- [Calcul carbone](#calcul-carbone)
- [Structure du projet](#structure-du-projet)
- [Réalisation](#réalisation)

---

## Contexte

Ce projet a été développé dans le cadre du **Hackathon #26** organisé par **SUP de VINCI** en partenariat avec **Capgemini** (16 & 17 mars 2026).

L'objectif est de fournir aux organisations un outil simple et fiable pour :
- mesurer l'impact environnemental d'un site physique,
- identifier les principales sources d'émissions (construction vs exploitation),
- comparer plusieurs sites entre eux,
- historiser les données et visualiser leur évolution dans le temps.

---

## Architecture

```
Eco-Dashboard-Hackathon-2026/
├── backend/          # API REST — Java 17 / Spring Boot 4
├── frontend/         # Dashboard web — Vue 3 / Vite / Vuetify
└── mobile/           # Application terrain — React Native / Expo
```

Les trois modules communiquent via l'API REST exposée par le backend. L'authentification est sécurisée par **JWT**.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Java 17, Spring Boot 4, Spring Security, Spring Data JPA |
| Base de données | MySQL 8 |
| Authentification | JWT (jjwt 0.11.5) |
| Documentation API | SpringDoc OpenAPI / Swagger UI |
| Frontend web | Vue 3, Vite, Vuetify 4, Pinia, Chart.js, Tailwind CSS |
| Mobile | React Native 0.83, Expo 55, React Navigation 7 |

---

## Prérequis

- **Java 17+** (JDK)
- **Maven** (ou utiliser le wrapper `./mvnw` inclus)
- **MySQL 8+** en local
- **Node.js 20+** & **npm**
- **Expo CLI** (`npm install -g expo-cli`) pour le mobile

---

## Installation & lancement

### Backend (Spring Boot)

1. **Créer la base de données MySQL :**

```sql
CREATE DATABASE eco_dashboard CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. **Configurer les accès BDD** dans `backend/eco-dashboard-backend/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/eco_dashboard
spring.datasource.username=<votre_utilisateur>
spring.datasource.password=<votre_mot_de_passe>
```

3. **Lancer le backend :**

```bash
cd backend/eco-dashboard-backend
./mvnw spring-boot:run
```

Le serveur démarre sur **http://localhost:8080**.  
La documentation Swagger est accessible sur **http://localhost:8080/swagger-ui/index.html**.

---

### Frontend (Vue 3)

```bash
cd frontend
npm install
npm run dev
```

L'application est disponible sur **http://localhost:5173**.

---

### Mobile (React Native / Expo)

```bash
cd mobile
npm install
npx expo start
```

Scanner le QR code avec l'application **Expo Go** (iOS/Android) ou lancer sur émulateur :

```bash
npx expo start --android   # Android
npx expo start --ios       # iOS (macOS uniquement)
```

L'application n'a pas pu être réalisé !

---

## Variables d'environnement

| Variable | Description | Valeur par défaut |
|---|---|---|
| `spring.datasource.url` | URL de connexion MySQL | `jdbc:mysql://localhost:3306/eco_dashboard` |
| `spring.datasource.username` | Utilisateur BDD | `root` |
| `spring.datasource.password` | Mot de passe BDD | *(vide)* |
| `jwt.secret` | Clé secrète JWT | À définir en production |

---

## API REST

Base URL : `http://localhost:8080`

### Authentification

| Méthode | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Créer un compte |
| `POST` | `/auth/login` | Obtenir un token JWT |

### Sites

Tous les endpoints `/sites` nécessitent le header `Authorization: Bearer <token>`.

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/sites` | Lister tous les sites |
| `GET` | `/sites/{id}` | Détail d'un site |
| `POST` | `/sites` | Créer un site et calculer son empreinte |
| `PUT` | `/sites/{id}` | Mettre à jour un site (recalcul automatique) |
| `DELETE` | `/sites/{id}` | Supprimer un site |

**Exemple de payload `POST /sites` :**

```json
{
  "name": "Site Capgemini Rennes",
  "surface": 11771,
  "parkingPlaces": 308,
  "energyConsumption": 1840000,
  "employees": 1800,
  "materials": [
    { "name": "Béton", "quantity": 5000, "emissionFactor": 0.159 },
    { "name": "Acier", "quantity": 800, "emissionFactor": 1.46 },
    { "name": "Verre", "quantity": 200, "emissionFactor": 0.85 },
    { "name": "Bois", "quantity": 150, "emissionFactor": 0.046 }
  ]
}
```

**Réponse :** le champ `carbonTotal` est calculé automatiquement et persisté.

---

## Calcul carbone

Le calcul est effectué côté backend dans `CarbonService` et suit les facteurs d'émission officiels **ADEME**.

### Empreinte construction

```
CO₂_construction = Σ (quantité_matériau × facteur_émission_matériau)
```

Facteurs d'émission de référence (kgCO₂e/kg) :

| Matériau | Facteur (kgCO₂e/kg) |
|---|---|
| Béton | 0.159 |
| Acier | 1.46 |
| Verre | 0.85 |
| Bois | 0.046 |

### Empreinte exploitation (énergie)

```
CO₂_exploitation = consommation_kWh × 0.05 kgCO₂e/kWh
```

### KPIs exposés

- **CO₂ total** = CO₂_construction + CO₂_exploitation
- **CO₂ par m²** = CO₂_total / surface
- **CO₂ par employé** = CO₂_total / employees

---

## Structure du projet

```
backend/eco-dashboard-backend/src/main/java/com/hackathon/eco_dashboard_backend/
├── controller/
│   ├── AuthController.java       # Endpoints login / register
│   └── SiteController.java       # CRUD sites
├── dto/
│   └── LoginRequest.java
├── model/
│   ├── Site.java                 # Entité principale
│   ├── Material.java             # Matériaux de construction
│   └── User.java                 # Utilisateurs
├── repository/
│   ├── SiteRepository.java
│   └── UserRepository.java
├── security/
│   ├── JwtFilter.java            # Filtre d'authentification
│   ├── SecurityConfig.java
│   └── OpenApiConfig.java
└── service/
    ├── AuthService.java
    ├── CarbonService.java        # Logique de calcul CO₂
    ├── JwtService.java
    └── SiteService.java

frontend/src/
├── components/
│   ├── common/
│   │   ├── Cards/                # KpiCard, ChartCard (Bar, Line, Radar)
│   │   ├── SiteSelector/
│   │   ├── SitesTable/
│   │   └── Timeline/
│   └── layout/                   # Header, Sidebar, Footer
├── pages/
│   ├── Auth/                     # Login, Register
│   ├── DashboardPage/            # Vue principale avec KPIs et graphiques
│   ├── GestionPage/              # Gestion des sites (CRUD)
│   ├── ComparePage/              # Comparaison multi-sites
│   ├── HistoryPage/              # Historisation
│   ├── SettingsPage/
│   └── ProfilPage/
├── stores/
│   ├── auth.js                   # Store Pinia — authentification
│   └── siteStore.js              # Store Pinia — sites & données carbone
└── router/index.js

mobile/
├── App.js                        # Navigation principale
└── index.js
```

## Réalisation

Ce projet a été réalisé en 2 jours dans le cadre d'un hackathon étudiant.

---
