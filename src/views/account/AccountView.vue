<template>
  <AdminView >
    <p class="comment">Аккаунт</p>
   <div class="info-col">
     <div class="info-item">
      <div class="info-item__header">
        <i class="hgi hgi-stroke hgi-user"></i>
        <p>Особиста інформація</p>
      </div>
    <div class="account-header" style="width: fit-content">
      <img @dragstart.prevent @dragover.prevent class="account__avatar" :src="`https://ui-avatars.com/api/?name=${user?.name}/&background=1d4641&color=ffffff`"  >
    <h4 class="account__name">
   {{ user.name }}
    </h4></div>
<br>
   <div class="info-grid">
     <div class="form-input">
      <label for="">Пошта</label>
     <input type="text" v-model="user.email" readonly>
   </div>
    <div class="form-input">
      <label for="">ID</label>
     <input type="text" v-model="user.id" readonly>
   </div>
    <div class="form-input">
      <label for="">Рівень</label>
     <input type="text"readonly v-model="teams">
   </div>
   </div>
      </div>
       <div class="info-item version-item">
        <div class="verison-item__info">
          <h3>Lazni Admin</h3>
          <p>Версія <b>{{ v }}</b> • &copy {{ new Date().getFullYear() }} Lazni Kyiv</p>
  
        </div>
    <img src="/public/512.png" alt="" @dragstart.prevent @dragover.prevent >
      </div>
   </div>
  </AdminView>
  
</template>

<script setup>
import {v} from "@/assets/js/app"
import AdminView from '@/templates/AdminView.vue'

import { ref, onMounted, computed } from 'vue'

import { useHead } from '@vueuse/head'

import { useAuth } from "@/stores/auth"
onMounted(() => {
  useHead({
    title: 'Профіль',
  })
})

const {user} = useAuth()
const teams = computed(() => { return user.value.teams.map(e => e.team_name).join(', ')})
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
.placeholder {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  width: fit-content;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  color: transparent;
  position: relative;
  background-color: #eee;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
.account-header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.animated-background {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 100px;
  position: relative;
}
.calendar__cell {
  z-index: 100 !important;
  position: relative;
}
button:has(svg) {
  display: grid;
  place-items: center;
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
.info-row{
  display: flex;
  gap: 0.5rem;
  flex: 1 1;flex-wrap: wrap;
}
@media (max-width: 768px) {
  .info-row{
 flex-direction: column;
}

}
.info-item, .info-row__item {
  border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow);
    padding: 1rem;
    color: #1d4641;
    background-color: #ffffff;
    flex: 1 1 !important;
    height: min-content !important;
    border: var(--border);
}
.info-item__header {
  display: flex;
  margin-bottom: 1rem;
  gap: 0.5rem;
  align-items: center;
}
.info-item__header i {
  font-weight: bold;
}
.info-item.list {
  padding-bottom: 0px !important;
}

.analytics-span:has(p.positive) {
  color: green;
}
.analytics-span:not(:has(p.positive)) {
  color: red;
}
.info__item__count {
  display: flex;
  width: 100%;
}
.analytics-span {
  width: 100%;
  display: flex;
  align-items: center;
  flex: 1 1;
  flex-wrap: nowrap;
  margin-left: 0.25rem;
}

.analytics-span.neutral {
  color: rgb(231, 171, 21);
}
.booking__info__guest {
  text-decoration-line: underline;
text-underline-offset: 2px;
text-decoration-thickness: 1px;
text-decoration-skip: edges;
}
.booking__info__guest.p {
  color: rgb(184, 136, 13);
  font-weight: bold;
}
.booking {
  transition: all 0.5s ease;
}
.booking.updated {
  /* box-shadow: 0 1px 2px 0 rgba(54, 215, 137, 0.179); */
  background-color: rgba(54, 215, 137, 0.179);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
.calendar-cell:nth-child(5),
.calendar-cell:nth-child(6),
.calendar-cell:nth-child(7),
.calendar-cell:nth-child(12),
.calendar-cell:nth-child(13),
.calendar-cell:nth-child(14),
.calendar-cell:nth-child(19),
.calendar-cell:nth-child(20),
.calendar-cell:nth-child(21),
.calendar-cell:nth-child(26),
.calendar-cell:nth-child(27),
.calendar-cell:nth-child(28),
.calendar-cell:nth-child(33),
.calendar-cell:nth-child(34),
.calendar-cell:nth-child(35)
 {
  background-color: rgba(33, 122, 79, 0.179);;
}
.calendar-cell {
  /* border: .5px solid #ddd; */
 
  border-radius: 0.375rem;
  padding: 0.5rem;
  min-height: 80px;
  background: #f9f9f9;
  position: relative;
  min-width: 3rem;
}
.calendar-cell.notCurrentMonth {
  opacity: 0.5;
}
.calendar-cell.notCurrentMonth .date{
  color: rgba(128, 128, 128, 0.5);
}
.date {
  font-weight: bold;
  z-index: 1000 !important;
  position:absolute
}

.calendar-booking {
  font-size: 0.75rem;
  background: #a2df88;
  padding: 2px 4px;
  margin-top: 4px;
  border-radius: 4px;
}
.calendar-booking.f {
  background-color: rgb(0, 123, 255);
  color: white;
}
.calendar-booking.l {
  background-color: rgb(38, 197, 104);
  color: white;
}
.calendar-booking.r {
background-color: rgb(133, 133, 133);
color: white;
}
.calendar-booking a {
  overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: underline;
}

.info span {
  background-color: var(--primary-hover);
  color: white;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.calendar-booking {
  opacity: 0;
  scale: 0.6;
  overflow: hidden !important;
  animation: booking 0.2s forwards ease-in-out
}

@keyframes booking {
  0% {
    opacity: 0;
    scale: 0.6;
  }50% {
    opacity: 0.5;
    scale: 1.03;
  }
   100% {
    opacity: 1;
    scale: 1;
  }
}

.calendar-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}
.calendar-nav span {
  width: 9rem;
  text-align: center;
}
/* .calendar-nav button {
  background-color: #eee;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
} */

.today {

  background-color: var(--primary) !important;
}
.calendar-cell:hover .cell-actions {
  opacity: 1;
  pointer-events: auto;;

}

.cell-actions {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: rgba(255, 255, 255, 0.387);
  z-index: 100;
  backdrop-filter: blur(5px);
  transition: all 0.2s ease-in;
  padding-top: 1rem;
  padding-bottom: 0.125rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
}
.cell-actions button {
  width: 100%;
}
.today .date {
  color: white
}
.notCurrentMonth {
  background-color: #f5f5f5;
  color: #aaa;
}
.info__item {
  overflow: auto;
}
.bookings {
  margin-top: 1.25rem;
}

.account__avatar {
  border-radius: 9999px;
  height: 4rem;
}

.account {
  display: flex;
  gap : 0.5rem
}
.credentials {
  display: flex;
  width: fit-content;
  /* justify-content: center; */
  flex-direction: column !important;
  /* margin: 1rem auto; */
  max-width: 700px;
}

.cred-card {
  /* background: #1e1e28; */

  color: #000000;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  /* box-shadow: 0 6px 20px rgba(0,0,0,0.3); */
  width: 100%;
  transition: 0.2s ease-in-out;
}

.cred-header {
  display: flex;
  /* align-items: center; */
  gap: 1rem;
}

.cred-icon img,
.cred-icon svg {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 2px rgba(255,255,255,0.2));
}

.cred-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.cred-user,
.cred-pass {
  /* background: #2a2a36; */
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column; 
  font-family: monospace;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  display: inline-block;
}

.cred-pass {
  background: #e8eae9;
  color: var(--primary);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem
}
.info-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.version-item {
  display: flex;
  justify-content: space-between;
  border-color: var(--primary-hover) !important;
  background: linear-gradient(35deg, rgb(222, 243, 234), rgb(233, 255, 246));
}

.verison-item__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.verison-item__info h3 {
  font-family: Lazni
}
.version-item img {
  width: 8rem;
}
.version-item p {
  font-family: 600
}
</style>
