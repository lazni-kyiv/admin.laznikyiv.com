// src/router/index.js
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { pwa } from '@/assets/js/app'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/auth/AuthView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/manage/DashboardView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/views/manage/CalendarView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/guests',
    name: 'Guests',
    component: () => import('@/views/manage/GuestsView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/dogovir',
    name: 'Dogovir',
    component: () => import('@/views/analytics/DogovirView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/guests/:id',
    name: 'Guest',
    component: () => import('@/views/guest/GuestView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/dogovir/:id',
    name: 'dogovir',
    component: () => import('@/views/guest/DogovirView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/analytics/AnalyticsView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/account/AccountView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signout',
    name: 'Signout',
    component: () => import('@/views/account/SignOut.vue'),
    meta: { requiresAuth: true }
  },
    {
    path: '/reports/',
    name: 'reports',
    component: () => import('@/views/analytics/ReportsView.vue'),
    meta: { requiresAuth: true }
  },
   {
    path: '/report/:id/',
    name: 'report',
    component: () => import('@/views/analytics/ReportView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/booking/create/',
    name: 'create-booking',
    component: () => import('@/views/bookings/BookingCreate.vue'),
    meta: { requiresAuth: true }
  },
   {
    path: '/booking/:id/',
    name: 'info-booking',
    component: () => import('@/views/bookings/BookingInfo.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/booking/:id/edit/',
    name: 'edit-booking',
    component: () => import('@/views/bookings/BookingEdit.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const route = window.location.pathname
  console.log(route)
  if (!pwa.value && route !== '/') {
    // redirect to Login page
    window.location.href = "/"
  }
  
  const { verify, isAuthenticated, accessType } = useAuth()

if (to.meta.requiresAuth) {
    // Verify authentication (uses cache if recent)
    const user = await verify()

    if (!user) {
      // Not authenticated, redirect to login
      return next({ 
        name: 'Login', 
        query: { redirect: to.fullPath } 
      })
    }

    // Check admin requirement
    if (to.meta.requiresAdmin && accessType.value !== 'admin') {
      if (accessType.value !== "manage") {
      return next({ name: 'Dashboard' })
      }
    }
  }
  

  // If going to login but already authenticated
  // if (to.name === 'Login' && isAuthenticated.value) {
  //   return next({ name: 'Dashboard' })
  // }

  next()
})

export default router