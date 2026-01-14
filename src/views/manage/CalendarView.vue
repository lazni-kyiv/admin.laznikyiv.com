<template>
  <AdminView>
    <p class="comment">Календар</p>
    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>
    <!-- Модалка деталей бронювання -->
    <div v-if="selectedBooking" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
         <div style="display: flex; flex-direction: column;">
           <h3>Бронювання</h3>
          <small>#{{ selectedBooking.$id }}</small>
         </div>
          <button class="close-btn" @click="closeModal"><span>
            ×
          </span></button>
        </div>
        <div class="modal-body">
          <div class="booking-detail">
            <span class="label">Гість:</span>
            <span class="value"><router-link :to="`/guests/${selectedBooking.guest}`">{{ getGuestName(selectedBooking.guest) }}</router-link></span>
          </div>
          <div class="booking-detail">
            <span class="label">Тип:</span>
            <span class="value">{{ getTypeText(selectedBooking.type) }}</span>
          </div>
          <div class="booking-detail">
            <span class="label">Будинок:</span>
            <span class="value">{{ getHouseText(selectedBooking.house) }}</span>
          </div>
           <div class="booking-detail">
            <span class="label">К-сть гостей:</span>
            <span class="value">{{ getGuestsCount(selectedBooking.meta) }}</span>
          </div>
          <div class="booking-detail">
            <span class="label">Дата та час:</span>
            <span class="value">{{ formatDateRange(selectedBooking.date) }}</span>
          </div>
          <div class="booking-detail">
            <span class="label">Договір:</span>
            <span class="value">
               <DogovirActions :booking="selectedBooking" :guest="guests.filter(r => r.$id == selectedBooking.guest)[0]">

             </DogovirActions>
            </span>

          </div>
           <div class="booking-detail column">
            <span class="label">Коментар</span>
            <span class="value">{{ getDescription(selectedBooking.meta) }}</span>
          </div>
           <div class="booking-detail column">
            <span class="label">Лазня / чан</span>
            <span class="value" v-html="getLazni(selectedBooking.meta)"></span>
          </div>
        
        </div>
        <!-- <div class="modal-footer">
        
        </div> -->
      </div>
    </div>
  </AdminView>
</template>

<script setup>
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import AdminView from '@/templates/AdminView.vue'
import '/src/assets/css/views/dashboard.css'
import { useHead } from '@vueuse/head'
import { ref, computed, onMounted } from 'vue'
import {  client } from '@/assets/js/app'
import { Query } from 'appwrite'
import router from '@/router'
import multiMonthPlugin from '@fullcalendar/multimonth'
import DogovirActions from '@/components/dogovir/DogovirActions.vue'
import { api } from '@/assets/js/app'

import StatsCards from '@/components/dashboard/StatsCards.vue'

// FullCalendar imports
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ukLocale from '@fullcalendar/core/locales/uk'

const guests = ref([])
const bookings = ref([])
const selectedBooking = ref(null)

// Парсинг дати з вашого формату "30.11.25T12:00-30.11.25T14:00"
const parseDateRange = (dateStr) => {
  if (!dateStr) return { start: null, end: null }
  
  try {
    const [startPart, endPart] = dateStr.split('-')
    
    // Парсинг початкової дати "30.11.25T12:00"
    const [startDate, startTime] = startPart.split('T')
    const [startDay, startMonth, startYear] = startDate.split('.')
    const fullStartYear = `20${startYear}`
    const startISO = `${fullStartYear}-${startMonth}-${startDay}T${startTime}:00`
    
    // Парсинг кінцевої дати "30.11.25T14:00"
    const [endDate, endTime] = endPart.split('T')
    const [endDay, endMonth, endYear] = endDate.split('.')
    const fullEndYear = `20${endYear}`
    const endISO = `${fullEndYear}-${endMonth}-${endDay}T${endTime}:00`
    
    return {
      start: startISO,
      end: endISO
    }
  } catch (error) {
    console.error('Error parsing date:', dateStr, error)
    return { start: null, end: null }
  }
}

// Форматування дати для відображення
const formatDateRange = (dateStr) => {
  if (!dateStr) return 'Не вказано'
  
  try {
    const { start, end } = parseDateRange(dateStr)
    if (!start || !end) return dateStr
    
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
    const timeOptions = { hour: '2-digit', minute: '2-digit' }
    
    const startDateStr = startDate.toLocaleDateString('uk-UA', dateOptions)
    const startTimeStr = startDate.toLocaleTimeString('uk-UA', timeOptions)
    const endDateStr = endDate.toLocaleDateString('uk-UA', dateOptions)
    const endTimeStr = endDate.toLocaleTimeString('uk-UA', timeOptions)
    
    return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`
  } catch (error) {
    return dateStr
  }
}

// Функція для отримання кольору за типом
const getBookingColor = (house) => {
  const colors = {
    left: '#54cf6c',      // зелений
    right: 'grey',      // помаранчевий
    family: '#3e82dc',       // синій
  }
  return colors[house] || '#9E9E9E'
}

// Отримання імені гостя
const getGuestName = (guestId) => {
  const guest = guests.value.find(g => g.$id === guestId)
  if (guest) {
    return `${guest.alias}`.trim()
  }
  return guestId
}

// Текст типу послуги
const getTypeText = (type) => {
  const types = {
    lazni: 'Лазня',
    house: 'Будинок на добу',
    pool: 'Басейн',
    massage: 'Масаж',
    room: 'Кімната'
  }
  return types[type] || type
}

// Текст будинку
const getHouseText = (house) => {
  const houses = {
    family: 'Family House',
    left: 'River View Left',
    right: 'River View Right'
  }
  return houses[house] || house
}
function getGuestsCount(meta) {
  if (JSON.parse(meta).g) {
return JSON.parse(meta).g
  } else {
    return "-"
  }
}

function getDescription(meta) {
  if (JSON.parse(meta).d) {
return JSON.parse(meta).d
  } else {
    return "-"
  }
}
function getLazni(meta) {
  try {
    const data = JSON.parse(meta);
    if (!data.l && !data.c) return "-";

    const fillMap = { h: "Хвоя", c: "Цитрус", t: "Трави" };
    const dayMap = {}; // { date: { sauna: hours, bath: hours, fills: [] } }

    const parseSegments = (str, type, isBath = false) => {
      if (!str) return;
      str.split("|").forEach(segment => {
        const [date, hours, fillsRaw] = segment.split(":");
        if (!dayMap[date]) dayMap[date] = { sauna: null, bath: null, fills: [] };
        if (type === "Лазня") dayMap[date].sauna = hours;
        if (type === "Чан") {
          dayMap[date].bath = hours;
          if (fillsRaw) {
            const fills = fillsRaw.includes(",") ? fillsRaw.split(",") : fillsRaw.split("");
            const fillsReadable = fills.map(f => fillMap[f.trim()] || f.trim());
            dayMap[date].fills.push(...fillsReadable);
          }
        }
      });
    };

    parseSegments(data.l.l, "Лазня");
    parseSegments(data.l.c, "Чан");

    // Build text per day
    const lines = [];
    Object.keys(dayMap).sort().forEach(date => {
      const day = dayMap[date];
      lines.push(`<b>${date}</b>`);
      if (day.sauna) lines.push(`Лазня на ${day.sauna} год`);
      if (day.bath) lines.push(`Чан на ${day.bath} год`);
      if (day.fills.length) {
        // remove duplicates
        const uniqueFills = [...new Set(day.fills)];
        lines.push(`Наповнення: ${uniqueFills.join(", ")}`);
      }
    });

    return lines.join("<br>");

  } catch (e) {
    return "-";
  }
}


// Output:
// "Лазня: Дата: 09.12.25, Тривалість: 2 год | Чан: Дата: 09.12.25, Тривалість: 2 год, Наповнення: Цитрус"

// Output: "Дата: 09.12.25, Тривалість: 2 год"

// Конвертація бронювань у події календаря
const calendarEvents = computed(() => {
  return bookings.value.map(booking => {
    const guestName = getGuestName(booking.guest)
    const { start, end } = parseDateRange(booking.date)
    
    if (!start || !end) {
      console.warn('Invalid date format for booking:', booking)
      return null
    }
    
    return {
      id: booking.$id,
      title: `${guestName}`,
      start: start,
      end: end,
      backgroundColor: getBookingColor(booking.house),
      borderColor: getBookingColor(booking.house),
      extendedProps: {
        booking: booking,
        guestName: guestName,
        type: booking.type,
        house: booking.house
      }
    }
  }).filter(event => event !== null) // Відфільтрувати невалідні події
})

// Налаштування FullCalendar


// Клік на подію (бронювання)
const handleEventClick = (info) => {
  selectedBooking.value = info.event.extendedProps.booking
}

// Клік на дату
const handleDateClick = (info) => {
   // console.log('Clicked date:', info.dateStr)
  // Перехід до створення нового бронювання
  router.push({
    name: 'CreateBooking',
    query: { date: info.dateStr }
  })
}

// Вибір діапазону дат
const handleDateSelect = (selectInfo) => {
   // console.log('Selected range:', selectInfo.startStr, '-', selectInfo.endStr)
  router.push({
    name: 'CreateBooking',
    query: { 
      start: selectInfo.startStr,
      end: selectInfo.endStr
    }
  })
}

// Конвертація дати назад у ваш формат
const formatDateToCustom = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = String(d.getFullYear()).slice(-2)
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  
  return `${day}.${month}.${year}T${hours}:${minutes}`
}

// Перетягування події (зміна дат)
const handleEventDrop = async (info) => {
  return false
  // const booking = info.event.extendedProps.booking
  // const newStart = formatDateToCustom(info.event.start)
  // const newEnd = formatDateToCustom(info.event.end || info.event.start)
  // const newDateRange = `${newStart}-${newEnd}`
  
  // try {
  //   await api.bookings.update(booking.$id, {
  //     date: newDateRange
  //   })
    
  //   toastr.success('Дати бронювання оновлено')
    
  //   // Оновити локальні дані
  //   const index = bookings.value.findIndex(b => b.$id === booking.$id)
  //   if (index !== -1) {
  //     bookings.value[index].date = newDateRange
  //   }
  // } catch (error) {
  //   console.error('Error updating booking:', error)
  //   toastr.error('Помилка при оновленні дат')
  //   info.revert()
  // }
}

// Зміна розміру події (зміна тривалості)
const handleEventResize = async (info) => {
  const booking = info.event.extendedProps.booking
  const { start } = parseDateRange(booking.date)
  const newEnd = formatDateToCustom(info.event.end)
  const newDateRange = `${formatDateToCustom(start)}-${newEnd}`
  
  try {
    await api.bookings.update(booking.$id, {
      date: newDateRange
    })
    
    toastr.success('Тривалість бронювання оновлено')
    
    const index = bookings.value.findIndex(b => b.$id === booking.$id)
    if (index !== -1) {
      bookings.value[index].date = newDateRange
    }
  } catch (error) {
    console.error('Error updating booking:', error)
    toastr.error('Помилка при оновленні тривалості')
    info.revert()
  }
}

// Закрити модалку
const closeModal = () => {
  selectedBooking.value = null
}

// Редагувати бронювання
const editBooking = (bookingId) => {
  router.push({ name: 'EditBooking', params: { id: bookingId } })
  closeModal()
}

// Видалити бронювання
const deleteBooking = async (bookingId) => {
  if (!confirm('Ви впевнені, що хочете видалити це бронювання?')) {
    return
  }
  
  try {
    await api.bookings.delete(bookingId)
    
    toastr.success('Бронювання видалено')
    
    // Видалити з локальних даних
    bookings.value = bookings.value.filter(b => b.$id !== bookingId)
    
    closeModal()
  } catch (error) {
    console.error('Error deleting booking:', error)
    toastr.error('Помилка при видаленні бронювання')
  }
}

// Створити договір
const createDogovir = async (booking) => {
  try {
    // Викликати API для створення договору
    const response = await api.dogovir.create({
      uid: booking.guest,
      bid: booking.$id
    })
    
    toastr.success('Договір створено успішно')
    
    // Оновити локальні дані
    const index = bookings.value.findIndex(b => b.$id === booking.$id)
    if (index !== -1) {
      bookings.value[index].dogovir = response.token
    }
    
    closeModal()
  } catch (error) {
    console.error('Error creating dogovir:', error)
    toastr.error('Помилка при створенні договору')
  }
}

const calendarOptions = ref({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    multiMonthPlugin
  ],
  initialView: 'timeGridWeek',
  locale: ukLocale,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
  },
  buttonText: {
    today: 'Сьогодні',
    month: 'Місяць',
    week: 'Тиждень',
    day: 'День',
    multiMonthYear: 'Рік'
  },
  slotMinTime: '06:00:00',
  slotMaxTime: '24:00:00',
  allDaySlot: false,
  events: calendarEvents,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  height: 'auto',

  eventClick: handleEventClick,
  dateClick: handleDateClick,
  select: handleDateSelect,
  eventResize: handleEventResize
})


onMounted(async () => {
  useHead({ title: "Календар" });
  try {
    const bookingsData = await api.bookings.list()
     // console.log('Loaded bookings:', bookingsData)
    bookings.value = bookingsData.bookings
    
    const guestsData = await api.guests.list()
     // console.log('Loaded guests:', guestsData)
    guests.value = guestsData.guests
  } catch (error) {
    console.error('Error loading data:', error)
    toastr.error('Помилка при завантаженні даних')
  }
})
</script>
<style scoped>
:root{
  --fc-today-bg-color: var(--primary-shade)
}
.calendar-container {
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.fc .fc-daygrid-day.fc-day-today {
  background-color: var(--primary-shade) !important;
}
/* Модалка */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000001 !important;
  animation: fadeIn 0.2s ease;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 500px;
  position: relative;
  max-height: 90dvh;
  overflow: auto;
  z-index: 1000001 !important;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

/* .close-btn {
  background: none;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
} */
 .close-btn {
  display: flex;
  color: var(--primary) !important;
  background: none;
  background-color: #cccccc59;
  border-style: none !important;
  padding: 0.5rem !important;
  border-radius: 9999px !important;
  aspect-ratio: 1/1;
  width: 32px;
  height:32px;
  align-items: center;
  justify-content: center;
 }
  .close-btn:hover {
    background-color: #ccc !important;
  }

.modal-body {
  padding: 24px;
}

.booking-detail {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}
.booking-detail.column {
  flex-direction: column;
  gap: 0.5rem;
}

.booking-detail.column span.value {
  flex-direction: column;
  gap: 0.5rem;
}
.booking-detail:last-child {
  border-bottom: none;
}

.booking-detail .label {
  font-weight: 600;
  color: #666;
}

.booking-detail .value {
  color: #333;
  font-weight: 500;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.btn-primary {
  background: #3e82dc;
  color: white;
}

.btn-primary:hover {
  background: #1976D2;
}

.btn-danger {
  background: #F44336;
  color: white;
}

.btn-danger:hover {
  background: #D32F2F;
}

.btn-success {
  background: #54cf6c;
  color: white;
}

.btn-success:hover {
  background: #388E3C;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* FullCalendar кастомізація */
:deep(.fc) {
  font-family: inherit;
}

:deep(.fc-toolbar-title) {
  font-size: 1.5rem;
  font-weight: 600;
}

:deep(.fc-button) {
  text-transform: none;
  font-weight: 500;
}

:deep(.fc-event) {
  cursor: pointer;
  border-radius: 4px;
  padding: 2px 4px;
}

:deep(.fc-event:hover) {
  opacity: 0.9;
  /* transform: scale(1.02); */
}

:deep(.fc-timegrid-slot) {
  height: 3em;
}

.fc-dayGridMonth-button {
  background-color: transparent !important;
  color: var(--primary);
}

.value {
  display: flex;
  gap: 0.25rem;
}

.value a{
  text-decoration: underline;
}

.calendar-container {
  opacity: 0;
    transform: translateY(2rem);
     animation: up .5s ease-out forwards;

     margin-top: 0px !important;
}
@keyframes up {
    0% {
         opacity: 0;
    transform: translateY(2rem);

    } 100% {

         opacity: 1;
    transform: translateY(0);
    }
}

</style>