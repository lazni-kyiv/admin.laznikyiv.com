<template name="HouseSelector">
  <div :class="['form-input', { blured: !type }]">
    <label>Будинок</label>
    <div class="select-input">
      <button
        v-for="option in HOUSE_TYPES"
        :key="option.value"
        type="button"
        :disabled="option.value !== 'family' && type === 'pool'"
        :class="['house', { selected: modelValue === option.value }]"
        @click="$emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup name="HouseSelector">
import { HOUSE_TYPES } from "../bookingUtils";

defineProps({ 
  modelValue: String,
  type: String 
});
defineEmits(['update:modelValue']);
</script>