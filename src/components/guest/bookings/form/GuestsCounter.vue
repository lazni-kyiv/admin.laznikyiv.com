<template>
  <div :class="['form-input', { blured: disabled }]" style="margin-bottom: 0.5rem">
    <label>Кількість осіб</label>
    <div class="input-row">
      <button type="button" class="component-button" @click="decrease" :disabled="modelValue <= 1">-</button>
      <input type="number" :value="modelValue" readonly />
      <button type="button" class="component-button" @click="increase">+</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ 
  modelValue: {
    type: Number,
    default: 0
  },
  disabled: Boolean 
});

const emit = defineEmits(['update:modelValue']);

function increase() {
  emit('update:modelValue', (props.modelValue || 0) + 1);
}

function decrease() {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1);
  }
}
</script>