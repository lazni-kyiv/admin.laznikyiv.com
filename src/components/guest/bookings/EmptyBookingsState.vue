<template>
  <div class="bookings-list no-bookings">
    <i class="hgi-stroke hgi-calendar-02"></i>
    <p>У цього гостя ще немає бронювань</p>
    <button onclick="newBooking.showModal()" v-if="canAddBookings">
      Додати бронювання
    </button>
  </div>
</template>

<script setup>
defineProps({
  canAddBookings: Boolean
});
</script>