<template name="SourceSelector">
  <div :class="['form-input', { blured: disabled }]">
    <label class="mt-4">Джерело</label>
    <div class="select-input">
      <button
        v-for="src in SOURCES"
        :key="src.value"
        type="button"
        :class="['house', { selected: modelValue === src.value }]"
        @click="$emit('update:modelValue', src.value)"
      >
        {{ src.label }}
      </button>
    </div>
  </div>
</template>

<script setup name="SourceSelector">
import { SOURCES } from "../bookingUtils";

defineProps({ 
  modelValue: String,
  disabled: Boolean 
});
defineEmits(['update:modelValue']);
</script>