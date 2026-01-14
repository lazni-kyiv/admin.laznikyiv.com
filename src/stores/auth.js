import { ref, computed } from 'vue'
import { api } from '@/assets/js/app'

const user = ref(null)
const isLoading = ref(false)
const lastVerified = ref(null)
const VERIFICATION_CACHE_TIME = 5 * 60 * 1000

const isAuthenticated = computed(() => !!user.value)
const userTeamPrefs = computed(() => user.value?.teams?.[0]?.prefs || null)
const accessDict = ref({"6928e9300009816c2c5b": "admin", "694d5f44001c553474c5": "manage"})

const accessType = computed(() => {
  return accessDict.value[user.value?.teams?.[0]?.team_id]
})

// Load user from sessionStorage on initial load
function loadFromSession() {
  const stored = sessionStorage.getItem('user')
  if (stored) {
    try {
      user.value = JSON.parse(stored)
      lastVerified.value = Date.now()
    } catch (e) {
      sessionStorage.removeItem('user')
    }
  }
}

// Save user to sessionStorage
function saveToSession(userData) {
  if (userData) {
    sessionStorage.setItem('user', JSON.stringify(userData))
    user.value = userData
    lastVerified.value = Date.now()
  } else {
    sessionStorage.removeItem('user')
    user.value = null
    lastVerified.value = null
  }
}

// Verify authentication with smart caching
async function verify(forceRefresh = false) {
  // If we recently verified and not forcing refresh, use cached data
  if (!forceRefresh && lastVerified.value && Date.now() - lastVerified.value < VERIFICATION_CACHE_TIME) {
    return user.value
  }

  // If already verifying, wait for that request
  if (isLoading.value) {
    return new Promise((resolve) => {
      const checkLoading = setInterval(() => {
        if (!isLoading.value) {
          clearInterval(checkLoading)
          resolve(user.value)
        }
      }, 100)
    })
  }

  isLoading.value = true

  try {
    const response = await api.verify()
    
    if (response.valid) {
      saveToSession(response.user)
      return response.user
    } else {
      saveToSession(null)
      return null
    }
  } catch (error) {
    console.error('Verification failed:', error)
    saveToSession(null)
    return null
  } finally {
    isLoading.value = false
  }
}

// Login
async function login(email, password) {
  isLoading.value = true
  try {
    const response = await api.login(email, password)
    saveToSession(response.user)
    return response.user
  } catch (error) {
    throw error
  } finally {
    isLoading.value = false
  }
}

// Logout
async function logout() {
  try {
    await api.logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    saveToSession(null)
  }
}

// Initialize from session storage
loadFromSession()

// Export composable
export function useAuth() {
  return {
    user,
    isLoading,
    isAuthenticated,
    userTeamPrefs,
    accessType,
    verify,
    login,
    logout
  }
}