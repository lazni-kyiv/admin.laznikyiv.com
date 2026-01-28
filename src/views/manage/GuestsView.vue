<template>
    <AdminView>
         <dialog id="guest" class="modal">
        <form class="modal-box" @submit.prevent="addGuest()" >
          <h3 class="text-lg font-bold">Додати гостя</h3>
          <div class="form-input">
            <label class="required">Ім'я <span>*</span></label>
            <input type="text" v-model="newGuest.alias" minlength="1" required />
          </div>
          <div class="form-input">
            <label for="">Коментар</label>
            <textarea style="height: 8rem" type="text" maxlength="100" v-model="newGuest.description" minlength="1"></textarea>
            <div style="width: 100%; text-align: end">
            <small>{{ newGuest?.description?.length }}/100</small>
          </div>
          </div>
          <div class="form-input">
            <label for="">Telegram</label>
            <input type="text" placeholder="@laznikyiv" v-model="newGuest.tg" minlength="1" />
          </div>
          <div class="form-input">
            <label for="">Instagram</label>
            <input type="text" placeholder="@laznikyiv" v-model="newGuest.ig" minlength="1" />
          </div>
           <div
          class="form-input">
          <label class="required">Джерело <span>*</span></label>
          <div class="select-input">
            <button v-for="src in sources" :key="src.value" type="button"
              :class="['house', { selected: newGuest.source === src.value }]"
              @click="newGuest.source = src.value">
              {{ src.label }}
            </button>
          </div>
        </div>  
          <div class="modal-action">
            <button class="secondary" @click.prevent @click="closeCreate()">Скасувати</button>
            <button type="submit" :disabled="createDisabled">Зберегти</button>
          </div>
        </form>
      </dialog>
        <div class="header">
            <p class="comment">Гості</p>
            <div class="header__search">
                <div class="form-input">
                    <input type="" placeholder="Пошук" v-model="searchQuery" @input="search()">
                </div>
                <button style="width: fit-content" class="primary" onclick="guest.showModal()" v-if="canAddGuests">
                    + Додати гостя
                </button>

            </div>


        </div>
 
       <div class="guests">
            <p v-if="guests.length == 0" class="not-found">Немає результатів</p>

            <router-link :to="'/guests/' + guest?.$id + '/'" class="guest" v-for="(guest, i) in reversedGuests"
                v-if="reversedGuests?.length > 0" :style="`animation-delay: ${0.02 * i}s`"
                :class="{ lorem: placeholder }">
                <div class="guest-text">

                    <div class="guest__avatar">
                        <span class="guest__avatar__count">№{{ i + 1 }}</span>

                        <img v-if="guest?.b === 't'" class="guest__avatar"
                            :src="`https://ui-avatars.com/api/?name=${guest?.alias}/&background=ccc&color=grey`">
                        <img v-else-if="guest?.b === 'p'" class="guest__avatar"
                            :src="`https://ui-avatars.com/api/?name=${guest?.alias}/&background=E1B33F75&color=daa520`">
                        <img v-else-if="!guest?.alias" class="guest__avatar"
                            :src="`  https://ui-avatars.com/api/?name=••/&background=ccc&color=808080`">
                        <img v-else class="guest__avatar"
                            :src="`https://ui-avatars.com/api/?name=${guest?.alias}/&background=3D90864A&color=1d464`">

                        <span class="guest__avatar__bookings" v-if="guest.bookings > 0">{{ guest.bookings }}</span>
                        <span class="guest__avatar__badge"
                            v-if="bookings.filter(a => a.g === guest?.$id).length > 0 && bookings.filter(a => a.g === guest?.$id).length < 99">{{
                                bookings.filter(a => a.g === guest?.$id).length}}</span>
                        <span class="guest__avatar__badge"
                            v-else-if="bookings.filter(a => a.g === guest?.$id).length > 0">99+
                        </span>
                    </div>


                </div>
                <div class="guest__info">

                    <div v-if="!guest?.alias" class="guest__name placeholder">
                        123123123123123
                    </div>
                    <div v-else class="guest__name">
                        {{ guest?.alias }}
                    </div>
                    <div v-if="!guest?.alias" class="guest__id placeholder">
                        123123123123
                    </div>
    
                    <div class="guest__id" v-if=" guest.name && guest.name !== 'None'">
                        {{ guest?.name || "-" }}
                    </div>
                    <div class="guest__id" v-else>
                        {{ "-" }}
                    </div>

                </div>


            </router-link>
        </div>

    </AdminView>
</template>
<style scoped>
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

.header__search {
    display: flex;
    gap: 0.25rem;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

}

.header__search .form-input {
    max-width: 20rem;
}

.guests {

    padding: 1rem;
    padding-top: 95px;

    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
}

.header {
    top: 49px !important;
}
.guest {
    padding: .5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    border-radius: 1rem !important;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    background-color: rgb(255 255 255);
    opacity: 0;
    animation: guest 0.2s ease-in-out forwards;
    animation-delay: attr(data-n);
    scale: 0.7;
    transition: all 0.5s ease-in-out;
}

@keyframes guest {
    0% {
        opacity: 0;
        scale: 0.7
    }

    100% {
        opacity: 1;
        scale: 1
    }
}

.guest.hide {
    opacity: 0 !important;
    scale: 0 !important
}

.header {
    display: flex;
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
    background: linear-gradient(#E0EFE6, transparent);
    top: 0 !important;
    flex-direction: column;
    padding-top: 0.5rem;
    box-sizing: border-box;
    padding: 1rem;
    padding-bottom: 0.5rem;
}

.guest__avatar {
    position: relative;

}

.guest__avatar img {
    border-radius: 50rem;
    width: 3rem;
}

.guest__avatar .guest__avatar__badge {
    position: absolute;
    color: white;
    background-color: #1D383551;
    backdrop-filter: blur(3px);
    width: 1rem;
    border-radius: 0.5rem;
    padding: 0.125rem;
    text-align: center;
    font-size: 0.65rem;
    bottom: -0.25rem;
    right: 0;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

}

.guest__avatar .guest__avatar__count {
    position: absolute;
    border-radius: .25rem;
    padding: 0.125rem;
    text-align: center;
    font-size: 0.65rem;
    top: -0.5rem;
    left: -0.5rem;
    z-index: 100;
    background: linear-gradient(45deg, white, rgba(255, 255, 255, 0));
    backdrop-filter: blur(3px);
    padding-left: 0.5rem;
    padding-right: 0.5rem;

}

.guest__avatar .guest__avatar__bookings {
    font-size: 0.75rem;
    width: fit-content;
    height: 1rem;
    border-radius: 9999px;

    padding: 0.5rem;
    padding-top: 0px;
    padding-bottom: 0px;
    border: solid 1px var(--primary);
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.135) !important;
    backdrop-filter: blur(10px) !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.header button {
    text-wrap: nowrap;
    ;
}

.actions,
.filter {
    display: flex;
    justify-self: end;
    margin-left: auto;
}

.actions {
    gap: 0.25rem;
}

.actions button:last-of-type {
    font-size: 1.25rem;
}

.filter button.secondary {

    background-color: transparent !important;
}

.actions button {
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: transparent !important; */
}

.filter button:first-child {
    font-size: 1rem;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
}

.filter button:last-child {
    font-size: 1rem;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
}

table th {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

table {
    width: 100%;
    overflow: auto
}

table th,
table td {
    text-wrap: nowrap;
    ;
}

.not-found {
    margin: 0px;
}

.guest__id {
    opacity: 0.2
}

p.comment {
    margin: 0px;
    color: grey;
    margin-bottom: 0.5rem;
}

.guest.lorem {
    opacity: 0.5 !important;
    pointer-events: none;
}

.guests table {
    background-color: rgb(255 255 255);
    /* padding-top: calc(86px + 56px); */
    border-collapse: collapse;
}

.guests table thead {
    position: sticky;
    transform: translateY(-0.25rem);
    padding-top: 0;
    margin-top: 0px;
    top: 0.25rem;
    background-color: rgb(237, 245, 244);
}

.guests table tbody td {
    padding: 1rem;
}

.guests tr td {
    border-bottom: 1px solid rgb(231, 231, 231) !important;
}

@media (max-width: 768px) {
    .header {
        top: 0px !important;
    }

    .guests {
        padding-top: 89px;
    }
}
</style>
<script setup>
import { onMounted, ref, computed } from "vue";
import AdminView from "@/templates/AdminView.vue";
import "@/assets/css/views/dashboard.css"
import { useHead } from "@vueuse/head";
import toastr from "toastr";
import { useRoute } from "vue-router";
import { useAuth } from "@/stores/auth";
import { api } from "@/assets/js/app";
const guestsOriginal = ref([])
const guests = ref(Array.from({ length: 10 }, () => ({})))
const searchQuery = ref("")
const placeholder = ref(true)
import "@/assets/views/guest/bookings.css"
import router from "@/router";
const createPlaceholder = ref(false)
const { user } = useAuth()

const canAddGuests = computed(() => {

    if (!user.value?.teams) return false

    return user.value.teams.some(team => {
        try {
            const prefs = typeof team.prefs === 'string'
                ? JSON.parse(team.prefs)
                : team.prefs

            return prefs?.guests?.includes('create')
        } catch {
            return false
        }
    })
})

const reversedGuests = computed(() => {
    return [...guests.value].reverse()
})

const newGuest = ref({
    alias: null,
    tg: null,
    ig: null,
    description: null,
    source: null
})
const createDisabled = computed(() => {
  if (createPlaceholder.value) return true;
  if (!newGuest.value.alias || !newGuest.value.source) return true;
  return false;
});

const bookings = ref([])
function closeCreate() {
     newGuest.value = {
            alias: null,
            name: null,
            birthday: null,
            document: null,
            phone: null
        }
     createPlaceholder.value = false
     document.getElementById("guest").close()
}
async function addGuest() {
    createPlaceholder.value = true
    api.guests.create(newGuest.value).then(data => {
        newGuest.value = {
            alias: null,
            name: null,
            birthday: null,
            document: null,
            phone: null
        }
        window.location.href = `/guests/${data.guest.$id}`
    }).catch(e => {
        toastr.error("Не вдалося створити гостя")
    })
}
const gridType = ref("l")

onMounted(() => {
    useHead({
        title: "Гості"
    })
    const error = sessionStorage.getItem("guest-error")
    if (error == "get-error") {
        toastr.error("Помилка завантаження гостя")
        sessionStorage.removeItem("guest-error")
    }
    api.guests.list().then((data) => {
        guestsOriginal.value = data.guests
        guests.value = data.guests

        placeholder.value = false

         // console.log(data)
    })
    api.bookings.list().then((data) => {
        const bookings = data.bookings
         // console.log(bookings)
        guests.value.forEach((guest) => {
             // console.log(guest)
            let book = 0
            bookings.forEach(e => {
                if (e.guest == guest.$id) book += 1;
            })
            guest["bookings"] = book
             // console.log(book)
        })
    })
})
function search() {
    newGuest.value.alias = searchQuery.value.trim()
    guests.value = guestsOriginal.value.filter(g => String(g.alias).toLowerCase().includes(String(searchQuery.value.trim()).toLowerCase()) || String(g.name).toLowerCase().includes(String(searchQuery.value.trim()).toLowerCase()))
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
