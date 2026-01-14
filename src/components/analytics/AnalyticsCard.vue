<template>
  <div class="info-item">
    <div class="info-item__header">
        <div class="info-item__icon">
            <Icon :icon="icon"></Icon>
        </div>
     
      <p class="info-item__title">{{ title }}</p>
    </div>
    <br>
    <slot></slot>
  </div>
</template>

<script setup>
    import Icon from '../ui/Icon.vue';
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});
</script>
<style scoped>
    .info-grid.info-3 {
  grid-template-columns: 1fr 1fr 1fr
}
.info-item {
    display: flex;
    flex-direction: column;
    max-height: 30rem;
  border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow);
    padding: 1rem;
    color: #1d4641;
    background-color: #ffffff;
  
    flex: 1 1;
    /* opacity: 0;
    transform: translateY(3rem);
    z-index: 0; */
    /* animation: up-30033f77 .75s ease-out forwards; */
    border: var(--border);
}

.info-item canvas {
  height: 20rem;
  border: green solid !important;
}
.info-item__header {
    display: flex;
    gap: 0.5rem;
}

.info-item__icon {
    padding: .5rem;
    width: fit-content;
    display: inline;
    border-radius: 0.375rem;
    background: var(--primary-hover);
    color: white;
    width: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1 !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

}
</style>