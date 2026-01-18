<template>
  <div :class="['modal-overlay', visible ? 'visible' : 'hidden']" @click.self="close">
    <div :class="['modal-content', visible ? 'visible' : 'hidden']">
      <!-- Header -->
      <div class="modal-header" v-if="title">
        <h3>{{ title }}</h3>
        <Button  v-if="close" appearance="ghost" class="modal-close" size="lg" @click="closeModal">&times;</Button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <slot />
      </div>

      <!-- Footer -->
      <div class="modal-footer" v-if="$slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from './Button.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: String,
  close: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

// reactive visibility
const visible = ref(props.modelValue)

// watch parent v-model
watch(() => props.modelValue, val => {
  visible.value = val
})

// close modal with animation
function closeModal() {
  visible.value = false
  // wait for fade-out before notifying parent
  setTimeout(() => emit('update:modelValue', false), 300)
}
</script>

<style scoped>
/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: none;
  opacity: 0;
  background: rgba(0,0,0,0);
  transition: opacity 0.3s ease;
}

.modal-overlay.visible {
  opacity: 1;
  pointer-events: auto;
  background: rgba(0,0,0,0.5);
}

.modal-overlay.hidden {
  opacity: 0;
  pointer-events: none;
}

/* Content */
.modal-content {
  background: white;
  border-radius: 1.5rem;
  max-width: 500px;
  width: 90%;
  padding: var(--space-4);
  position: relative;
  transform: translateY(-20px);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-content.visible {
  transform: translateY(0);
  opacity: 1;
}

.modal-content.hidden {
  transform: translateY(-20px);
  opacity: 0;
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.modal-close {
  padding: 0.5rem !important;
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  cursor: pointer;
}

/* Body */
.modal-content:has(.modal-footer) .modal-body {
  margin-bottom: var(--space-4);
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}
</style>
