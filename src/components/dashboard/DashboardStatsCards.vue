<template>
    <div class="stats-cards">
        <div class="stats-card">
            <div class="stats-card__header">
                <div class="stats-card__icon">
                     <Icon icon="calendar-white"/>
                </div>
                <span :class="differenceClass(todayDifference)">
                    {{ formatDifference(todayDifference) }}
                </span>
            </div>
            <br>
            <h3 class="stats-card__count">
                {{ bookingsToday }}
            </h3>
            <p class="stats-card__title">
                Бронювань сьогодні
            </p>
        </div>
        <div class="stats-card">
            <div class="stats-card__header">
                  <div class="stats-card__icon">
                     <Icon icon="calendar-white"/>
                  </div>
                <span :class="differenceClass(monthDifference)">
                    {{ formatDifference(monthDifference) }}
                </span>
            </div>
            <br>
            <h3 class="stats-card__count">
                {{ bookingsThisMonth }}
            </h3>
            <p class="stats-card__title">
                Бронювань цього місяця
            </p>
        </div>
        <div class="stats-card">
            <div class="stats-card__header">
                 <div class="stats-card__icon">
                     <Icon icon="guests-white"/>
                  </div>
                <span :class="differenceClass(guestsDifference)">
                    {{ formatDifference(guestsDifference) }}
                </span>
            </div>
            <br>
            <h3 class="stats-card__count">
                {{ guests.length }}
            </h3>
            <p class="stats-card__title">
                Загальна кількість гостей
            </p>
        </div>
    </div>
</template>

<script setup>
import Icon from '../ui/Icon.vue';
import { defineProps, watch, ref, computed } from 'vue';

const props = defineProps({
    guests: {
        type: Array,
        default: () => []
    },
    bookings: {
        type: Array,
        default: () => []
    }
});

const bookingsToday = ref(0);
const bookingsYesterday = ref(0);
const bookingsThisMonth = ref(0);
const bookingsLastMonth = ref(0);
const totalGuests = ref(0);
const totalGuestsLastPeriod = ref(0);

const todayDifference = computed(() => {
    return bookingsToday.value - bookingsYesterday.value;
});

const monthDifference = computed(() => {
    return bookingsThisMonth.value - bookingsLastMonth.value;
});

const guestsDifference = computed(() => {
    // Calculate based on last 30 days vs previous 30 days
    const last30Days = getTotalGuestsLastNDays(30);
    const previous30Days = getTotalGuestsLastNDays(60) - last30Days;
    return last30Days - previous30Days;
});

function formatDifference(diff) {
    if (diff > 0) return `+${diff}`;
    if (diff < 0) return `${diff}`;
    return '0';
}

function differenceClass(diff) {
    if (diff > 0) return 'positive-diff';
    if (diff < 0) return 'negative-diff';
    return 'neutral-diff';
}

function parseBookingDate(dateStr) {
    // Assuming date format: "12.12.25T12:00-14.12.25T09:00"
    const [startStr] = dateStr.split('-');
    const [datePart] = startStr.split('T');
    
    // Convert "12.12.25" to "2025-12-12"
    const [day, month, year] = datePart.split('.');
    return `20${year}-${month}-${day}`;
}

function getBookingGuests(booking) {
    try {
        const meta = typeof booking.meta === 'string' ? JSON.parse(booking.meta) : booking.meta || {};
        return meta.g || meta.guests || 0;
    } catch {
        return 0;
    }
}

function getTotalGuestsLastNDays(days) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return props.bookings.reduce((total, booking) => {
        try {
            const bookingDate = new Date(parseBookingDate(booking.date));
            if (bookingDate >= cutoffDate) {
                return total + getBookingGuests(booking);
            }
        } catch (e) {
            console.error('Error parsing booking date:', booking.date);
        }
        return total;
    }, 0);
}

watch(() => props.bookings, (bookings) => {
    if (!bookings || !bookings.length) {
        resetStats();
        return;
    }

    calculateTodayStats(bookings);
    calculateMonthStats(bookings);
    calculateGuestsStats(bookings);
}, { immediate: true });

function resetStats() {
    bookingsToday.value = 0;
    bookingsYesterday.value = 0;
    bookingsThisMonth.value = 0;
    bookingsLastMonth.value = 0;
    totalGuests.value = 0;
    totalGuestsLastPeriod.value = 0;
}

function calculateTodayStats(bookings) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    bookingsToday.value = 0;
    bookingsYesterday.value = 0;

    bookings.forEach(booking => {
        try {
            const bookingDate = parseBookingDate(booking.date);
            if (bookingDate === today) {
                bookingsToday.value++;
            } else if (bookingDate === yesterdayStr) {
                bookingsYesterday.value++;
            }
        } catch (e) {
            console.error('Error parsing booking date for today:', booking.date);
        }
    });
}

function calculateMonthStats(bookings) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const lastMonth = new Date(now);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthYear = lastMonth.getFullYear();
    const lastMonthMonth = lastMonth.getMonth();

    bookingsThisMonth.value = 0;
    bookingsLastMonth.value = 0;

    bookings.forEach(booking => {
        try {
            const bookingDate = new Date(parseBookingDate(booking.date));
            const bookingYear = bookingDate.getFullYear();
            const bookingMonth = bookingDate.getMonth();

            if (bookingYear === currentYear && bookingMonth === currentMonth) {
                bookingsThisMonth.value++;
            } else if (bookingYear === lastMonthYear && bookingMonth === lastMonthMonth) {
                bookingsLastMonth.value++;
            }
        } catch (e) {
            console.error('Error parsing booking date for month:', booking.date);
        }
    });
}

function calculateGuestsStats(bookings) {
    // Calculate total guests from all bookings
    totalGuests.value = bookings.reduce((total, booking) => {
        return total + getBookingGuests(booking);
    }, 0);

    // Calculate guests from last 30 days for comparison
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    let last30DaysGuests = 0;
    let previous30DaysGuests = 0;

    
    // For guests difference calculation
    totalGuestsLastPeriod.value = previous30DaysGuests;
}
</script>

<style scoped>
.stats-card__icon {
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

.stats-card__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;
}

.positive-diff {
    color: #10b981;
    font-weight: 600;
    background: #d1fae5;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
}

.negative-diff {
    color: #ef4444;
    font-weight: 600;
    background: #fee2e2;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
}

.neutral-diff {
    color: #6b7280;
    font-weight: 600;
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
}

.stats-card {
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow);
    padding: 1rem;
    color: #1d4641;
    background-color: #ffffff;
    flex: 1 1;
    opacity: 0;
    transform: translateY(3rem);
    z-index: 0;
    animation: up .75s ease-out forwards;
    border: var(--border)
}

.stats-card:nth-child(2) {
    animation-delay: 0.25s;
}

.stats-card:nth-child(3) {
    animation-delay: 0.5s;
}

@keyframes up {
    0% {
        opacity: 0;
        transform: translateY(5rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.stats-card * {
    margin: 0px;
}

.stats-card__count {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
}

.stats-card__title {
    margin-top: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
}

.stats-cards {
    display: flex;
    gap: 0.5rem;
    width: 100%;
}

@media (max-width: 1023px) {
    .stats-cards {
        flex-direction: column !important;
    }
}
</style>