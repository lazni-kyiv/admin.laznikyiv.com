<template>
  <button
    :class="[
      'ui-button',
      appearance,
      size
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import "../css/button.css"
const props = defineProps({
  appearance: {
    type: String,
    default: 'outline',
  },
  size: {
    type: String,
    default: 'md',
  },
})
</script>
