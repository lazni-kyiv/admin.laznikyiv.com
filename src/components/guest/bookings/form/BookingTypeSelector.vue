<template name="BookingTypeSelector">
  <div class="form-input">
    <label>Оренда</label>
    <div class="select-input">
      <button
        v-for="option in BOOKING_TYPES"
        :key="option.value"
        type="button"
        :class="['house', { selected: modelValue === option.value }]"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup name="BookingTypeSelector">
import { BOOKING_TYPES } from "../bookingUtils";

defineProps({ modelValue: String });
defineEmits(['update:modelValue']);
</script>