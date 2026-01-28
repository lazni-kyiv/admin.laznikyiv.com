<template>
    <AdminView>
        <div class="info__item">
            <h3>
                Створити бронювання
            </h3>
            <span>
                {{ route.params.id }}
            </span>
            <Select :options="opt" label="Будинок"></Select>
        </div>
</AdminView>
</template>
<script setup>
import AdminView from '@/templates/AdminView.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const route = useRoute()
import {Select} from '@/ui/';
const booking = ref({})
import { api } from '@/assets/js/app';
const opt = ref([
    {
        "label": "Family House",
        "value": "f"
    },
    {
        "label": "River Left",
        "value": "l"
    },
    {
        "label": "River Right",
        "value": "r"
    }
])
</script>