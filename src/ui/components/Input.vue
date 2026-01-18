<template>
  <div class="ui-input" :class="error ? 'error': ''">
    <!-- Label -->
    <label v-if="label" :for="inputId">{{ label }}</label>

    <div class="input-wrapper">
      <input
        :id="inputId"
        :type="typeValue"
        :placeholder="placeholder"
        :value="modelValue"
        @input="e => emit('update:modelValue', e.target.value)"
       :class="placeholder == '__hidden__' ? 'placeholder-hidden' : ''"

        v-bind="$attrs"
      />

      <!-- Toggle button only for password -->
      <button
        v-if="props.type === 'password'"
        type="button"
        @click="toggle()"
        class="ui-input-toggle"
      >
        <Eye v-if="typeValue === 'password'" height="16" />
        <EyeClosed v-else height="16" />
      </button>
    </div>
  </div>
  <div class="ui-input-footer" v-if="error || hint">
    <small class="ui-input-error" v-if="error">
      {{ error }}
    </small>
    <small class="ui-input-hint" v-if="hint">
      {{ hint }}
    </small>
  </div>
</template>

<script setup>
import "../css/input.css"
import { ref } from "vue"
import { Eye, EyeClosed } from "lucide-vue-next"

// Props
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: { type: String, default: '__hidden__' },
  type: { type: String, default: 'text' },
  id: String,
  hint: String,
  error: String
})

// Emit for v-model
const emit = defineEmits(['update:modelValue'])

// Random ID if not provided
const inputId = ref(props.id || `input-${Math.random().toString(36).slice(2, 10)}`)

// Reactive type for toggle
const typeValue = ref(props.type)

// Toggle show/hide
function toggle() {
  typeValue.value = typeValue.value === 'password' ? 'text' : 'password'
}
</script>
