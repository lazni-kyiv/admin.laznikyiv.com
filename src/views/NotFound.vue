<template>
    <AdminView >
        <p class="comment">404</p>

        <h2>Сторінку не знадено</h2>
    </AdminView>

</template>

<script setup>

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { auth } from '@/assets/js/app';
import AdminView from "@/templates/AdminView.vue";
import "/src/assets/css/views/dashboard.css";
import "/src/assets/css/views/calendar.css";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useHead } from '@vueuse/head';
const authed = ref(null)


onMounted(() => {
    useHead({
        title: "Сторінку не знайдено | Lazni Kyiv"
    })
    auth.getSession().then(s => {
    if (s) {
        authed.value = true
    } else {
        authed.value = false
    }
}).catch(()=>{
    authed.value = false
})
   
   

    //     toastr.success('Saved successfully!')
    // toastr.error('Something went wrong.')
    // toastr.info('Just letting you know.')
    // toastr.warning('Be careful!')
})


</script>

<style scoped>
tr.selected {
    position: relative;
    transition: all 0.5s;
}

tr.selected::after {
    transition: all 0.5s;
    width: 100%;
    height: 2rem;
    position: absolute;
    transform: translateY(-50%);
    border-radius: 3rem;
    top: 50%;
    left: 0;
    content: ' ';
    background-color: rgba(128, 128, 128, 0.094);
    z-index: 90;
}

.calendar__cell {
    z-index: 100 !important;
    position: relative;
}

.boookings {
    display: flex;
    flex-direction: column;
    overflow: auto;
    flex: 1 1;
    max-height: calc(100dvh - 12.5rem);
    height: fit-content;
    gap: 0.5rem;
    padding: 0.5rem;
    padding-bottom: 0.5rem;
}

.info__item {
    flex: 1 1;
}

.info__item.list {
    padding-bottom: 0px !important;
}


</style>
