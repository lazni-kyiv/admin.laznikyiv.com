<template>
  <div class="guest-info__item guest-card guest-bookings">
    <div class="geust-card__header">
      <h3>Бронювання</h3>
      <button onclick="newBooking.showModal()" v-if="bookings.length > 0 && canAddBookings">
        +
      </button>
    </div>

    <EmptyBookingsState 
      v-if="bookings.length < 1" 
      :canAddBookings="canAddBookings" 
    />

    <BookingsList 
      v-else 
      :bookings="bookings"
      :guest="guest"
      :canUpdateBookings="canUpdateBookings"
      @edit="openEditModal"
      @update:guest="handleGuestUpdate"
    />

    <CreateBookingModal
      :services="services"
      @create="handleCreateBooking"
    />

    <EditBookingModal
  v-if="editBooking"
  ref="editBookingModal"
  :booking="editBooking"
  :services="services"
  @update="handleUpdateBooking"
  @close="closeEdit"
/>

  </div>
</template>

<script setup>
import { ref, watch, computed, toRaw, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "@/stores/auth";
import { api } from "@/assets/js/app";
import toastr from "toastr";
import "@/assets/views/guest/bookings.css";

import EmptyBookingsState from "./bookings/EmptyBookingsState.vue";
import BookingsList from "./bookings/BookingsList.vue";
import CreateBookingModal from "./bookings/CreateBookingModal.vue";
import EditBookingModal from "./bookings/EditBookingModal.vue";

const route = useRoute();
const { user } = useAuth();

const props = defineProps({
  bookings: Object,
  guest: Object,
  access: String,
  name: String
});

const emit = defineEmits(['update:guest']);

// State
const bookings = ref([]);
const services = ref(null);
const editBooking = ref(null);

// Permissions
const canAddBookings = computed(() => {
  if (!user.value?.teams) return false;
  return user.value.teams.some(team => {
    try {
      const prefs = typeof team.prefs === 'string' ? JSON.parse(team.prefs) : team.prefs;
      return prefs?.bookings?.includes('create');
    } catch {
      return false;
    }
  });
});

const canUpdateBookings = computed(() => {
  if (!user.value?.teams) return false;
  return user.value.teams.some(team => {
    try {
      const prefs = typeof team.prefs === 'string' ? JSON.parse(team.prefs) : team.prefs;
      return prefs?.bookings?.includes('update');
    } catch {
      return false;
    }
  });
});

// Watchers
watch(() => props.bookings, (newBookings) => {
  if (newBookings) bookings.value = newBookings;
}, { immediate: true });

// Fetch services
fetch("https://api.laznikyiv.com/v2/services")
  .then(res => res.json())
  .then(data => services.value = data);

// Handlers
function handleCreateBooking(booking) {
  const payload = {
    guest: route.params.id,
    type: booking.type,
    house: booking.type === 'pool' ? 'family' : booking.house,
    date: booking.date,
    extra: booking.extra ? booking.extra : null, 
    meta: JSON.stringify(booking.meta)
  };

  api.bookings.create(payload).then(data => {
    bookings.value.push(data.booking);
    document.getElementById("newBooking").close();
  });
}

function handleUpdateBooking(booking) {
  const payload = {
    guest: route.params.id,
    type: booking.type,
    house: booking.type === 'pool' ? 'family' : booking.house,
    date: booking.date,
    meta: JSON.stringify(booking.meta)
  };

  api.bookings.update(booking.$id, payload).then(res => {
    const index = bookings.value.findIndex(b => b.$id === booking.$id);
    if (index > -1) bookings.value[index] = res;
    toastr.success("Бронювання оновлено");
    closeEdit();
  }).catch(err => {
    console.error('Update error:', err);
    toastr.error("Помилка оновлення");
  });
}


const editBookingModal = ref(null)

function openEditModal(booking) {
  // Deep clone to break Proxy
  editBooking.value = JSON.parse(JSON.stringify(booking))
  console.log(editBooking.value)
  nextTick(() => {
    if (editBookingModal.value?.showModal) {
      editBookingModal.value.showModal()
    } else {
      document.getElementById("editBooking").showModal()
    }
  })
}

function closeEdit() {
  editBooking.value = null
  if (editBookingModal.value?.close) editBookingModal.value.close()
}

function handleGuestUpdate(updated) {
  emit('update:guest', updated);
}
</script>