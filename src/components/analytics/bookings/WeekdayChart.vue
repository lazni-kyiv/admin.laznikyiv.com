<template>
  <AnalyticsCard title="Бронювання за днями тижня" icon="calendar-white">
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
  bookings: {
    type: Array,
    required: true
  }
})

const COLORS = [
  '#2f8051',   // green
  '#42d778',   // light green
  '#dc2626',   // red
  '#ea580c',   // orange
  '#0891b2'    // cyan
]

// Weekdays labels (in Ukrainian)
const weekdays = [
  "Понеділок", 
  "Вівторок", 
  "Середа", 
  "Четвер", 
  "П'ятниця", 
  "Субота", 
  "Неділя"
]

const chartOption = computed(() => {
  // grouped = { "2025": [0,1,2,...6] }
  const grouped = {}

  props.bookings.forEach(e => {
    const [day, month, yearRaw] = e.date.split("T")[0].split(".")
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw

    // JS Date: month is 0-based
    const jsDate = new Date(Number(year), Number(month) - 1, Number(day))
    const weekdayIndex = (jsDate.getDay() + 6) % 7 // convert JS Sunday=0 → Sunday=6

    if (!grouped[year]) grouped[year] = new Array(7).fill(0)
    grouped[year][weekdayIndex]++
  })

  const years = Object.keys(grouped).sort()

  return {
    color: COLORS,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: params => {
        let result = `<strong>${params[0].axisValue}</strong><br/>`
        params.forEach(item => {
          result += `${item.marker} ${item.seriesName}: <strong>${item.value}</strong> бронювань<br/>`
        })
        return result
      }
    },
    legend: {
      data: years,
      bottom: 0,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: weekdays,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e5e7eb'
        }
      }
    },
    series: years.map((year, index) => ({
      name: year,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 3
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      areaStyle: {
        opacity: 0.1
      },
      data: grouped[year]
    }))
  }
})
</script>

<style scoped>
/* ECharts canvas inherits size from parent */
</style>