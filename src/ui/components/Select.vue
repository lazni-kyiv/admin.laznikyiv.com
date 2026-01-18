<template>
  <div class="ui-select" ref="wrapper">
    <!-- Label -->
    <label v-if="label" :for="inputId">{{ label }}</label>

    <!-- Selected / toggle button -->
    <div class="select-toggle" @click="toggleDropdown">
      <span>{{ selectedLabel || placeholder }}</span>
      <svg class="arrow" :class="{ open: open }" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
      </svg>
    </div>

    <!-- Dropdown menu -->
    <ul
      ref="dropdown"
      :class="['select-dropdown', position, { visible: open }]"
    >
      <li 
        v-for="option in options" 
        :key="option.value"
        :class="{ selected: option.value === modelValue }"
        @click="select(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: "Select..." },
  label: String,
  id: String
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const selectedLabel = ref("")
const wrapper = ref(null)
const dropdown = ref(null)
const inputId = ref(props.id || `select-${Math.random().toString(36).slice(2, 8)}`)
const position = ref('bottom') // bottom or top

// Toggle dropdown
function toggleDropdown() {
  if (!open.value) {
    calculatePosition()
  }
  open.value = !open.value
}

// Select item
function select(option) {
  emit('update:modelValue', option.value)
  selectedLabel.value = option.label
  open.value = false
}

// Close dropdown on outside click
function handleClickOutside(e) {
  if (wrapper.value && !wrapper.value.contains(e.target)) {
    open.value = false
  }
}

// Determine dropdown position
function calculatePosition() {
  nextTick(() => {
    const rect = wrapper.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const dropdownHeight = dropdown.value ? dropdown.value.offsetHeight : 150

    position.value = spaceBelow < dropdownHeight ? 'top' : 'bottom'
  })
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

// Set initial label
const initial = props.options.find(o => o.value === props.modelValue)
if (initial) selectedLabel.value = initial.label
</script>

<style scoped>
.ui-select {
  position: relative;
  font-family: var(--font-primary);
  width: 100%;
  max-width: 10rem;
}

.ui-select label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.select-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  border: var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  cursor: pointer;
  transition: var(--transition-fast);
}

.select-toggle:hover {
  border-color: var(--primary);
}

.select-toggle .arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.select-toggle .arrow.open {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border: var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  z-index: 100;
  opacity: 0;
  /* width: max-content; */
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Positioning */
.select-dropdown.bottom {
  top: calc(100% + var(--space-2));
}

.select-dropdown.top {
  bottom: calc(100% - var(--space-4));
  transform: translateY(-10px);
}

/* Visible state */
.select-dropdown.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Dropdown items */
.select-dropdown {
  padding: var(--space-1)!important;
}
.select-dropdown li {
  padding: var(--space-1) var(--space-2);
  cursor: pointer;
  border-radius: 0.375rem;
  transition: var(--transition-fast);
}

.select-dropdown li:hover {
  background: var(--neutral-50);
}

.select-dropdown li.selected {
  background: var(--primary);
  color: var(--text-inverse);
}
</style>
