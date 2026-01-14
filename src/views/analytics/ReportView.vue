<template>
  <div class="monthly-report-page">
    <h1 class="text-2xl font-bold mb-4">Місячний звіт</h1>

    <div class="mb-6">
      <label class="mr-2 font-semibold">Оберіть рік:</label>
      <select v-model="selectedYear" class="border rounded px-2 py-1">
        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <AnalyticsCard title="Бронювання та Гості по місяцях" icon="calendar-white">
      <v-chart :option="chartOption" autoresize style="height: 400px" />
    </AnalyticsCard>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '@/components/analytics/AnalyticsCard.vue'
import { api } from '@/assets/js/app'
// register ECharts modules
use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

// state
const bookings = ref([])
const guests = ref([])

const selectedYear = ref(new Date().getFullYear())
const years = ref([])

const monthes = {
  "01": "Січень", "02": "Лютий", "03": "Березень", "04": "Квітень",
  "05": "Травень", "06": "Червень", "07": "Липень", "08": "Серпень",
  "09": "Вересень", "10": "Жовтень", "11": "Листопад", "12": "Грудень"
}
const monthOrder = ["01","02","03","04","05","06","07","08","09","10","11","12"]
const COLORS = ['#2f8051','#42d778','#dc2626','#ea580c','#0891b2']

// fetch data from API
async function loadData() {
  const bookingsData = await api.bookings.list() // your API call
  bookings.value = bookingsData.bookings || []

  const guestsData = await api.guests.list() // assuming you have a similar API
  guests.value = guestsData.guests || []

  // extract years from both bookings and guests
  const allDates = [...bookings.value.map(b => b.date), ...guests.value.map(g => g.$createdAt)]
  years.value = Array.from(new Set(allDates.map(d => new Date(d).getFullYear()))).sort()
}

onMounted(() => {
   api.reports.list().then(r => console.log(r))
})

// compute chart
const chartOption = computed(() => {
  // aggregate bookings by month
  const bookingByMonth = {}
  monthOrder.forEach(m => bookingByMonth[m] = 0)
  bookings.value.forEach(b => {
    const [year, month] = b.date.split("T")[0].split("-")
    if (year == selectedYear.value) bookingByMonth[month]++
  })

  // aggregate guests by month
  const guestByMonth = {}
  monthOrder.forEach(m => guestByMonth[m] = 0)
  guests.value.forEach(g => {
    const [year, month] = g.$createdAt.split("T")[0].split("-")
    if (year == selectedYear.value) guestByMonth[month]++
  })

  return {
    color: COLORS,
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['Бронювання','Гості'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: monthOrder.map(m => monthes[m]),
      axisLine: { lineStyle: { color: '#ccc' } }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } }
    },
    series: [
      {
        name: 'Бронювання',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: { opacity: 0.1 },
        data: monthOrder.map(m => bookingByMonth[m])
      },
      {
        name: 'Гості',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        areaStyle: { opacity: 0.1 },
        data: monthOrder.map(m => guestByMonth[m])
      }
    ]
  }
})
</script>

<style scoped>
.monthly-report-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>
