<template>
  <AnalyticsCard title="Типи запитів" icon="pie-chart">
    <v-chart :option="chartOption" autoresize style="height: 320px" />
  </AnalyticsCard>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { 
  TooltipComponent, 
  LegendComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import AnalyticsCard from '../AnalyticsCard.vue'

const botData = ref([])
onMounted(() => {
    fetch("https://api.laznikyiv.com/v2/bot-log", {
        credentials: "include"
    }).then(data => data.json().then(data => {
       

        botData.value = data.content.split("\n").filter(e => e.trim() != "").map(e => e = JSON.parse(e))

         console.log(botData.value)
    }))
})
use([
  PieChart,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])


const COLORS = ['#2f8051', '#42d778']

const typeLabels = {
  call: "Дзвінок",
  booking: "Бронювання"
}

const chartOption = computed(() => {
  const typeCounts = {}
  
  botData.value.forEach(b => {
    const type = b.event || 'unknown'
    typeCounts[type] = (typeCounts[type] || 0) + 1
  })

  const data = Object.entries(typeCounts).map(([type, count]) => ({
    name: typeLabels[type] || type,
    value: count
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