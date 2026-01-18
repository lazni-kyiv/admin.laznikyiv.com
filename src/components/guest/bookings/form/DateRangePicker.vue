<template name="DateRangePicker">
  <div :class="['booking-date', { blured: disabled }]">
    <div class="form-input form-box">
      <label><span>Заїзд</span></label>
      <input 
        type="date" 
        required 
        :value="dateIn.date"
        @input="$emit('update:dateIn', { ...dateIn, date: $event.target.value })"
        @change="$emit('update')"
      />
      <select 
        required 
        :value="dateIn.time"
        @change="$emit('update:dateIn', { ...dateIn, time: $event.target.value })"
      >
        <option disabled hidden value="">--:--</option>
        <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div class="form-input form-box">
      <label><span>Виїзд</span></label>
      <input 
        v-if="type === 'house'" 
        type="date" 
        required 
        :value="dateOut.date"
        @input="$emit('update:dateOut', { ...dateOut, date: $event.target.value })"
        @change="$emit('update')"
      />
      <input v-else type="date" :value="dateIn.date" readonly />
      <select 
        required 
        :value="dateOut.time"
        @change="$emit('update:dateOut', { ...dateOut, time: $event.target.value })"
      >
        <option disabled hidden value="">--:--</option>
        <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>
  </div>
</template>

<script setup name="DateRangePicker">
import { generateTimeSlots } from "../bookingUtils";

defineProps({
  dateIn: Object,
  dateOut: Object,
  type: String,
  disabled: Boolean
});

defineEmits(['update:dateIn', 'update:dateOut', 'update']);

const timeSlots = generateTimeSlots();
</script>