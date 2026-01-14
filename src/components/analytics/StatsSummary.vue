<template>
    <div class="info-grid">
        <AnalyticsCard title="Загальна кількість бронювань" icon="calendar-white">
               <b> {{ props.bookings.length }} </b>
            </AnalyticsCard>
            <AnalyticsCard title="Загальна кількість гостей" icon="guests-white">
                <b>{{ props.guests.length }}</b>
            </AnalyticsCard>
            <AnalyticsCard title="Загальна кількість відвідувачів" icon="visitors">
                <b>{{ totalVisitors }}</b>
            </AnalyticsCard>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import AnalyticsCard from './AnalyticsCard.vue';
    const props = defineProps({
        "bookings": {
            type: Object
        },
        "guests": {
            type: Object
        }
    })

    const totalVisitors = computed(() => {
        let total = 0
        props.bookings.forEach(b => {
            total += Number(JSON.parse(b.meta).g)
        })
        return total
    })

console.log(props.bookings)
</script>
<style scoped>

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem
}
</style>