<template>
  <AdminView>
    <div class="content">
  
      <p class="comment">Аналітика</p>
      
      <!-- <AnalyticsFilters
        v-model:selectedHouse="selectedHouse"
        v-model:selectedYear="selectedYear"
        v-model:selectedMonth="selectedMonth"
        :years="years"
        @reset="resetFilters"
      />
       -->
      <StatsSummary
        :bookings="filteredBookings"
        :guests="guests"
        :placeholder="loading"
      />
      <p class="comment">Бронювання</p>
      <div class="info-grid info-2">
      
        <BookingsByMonthChart :bookings="filteredBookings" />
        <WeekdayChart :bookings="filteredBookings" />
        <HousesChart :bookings="filteredBookings" />
        <BookingTypeChart :bookings="filteredBookings" />
        <BookingSourceChart :bookings="filteredBookings" />
        <VisitorsChart  :bookings="filteredBookings" />
        <LazniChan :bookings="filteredBookings" />
        <ChanFillChart :bookings="filteredBookings" />
        <!-- 
        <BookingSourceChart :bookings="filteredBookings" />
        <h3 class="span2">Лазня / чан</h3> -->

        <!-- <LazniaChanChart :bookings="filteredBookings" />        
        <FillChart :bookings="filteredBookings" /> -->
      </div>
        <p class="comment">Гості</p>
          <div class="info-grid info-2">
            <GuestsByMonthChart :guests="guests"/>
          </div>
<p class="comment">Бот</p>
          <div class="info-grid info-2">
            <BotChart :bookings="filteredBookings"/>
          </div>

        
    </div>
  </AdminView>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useHead } from '@vueuse/head';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import "dayjs/locale/uk";

dayjs.extend(customParseFormat);
dayjs.locale("uk");

import { api } from '@/assets/js/app';
import AdminView from "@/templates/AdminView.vue";
import BookingSourceChart from "@/components/analytics/bookings/BookingSourceChart.vue";
// import AnalyticsFilters from "@/components/analytics/AnalyticsFilters.vue";
import StatsSummary from "@/components/analytics/StatsSummary.vue";
import BookingsByMonthChart from "@/components/analytics/bookings/BookingsByMonthChart.vue";
import HousesChart from "@/components/analytics/bookings/HousesChart.vue";
import WeekdayChart from "@/components/analytics/bookings/WeekdayChart.vue";
import BookingTypeChart from "@/components/analytics/bookings/BookingTypeChart.vue";
import VisitorsChart from "@/components/analytics/bookings/VisitorsChart.vue";
import ChanFillChart from "@/components/analytics/lazni/ChanFillChart.vue";
import LazniChan from "@/components/analytics/lazni/LazniChan.vue";
import GuestsByMonthChart from "@/components/analytics/guests/GuestsByMonthChart.vue";
import BotChart from "@/components/analytics/bot/BotChart.vue";
// import BookingTypesChart from "@/components/analytics/BookingTypesChart.vue";
// import BookingSourceChart from "@/components/analytics/BookingSourceChart.vue";
// import LazniaChanChart from "@/components/analytics/LazniaChanChart.vue";
// import FillChart from "@/components/analytics/FillChart.vue";

const bookings = ref([]);
const guests = ref([]);
const loading = ref(true);

const selectedHouse = ref("all");
const selectedYear = ref("all");
const selectedMonth = ref("all");

const filteredBookings = computed(() => {
  return bookings.value
});

const years = computed(() => {
  const yearsSet = new Set();
  bookings.value.forEach(b => {
    if (!b.d) return;
    const [startRaw] = b.d.split("-");
    const year = startRaw.split("T")[0].split(".")[2];
    yearsSet.add(year);
  });
  return Array.from(yearsSet).sort((a, b) => a - b);
});

function resetFilters() {
  selectedHouse.value = 'all';
  selectedYear.value = 'all';
  selectedMonth.value = 'all';
}

onMounted(async () => {
  fetch("https://bot.laznikyiv.com/lklg/bot.log").then(res => res.text().then(data => {
    console.log(data.split("\n"))
  }))
  useHead({ title: "Аналітика | Lazni Kyiv" });
  
  try {
    const [bookingsData, guestsData] = await Promise.all([
      api.bookings.list(),
      api.guests.list()
    ]);
    
    bookings.value = bookingsData.bookings;
    guests.value = guestsData.guests;
  } catch (error) {
    console.error("Failed to load data:", error);
  } finally {
    loading.value = false;
  }
});
</script>
<style scoped>
  .info-grid.info-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    box-sizing: border-box;
    gap: 0.5rem;
    /* width: calc(100dvw - 15dvw - 2rem); */
  }
  .info-grid.info-2 .info-item {
    width: auto;
  }
  
</style>