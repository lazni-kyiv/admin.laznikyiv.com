<template>
  <header>
    <div class="header__container">
      <div class="header__content">
        <router-link to="/dashboard">
          <h3>LAZNI KYIV</h3>
        </router-link>
        <div class="header__actions">
          <div class="account time">
            <div class="account__info" style="font-family: 'Mazzard';">
              <small style="opacity: 0.8; text-transform: uppercase;">{{ now }}</small>
            </div>
          </div>
          <div class="account">
            <router-link to="/account/" class="account__info">
              <p>{{ user.name }}</p>
            </router-link>
            <router-link to="/signout/">
              <i class="hgi-stroke hgi-logout-02"></i>
            </router-link>
          </div>
        </div>
        <button class="menu-button">
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import "@/assets/css/components/header.css"
import { api, auth } from "@/assets/js/app";
import { onMounted, ref, onUnmounted } from "vue";
import { RouterLink } from "vue-router";



const access = ref(sessionStorage.getItem("uAccess"))

const weekdays = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"]

function formatNow() {
  const d = new Date()
  const dayName = weekdays[d.getDay()]
  const dateStr = d.toLocaleString("uk-UA", { 
    day: "2-digit", month: "2-digit", year: "2-digit", 
    hour: "2-digit", minute: "2-digit", second: "2-digit" 
  })
  return `${dayName}, ${dateStr}`
}

const now = ref(formatNow())
let timer

import { useAuth } from "@/stores/auth" // or @/composables/useAuth



// Use global auth state
const { user } = useAuth()

onMounted(() => {
  // api.verify().then(data => {
  //    // console.log(data)
  //   name.value = data.user.name
  // })
  // auth.getCurrent().then(e => {
  //   name.value = e.name
  //   const labels = { admin: "Адміністратор", manage: "Управління" }
  //   access.value = labels[e.labels[0]]
  //   accessType.value = e.labels[0]
  //   sessionStorage.setItem("uName", e.name)
  //   sessionStorage.setItem("uAccessType", e.labels[0])
  //   sessionStorage.setItem("uAccess", labels[e.labels[0]])
  // })

  document.querySelector(".menu-button").addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar")
    const menuBtn = document.querySelector(".menu-button")
    sidebar.classList.toggle("open")
    menuBtn.classList.toggle("open")
  })

  timer = setInterval(() => {
    now.value = formatNow()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>


  