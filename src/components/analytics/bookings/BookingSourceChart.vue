<template>
  <AnalyticsCard title="Джерело бронювань" icon="pie-chart">
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

const COLORS = {
  tg: '#229ED9',
  i: '#E4405F',
  v: '#7360F2',
  w: '#25D366',
  t: '#666',
  b: '#111',
  unknown: '#ccc'
}


const typeLabels = {
  tg: "Телеграм",
  i: "Інстаграм",
  v: "Viber",
  w: "WhatsApp",
  t: "Телефон",
  b: "Бот"
}

const chartOption = computed(() => {
  const typeCounts = {}
  
  props.bookings.forEach(b => {
    const type = JSON.parse(b.meta).s || 'unknown'
    typeCounts[type] = (typeCounts[type] || 0) + 1
  })

  const data = Object.entries(typeCounts).map(([type, count]) => ({
    name: typeLabels[type] || type,
    value: count,
     itemStyle: {
    color: COLORS[type] || COLORS.unknown
  }
  }))

  return {

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