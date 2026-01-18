<template>
  <AnalyticsCard title="Активність по місяцях" icon="line-chart">
    <v-chart :option="option" autoresize style="height: 320px" />
  </AnalyticsCard>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

use([LineChart, TooltipComponent, LegendComponent, GridComponent, CanvasRenderer])

const botData = ref([])

onMounted(async () => {
  const res = await fetch('https://api.laznikyiv.com/v2/bot-log', { credentials: 'include' })
  const data = await res.json()
  botData.value = data.content
    .split('\n')
    .filter(Boolean)
    .map(JSON.parse)
})

const EVENTS = ['call', 'booking']
const COLORS = { call: '#2f8051', booking: '#42d778' }
const LABELS = { call: 'Дзвінки', booking: 'Бронювання' }
const monthes = {
  "01": "Січень",
  "02": "Лютий",
  "03": "Березень",
  "04": "Квітень",
  "05": "Травень",
  "06": "Червень",
  "07": "Липень",
  "08": "Серпень",
  "09": "Вересень",
  "10": "Жовтень",
  "11": "Листопад",
  "12": "Грудень"
}

const option = computed(() => {
  // Отримуємо унікальні місяці у форматі YYYY-MM
  const monthsRaw = [...new Set(botData.value.map(e => e.timestamp.slice(0, 7)))].sort()

  // Перетворюємо на формат "Місяць YYYY"
  const months = monthsRaw.map(m => {
    const [year, month] = m.split('-')
    return `${monthes[month]} ${year}`
  })

  // Створюємо лічильники для подій
  const counters = {
    call: Object.fromEntries(monthsRaw.map(m => [m, 0])),
    booking: Object.fromEntries(monthsRaw.map(m => [m, 0]))
  }

  botData.value.forEach(e => counters[e.event][e.timestamp.slice(0, 7)]++)

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } }
    },
    legend: { bottom: 0, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '5%', containLabel: true },
    xAxis: { type: 'category', data: months },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } }
    },
    series: EVENTS.map(e => ({
      name: LABELS[e],
      type: 'line',
      smooth: true,
      data: monthsRaw.map(m => counters[e][m]),
      lineStyle: { width: 3 },
      symbol: 'circle',
      symbolSize: 6,
      emphasis: { focus: 'series', itemStyle: { borderWidth: 2, borderColor: '#fff' } },
      areaStyle: { opacity: 0.1 },
      itemStyle: { color: COLORS[e] }
    }))
  }
})
</script>
