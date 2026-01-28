<template>
  <div class="ui-input" :class="{ error, 'placeholder-hide': !modelValue  }">
    <label v-if="label" :for="inputId">{{ label }}</label>
    <div class="input-wrapper">
      <!-- Visible readonly input -->
      <input
        :id="inputId"
        type="text"
        readonly
        :placeholder="placeholder"
        :value="displayValue"
        @click="openPicker"
        @focus="openPicker"
        class="ui-date-proxy"
      />

      <!-- Hidden native date input -->
      <input
        ref="nativeInput"
        type="date"
        class="native-date"
        :value="modelValue"
        @input="onNativeInput"
        tabindex="-1"
      />
    </div>
  </div>

  <div class="ui-input-footer" v-if="error || hint">
    <small class="ui-input-error" v-if="error">{{ error }}</small>
    <small class="ui-input-hint" v-if="hint">{{ hint }}</small>
  </div>
</template>
<script setup>
import "../css/input.css"
import { ref, computed } from "vue"

const props = defineProps({
  modelValue: String, // YYYY-MM-DD
  label: String,
  placeholder: { type: String, default: "Select date" },
  id: String,
  hint: String,
  error: String
})

const emit = defineEmits(["update:modelValue"])

const inputId = ref(
  props.id || `date-${Math.random().toString(36).slice(2, 10)}`
)

const nativeInput = ref(null)

/* ---------- Open native picker ---------- */
function openPicker() {
  nativeInput.value?.showPicker?.()
  nativeInput.value?.focus()
}

/* ---------- Handle selection ---------- */
function onNativeInput(e) {
  emit("update:modelValue", e.target.value)
}

/* ---------- Display formatting ---------- */
const displayValue = computed(() => {
  if (!props.modelValue) return ""

  const [y, m, d] = props.modelValue.split("-")
  return `${d}.${m}.${y}` // customize format here
})
</script>
