<template>
  <div class="main__container" v-if="pwa && !locked">
    <div class="main__content">
      <SidebarComponent />
      <transition name="fade">
        <div v-if="showContent" class="content__item">
            <slot></slot>
        </div>
      </transition>
    </div>
  </div>
   <div v-else-if="locked">
    <div class="lock-container">
      <div class="lock-box">
        <h2>Заблоковано</h2>
        <p>Введіть код доступу для розблокування</p>

        <input
          v-model="code"
          type="password"
          placeholder="Код доступу"
          @keyup.enter="unlock"
        />

        <button @click="unlock">Розблокувати</button>

        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>


  <div class="content not-auth" v-else>
	<h1>Lazni Kyiv</h1>
	<p>Доступ до панелі адміністрування заблоковано, встановіть додаток</p>
</div>
</template>

<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import "@/assets/css/views/dashboard.css"
import { ref, onMounted } from "vue";
import { api } from "@/assets/js/app";
import { useRoute } from "vue-router";
import { useAppLock } from "@/stores/lock";
import { pwa } from "@/assets/js/app";
const blured = defineProps({ blured: { type: Boolean, default: false } });

const showContent = ref(false);

const { locked, unlockApp } = useAppLock(); // 👈 БЕРЁМ ref

const ACCESS_CODE = 'lk0la'
const code = ref('')
const error = ref('')

function unlock() {
  if (code.value === ACCESS_CODE) {
    unlockApp()
    error.value = ''
  } else {
    error.value = 'Неправильний код доступу'
    code.value = ''
  }
}

onMounted(() => {
  showContent.value = true; // triggers fade-in
});

const authValid = ref(null);
const route = useRoute();
api.verify().then((e) => {
  if (e.valid) authValid.value = true;
  else window.location.href = `/?redirect=${route.fullPath}`;
});
</script>

<style scoped>
.main__container{
    flex-direction: column;
}
.content__item {
   
    
    background-color: var(--bg);
    padding: 1rem !important;
    width: 100%;
    min-height: 100%;
    height: 100dvh;
    padding: 1rem !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}


.content.not-auth {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.content.not-auth h1 {
	font-family: "Lazni";
}
</style>