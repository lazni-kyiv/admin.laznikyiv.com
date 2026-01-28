<template>
    <AnalyticsCard title="Години бронювань за місяцями" icon="calendar-white">
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
  import { parseLazniChan } from '@/utils/lazniChan'
  
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
  
  const COLORS = ['#2f8051', '#ea580c'] // Лазня зелений, Чан оранжевий
  const monthOrder = ["01","02","03","04","05","06","07","08","09","10","11","12"]
  
  const chartOption = computed(() => {
    const lazni = Array(12).fill(0)
    const chan = Array(12).fill(0)
  
    props.bookings.forEach(b => {
      const { lazni: l, chan: c } = parseLazniChan(b.meta)
      const [day, month] = b.date.split("T")[0].split(".")
      const m = Number(month) - 1
      lazni[m] += l
      chan[m] += c
    })
  
    return {
      color: COLORS,
      tooltip: {
        trigger: 'axis',
        valueFormatter: v => `${v} год`
      },
      legend: {
        data: ['Лазня','Чан'],
        bottom: 0,
        textStyle: { fontSize: 12 }
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
          areaStyle: { opacity: 0.12 },
          data: lazni
        },
        {
          name: 'Чан',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 3 },
          areaStyle: { opacity: 0.12 },
          data: chan
        }
      ]
    }
  })
  </script>
  