<template>
  <AdminView>
    <div class="guest-info">
    <GuestInfo :guest="guest" :auth="access"  @update="guest = $event"/>
    <GuestPersonalInfo :guest="guest" :auth="access"/>
    <GuestBookings :bookings="bookings" :guest="guest" :access="access" :name="guest?.alias" @update:guest="updateGuest"/>
    </div>
  </AdminView>
</template>
<script setup>
import AdminView from '@/templates/AdminView.vue'
import router from '@/router'
import { onMounted, reactive, ref, setBlockTracking } from 'vue'

import '@/assets/css/views/dashboard.css'
import '@/assets/css/views/guest.css'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { ID, Query } from 'appwrite'
import { api } from '@/assets/js/app'
const access = ref(null)
const guest = ref(null)
const bookings = ref([])
import GuestInfo from '@/components/guest/GuestInfo.vue'
import GuestPersonalInfo from '@/components/guest/GuestPersonalInfo.vue'
import GuestBookings from '@/components/guest/GuestBookings.vue'
const route = useRoute()
onMounted(async () => {
  api.guests.get(route.params.id).then((res) => {
     // console.log(res)
    guest.value = res.guest
    bookings.value =  res.bookings
  }).catch(e => {
    sessionStorage.setItem("guest-error", "get-error")
    router.push("/guests/")
  })
})

function updateGuest(g) {
  console.log("GuestView.vue [update]", g)
  guest.value = g
}
</script>
<style scoped>
.guest-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.guest-info__item {
  padding: 0.75rem;
  position: relative;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);

  margin-top: 0.5rem;
  border-radius: 1rem;
  background-color: rgb(255 255 255);
  border: rgba(178, 178, 178, 0.326) solid 0.5px;

}
@media (max-width: 1024px) {
  .guest-info {
    grid-template-columns: 1fr !important;
  }
}

</style>