<template>
  <div class="ui-dropdown" ref="wrapper">
    <!-- Toggle -->
    <div
      class="dropdown-toggle"
      tabindex="0"
      role="button"
      :aria-expanded="open"
      @click="toggleDropdown"
      @keydown="onKeydown"
    >
   <svg data-v-487ee982="" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" class="lucide action-dot lucide-dot-icon lucide-dot action-dot"><circle cx="12.1" cy="12.1" r="1"></circle></svg>
   <svg data-v-487ee982="" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" class="lucide action-dot lucide-dot-icon lucide-dot action-dot"><circle cx="12.1" cy="12.1" r="1"></circle></svg>
   <svg data-v-487ee982="" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" class="lucide action-dot lucide-dot-icon lucide-dot action-dot"><circle cx="12.1" cy="12.1" r="1"></circle></svg>
    </div>

    <!-- Dropdown -->
    <ul
      ref="dropdown"
      :class="['dropdown-menu', position, { visible: open }]"
      role="menu"
    >
      <li
        v-for="(item, i) in items"
        :key="i"
        role="menuitem"
        :class="{ focused: i === focusedIndex }"
        @click="trigger(item)"
      >
        <slot name="item" :item="item">{{ item.label }}</slot>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import { Dot } from "lucide-vue-next"
const props = defineProps({
  items: { type: Array, default: () => [] }
})

const open = ref(false)
const focusedIndex = ref(-1)
const wrapper = ref(null)
const dropdown = ref(null)
const position = ref("bottom")

/* ---------- Toggle ---------- */
function toggleDropdown() {
  if (!open.value) {
    calculatePosition()
    focusedIndex.value = 0
  }
  open.value = !open.value
}

/* ---------- Trigger action ---------- */
function trigger(item) {
  item?.action?.()
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
        (focusedIndex.value + 1) % props.items.length
      scrollIntoView()
      break

    case "ArrowUp":
      e.preventDefault()
      focusedIndex.value =
        (focusedIndex.value - 1 + props.items.length) %
        props.items.length
      scrollIntoView()
      break

    case "Enter":
      e.preventDefault()
      trigger(props.items[focusedIndex.value])
      break

    case "Escape":
      open.value = false
      break
  }
}

/* ---------- Helpers ---------- */
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

/* ---------- Lifecycle ---------- */
onMounted(() =>
  document.addEventListener("click", handleClickOutside)
)
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
)
</script>

<style scoped>
.ui-dropdown {
  position: relative;
  width: 100%;
}

.dropdown-toggle {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-1) var(--space-1);
  border: var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  cursor: pointer;
  outline: none;
}
/* .action-dot {
    width: 0.5rem;
} */
.dropdown-toggle:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 5%, transparent);
}

.dropdown-toggle .arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.dropdown-toggle .arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  /* left: 0; */
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
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 100;
  width: max-content
}

.dropdown-menu.bottom {
  top: calc(100% + var(--space-2));
}

.dropdown-menu.top {
  bottom: calc(100% - var(--space-4));
  transform: translateY(-10px);
}

.dropdown-menu.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-menu li {
  padding: var(--space-1) var(--space-2);
  cursor: pointer;
  border-radius: 0.375rem;
}

.dropdown-menu li:hover,
.dropdown-menu li.focused {
  background: var(--neutral-100);
}
</style>
