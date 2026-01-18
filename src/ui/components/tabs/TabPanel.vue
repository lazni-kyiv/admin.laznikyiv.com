<script setup>
import { inject, computed } from 'vue'
import "../../css/tabs.css"

const props = defineProps({
  value: {
    type: [String, Number],
    required: true,
  },
})

const tabs = inject('tabs')
const isActive = computed(() => tabs.activeTab.value === props.value)
</script>

<template>
  <div v-show="isActive" class="ui-tab-panel">
    <slot />
  </div>
</template>
