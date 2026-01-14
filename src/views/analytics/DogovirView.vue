<template>
  <AdminView>
    <div class="header">
      <p class="comment">Договори</p>
      <div class="header__search">
        <div class="form-input">
          <input
            type=""
            placeholder="Пошук"
            v-model="searchQuery"
            @input="search()"
          />
        </div>
      </div>
    </div>

    <div class="guests" v-if="gridType == 'l'">
      
      <p v-if="bookings.length == 0" class="not-found">Немає результатів</p>

      <div
        class="guest"
        v-for="(dogovir, i) in bookings"
        v-if="bookings?.length > 0"
        :style="`animation-delay: ${0.02 * i}s`"
        :class="{ lorem: placeholder }"
      >
        <div class="guest-text">
          <div class="guest__avatar">
            <i class="hgi hgi-stroke hgi-signature"></i>
          </div>
        </div>
        <div class="guest__info">
        
          <div class="guest__name">
             {{ JSON.parse(dogovir.dogovir).pdf }}
          </div>
          <!-- <div v-if="!guest?.alias" class="guest__name placeholder">
            123123123123123
          </div>
        
          <div v-if="!guest?.alias" class="guest__id placeholder">
            123123123123
          </div> -->
          <div class="guest__id">
            {{ guests.filter(w => w.$id == dogovir.guest)[0].name}}
          </div>
        </div>
        <div class="guest__actions">
         <DogovirActions :booking="dogovir" :guest="guests.filter(w => w.$id == dogovir.guest)[0]">

         </DogovirActions>
        </div>
      </div>
    </div>
  </AdminView>
</template>
<style scoped>
td {
  position: relative;
}

@media print {
  table {
    width: 100% !important;
    /* Use percentage to fit page width */
    border: 1px solid red;
    /* Specify border width for clarity */
    border-collapse: collapse;
    /* Ensure borders are clean */
    box-sizing: border-box;
    /* Prevent padding/margins from causing overflow */
    font-size: 10pt;
    /* Adjust font size for print readability */
    page-break-inside: auto;
    /* Allow table to break across pages if needed */
  }

  /* Ensure table cells don't overflow */
  th,
  td {
    padding: 5px !important;
    /* Adjust padding for print */
    overflow: hidden;
    /* Prevent content from spilling out */
    text-overflow: ellipsis;
    /* Handle long text gracefully */
    white-space: normal;
    /* Allow text wrapping */
  }

  /* Prevent page breaks inside table rows */
  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  /* Optional: Adjust page margins for print */
  @page {
    margin: 1cm;
    padding: 0px;
    /* Set consistent margins for the printed page */
  }

  /* Hide non-essential elements for printing */
  body * {
    visibility: hidden;
  }

  table,
  table * {
    visibility: visible;
  }
}

thead {
  z-index: 1000;
}

.house-badge::after {
  content: " ";
  position: absolute;
  left: 0.5rem;
  top: 50%;
  width: 0.5rem;
  height: 0.5rem;
  background-color: rgba(128, 128, 128, 0);
  border-radius: 0.5rem;

  font-size: smaller;
  color: transparent;
  margin-right: 0.5rem;
  transform: translateY(-50%) !important;
}

.house-badge {
  color: transparent;
}

.house-badge.f::after {
  background-color: rgb(0, 123, 255);
}

.house-badge.l::after {
  background-color: rgb(38, 197, 104);
}

.house-badge.r::after {
  background-color: rgb(133, 133, 133);
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

/* .guests {
        padding-top: calc(89px + 49px);
    } */
.guest {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border-radius: 1rem !important;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
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
    scale: 0.7;
  }

  100% {
    opacity: 1;
    scale: 1;
  }
}

.guest.hide {
  opacity: 0 !important;
  scale: 0 !important;
}

.header {
  display: flex;
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: linear-gradient(#e0efe6, transparent);
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

.guest__avatar i {
  background-color: #3d90864a;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 9999px;
}

.guest__avatar .guest__avatar__badge {
  position: absolute;
  color: white;
  background-color: #1d383551;
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
  border-radius: 0.25rem;
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
  overflow: auto;
}

table th,
table td {
  text-wrap: nowrap;
}

.not-found {
  margin: 0px;
}

.guest__id {
  opacity: 0.6;
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
.guest__actions {
  margin-left: auto;
  display: flex;
  gap: 0.5rem;
}
</style>
<script setup>
import { onMounted, ref, computed, reactive, watch } from "vue";
import AdminView from "@/templates/AdminView.vue";
import "@/assets/css/views/dashboard.css";
import DogovirActions from "@/components/dogovir/DogovirActions.vue";
import { Query, ID } from "appwrite";
import router from "@/router";
import { useHead } from "@vueuse/head";
import toastr from "toastr";
import { api } from "@/assets/js/app";
const guestsOriginal = ref([]);
const guests = ref(Array.from({ length: 10 }, () => ({})));
const searchQuery = ref("");
const authed = ref(null);
const placeholder = ref(true);
const accessType = ref(null);
const reversedGuests = computed(() => {
  return [...guests.value].reverse();
});
const newGuest = ref({
  alias: null,
  name: null,
  birthday: null,
  document: null,
  phone: null,
});
const bookings = ref([]);
const bookingsOriginal = ref([]);
const gridType = ref("l");

onMounted(() => {
  useHead({
    title: "Договори",
  });
  const error = sessionStorage.getItem("guest-error");
  if (error == "get-error") {
    toastr.error("Помилка завантаження гостя");
    sessionStorage.removeItem("guest-error");
  }
  api.guests.list().then((data) => {
    guestsOriginal.value = data.guests;
    guests.value = data.guests;

    placeholder.value = false;

     // console.log(data);
  });
  api.bookings.list().then((data) => {
    bookings.value = data.bookings.filter(e => e.dogovir !== null);
    bookingsOriginal.value = data.bookings.filter(e => e.dogovir !== null);
    const bk = data.bookings.filter(e => e.dogovir !== null);
     // console.log(bookings);
    guests.value.forEach((guest) => {
       // console.log(guest);
      let book = 0;
      bk.forEach((e) => {
        if (e.guest == guest.$id) book += 1;
      });
      guest["bookings"] = book;
       // console.log(book);
    });
  });

  // ---- Load guests FROM API (not Appwrite) ----
  // fetch("https://api.laznikyiv.com/v2/guests", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token}`
  //   }
  // })
  // .then(res => res.json())
  // .then(data => {
  //    // console.log("Guests:", data)

  //   // API returns { guests: [...] }
  //   guests.value = data.guests || []
  //   guestsOriginal.value = data.guests || []

  //   placeholder.value = false
  // })
  // .catch(err => {
  //   console.error("Failed to load guests:", err)
  //   placeholder.value = false
  // })
});
function search() {
  bookings.value = bookingsOriginal.value.filter((d) =>
    String(guests.value.filter(e => e.$id == d.guest)[0].name)
      .toLowerCase()
      .includes(String(searchQuery.value.trim()).toLowerCase()) ||
      String(JSON.parse(d.dogovir).pdf)
      .toLowerCase()
      .includes(String(searchQuery.value.trim()).toLowerCase())
  );
}
function parseBookingDate(str) {
  const [start, end] = str.split("-");

  function parsePart(part) {
    const [datePart, timePart] = part.split("T");
    const year = 2000 + parseInt(datePart.slice(0, 2), 10);
    const month = parseInt(datePart.slice(2, 4), 10) - 1; // JS months 0-11
    const day = parseInt(datePart.slice(4, 6), 10);
    const [hour, minute] = timePart.split(":").map(Number);
    const date = new Date(year, month, day, hour, minute);
    if (isNaN(date)) throw new Error(`Invalid date parsed: ${part}`);
    return date;
  }

  return {
    startDate: parsePart(start),
    endDate: parsePart(end),
  };
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getLastAndNextVisit(guestId) {
  const now = new Date();
  const today = stripTime(now);

  const guestBookings = bookings.value
    ?.filter((b) => b.g === guestId && typeof b.d === "string")
    .map((b) => {
      try {
        const { startDate, endDate } = parseBookingDate(b.d);
        return { ...b, startDate, endDate };
      } catch (e) {
        console.warn(`Skipping invalid booking: ${b.d}`);
        return null;
      }
    })
    .filter((b) => b !== null);

  const pastVisits =
    guestBookings?.filter((b) => stripTime(b.startDate) < today) || [];
  const lastVisit =
    pastVisits.length > 0
      ? pastVisits.reduce(
          (max, b) => (b.startDate > max.startDate ? b : max),
          pastVisits[0]
        )
      : null;

  const futureVisits =
    guestBookings?.filter((b) => stripTime(b.startDate) >= today) || [];
  const nextVisit =
    futureVisits.length > 0
      ? futureVisits.reduce(
          (min, b) => (b.startDate < min.startDate ? b : min),
          futureVisits[0]
        )
      : null;

  return { lastVisit, nextVisit };
}


async function customCode(inputStr, length = 6) {
  // 1️⃣ SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(inputStr);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // 2️⃣ Convert hash to hex
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  // 3️⃣ Take first 16 hex chars → bigint
  let num = BigInt("0x" + hex.slice(0, 16));

  const alphabet = "01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = BigInt(alphabet.length);

  // 4️⃣ Base conversion
  let code = "";
  while (num > 0n) {
    const i = num % base;
    code = alphabet[Number(i)] + code;
    num = num / base;
  }

  return `${code.slice(0, length)}`;
}
const guestCodes = reactive({});
watch(
  () => reversedGuests.value,
  async (guests) => {
    if (!guests?.length) return;

    for (const guest of guests) {
      const id = guest?.$id;
      if (!id || guestCodes[id]) continue;

      guestCodes[id] = await customCode(id);
    }
  },
  { immediate: true, deep: true }
);
</script>
