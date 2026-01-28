<template>
  <AnalyticsCard title="Активність бота по місяцях" icon="calendar-white">
    <v-chart :option="chartOption" autoresize style="height: 350px" />
  </AnalyticsCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

const props = defineProps({
  botData: { type: Array, required: true }
})

const COLORS = {
  total: '#2f8051',
  booking: '#42d778',
  call: '#ea580c'
}

const chartOption = computed(() => {
  const map = {}

  // --- group by month ---
  props.botData.forEach(e => {
    const d = new Date(e.timestamp)
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`

    if (!map[key]) {
      map[key] = { booking: 0, call: 0 }
    }

    if (e.event === 'booking') map[key].booking++
    if (e.event === 'call') map[key].call++
  })

  const entries = Object.entries(map).sort()

  const labels = entries.map(([month]) => month)
  const bookings = entries.map(([, v]) => v.booking)
  const calls = entries.map(([, v]) => v.call)
  const total = entries.map(([, v]) => v.booking + v.call)

  const baseSeries = (name, data, color) => ({
    name,
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 6,
    lineStyle: { width: 3 },
    areaStyle: { opacity: 0.1 },
    emphasis: { focus: 'series' },
    data,
    itemStyle: { color }
  })

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 12 }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '14%',
      top: '6%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels,
      axisLine: { lineStyle: { color: '#ccc' } }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: {
        lineStyle: { type: 'dashed', color: '#e5e7eb' }
      }
    },
    series: [
      baseSeries('Усього', total, COLORS.total),
      baseSeries('Бронювання', bookings, COLORS.booking),
      baseSeries('Дзвінки', calls, COLORS.call)
    ]
  }
})
</script>
