<template>
  <div class="ui-card" :class="variant">
    <!-- Header -->
    <div v-if="hasHeader" class="ui-card-header">
      <div class="ui-card-title-row">
        <slot name="icon" />
        <div class="ui-card-title-group">
          <p v-if="title" class="ui-card-title">{{ title }}</p>
          <p v-if="subtitle" class="ui-card-subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <slot name="actions" />
    </div>

    <!-- Body -->
    <div class="ui-card-body">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="ui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>
    import "../css/card.css"
import { computed } from "vue"

const props = defineProps({
  title: String,
  subtitle: String,
  variant: {
    type: String,
    default: "default" // default | outlined | soft
  }
})

const hasHeader = computed(
  () => props.title || props.subtitle
)
</script>
