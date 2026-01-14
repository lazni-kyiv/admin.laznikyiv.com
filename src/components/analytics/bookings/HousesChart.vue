<template>
  <AnalyticsCard title="Бронювання по будинках" icon="home-white">
    <v-chart :option="chartOption" autoresize style="height: 350px" />
  </AnalyticsCard>
</template>

<script setup>
import { computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

use([
  BarChart, 
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

// Friendly labels
const houseLabels = {
  family: "Family House",
  right: "River View Right",
  left: "River View Left"
}

// Color palette for years
const COLORS = [
  '#2f8051',   // green
  '#42d778',   // light green
  '#dc2626',   // red
  '#ea580c',   // orange
  '#0891b2'    // cyan
]

const chartOption = computed(() => {
  // Extract all years and houses
  const yearsSet = new Set()
  const housesSet = new Set()

  props.bookings.forEach(b => {
    const [day, month, yearRaw] = b.date.split("T")[0].split(".")
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw
    yearsSet.add(year)
    housesSet.add(b.house)
  })

  const years = Array.from(yearsSet).sort()
  const houses = Array.from(housesSet)

  // Initialize grouped data: grouped[year][house] = count
  const grouped = {}
  years.forEach(y => {
    grouped[y] = {}
    houses.forEach(h => grouped[y][h] = 0)
  })

  // Fill counts
  props.bookings.forEach(b => {
    const [day, month, yearRaw] = b.date.split("T")[0].split(".")
    const year = yearRaw.length === 2 ? `20${yearRaw}` : yearRaw
    grouped[year][b.house]++
  })

  return {
    color: COLORS,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
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
      data: houses.map(h => houseLabels[h] || h),
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: 0
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
    series: years.map((year, idx) => ({
      name: year,
      type: 'bar',
      barMaxWidth: 50,
      data: houses.map(h => grouped[year][h]),
      emphasis: {
        focus: 'series',
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      }
    }))
  }
})
</script>

<style scoped>
/* ECharts canvas inherits size from parent */
</style>