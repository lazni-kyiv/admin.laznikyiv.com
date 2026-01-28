<template>
  <dialog id="newBooking" class="modal">
    <form class="modal-box" @submit.prevent="handleSubmit">
      <h3 class="text-lg font-bold mb-4">Додати бронювання</h3>
      <BookingTypeSelector v-model="form.type" />
      <HouseSelector v-model="form.house" :type="form.type" />
      <GuestsCounter v-model="form.meta.guests" :disabled="!form.type || !form.house" />
      <DateRangePicker 
        v-model:dateIn="form.date.in"
        v-model:dateOut="form.date.out"
        :type="form.type"
        :disabled="form.meta.guests === 0"
        @update="updateDays"
      />

      <DailyOptions
        v-if="['house', 'lazni'].includes(form.type) && dailyBookings.length"
        v-model="dailyBookings"
      />

      <!-- <ServicesSelector
        v-if="services"
        :services="services"
        :disabled="!canAddServices"
        @update="form.extra = $event"
      /> -->

      <div :class="['form-input', { blured: !canAddServices }]">
        <label>Коментар</label>
        <textarea v-model="form.meta.description" maxlength="100" rows="3"></textarea>
        <small class="text-end block">{{ form.meta.description?.length || 0 }}/100</small>
      </div>

      <SourceSelector v-model="form.meta.source" :disabled="!canAddServices" />

      <div class="modal-action" style="margin-top: 0.5rem;">
        <button class="secondary" type="button" @click="close">Скасувати</button>
        <button type="submit" :disabled="!isFormValid">Додати</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import BookingTypeSelector from "./form/BookingTypeSelector.vue";
import HouseSelector from "./form/HouseSelector.vue";
import GuestsCounter from "./form/GuestsCounter.vue";
import DateRangePicker from "./form/DateRangePicker.vue";
import DailyOptions from "./form/DailyOptions.vue";
import ServicesSelector from "./form/ServicesSelector.vue";
import SourceSelector from "./form/SourceSelector.vue";
import { 
  generateDailyBookings, 
  minifyDailyBookings, 
  formatBookingDateRange 
} from "./bookingUtils";

const props = defineProps({
  services: Object
});

const emit = defineEmits(['create']);

const form = ref({
  type: null,
  house: null,
  extra: null,
  date: {
    in: { date: null, time: null },
    out: { date: null, time: null }
  },
  meta: {
    guests: 0,
    description: null,
    poslugy: null,
    source: null
  }
});

const dailyBookings = ref([]);

const canAddServices = computed(() => {
  return form.value.type && 
         form.value.house && 
         form.value.meta.guests > 0 && 
         form.value.date.in.time && 
         form.value.date.in.date && 
         form.value.date.out.time && 
         (['lazni', 'pool'].includes(form.value.type) || form.value.date.out.date);
});

const isFormValid = computed(() => canAddServices.value);

function updateDays() {
  const { in: inDate, out: outDate } = form.value.date;
  if (!inDate.date || (form.value.type === 'house' && !outDate.date)) return;

  dailyBookings.value = generateDailyBookings(
    inDate.date,
    outDate.date || inDate.date,
    form.value.type
  );
}

function handleSubmit() {
  const { type, house, date, meta, extra } = form.value;
  
  const fullDateRange = formatBookingDateRange(
    date.in.date,
    date.in.time,
    date.out.date,
    date.out.time,
    type
  );

  let metaObj = {
    g: meta.guests,
    ...(meta.source && { s: meta.source }),
    ...(meta.description && { d: meta.description }),
  };

  if (['house', 'lazni'].includes(type) && dailyBookings.value.length) {
    const { lazni, chan } = minifyDailyBookings(dailyBookings.value);
    metaObj.l = {
      ...(lazni && { l: lazni }),
      ...(chan && { c: chan })
    };
  }

  emit('create', {
    type,
    house,
    date: fullDateRange,
    extra: JSON.stringify(extra),
    meta: metaObj
  });

  resetForm();
}

function resetForm() {
  form.value = {
    type: null,
    house: null,
    extra: null,
    date: {
      in: { date: null, time: null },
      out: { date: null, time: null }
    },
    meta: {
      guests: 0,
      description: null,
      poslugy: null,
      source: null
    }
  };
  dailyBookings.value = [];
}

function close() {
  resetForm();
  document.getElementById("newBooking").close();
}
</script>