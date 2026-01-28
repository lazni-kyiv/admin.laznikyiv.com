<template>
        <div class="info__item">
            <h3>
                Бронювання
            </h3>
            <span>
                {{ route.params.id }}
            </span>
        </div>

</template>
<script setup>
import AdminView from '@/templates/AdminView.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const route = useRoute()
const booking = ref({})
import { api } from '@/assets/js/app';
onMounted(() => {
    api.bookings.get(route.params.id).then(data=>{
        console.log(data)
        booking.value = data
    })

})
</script>