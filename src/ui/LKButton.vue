<template>
    <button>
        <slot></slot>{{ props.icon }}
    </button>
</template>
<script setup>

    const props = defineProps({
        icon: {
            type: Text
        }
    })
</script>