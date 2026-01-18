<template>
  <AnalyticsCard title="Заповнення чану" icon="pie-chart">
    <v-chart :option="chartOption" autoresize style="height: 320px" />
  </AnalyticsCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

const props = defineProps({
  bookings: {
    type: Array,
    required: true
  }
})

// Colors for fill types
const COLORS = ['#ea580c', '#16a34a',  '#42D778'] // c = citrus, t = travy

// Labels
const typeLabels = {
  c: "Цитрус",
  t: "Трави",
  h: "Хвоя"
}

/**
 * Parse chan fill hours
 * "08.01.26:2:c,t" → {c:1, t:1}
 */
function parseChanFill(meta) {
  const result = { c: 0, t: 0, h: 0 }
  if (!meta?.l?.c) return result

  const parts = meta.l.c.split(':')
  if (parts.length < 3) return result

  const hours = Number(parts[1]) || 0
  const fills = parts[2].split(',')

  if (!hours || !fills.length) return result

  const perFill = hours / fills.length
  fills.forEach(f => {
    if (f === 'c') result.c += 1
    if (f === 't') result.t += 1
    if (f === 'h') result.h += 1
  })

  return result
}

const chartOption = computed(() => {
  const stats =  { c: 0, t: 0, h: 0 }

  props.bookings.forEach(b => {
    let meta = {}
    try {
      meta = JSON.parse(b.meta || '{}')
    } catch (e) {}

    const fill = parseChanFill(meta)
    stats.c += fill.c
    stats.t += fill.t
    stats.h += fill.h
  })

  const data = Object.entries(stats).map(([key, value]) => ({
    name: typeLabels[key],
    value
  }))

  return {
    color: COLORS,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <strong>{c}</strong> ({d}%)'
    },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 12 }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 3
      },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        fontSize: 13
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      data
    }]
  }
})
</script>

<style scoped>
</style>
