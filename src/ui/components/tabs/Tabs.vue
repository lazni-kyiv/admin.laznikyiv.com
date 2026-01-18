<script setup>
import { provide, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const activeTab = ref(props.modelValue)

watch(() => props.modelValue, v => {
  activeTab.value = v
})

function setActive(value) {
  activeTab.value = value
  emit('update:modelValue', value)
}

provide('tabs', {
  activeTab,
  setActive,
})
</script>

<template>
  <div class="ui-tabs">
    <slot />
  </div>
</template>
