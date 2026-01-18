<template>
  <AnalyticsCard title="Активність по годинах" icon="clock">
    <v-chart :option="option" autoresize style="height: 320px" />
  </AnalyticsCard>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import AnalyticsCard from "../AnalyticsCard.vue";

use([
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
]);

const botData = ref([]);

onMounted(async () => {
  const res = await fetch("https://api.laznikyiv.com/v2/bot-log", {
    credentials: "include",
  });
  const data = await res.json();
  botData.value = data.content.split("\n").filter(Boolean).map(JSON.parse);
});

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0") + ":00",
);
const EVENTS = ["call", "booking"];
const COLORS = { call: "#2f8051", booking: "#42d778" };
const LABELS = { call: "Дзвінки", booking: "Бронювання" };

const option = computed(() => {
  const counters = {
    call: Object.fromEntries(HOURS.map((h) => [h, 0])),
    booking: Object.fromEntries(HOURS.map((h) => [h, 0])),
  };

  botData.value.forEach((e) => {
    const h = new Date(e.timestamp).getHours().toString().padStart(2, "0") + ":00";
    counters[e.event][h]++;
  });

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: { backgroundColor: "#6a7985" },
      },
    },
    legend: { bottom: 0, textStyle: { fontSize: 12 } },
      grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '5%',
      containLabel: true
    },
     grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '5%',
      containLabel: true
    },
    xAxis: { type: "category", data: HOURS },
    yAxis: {
      type: 'value',
      minInterval: 1,
      axisLine: { lineStyle: { color: '#ccc' } },
      splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } }
    },
    series: EVENTS.map((e) => ({
      name: LABELS[e],
      type: "line",
      smooth: true,
       smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 3 },
      emphasis: { focus: 'series', itemStyle: { borderWidth: 2, borderColor: '#fff' } },
      areaStyle: { opacity: 0.1 },
      data: HOURS.map((h) => counters[e][h]),
      itemStyle: { color: COLORS[e] },
    })),
  };
});
</script>
