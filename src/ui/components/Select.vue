<template>
  <div class="ui-select" ref="wrapper">
    <!-- Label -->
    <label v-if="label" :for="inputId">{{ label }}</label>

    <!-- Toggle -->
    <div
      class="select-toggle"
      tabindex="0"
      role="combobox"
      :aria-expanded="open"
      @click="toggleDropdown"
      @keydown="onKeydown"
    >
      <span>{{ selectedLabel || placeholder }}</span>
      <svg class="arrow" :class="{ open }" viewBox="0 0 24 24">
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <!-- Dropdown -->
    <ul
      ref="dropdown"
     
      :class="['select-dropdown', position, { visible: open }]"
    >
      <li
        v-for="(option, i) in options"
        :key="option.value"
        role="option"
        :aria-selected="i === focusedIndex"
        :class="{
          selected: option.value === modelValue,
          focused: i === focusedIndex
        }"
        @click="select(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue"

const props = defineProps({
  modelValue: [String, Number],
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: "Select..." },
  label: String,
  id: String
})

const emit = defineEmits(["update:modelValue"])

const open = ref(false)
const selectedLabel = ref("")
const focusedIndex = ref(-1)

const wrapper = ref(null)
const dropdown = ref(null)

const inputId = ref(
  props.id || `select-${Math.random().toString(36).slice(2, 8)}`
)

const position = ref("bottom")

/* ---------- Toggle ---------- */
function toggleDropdown() {
  if (!open.value) {
    calculatePosition()
    setInitialFocus()
  }
  open.value = !open.value
}

/* ---------- Select ---------- */
function select(option) {
  emit("update:modelValue", option.value)
  selectedLabel.value = option.label
  open.value = false
}

/* ---------- Keyboard ---------- */
function onKeydown(e) {
  if (!open.value && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault()
    toggleDropdown()
    return
  }

  if (!open.value) return

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault()
      focusedIndex.value =
        (focusedIndex.value + 1) % props.options.length
      scrollIntoView()
      break

    case "ArrowUp":
      e.preventDefault()
      focusedIndex.value =
        (focusedIndex.value - 1 + props.options.length) %
        props.options.length
      scrollIntoView()
      break

    case "Enter":
      e.preventDefault()
      select(props.options[focusedIndex.value])
      break

    case "Escape":
      open.value = false
      break
  }
}

/* ---------- Helpers ---------- */
function setInitialFocus() {
  const index = props.options.findIndex(
    o => o.value === props.modelValue
  )
  focusedIndex.value = index >= 0 ? index : 0
}

function scrollIntoView() {
  nextTick(() => {
    const el = dropdown.value?.children[focusedIndex.value]
    el?.scrollIntoView({ block: "nearest" })
  })
}

/* ---------- Outside click ---------- */
function handleClickOutside(e) {
  if (wrapper.value && !wrapper.value.contains(e.target)) {
    open.value = false
  }
}

/* ---------- Position ---------- */
function calculatePosition() {
  nextTick(() => {
    const rect = wrapper.value.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const dropdownHeight = dropdown.value?.offsetHeight || 150
    position.value = spaceBelow < dropdownHeight ? "top" : "bottom"
  })
}

/* ---------- Sync label ---------- */
watch(
  () => props.modelValue,
  val => {
    const found = props.options.find(o => o.value === val)
    selectedLabel.value = found ? found.label : ""
  },
  { immediate: true }
)

/* ---------- Lifecycle ---------- */
onMounted(() =>
  document.addEventListener("click", handleClickOutside)
)

onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
)
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
  outline: none;
}

.select-toggle:focus {
  border-color: var(--primary);
   box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 5%, transparent) !important;
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
  user-select: none;
  right: 0;
  background: var(--bg-card);
  border: var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  max-height: 200px;
  overflow-y: auto;
  padding: var(--space-1);
  margin: 0;
  list-style: none;
  z-index: 100;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.select-dropdown.bottom {
  top: calc(100% + var(--space-2));
}

.select-dropdown.top {
  bottom: calc(100% - var(--space-4));
  transform: translateY(-10px);
}

.select-dropdown.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.select-dropdown li {
  padding: var(--space-1) var(--space-2);
  cursor: pointer;
  border-radius: 0.375rem;
}

.select-dropdown li:hover,
.select-dropdown li.focused {
  background: var(--neutral-100);
}

.select-dropdown li.selected {
  background: var(--primary);
  color: var(--text-inverse);
}
</style>
