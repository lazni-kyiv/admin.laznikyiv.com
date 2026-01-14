<template>
  <AnalyticsCard title="Години бронювань" icon="calendar-white">
    <v-chart :option="chartOption" autoresize style="height: 350px" />
  </AnalyticsCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  CanvasRenderer
])

const props = defineProps({
  bookings: {
    type: Array,
    required: true
  }
})

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

const monthOrder = [
  "01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12"
]

const COLORS = ['#0891b2', '#ea580c'] // lazni, chan

/**
 * Parse hours from meta.l
 */
function parseHours(meta) {
  let lazni = 0
  let chan = 0

  if (meta?.l?.l) {
    const parts = meta.l.l.split(':')
    if (parts.length >= 2) lazni = Number(parts[1]) || 0
  }

  if (meta?.l?.c) {
    const parts = meta.l.c.split(':')
    if (parts.length >= 2) {
      const hours = Number(parts[1]) || 0
      const fills = parts[2] ? parts[2].split(',') : []
      // split hours equally if multiple fills
      chan = fills.length ? hours : hours
    }
  }

  return { lazni, chan }
}

const chartOption = computed(() => {
  // Group hours by year/month
  const grouped = {}

  props.bookings.forEach(b => {
    let meta = {}
    try { meta = JSON.parse(b.meta || '{}') } catch(e){}

    const { lazni, chan } = parseHours(meta)

    if (!lazni && !chan) return

    const [day, month, yearRaw] = b.date.split("T")[0].split(".")
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw

    if (!grouped[year]) grouped[year] = {}
    if (!grouped[year][month]) grouped[year][month] = { lazni: 0, chan: 0 }

    grouped[year][month].lazni += lazni
    grouped[year][month].chan += chan
  })

  const years = Object.keys(grouped).sort()

  return {
    color: COLORS,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } }
    },
    legend: { data: ['Лазня', 'Чан'], bottom: 0, textStyle: { fontSize: 12 } },
    grid: { left: '3%', right: '4%', bottom: '12%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
        name: 'Лазня',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.1 },
        emphasis: { focus: 'series' },
        data: monthOrder.map(m => years.reduce((sum, y) => sum + (grouped[y][m]?.lazni || 0), 0))
      },
      {
        name: 'Чан',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.1 },
        emphasis: { focus: 'series' },
        data: monthOrder.map(m => years.reduce((sum, y) => sum + (grouped[y][m]?.chan || 0), 0))
      }
    ]
  }
})
</script>

<style scoped>
</style>
