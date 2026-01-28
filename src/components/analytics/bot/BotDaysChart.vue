<template>
  <AnalyticsCard title="Активність бота по днях тижня" icon="calendar-white">
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
  LegendComponent
} from 'echarts/components'
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

const DAYS = ['Нд','Пн','Вт','Ср','Чт','Пт','Сб']

const COLORS = {
  total: '#2f8051',
  booking: '#42d778',
  call: '#ea580c'
}

const chartOption = computed(() => {
  const booking = Array(7).fill(0)
  const call = Array(7).fill(0)

  props.botData.forEach(e => {
    const day = new Date(e.timestamp).getUTCDay()
    if (e.event === 'booking') booking[day]++
    if (e.event === 'call') call[day]++
  })

  const total = booking.map((v, i) => v + call[i])

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
      data: DAYS,
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
      baseSeries('Бронювання', booking, COLORS.booking),
      baseSeries('Дзвінки', call, COLORS.call)
    ]
  }
})
</script>
