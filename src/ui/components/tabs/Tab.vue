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

function select() {
  tabs.setActive(props.value)
}
</script>

<template>
  <button
    class="ui-tab"
    :class="{ active: isActive }"
    @click="select"
  >
    <slot />
  </button>
</template>
