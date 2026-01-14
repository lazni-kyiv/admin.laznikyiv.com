<template>
  <AnalyticsCard title="Бронювання за місяцями" icon="calendar-white">
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

const COLORS = [
  '#2f8051',   // green
  '#42d778',   // light green
  '#dc2626',   // red
  '#ea580c',   // orange
  '#0891b2'    // cyan
]

const monthOrder = [
  "01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12"
]

const chartOption = computed(() => {
  // Group bookings by year and month
  const grouped = {}

  props.bookings.forEach(e => {
    const [day, month, yearRaw] = e.date.split("T")[0].split(".")
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw

    if (!grouped[year]) grouped[year] = {}
    if (!grouped[year][month]) grouped[year][month] = 0

    grouped[year][month]++
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
      data: monthOrder.map(m => monthes[m]),
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
      data: monthOrder.map(m => grouped[year][m] || 0)
    }))
  }
})
</script>

<style scoped>
/* ECharts canvas inherits size from parent */
</style>