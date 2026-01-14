<template>
  <aside class="sidebar open">
    <!-- ===== LOGO ===== -->
    <h3 class="sidebar__logo">LAZNI</h3>

    <nav class="sidebar__nav">

      <!-- ===== MAIN ===== -->
      <p class="sidebar__section-label">Керування</p>
      <router-link 
        v-if="userTeamPrefs" 
        to="/dashboard/" 
        class="sidebar__nav__item"
        :class="{ active: $route.path.startsWith('/dashboard') }"
      >
        <div>
          <Icon :icon="$route.path.startsWith('/dashboard') ? 'dashboard-active' : 'dashboard'"></Icon>
          <p>Огляд</p>
        </div>
      </router-link>

      <!-- ===== MANAGEMENT ===== -->
      <template v-if="accessType === 'admin' || accessType === 'manage'">
      

        <router-link 
          to="/calendar/" 
          class="sidebar__nav__item"
          :class="{ active: $route.path.startsWith('/calendar') }"
        >
          <div>
            <Icon :icon="$route.path.startsWith('/calendar') ? 'calendar-active' : 'calendar'"></Icon>
            <p>Календар</p>
          </div>
        </router-link>

        <router-link 
          to="/guests/" 
          class="sidebar__nav__item"
          :class="{ active: $route.path.startsWith('/guests') }"
        >
          <div>
            <Icon :icon="$route.path.startsWith('/guests') ? 'guests-active' : 'guests'"></Icon>
            <p>Гості</p>
          </div>
        </router-link>
  <p class="sidebar__section-label">Аналітика</p>
        <router-link 
          to="/dogovir/" 
          class="sidebar__nav__item"
          :class="{ active: $route.path.startsWith('/dogovir') }"
        >
          <div>
            <Icon :icon="$route.path.startsWith('/dogovir') ? 'dogovir-active' : 'dogovir'"></Icon>
            <p>Договори</p>
          </div>
        </router-link>

        <router-link 
          to="/analytics/" 
          class="sidebar__nav__item"
          :class="{ active: $route.path.startsWith('/analytics') }"
        >
          <div>
            <Icon :icon="$route.path.startsWith('/analytics') ? 'analytics-active' : 'analytics'"></Icon>
            <p>Аналітика</p>
          </div>
        </router-link>

        <router-link 
          to="/reports/" 
          class="sidebar__nav__item"
          :class="{ active: $route.path.startsWith('/reports') }"
        >
          <div>
            <Icon :icon="$route.path.startsWith('/reports') ? 'reports-active' : 'reports'"></Icon>
            <p>Звіти</p>
          </div>
        </router-link>
      </template>

      <!-- ===== USER ACCOUNT ===== -->
      <p class="sidebar__section-label">Профіль</p>
      <router-link 
        v-if="userTeamPrefs" 
        to="/account/" 
        class="sidebar__nav__item"
        :class="{ active: $route.path.startsWith('/account') }"
      >
        <div>
          <Icon :icon="$route.path.startsWith('/account') ? 'profile-active' : 'profile'"></Icon>
          <p>Профіль</p>
        </div>
      </router-link>

      <router-link 
        v-if="userTeamPrefs" 
        to="/signout/" 
        class="sidebar__nav__item danger"
      >
        <div>
          <i class="hgi hgi-stroke hgi-sharp hgi-logout-02" style="color: #9d9d9d; font-weight: bold;"></i>
          <p>Вийти</p>
        </div>
      </router-link>

    </nav>

    <!-- ===== VERSION ===== -->
    <span class="version">{{ v }}</span>
  </aside>
</template>

<script setup>
import "@/assets/css/components/sidebar.css"
import Icon from "./ui/Icon.vue"
import { useAuth } from "@/stores/auth" 
import { v } from "@/assets/js/app"

const { userTeamPrefs, accessType } = useAuth()
</script>
