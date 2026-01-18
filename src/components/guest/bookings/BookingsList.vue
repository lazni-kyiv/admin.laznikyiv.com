<template>
  <div class="bookings-list">
    <BookingCard
      v-for="booking in bookings"
      :key="booking.$id"
      :booking="booking"
      :guest="guest"
      :canUpdateBookings="canUpdateBookings"
      @edit="emit('edit', booking)"
      @update:guest="emit('update:guest', $event)"
    />
  </div>
</template>

<script setup>
import BookingCard from "./BookingCard.vue";

defineProps({
  bookings: Array,
  guest: Object,
  canUpdateBookings: Boolean
});

const emit = defineEmits(['edit', 'update:guest']);
</script>