<template>
    <div class="guest-info__item guest-card">
      <div class="guest-card__actions">
 <button onclick="edit.showModal()" v-if="canUpdateGuests" class="guest-edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              class="injected-svg" data-src="https://cdn.hugeicons.com/icons/edit-03-solid-rounded.svg?v=2.0"
              xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
              <path
                d="M18.799 3.0499C17.7324 1.98335 16.0032 1.98337 14.9366 3.04994L13.5236 4.46296L19.537 10.4763L20.9501 9.06321C22.0167 7.99665 22.0166 6.26746 20.9501 5.20092L18.799 3.0499Z"
                fill="white"></path>
              <path
                d="M18.4764 11.537L12.463 5.52363L4.35808 13.6286C3.66361 14.3231 3.20349 15.2172 3.04202 16.1859L2.26021 20.8767C2.22039 21.1156 2.29841 21.3591 2.46968 21.5303C2.64095 21.7016 2.88439 21.7796 3.12331 21.7398L7.81417 20.958C8.78294 20.7965 9.67706 20.3364 10.3715 19.642L18.4764 11.537Z"
                fill="white"></path>
            </svg>
          </button>
           <button @click="showGuestHistory()" v-if="canViewHistory"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/clock-02-stroke-rounded.svg?v=1.0.1" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
<path d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M12 8V12L14 14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
              </button>
      </div>
        <div class="guest-card__header">
             <img v-if="props.guest?.b === 't'" class="guest-card__header__avatar"
                :src="`https://ui-avatars.com/api/?name=${props.guest.alias}/&background=ccc&color=grey`" />
              <img v-else-if="props.guest?.b === 'p'" class="guest-card__header__avatar"
                :src="`https://ui-avatars.com/api/?name=${props.guest?.alias}/&background=E1B33F75&color=daa520`" />
              <!-- <img v-else-if="!props.guest?.b" class="guest-card__header__avatar"
                :src="`https://ui-avatars.com/api/?name=••/&background=ccc&color=808080`" /> -->
              <img v-else class="guest-card__header__avatar"
                :src="`https://ui-avatars.com/api/?name=${props.guest?.alias}/&background=3D90864A&color=1d464`" />
            
                <div class="col">
                    <h4 class="guest-name">{{ props.guest?.alias }}</h4>
                    <span class="guest-id">{{ props.guest?.$id }}</span>
                </div>
        </div>
        <!-- {{ JSON.parse(user.teams[0].prefs.guests).includes("update") }} -->
       <div class="guest_pi-list">
             <div class="pi-item">
                <span>Дата створення</span>
                <p>{{ formatAWTS(props.guest?.$createdAt) }}</p>
            </div>
            <div class="pi-item">
                <span>Востаннє оновлено</span>
                 <p>{{ formatAWTS(props.guest?.$updatedAt) }}</p>
            </div>
            <div class="pi-item">
                <span>Коментар</span>
                 <p>{{ props.guest?.description  ? props.guest?.description : "-" }}</p>
            </div>
             <div class="pi-item">
                <span>Джерело</span>
                 <p>{{ sources.filter(e => e.value == props.guest?.source)[0]?.label || '-'}}</p>
            </div>
            <div class="guest-socials" v-if="(props.guest?.ig && props.guest.ig !== 'None') || (props.guest?.tg && props.guest.tg !== 'None')">
              <hr>
              <div class="guest-socials__grid">
                  <div class="socials-item" v-if="props.guest.ig !== 'None' && props.guest.ig !== null">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/instagram-stroke-rounded.svg?v=3.0" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
<path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#000000" stroke-width="1.5" stroke-linejoin="round"></path>
<path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="#000000" stroke-width="1.5"></path>
<path d="M17.5078 6.5L17.4988 6.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
              <a :href="`https://instagram.com/${props.guest?.ig}`" target="_blank">{{ props.guest.ig }}</a>
                  </div>
                  <div class="socials-item" v-if="props.guest.tg !== 'None' && props.guest.tg !== null">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/telegram-stroke-rounded.svg?v=3.0" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
<path d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
              <a :href="`https://t.me/${props.guest?.tg}`" target="_blank">{{ props.guest.tg}}</a>
                  </div>
              </div>
              
            </div>
       </div>
 <dialog id="edit" class="modal">
        <form class="modal-box" @submit.prevent="saveUser()" v-if="props.guest">
          <h3 class="text-lg font-bold">Редагувати</h3>
          <div class="form-input">
            <label for="">Ім'я</label>
            <input type="text" v-model="guestTemplate.alias" minlength="1" required />
          </div>
          <div class="form-input">
            <label for="">Коментар</label>
            <textarea style="height: 8rem" type="text" maxlength="100" v-model="guestTemplate.description" minlength="1"></textarea>
            <div style="width: 100%; text-align: end">
            <small>{{ guestTemplate?.description?.length }}/100</small>
          </div>
          </div>
          <div class="form-input">
            <label for="">Telegram</label>
            <input type="text" placeholder="@laznikyiv" v-model="guestTemplate.tg" minlength="1" />
          </div>
          <div class="form-input">
            <label for="">Instagram</label>
            <input type="text" placeholder="@laznikyiv" v-model="guestTemplate.ig" minlength="1" />
          </div>
           <div
          class="form-input">
          <label class="mt-4">Джерело</label>
          <div class="select-input">
            <button v-for="src in sources" :key="src.value" type="button"
              :class="['house', { selected: guestTemplate.source === src.value }]"
              @click="guestTemplate.source = src.value">
              {{ src.label }}
            </button>
          </div>
        </div>
          <!-- <div class="form-input">
            <label for="">instagram.com/</label>
            <input type="text" v-model="guestTemplate.i" minlength="1" />
          </div>
          <div class="form-input">
            <label for="">t.me/</label>
            <input type="text" v-model="guestTemplate.tg" minlength="1"/>
          </div> -->
          
          <div class="modal-action">
            <button class="secondary" @click.prevent onclick="edit.close()">Скасувати</button>
            <button type="submit">Зберегти</button>
          </div>
        </form>
      </dialog>
       <dialog id="history" class="modal">
        <form class="modal-box">
          <h3 style="margin-bottom: 1rem">Історія змін</h3>
         <div class="guest-history">
          <div v-for="item in guestHistory" class="history-item" >
            <div :class="`history-item__header ${item.event}`">
              <span>
                {{ item.event }} 
              </span>
              <p>{{  formatAWTS(item.timestamp) }}</p>
            </div>
            <div class="history-item__body">
              <span>
                Ім'я : <b> {{ item.extra.after.alias }}</b>
              </span>
              <span>
               Коментар : <b>{{ item.extra.after.description }}</b>
              </span>
               <span>
               ПІБ : <b>{{ item.extra.after.name }}</b>
              </span>
               <span>
               Дата народження : <b>{{ item.extra.after.birthday }}</b>
              </span>
               <span>
               Номер телефону : <b>{{ item.extra.after.phone }}</b>
              </span>
              <span>
               Документ : <b>{{ item.extra.after.document }}</b>
              </span>
            </div>
            <div class="history-item__footer">
                {{ item.email }}
            </div>
          </div>
         </div>
          
          <div class="modal-action">
            <button class="secondary" @click.prevent="closeHistory()">Закрити</button>
          
          </div>
        </form>
      </dialog>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { api } from '@/assets/js/app'
import toastr from 'toastr'
import { useAuth } from '@/stores/auth'
const {user} = useAuth()

const canUpdateGuests = computed(() => {
  if (!user.value?.teams) return false
  
  return user.value.teams.some(team => {
    try {
      const prefs = typeof team.prefs === 'string' 
        ? JSON.parse(team.prefs) 
        : team.prefs
      
      return prefs?.guests?.includes('update')
    } catch {
      return false
    }
  })
})

const canViewHistory = computed(() => {
  if (!user.value?.teams) return false
  
  return user.value.teams.some(team => {
    try {
      const prefs = typeof team.prefs === 'string' 
        ? JSON.parse(team.prefs) 
        : team.prefs
      
      return prefs?.dev == 'true'
    } catch {
      return false
    }
  })
})
const props = defineProps({
    guest: {
        type: Object
    },
    auth: {
        type: String,
        default: null
    }
})
const guestTemplate = ref({})
watch(
  () => props.guest,
  (val) => {
    guestTemplate.value = { ...val }
  },
  { immediate: true }
)

const emit = defineEmits(['update'])

function saveUser() {
   // console.log(guestTemplate.value)
  api.guests.update(props.guest.$id, {alias:guestTemplate.value.alias, description: guestTemplate.value.description, ig: guestTemplate.value.ig, tg : guestTemplate.value.tg, source: guestTemplate.value.source}).then(data => {
    console.log(data)
    toastr.success("Гостя оновлено")
     // console.log(data)
    emit('update', data.guest)
    guestTemplate.value = data.guest

    document.getElementById("edit").close()
  })
}


function formatAWTS(str) {
  if (!str) return '';

  const date = new Date(str);

  // // add 2 hours
  // date.setHours(date.getHours() + 2);

  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear()).slice(2);
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');

  return `${d}.${m}.${y} ${h}:${min}:${s}`;
}

const guestHistory = ref([])
function showGuestHistory() {
  fetch("https://api.laznikyiv.com/v2/logs/guests", {credentials: "include"})
  .then(res => res.json()
  .then(text => {
    text = text.content
    
    const lines = text            
      .split("\n")           
      .map(l => l.replace(/,$/, "")) 
      .filter(l => l.length > 0);  
    console.log(lines)
    const jsonArray = JSON.parse(`[${lines.join(",")}]`).reverse();
guestHistory.value = jsonArray.filter(e => e.guest_id == props.guest.$id)
    document.getElementById("history").showModal()
  }));

}
function closeHistory() {
  document.getElementById(`history`).close()
}

const sources = ref([
  {
    label: "Instagram",
    value: "i"
  },
  {
    label: "Telegram",
    value: "tg"
  },
  {
    label: "Viber",
    value: "v"
  },
  {
    label: "WhatsApp",
    value: "w"
  },
  {
    label: "Телефон",
    value: "t"
  }
])
</script>
<style scoped>
.guest-card__header {
    display: flex;
    align-items: center;
    justify-content: start;
    display: flex;
    gap: 0.5rem;
}
.guest-card__header__avatar {
  border-radius: 50rem;
  width: 3rem;
}

.guest-id {
    opacity: 0.3;
    font-size: small;
}

.guest_pi-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.guest_pi-list .pi-item span {
    opacity: 0.5;
    font-size: small;
}

.guest-card__actions {
    position: absolute;
    display: flex;
    gap: 0.25rem;
    right: 0.5rem;
    top: 0.5rem
}

.guest-socials__grid {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.socials-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background-color: rgba(228, 228, 228, 0.375);
  border: solid 1px #ccc;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  opacity: 0.75;
  transition: all 0.5s ease
}
.socials-item:hover {
  border-color:black;
    opacity: 1;
}
.guest-socials hr {
  opacity: 0.25
}

.guest-history {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.history-item {
  border-radius: 0.5rem;
  border: solid 1px #cccccc58;
  padding: .5rem;
}
.history-item__header  {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: solid 1px #cccccc58;
  padding-bottom: 0.5rem;
}
.history-item__header p {
  opacity: 0.5;
}
.history-item__body {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.history-item__footer {
  opacity: 0.6;
  border-top: solid 1px #cccccc58;
  padding-top: 0.5rem;
}
</style>