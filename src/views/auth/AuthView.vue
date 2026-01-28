<template>
  <div class="content" v-if="pwa">
    <div class="form">
      <div class="header">
        <h2>Lazni Kyiv</h2>
        <p>Адміністрування</p>
      </div>
      <div class="form__content" v-if="placeholder">
        <span class="loader"></span>
      </div>

      <form class="form__content" @submit.prevent="login" v-else>
        <h2>Вхід</h2>
        <br />
        <Input
          label="Логін"
          type="email"
          placeholder="example@laznikyiv.com"
          required
          v-model="username"
        />
        <Input
          label="Пароль"
          type="password"
          placeholder="lazni123"
          required
          v-model="password"
        />

        <br />
        <Button> Увійти </Button>
        <small class="version">
          v {{ v }} &copy {{ new Date().getFullYear() }} Lazni Kyiv
        </small>
      </form>
    </div>
  </div>
  <div class="content not-auth" v-else>
    <h1>Lazni Kyiv</h1>

    <p>Доступ до панелі адміністрування заблоковано</p>
  </div>
</template>

<script setup>
import { Input, Button } from "@/ui";
import { onMounted, ref } from "vue";
import { pwa } from "@/assets/js/app";
import { v } from "@/assets/js/app";
import { api } from "@/assets/js/app";
import "@/assets/css/style.css";
import "@/assets/css/views/login.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { useRoute } from "vue-router";


const route = useRoute();

const username = ref("");
const password = ref("");
const placeholder = ref(true);

onMounted(() => {
  if (pwa.value) {
    api.verify().then((data) => {
      if (data.valid) {
        window.location.href = "/dashboard";
      } else {
        placeholder.value = false;
      }
    });
  }
});

async function login() {
  const mail = username.value;
  const pwd = password.value;
  placeholder.value = true;
  api.login(mail, pwd).then((data) => {
    if (data.error) {
      toastr.error("Помилка авторизації");
      placeholder.value = false;
    } else {
      const redirect = route.query.redirect || "/dashboard";
      window.location.href = redirect;
    }
  });
}
</script>
<style>
.content {
  background-image: url("https://laznikyiv.com/assets/img/family.webp");
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: white;
  box-sizing: border-box;
}
.form input {
  background-color: #f5f4f4;
}
.form button {
  padding: 0.5rem !important;
}
.form {
  width: 100%;
  position: relative;
  padding: 1rem;
}
.form::before {
  content: " ";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.489);
  backdrop-filter: blur(10px);
}
.form form {
  max-width: 20rem;
  position: fixed;
  top: 50%;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  left: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-family: Lazni;
  z-index: 1000;
  position: fixed;
}
.side {
  width: 60%;
  position: relative;
}

.side__content {
  background-color: #ffffff87;
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.side {
  background-image: url("https://laznikyiv.com/assets/img/family.webp");
  background-size: cover;
}
.modal-box {
  z-index: 1000000;
  max-width: 14rem;
}
.modal-action {
  margin-top: 0.5rem;
  width: 100%;
}

.password-toggle {
  position: absolute;
  right: 0.5rem;
  bottom: 0.55rem;
  cursor: pointer;
}
button {
  margin: auto;
  width: 100%;
}
h3 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 600;
  opacity: 0.5;
}

header h2 {
  margin: 0px;
  /* width: 100%; */
  /* text-align: center; */
  font-family: "Lazni";
}
.header p {
  font-family: "Mazzard" !important;
  opacity: 0.6;
}

input[type="mail"] {
  margin-bottom: 1rem !important;
}

label {
  opacity: 0.6 !important;
  display: block;
  margin-bottom: 0.25rem !important;
}

button:disabled p {
  color: transparent;
  -webkit-text-fill-color: transparent;

  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;

  background: linear-gradient(to right, #969696 10%, #ffffff 18%, #969696 33%);
  /* background-size: 800px 104px; */
  background-clip: text;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -100px 0;
  }
  100% {
    background-position: 100px 0;
  }
}
button.auth-button {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.loader {
  justify-self: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  width: 50px;

  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: var(--primary);
  animation: l15 1s infinite linear;
}
.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15 {
  100% {
    transform: rotate(1turn);
  }
}

@media (max-width: 768px) {
  .side {
    display: none;
  }
  .form {
    width: 100%;
  }
}

.form__content {
  opacity: 0.6;
  /* scale: 0.5; */
  transform-origin: top;
  animation: form 0.3s ease-in forwards;
}

@keyframes form {
  0% {
    opacity: 0.6;
    /* scale: 0.5 */
  }
  100% {
    opacity: 1;
    /* scale: 1; */
  }
}

.content.not-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.content.not-auth h1 {
  font-family: "Lazni";
}
.version {
  display: flex;
  padding-top: 1.5rem !important;
  text-align: center;

  opacity: 0.5;
  align-self: center;
  justify-self: center;
  margin: 0 auto;
}
</style>
