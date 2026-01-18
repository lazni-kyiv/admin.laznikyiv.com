<template>
  <AnalyticsCard title="Тип бронювань" icon="pie-chart">
    <v-chart :option="chartOption" autoresize style="height: 320px" />
  </AnalyticsCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { 
  TooltipComponent, 
  LegendComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

use([
  PieChart,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

const props = defineProps({
  bookings: {
    type: Array,
    required: true
  }
})

// Colors for the chart
const COLORS = ['#ea580c', '#16a34a',  '#42D778'] // lazni, chan, both

// Labels for each category
const typeLabels = {
  lazni: "Лазня",
  chan: "Чан",
  both: "Лазня + Чан"
}

const chartOption = computed(() => {
  const stats = {
    lazni: 0,
    chan: 0,
    both: 0
  }

  // Count bookings
  props.bookings.forEach(b => {
    let meta = {}
    try {
      meta = JSON.parse(b.meta || '{}')
    } catch (e) {}

    const hasL = !!meta.l?.l
    const hasC = !!meta.l?.c

    if (hasL && hasC) stats.both++
    else if (hasL) stats.lazni++
    else if (hasC) stats.chan++
  })

  const data = Object.entries(stats).map(([key, value]) => ({
    name: typeLabels[key],
    value
  }))

  return {
    color: COLORS,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <strong>{c}</strong> бронювань ({d}%)'
    },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 12 }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],  // doughnut
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
