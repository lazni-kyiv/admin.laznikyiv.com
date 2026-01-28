<template>
  <div class="calendar">
    <div class="header">
      <button @click="prevMonth">&lt;</button>
      <h3>{{ monthName }} {{ currentMonth.year() }}</h3>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="days-grid">
      <div class="day" v-for="day in monthDays" :key="day.date" :class="{ today: isToday(day.date), booked: day.booked }" @click="$emit('select-date', day.date)">
        {{ day.day }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday.js'
dayjs.extend(weekday)

const props = defineProps({
  month: Date,
  bookings: Array
})

const currentMonth = ref(dayjs(props.month))
const monthName = computed(() => currentMonth.value.format('MMMM'))

function prevMonth() { currentMonth.value = currentMonth.value.subtract(1, 'month') }
function nextMonth() { currentMonth.value = currentMonth.value.add(1, 'month') }

const monthDays = computed(() => {
  const start = currentMonth.value.startOf('month').startOf('week')
  const end = currentMonth.value.endOf('month').endOf('week')
  const days = []
  let date = start
  while (date.isBefore(end) || date.isSame(end, 'day')) {
    const booked = props.bookings.some(b => {
      const startB = dayjs(b.d.split('-')[0], 'DDMMYYTHH:mm')
      const endB = dayjs(b.d.split('-')[1], 'DDMMYYTHH:mm')
      return date.isBetween(startB, endB, 'day', '[]')
    })
    days.push({ date: date.toDate(), day: date.date(), booked })
    date = date.add(1, 'day')
  }
  return days
})

function isToday(date) {
  return dayjs(date).isSame(dayjs(), 'day')
}
</script>

<style scoped>
.calendar { background: #fff; border-radius: 1rem; padding: 1rem; width: 100%; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.3rem; }
.day { padding: 0.5rem; text-align: center; border-radius: 0.5rem; cursor: pointer; transition: background 0.2s; }
.day.today { font-weight: bold; border: 1px solid #555; }
.day.booked { background: #4caf50; color: white; }
.day:hover { background: #eee; }
</style>
