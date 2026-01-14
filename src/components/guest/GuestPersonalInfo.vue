<template>
  <div class="guest-info__item guest-card">
  

    <button v-if="['dev'].includes(props.auth)" :disabled="placeholder" @click="editPersonal.showModal()" class="guest-edit-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18.799 3.0499C17.7324 1.98335 16.0032 1.98337 14.9366 3.04994L13.5236 4.46296L19.537 10.4763L20.9501 9.06321C22.0167 7.99665 22.0166 6.26746 20.9501 5.20092L18.799 3.0499Z" :fill="placeholder ? 'grey' : 'white'"></path>
        <path d="M18.4764 11.537L12.463 5.52363L4.35808 13.6286C3.66361 14.3231 3.20349 15.2172 3.04202 16.1859L2.26021 20.8767C2.22039 21.1156 2.29841 21.3591 2.46968 21.5303C2.64095 21.7016 2.88439 21.7796 3.12331 21.7398L7.81417 20.958C8.78294 20.7965 9.67706 20.3364 10.3715 19.642L18.4764 11.537Z" :fill="placeholder ? 'grey' : 'white'"></path>
      </svg>
    </button>
    <h3>Особиста інформація</h3>
    <div class="guest_pi-list" v-if="props.guest && (props.guest.name || props.guest.birthday || props.guest.phone || props.guest.document)"
>
      <div class="pi-item">
        <span>ПІБ</span>
        <p>{{ props.guest?.name || '-' }}</p>
      </div>
      <div class="pi-item">
        <span>Дата народження</span>
        <p>{{ props.guest?.birthday || '-' }}</p>
      </div>
      <div class="pi-item">
        <span>Номер телефону</span>
        <p>{{ props.guest?.phone || '-' }}</p>
      </div>
      <div class="pi-item">
        <span>Паспортні дані</span>
        <p>{{ props.guest?.document || '-' }}</p>
      </div>
    </div>
     <div class="guest_pi-list no-data" v-else>
       <i class="hgi-stroke hgi-document-attachment"></i>
       <p>Гість ще не підписав жодного договору</p>
    </div>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { watch } from 'vue'
const props = defineProps({
  guest: Object,
  auth: String
})

const guest = ref({ ...props.guest })
const guestMail = ref('')
const editPersonal = ref(null)

async function sendMail(recipient, subject, body) {
  try {
    const res = await fetch("https://api.laznikyiv.com/mail/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "LK_API_KEY": "YOUR_SECRET_API_KEY_HERE"
      },
      body: JSON.stringify({
        mail: recipient,
        subject,
        message: body
      })
    })
    const text = await res.text()
     // console.log("Server response:", text)
  } catch (err) {
    console.error("Fetch error:", err)
  }
}
watch(
  () => props.guest,
  (newGuest) => {
    guest.value = { ...newGuest }
  }
)

</script>

<style scoped>
.guest-card__header {
    display: flex;
    align-items: center;
    justify-content: start;
    display: flex;
    gap: 0.5rem;
}
.guest-card__header__avatar {
  border-radius: 50rem;
  width: 3rem;
}

.guest-id {
    opacity: 0.3;
    font-size: small;
}
.guest_pi-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.guest_pi-list .pi-item span {
    opacity: 0.5;
    font-size: small;
}

.guest_pi-list.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%
}
.guest_pi-list.no-data i {
  font-size: 2rem;
  color: #ccc
}
.guest-edit-button {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}
</style>