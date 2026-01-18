<template>
  <div class="daily-options">
    <div v-for="(day, index) in modelValue" :key="index" class="daily-card">
      <h4>{{ formatDate(day.date) }}</h4>
      
      <!-- Lazni Option -->
      <div class="option-block">
        <button 
          type="button" 
          :class="[day.l.booked ? 'primary' : 'secondary', 'toggle-btn', 'sub-tab']"
          @click="toggleLazni(index)"
        >
          <span v-if="day.l.booked">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          Лазня
        </button>
        
        <div class="option-subblock" v-if="day.l.booked">
          <div class="duration mt-2">
            <div class="form-input">
              <label>Години</label>
              <div class="input-row">
                <button class="component-button" type="button" @click="decreaseTime(index, 'l')" :disabled="day.l.t <= 2">-</button>
                <input type="number" :value="day.l.t" readonly />
                <button class="component-button" type="button" @click="increaseTime(index, 'l')">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chan Option -->
      <div class="option-block mt-4">
        <button 
          type="button" 
          :class="[day.c.booked ? 'primary' : 'secondary', 'toggle-btn', 'sub-tab']"
          @click="toggleChan(index)"
        >
          <span v-if="day.c.booked">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          Чан
        </button>
        
        <div class="option-subblock" v-if="day.c.booked">
          <div class="duration mt-2">
            <div class="form-input" style="margin-bottom: 0.5rem">
              <label>Години</label>
              <div class="input-row">
                <button class="component-button" type="button" @click="decreaseTime(index, 'c')" :disabled="day.c.t <= 2">-</button>
                <input type="number" :value="day.c.t" readonly />
                <button class="component-button" type="button" @click="increaseTime(index, 'c')">+</button>
              </div>
            </div>

            <div class="fill-options mt-3 form-input">
              <label>Наповнення</label>
              <div class="fill-buttons mt-1">
                <button
                  v-for="fill in FILL_OPTIONS"
                  :key="fill.value"
                  type="button"
                  :class="[day.c.f.includes(fill.value) ? 'primary' : 'secondary', 'toggle-btn']"
                  @click="toggleFill(index, fill.value)"
                >
                  <span v-if="day.c.f.includes(fill.value)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  {{ fill.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FILL_OPTIONS } from "../bookingUtils";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

function formatDate(date) {
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: 'short',
    weekday: 'short'
  }).format(date);
}

function toggleLazni(index) {
  const updated = [...props.modelValue];
  updated[index].l.booked = !updated[index].l.booked;
  emit('update:modelValue', updated);
}

function toggleChan(index) {
  const updated = [...props.modelValue];
  updated[index].c.booked = !updated[index].c.booked;
  emit('update:modelValue', updated);
}

function increaseTime(index, type) {
  const updated = [...props.modelValue];
  updated[index][type].t++;
  emit('update:modelValue', updated);
}

function decreaseTime(index, type) {
  const updated = [...props.modelValue];
  if (updated[index][type].t > 2) {
    updated[index][type].t--;
    emit('update:modelValue', updated);
  }
}

function toggleFill(index, fillValue) {
  const updated = [...props.modelValue];
  const fills = updated[index].c.f;
  const fillIndex = fills.indexOf(fillValue);
  
  if (fillIndex > -1) {
    fills.splice(fillIndex, 1);
  } else {
    fills.push(fillValue);
  }
  
  emit('update:modelValue', updated);
}
</script>