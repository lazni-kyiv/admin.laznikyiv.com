<template>
  <div class="guest-info__item guest-card guest-bookings">
    <div class="geust-card__header">
      <h3>Бронювання</h3>
      <button onclick="newBooking.showModal()" v-if="bookings.length > 0 && canAddBookings">
        +
      </button>
    </div>

    <div class="bookings-list no-bookings" v-if="bookings.length < 1">
      <i class="hgi-stroke hgi-calendar-02"></i>
      <p>У цього гостя ще немає бронювань</p>
      <button onclick="newBooking.showModal()" v-if="canAddBookings">
        Додати бронювання
      </button>
    </div>
    <div class="bookings-list " v-else>


      <div class="booking-card" v-for="booking in bookings">
        <div class="booking-card__header">
          <div class="booking-badge" :class="booking.house">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              class="injected-svg" data-src="https://cdn.hugeicons.com/icons/home-02-stroke-standard.svg?v=3.0"
              xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000" v-if="booking.type == 'house'">
              <path
                d="M3 9.98834V19.5C3 20.6046 3.89543 21.5 5 21.5H19C20.1046 21.5 21 20.6046 21 19.5V9.98834C21 9.3654 20.7097 8.77803 20.2149 8.39963L12.8972 2.80373C12.6396 2.60673 12.3243 2.5 12 2.5C11.6757 2.5 11.3604 2.60673 11.1028 2.80373L3.7851 8.39963C3.29026 8.77804 3 9.3654 3 9.98834Z"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M17 17.5001V13.5001" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              class="injected-svg" data-src="https://cdn.hugeicons.com/icons/pool-stroke-rounded.svg?v=3.0"
              xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000" v-if="booking.type == 'pool'">
              <path
                d="M22 21H21C19.5486 21 18.278 20.1411 18 19C17.722 20.1411 16.4514 21 15 21C13.5486 21 12.278 20.1411 12 19C11.722 20.1411 10.4514 21 9 21C7.54863 21 6.27796 20.1411 6 19C5.72204 20.1411 4.45137 21 3 21H2"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M19 3L18.7351 3.0883C17.4151 3.52832 16.755 3.74832 16.3775 4.2721C16 4.79587 16 5.49159 16 6.88304L16 17"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M11 3L10.7351 3.0883C9.41505 3.52832 8.75503 3.74832 8.37752 4.2721C8 4.79587 8 5.49159 8 6.88304L8 17"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M8 7H16M8 11H16M8 15H16" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
              class="injected-svg" data-src="https://cdn.hugeicons.com/icons/fire-pit-stroke-rounded.svg?v=3.0"
              xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000" v-if="booking.type == 'lazni'">
              <path
                d="M9.10448 17.5C8.33359 16.5723 8.42384 15.1986 8.69771 14.3155C13.1751 16.5 13.7595 12.5 13.4229 11.5C14.9282 12.5 16.3877 15.9189 14.8371 17.5"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M8.81631 17.5C5.5924 16.4286 4.76862 11.5478 6.12929 8.92857C7.12501 11.0714 8.75001 11.0714 8.75001 11.0714C7.66668 6.78571 9.83335 3.57143 14.0108 2.5C13.1918 4.001 12.5366 6.34631 14.197 7.84902C14.5485 7.18039 15.7296 5.71429 17.4167 5.71429C17.4167 5.71429 16.1196 8.01619 17.5273 10.0221C19.152 12.3372 18.736 15.7851 16.3196 17.5"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M20.5 17.5H3.5L4.1601 19.9851C4.4949 21.2455 4.84122 21.5 6.22165 21.5H17.7783C19.1588 21.5 19.5051 21.2455 19.8399 19.9851L20.5 17.5Z"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M3.55556 17.5H2.5M20.4444 17.5H21.5" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </svg>
          </div>
          <p>{{ fromatBookingD(booking.date) }}</p>
        </div>
        <mark>
          {{ booking.$id }}
        </mark>
   
<br>
<div class="booking-actions">
<div>
  <p>Договір</p>
<DogovirActions :guest="props.guest" :booking="booking" @update:guest="handleGuestUpdate">

            </DogovirActions>
</div>
          
        <div  v-if="canUpdateBookings">
           <p>Дії</p>
          <div  v-if="canUpdateBookings" style="margin-top: 0.5rem; display: flex; gap: 0.25rem;">
            
            <button class="icon-btn" @click="openEditModal(booking)"
              title="Редагувати бронювання">

              <svg data-v-f30a09f7="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none">
                <path data-v-f30a09f7=""
                  d="M18.799 3.0499C17.7324 1.98335 16.0032 1.98337 14.9366 3.04994L13.5236 4.46296L19.537 10.4763L20.9501 9.06321C22.0167 7.99665 22.0166 6.26746 20.9501 5.20092L18.799 3.0499Z"
                  fill="white"></path>
                <path data-v-f30a09f7=""
                  d="M18.4764 11.537L12.463 5.52363L4.35808 13.6286C3.66361 14.3231 3.20349 15.2172 3.04202 16.1859L2.26021 20.8767C2.22039 21.1156 2.29841 21.3591 2.46968 21.5303C2.64095 21.7016 2.88439 21.7796 3.12331 21.7398L7.81417 20.958C8.78294 20.7965 9.67706 20.3364 10.3715 19.642L18.4764 11.537Z"
                  fill="white"></path>
              </svg>
            </button>
             <button class="icon-btn" @click="createInvoice(booking)"
              title="Редагувати бронювання">

              <svg data-v-f30a09f7="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                fill="none">
                <path data-v-f30a09f7=""
                  d="M18.799 3.0499C17.7324 1.98335 16.0032 1.98337 14.9366 3.04994L13.5236 4.46296L19.537 10.4763L20.9501 9.06321C22.0167 7.99665 22.0166 6.26746 20.9501 5.20092L18.799 3.0499Z"
                  fill="white"></path>
                <path data-v-f30a09f7=""
                  d="M18.4764 11.537L12.463 5.52363L4.35808 13.6286C3.66361 14.3231 3.20349 15.2172 3.04202 16.1859L2.26021 20.8767C2.22039 21.1156 2.29841 21.3591 2.46968 21.5303C2.64095 21.7016 2.88439 21.7796 3.12331 21.7398L7.81417 20.958C8.78294 20.7965 9.67706 20.3364 10.3715 19.642L18.4764 11.537Z"
                  fill="white"></path>
              </svg>
            </button>
          </div>
        </div>
</div>

      </div>
    </div>
    <dialog id="addServices" class="modal" v-if="services">
      <form class="modal-box" @submit.prevent="saveServices">
        <h3 class="text-lg font-bold mb-4">Послуги</h3>

        <!-- Services Section -->
        <div class="services-section" v-if="services.services && services.services.length">
          <h4 class="font-semibold mb-3">Послуги</h4>
          <div class="services-list items-list space-y-4">
            <div class="service-item" v-for="service in services.services" :key="service.id">
              <p class="font-medium mb-2">{{ service.name }}</p>

              <!-- With types -->
              <div v-if="service.type && service.type.length" class="space-y-2">
                <div v-for="type in service.type" :key="type.id" class="flex items-center justify-between gap-3">
                  <span class="flex-1">{{ type.name }}</span>
                  <div class="input-row">
                    <button type="button" @click="decreaseServiceType(service.id, type.id)"
                      :disabled="!getServiceTypeQty(service.id, type.id) || getServiceTypeQty(service.id, type.id) <= 0">-</button>
                    <input type="number" :value="getServiceTypeQty(service.id, type.id) || 0" readonly
                      class="w-16 text-center" />
                    <button type="button" @click="increaseServiceType(service.id, type.id, type)">+</button>
                  </div>
                </div>
              </div>

              <!-- Without types -->
              <div v-else class="flex items-center justify-between gap-3">
                <span class="flex-1">Кількість</span>
                <div class="input-row">
                  <button type="button" @click="decreaseService(service.id)"
                    :disabled="!selectedExtras.services[service.id]?.qty || selectedExtras.services[service.id].qty <= 0">-</button>
                  <input type="number" :value="selectedExtras.services[service.id]?.qty || 0" readonly
                    class="w-16 text-center" />
                  <button type="button" @click="increaseService(service.id)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kram Section -->
        <div v-if="services.kram" class="services-section mt-6">
          <div v-for="(items, category) in services.kram" :key="category" class="mb-4">
            <h4>{{ items[0].category }}</h4>
            <div class="items-list">
              <div v-for="item in items" :key="item.id" class="service-item">
                <span class="flex-1">{{ item.name }}</span>
                <div class="input-row">
                  <button type="button" @click="decreaseKram(item.id)"
                    :disabled="!selectedExtras.kram[item.id] || selectedExtras.kram[item.id] <= 0">-</button>
                  <input type="number" :value="selectedExtras.kram[item.id] || 0" readonly class="w-16 text-center" />
                  <button type="button" @click="increaseKram(item.id)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="services-section" v-if="services.author_specials && services.author_specials.length">
      <h4 class="font-semibold mb-3">Авторські спеціали</h4>
      <div class="items-list space-y-4">
        <div class="service-item" v-for="special in services.author_specials" :key="special.id">
          <p class="font-medium mb-2">{{ special.name }}</p>
          <div class="flex items-center justify-between gap-3">
           
            <div class="input-row">
              <button type="button" @click="decreaseAuthor(special.id)"
                :disabled="!selectedExtras.author[special.id] || selectedExtras.author[special.id] <= 0">
                -
              </button>
              <input type="number" :value="selectedExtras.author[special.id] || 0" readonly class="w-16 text-center" />
              <button type="button" @click="increaseAuthor(special.id)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Complexes Section -->
    <div class="services-section mt-6" v-if="services.complexes && services.complexes.length">
      <h4 class="font-semibold mb-3">Комплекси</h4>
      <div class="items-list space-y-4">
        <div class="service-item" v-for="complex in services.complexes" :key="complex.id">
          <p class="font-medium mb-2">{{ complex.name }}</p>
          <div class="flex items-center justify-between gap-3">
           
            <div class="input-row">
              <button type="button" @click="decreaseComplex(complex.id)"
                :disabled="!selectedExtras.comp[complex.id] || selectedExtras.comp[complex.id] <= 0">
                -
              </button>
              <input type="number" :value="selectedExtras.comp[complex.id] || 0" readonly class="w-16 text-center" />
              <button type="button" @click="increaseComplex(complex.id)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

        <div class="modal-action" style="margin-top: 1.5rem;">
          <button class="secondary" type="button" @click="closeServicesModal()">Скасувати</button>
          <button type="submit">Зберегти</button>
        </div>
      </form>
    </dialog>
    <dialog id="newBooking" class="modal">
      <form class="modal-box" @submit.prevent="createBooking">
        <h3 class="text-lg font-bold mb-4">Додати бронювання</h3>
        <div class="form-input">
          <label>Оренда</label>
          <div class="select-input">
            <button v-for="option in bookingTypes" :key="option.value" type="button"
              :class="['house', { selected: newBooking.type === option.value }]" @click="selectType(option.value)">
              {{ option.label }}
            </button>
          </div>
        </div>
        <div :class="['form-input', { blured: !newBooking.type }]">
          <label>Будинок</label>
          <div class="select-input">
            <button v-for="option in houseTypes" :key="option.value" type="button"
              :disabled="option.value !== 'family' && newBooking.type == 'pool'"
              :class="['house', { selected: newBooking.house === option.value }]" @click="selectHouse(option.value)">
              {{ option.label }}
            </button>
          </div>
        </div>
        <div style="margin-bottom: 0.5rem" :class="['form-input', { blured: !newBooking.type || !newBooking.house }]">
          <label>Кількість осіб</label>
          <div class="input-row">
            <button type="button" @click="newBooking.meta.guests--" :disabled="newBooking.meta.guests <= 1">-</button>
            <input type="number" min="1" v-model="newBooking.meta.guests" readonly />
            <button type="button" @click="newBooking.meta.guests++">+</button>
          </div>

        </div>
        <div :class="['booking-date', { blured: newBooking.meta.guests == 0 }]">
          <div class="form-input form-box">
            <label>
              <span>Заїзд</span>
            </label>
            <input type="date" required v-model="newBooking.date.in.date" @change="updateDays" />
            <select required v-model="newBooking.date.in.time">
              <option disabled hidden value="">--:--</option>
              <option v-for="i in time" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
          <div class="form-input form-box">
            <label><span>Виїзд</span></label>
            <input v-if="newBooking.type === 'house'" type="date" required v-model="newBooking.date.out.date"
              @change="updateDays" />
            <input v-else type="date" required v-model="newBooking.date.in.date" readonly />
            <select required v-model="newBooking.date.out.time">
              <option disabled hidden value="">--:--</option>
              <option v-for="i in time" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
        </div>
        <div v-if="newBooking.type === 'house' || newBooking.type === 'lazni'" :class="[
          'daily-options',
          {
            blured: !newBooking.date.in.time ||
              !newBooking.date.in.date ||
              (!['lazni', 'pool'].includes(newBooking.type) && (!newBooking.date.out.time || !newBooking.date.out.date))
          }
        ]">
          <div v-for="(day, index) in dailyBookings" :key="index" class="daily-card">
            <h4>{{ formatDate(day.date) }}</h4>
            <div class="option-block">
              <button type="button" :class="[day.l.booked ? 'primary' : 'secondary', 'toggle-btn', 'sub-tab']"
                @click="day.l.booked = !day.l.booked">
                <span v-if="day.l.booked"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" class="injected-svg"
                    data-src="https://cdn.hugeicons.com/icons/tick-01-stroke-rounded.svg?v=3.0"
                    xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
                    <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="#000000"
                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg></span>
                Лазня
              </button>
              <div class="option-subblock" v-if="day.l.booked">
                <div v-if="day.l.booked" class="duration mt-2">
                  <div class="form-input">
                    <label>Години</label>
                    <div class="input-row">
                      <button type="button" @click="day.l.t--" :disabled="day.l.t <= 2">-</button>
                      <input type="number" v-model="day.l.t" readonly />
                      <button type="button" @click="day.l.t++">+</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="option-block mt-4">
              <button type="button" :class="[day.c.booked ? 'primary' : 'secondary', 'toggle-btn', 'sub-tab']"
                @click="day.c.booked = !day.c.booked">
                <span v-if="day.c.booked"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" class="injected-svg"
                    data-src="https://cdn.hugeicons.com/icons/tick-01-stroke-rounded.svg?v=3.0"
                    xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
                    <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="#000000"
                      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg></span>
                Чан
              </button>
              <div class="option-subblock" v-if="day.c.booked">
                <div v-if="day.c.booked" class="duration mt-2">
                  <div class="form-input" style="margin-bottom: 0.5rem">
                    <label>Години</label>
                    <div class="input-row">
                      <button type="button" @click="day.c.t--" :disabled="day.c.t <= 2">-</button>
                      <input type="number" v-model="day.c.t" readonly />
                      <button type="button" @click="day.c.t++">+</button>
                    </div>
                  </div>


                  <div class="fill-options mt-3 form-input">
                    <label>Наповнення</label>
                    <div class="fill-buttons mt-1">
                      <button v-for="fill in fillOptions" :key="fill.value" type="button"
                        :class="[day.c.f.includes(fill.value) ? 'primary' : 'secondary', 'toggle-btn']"
                        @click="toggleFill(day, fill.value)">
                        <span v-if="day.c.f.includes(fill.value)"><svg xmlns="http://www.w3.org/2000/svg" width="20"
                            height="20" viewBox="0 0 24 24" fill="none" class="injected-svg"
                            data-src="https://cdn.hugeicons.com/icons/tick-01-stroke-rounded.svg?v=3.0"
                            xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#000000">
                            <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="#000000"
                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg></span>
                        {{ fill.label }}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
              <br>

            </div>

          </div>
        </div>
        <div
          :class="['form-input', { blured: !newBooking.type || !newBooking.house || newBooking.meta.guests == 0 || !newBooking.date.in.time || !newBooking.date.in.date || !newBooking.date.out.time || (!['lazni', 'pool'].includes(newBooking.type) && (!newBooking.date.out.time || !newBooking.date.out.date)) }]">
          <label>Послуги</label>
          <button @click.prevent="showPrice">
            Додати
          </button>
          <!-- <div v-for = "service in services">
            {{ service }}
          </div> -->
        </div>
        <!-- <div class="mt-4 form-input">
          <label>Послуги</label>
          <div v-for = "service in services">
            {{ service }}
          </div>
        </div> -->
        <div
          :class="['form-input', { blured: !newBooking.type || !newBooking.house || newBooking.meta.guests == 0 || !newBooking.date.in.time || !newBooking.date.in.date || !newBooking.date.out.time || (!['lazni', 'pool'].includes(newBooking.type) && (!newBooking.date.out.time || !newBooking.date.out.date)) }]">
          <label>Коментар</label>
          <textarea v-model="newBooking.meta.description" maxlength="100" rows="3"></textarea>
          <small class="text-end block">{{ newBooking.meta.description?.length || 0 }}/100</small>
        </div>


        <div
          :class="['form-input', { blured: !newBooking.type || !newBooking.house || newBooking.meta.guests == 0 || !newBooking.date.in.time || !newBooking.date.in.date || !newBooking.date.out.time || (!['lazni', 'pool'].includes(newBooking.type) && (!newBooking.date.out.time || !newBooking.date.out.date)) }]">
          <label class="mt-4">Джерело</label>
          <div class="select-input">
            <button v-for="src in sources" :key="src.value" type="button"
              :class="['house', { selected: newBooking.meta.source === src.value }]"
              @click="newBooking.meta.source = src.value">
              {{ src.label }}
            </button>
          </div>
        </div>
        <div class="modal-action" style="margin-top: 0.5rem;">
          <button class="secondary" type="button" @click="closeCreate()">Скасувати</button>
          <button type="submit"
            :disabled="!newBooking.type || !newBooking.house || newBooking.meta.guests == 0 || !newBooking.date.in.time || !newBooking.date.in.date || !newBooking.date.out.time || (!['lazni', 'pool'].includes(newBooking.type) && (!newBooking.date.out.time || !newBooking.date.out.date))">Додати</button>
        </div>
      </form>
    </dialog>
    <dialog id="editBooking" class="modal" v-if="editBooking">
      <form class="modal-box" @submit.prevent="updateBooking">
        <h3 class="text-lg font-bold mb-4">Редагувати бронювання</h3>

        <!-- OR you can disable changing type/house if needed -->
        <div class="form-input">
          <label>Оренда</label>
          <div class="select-input">
            <button v-for="option in bookingTypes" :key="option.value" type="button"
              :class="['house', { selected: editBooking.type === option.value }]" @click="selectTypeEdit(option.value)">
              {{ option.label }}
            </button>
          </div>
        </div>

        <div class="form-input">
          <label>Будинок</label>
          <div class="select-input">
            <button v-for="option in houseTypes" :key="option.value" type="button"
              :class="['house', { selected: editBooking.house === option.value }]"
              @click="selectHouseEdit(option.value)">
              {{ option.label }}
            </button>
          </div>
        </div>

        <div class="form-input">
          <label>Кількість осіб</label>
          <div class="input-row">
            <button type="button" @click="editBooking.meta.guests--" :disabled="editBooking.meta.guests <= 1">-</button>
            <input type="number" v-model="editBooking.meta.guests" readonly />
            <button type="button" @click="editBooking.meta.guests++">+</button>
          </div>
        </div>

        <div class="booking-date mt-4">
          <div class="form-input form-box">
            <label>Заїзд</label>
            <input type="date" required v-model="editBooking.date.in.date" @change="updateEditDays" />
            <select required v-model="editBooking.date.in.time">
              <option disabled hidden value="">--:--</option>
              <option v-for="i in time" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>

          <div class="form-input form-box">
            <label>Виїзд</label>
            <input v-if="editBooking.type === 'house'" type="date" required v-model="editBooking.date.out.date"
              @change="updateEditDays" />
            <input v-else type="date" required v-model="editBooking.date.in.date" readonly />
            <select required v-model="editBooking.date.out.time">
              <option disabled hidden value="">--:--</option>
              <option v-for="i in time" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>
        </div>

        <!-- Daily options (lazni & chan) -->
        <div v-if="editBooking.type === 'house' || editBooking.type === 'lazni'" class="daily-options mt-6">
          <div v-for="(day, index) in editDailyBookings" :key="index" class="daily-card">
            <h4>{{ formatDate(day.date) }}</h4>

            <!-- Lazni -->
            <div class="option-block">
              <button type="button" :class="[day.l.booked ? 'primary' : 'secondary', 'toggle-btn', 'sub-tab']"
                @click="day.l.booked = !day.l.booked">
                <span v-if="day.l.booked">✓</span> Лазня
              </button>
              <div class="option-subblock" v-if="day.l.booked">
                <div class="duration mt-2">
                  <label>Години</label>
                  <div class="input-row">
                    <button type="button" @click="day.l.t--" :disabled="day.l.t <= 2">-</button>
                    <input type="number" v-model="day.l.t" readonly />
                    <button type="button" @click="day.l.t++">+</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chan -->
            <div class="option-block mt-4">
              <button type="button" :class="[day.c.booked ? 'primary' : 'secondary', 'toggle-btn', 'sub-tab']"
                @click="day.c.booked = !day.c.booked">
                <span v-if="day.c.booked">✓</span> Чан
              </button>
              <div class="option-subblock" v-if="day.c.booked">
                <div class="duration mt-2">
                  <label>Години</label>
                  <div class="input-row">
                    <button type="button" @click="day.c.t--" :disabled="day.c.t <= 2">-</button>
                    <input type="number" v-model="day.c.t" readonly />
                    <button type="button" @click="day.c.t++">+</button>
                  </div>
                </div>

                <div class="fill-options mt-3">
                  <label>Наповнення</label>
                  <div class="fill-buttons mt-1">
                    <button v-for="fill in fillOptions" :key="fill.value" type="button"
                      :class="[day.c.f.includes(fill.value) ? 'primary' : 'secondary', 'toggle-btn']"
                      @click="toggleFill(day, fill.value)">
                      {{ fill.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="mt-4 form-input">
          <label>Коментар</label>
          <textarea v-model="editBooking.meta.description" maxlength="100" rows="3"></textarea>
          <small class="text-end block">{{ editBooking.meta.description?.length || 0 }}/100</small>
        </div>

        <div class="modal-action mt-4">
          <button type="button" class="secondary" @click="closeEdit()">Скасувати</button>
          <button type="submit">Оновити</button>
        </div>
      </form>
    </dialog>


  </div>

</template>
<script setup>
import router from "@/router";
import { ref, watch, computed, reactive } from "vue";
import { Query, ID } from "appwrite";
import { api } from "@/assets/js/app";
import toastr from "toastr";
import { useRoute } from "vue-router";
import { useAuth } from "@/stores/auth";
import "@/assets/views/guest/bookings.css"
import DogovirActions from "../dogovir/DogovirActions.vue";
const route = useRoute()
// --- PROPS ---
const props = defineProps({
  bookings: Object,
  guest: Object,
  access: String,
  name: String
});
const { user } = useAuth()

const canAddBookings = computed(() => {
  if (!user.value?.teams) return false

  return user.value.teams.some(team => {
    try {
      const prefs = typeof team.prefs === 'string'
        ? JSON.parse(team.prefs)
        : team.prefs

      return prefs?.bookings?.includes('create')
    } catch {
      return false
    }
  })
})
const canUpdateBookings = computed(() => {
  if (!user.value?.teams) return false

  return user.value.teams.some(team => {
    try {
      const prefs = typeof team.prefs === 'string'
        ? JSON.parse(team.prefs)
        : team.prefs

      return prefs?.bookings?.includes('update')
    } catch {
      return false
    }
  })
})
// --- STATE ---
const bookings = ref([]);
const guestTemplate = ref({})

watch(
  () => props.bookings,
  (guest) => {
    if (props.bookings) {
      bookings.value = props.bookings;
    }
  },
  { immediate: true }
);
watch(
  () => props.guest,
  (guest) => {
    if (props.guest) {
      guestTemplate.value = { ...props.guest };
    }
  },
  { immediate: true }
);
// --- FORMAT ---
function fromatBookingD(str) {
  const [[startD, startT], [endD, endT]] = str.split("-").map(e => e = e.split("T"))
  return `${startD} ${startT} - ${endD} ${endT}`
}

const newBooking = ref({
  type: null,
  house: null,
  date: {
    in: {
      date: null,
      time: null
    },
    out: {
      date: null,
      time: null
    }
  },
  meta: {
    guests: 0,
    description: null,
    poslugy: null,
    lazni: null
  }
})



const bookingTypes = ref([
  {
    value: "house",
    label: "Будинку"
  },
  {
    value: "lazni",
    label: "Лазні / чану"
  },
  {
    value: "pool",
    label: "Басейну"
  }
])

const houseTypes = ref([
  {
    value: "family",
    label: "Family House"
  },
  {
    value: "right",
    label: "RV Right"
  },
  {
    value: "left",
    label: "RV Left"
  }
])
const services = ref(null)

fetch("https://api.laznikyiv.com/v2/services").then(res => res.json().then(data => {
  services.value = data
}))

function selectType(option) {
  if (option == 'pool' && newBooking.value.house) {
    newBooking.value.house = 'family'
  }
  newBooking.value.type = option
}
function selectHouse(option) {
  newBooking.value.house = option
}
function closeCreate() {
  document.getElementById("newBooking").close()
}

const time = ref([
])
function generateTimes() {
  const result = [];
  const start = 6 * 60;      // 06:00 in minutes
  const end = 24 * 60;       // 24:00 → 00:00

  for (let mins = start; mins <= end; mins += 30) {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    if (h == "24") {
      result.push(`00:${m}`);
    } else {
      result.push(`${h}:${m}`);
    }

  }

  time.value = result;
}

generateTimes();

// --- DAILY BOOKING STATE ---
const dailyBookings = ref([]);

// --- FILL OPTIONS FOR CHAN ---
const fillOptions = [
  { value: 'h', label: 'Хвоя' },
  { value: 'c', label: 'Цитрус' },
  { value: 't', label: 'Трави' },
];

// Initialize daily bookings when dates change
function updateDays() {
  const { in: inDate, out: outDate } = newBooking.value.date;

  if (!inDate.date || (newBooking.value.type === 'house' && !outDate.date)) return;

  // For pool: same day booking
  let startDate = new Date(inDate.date);
  let endDate = newBooking.value.type === 'house'
    ? new Date(outDate.date)
    : new Date(inDate.date);

  // Adjust: don't include checkout day for house
  if (newBooking.value.type === 'house') {
    endDate = new Date(endDate);
    endDate.setDate(endDate.getDate() - 1);
  }

  const days = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push({
      date: new Date(currentDate),
      l: { booked: false, t: 2 }, // lazni: 2 hours default
      c: { booked: false, t: 2, f: [] } // chan: 2 hours, no fill
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  dailyBookings.value = days;
}

function toggleFill(day, fillValue) {
  const index = day.c.f.indexOf(fillValue);
  if (index > -1) {
    day.c.f.splice(index, 1);
  } else {
    day.c.f.push(fillValue);
  }
}

function formatDate(date) {
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: 'short',
    weekday: 'short'
  }).format(date);
}

function createBooking() {
  const { type, house, date, meta } = newBooking.value;

  // 1. Format main date range (check-in → check-out)
  const formatDatePart = (d, t) => {
    const dt = new Date(d);
    const yy = String(dt.getFullYear()).slice(-2);
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${dd}.${mm}.${yy}T${t}`;
  };

  let fullDateRange = '';
  if (type === 'pool' || type === "lazni") {
    // Pool: same day for in/out
    fullDateRange = `${formatDatePart(date.in.date, date.in.time)}-${formatDatePart(date.in.date, date.out.time)}`;
  } else {
    // House / Lazni
    fullDateRange = `${formatDatePart(date.in.date, date.in.time)}-${formatDatePart(date.out.date, date.out.time)}`;
  }

  // 2. Minify lazni & chan
  let lazniStr = '';
  let chanStr = '';

  if (['house', 'lazni'].includes(type)) {
    const lazniParts = [];
    const chanParts = [];

    dailyBookings.value.forEach(day => {
      const dayKey = new Date(day.date).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '.');

      // Lazni: "DD.MM.YY:HH"
      if (day.l.booked && day.l.t > 0) {
        lazniParts.push(`${dayKey}:${day.l.t}`);
      }

      // Chan: "DD.MM.YY:HH:fill1,fill2"
      if (day.c.booked && day.c.t > 0) {
        const fills = day.c.f.length ? day.c.f.join(',') : null;
        chanParts.push(`${dayKey}:${day.c.t}:${fills}`);
      }
    });

    lazniStr = lazniParts.join('|');
    chanStr = chanParts.join('|');
  }

  // 3. Prepare final payload
  const payload = {
    guest: route.params.id, // assuming guest ID from route
    type,
    house: type === 'pool' ? 'family' : house,
    date: fullDateRange, // e.g. "12.12.25T12:00-14.12.25T09:00"
    meta: JSON.stringify({
      g: meta.guests,
      ...(meta.description && { d: meta.description }),
      l: {
        ...(lazniStr && { l: lazniStr }),
        ...(chanStr && { c: chanStr })
      }
    })
  };


  // Optional: Send to API
  api.bookings.create(payload).then(data => {
    bookings.value.push(data.booking)
    document.getElementById("newBooking").close()
  })

}

const editBooking = ref({
  type: null,
  house: null,
  date: {
    in: {
      date: null,
      time: null
    },
    out: {
      date: null,
      time: null
    }
  },
  meta: {
    guests: 0,
    description: null,
    poslugy: null,
    lazni: null
  }
})
const editDailyBookings = ref([]);
function formatKey(date) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear().toString().slice(-2); // last 2 digits
  return `${d}.${m}.${y}`;
}
function parseMetaToDaily(metaStr, checkIn, checkOut) {
  const meta = typeof metaStr === "string" ? JSON.parse(metaStr) : metaStr;

  const lArr = meta.l?.l?.split("|") || [];
  const cArr = meta.l?.c?.split("|") || [];

  const lMap = {};
  lArr.forEach(s => {
    const [date, t] = s.split(":");
    lMap[date] = { booked: true, t: Number(t) };
  });

  const cMap = {};
  cArr.forEach(s => {
    const [date, t, f] = s.split(":");
    const fills = f === 'plain' ? [] : f.includes(",") ? f.split(",") : [f];
    cMap[date] = { booked: true, t: Number(t), f: fills };
  });

  // Helper: format Date to DD.MM.YY
  const formatKey = (date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear().toString().slice(-2);
    return `${d}.${m}.${y}`;
  };

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (meta.type !== 'pool') end.setDate(end.getDate() - 1); // exclude checkout day for house/lazni

  const days = [];
  const current = new Date(start);
  while (current <= end) {
    const key = formatKey(current);
    days.push({
      date: new Date(current),
      l: lMap[key] || { booked: false, t: 2 },
      c: cMap[key] || { booked: false, t: 2, f: [] }
    });
    current.setDate(current.getDate() + 1);
  }

  editDailyBookings.value = days;
}

function parseBookingDate(dateStr) {
  // Example: "12.12.25T09:00-13.12.25T12:00"
  const [inStr, outStr] = dateStr.split("-");
  const [inDate, inTime] = inStr.split("T");
  const [outDate, outTime] = outStr.split("T");

  const formatDate = (d) => {
    const [day, month, year] = d.split(".");
    return `20${year}-${month}-${day}`; // assumes 21st century
  };

  return {
    in: { date: formatDate(inDate), time: inTime },
    out: { date: formatDate(outDate), time: outTime }
  };
}
const currentBooking = ref({})
function openDogovirModal(booking) {
  currentBooking.value = booking
  document.getElementById("showDogovir").showModal();
}
function closeDogovir() {
  document.getElementById("showDogovir").close();
}
function openEditModal(booking) {
  // Deep copy to avoid mutating original
  editBooking.value = JSON.parse(JSON.stringify(booking));

  // Parse the date string to { in, out }
  editBooking.value.date = parseBookingDate(booking.date);

  // Parse meta if it is a string
  const meta = typeof booking.meta === "string" ? JSON.parse(booking.meta) : booking.meta || {};
  editBooking.value.meta = {
    guests: meta.g || 0,
    description: meta.d || null,
    lazni: meta.l || null
  };

  // Optional: parse meta to daily bookings if you want to prefill daily UI
  parseMetaToDaily(meta, editBooking.value.date.in.date, editBooking.value.date.out.date);

  document.getElementById("editBooking").showModal();
}


// Close modal
function closeEdit() {
  document.getElementById("editBooking").close();
}

function updateEditDays() {
  const { in: inDate, out: outDate } = editBooking.value.date;

  if (!inDate.date || (editBooking.value.type === 'house' && !outDate.date)) return;

  let startDate = new Date(inDate.date);
  let endDate = editBooking.value.type === 'house'
    ? new Date(outDate.date)
    : new Date(inDate.date);

  if (editBooking.value.type === 'house') {
    endDate = new Date(endDate);
    endDate.setDate(endDate.getDate() - 1);
  }

  const days = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const key = formatKey(currentDate);

    // Preserve existing data if available
    const existing = editDailyBookings.value.find(d => formatKey(d.date) === key);

    days.push({
      date: new Date(currentDate),
      l: existing?.l || { booked: false, t: 2 },
      c: existing?.c || { booked: false, t: 2, f: [] }
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  editDailyBookings.value = days;
}

// Update booking
function updateBooking() {
  const { type, house, date, meta } = editBooking.value;

  // 1. Format main date range
  const formatDatePart = (d, t) => {
    const dt = new Date(d);
    const yy = String(dt.getFullYear()).slice(-2);
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    return `${dd}.${mm}.${yy}T${t}`;
  };

  let fullDateRange = '';
  if (type === 'pool' || type === "lazni") {
    fullDateRange = `${formatDatePart(date.in.date, date.in.time)}-${formatDatePart(date.in.date, date.out.time)}`;
  } else {
    fullDateRange = `${formatDatePart(date.in.date, date.in.time)}-${formatDatePart(date.out.date, date.out.time)}`;
  }

  // 2. Minify lazni & chan
  let lazniStr = '';
  let chanStr = '';

  if (['house', 'lazni'].includes(type)) {
    const lazniParts = [];
    const chanParts = [];

    editDailyBookings.value.forEach(day => {
      const dayKey = formatKey(day.date);

      if (day.l.booked && day.l.t > 0) {
        lazniParts.push(`${dayKey}:${day.l.t}`);
      }

      if (day.c.booked && day.c.t > 0) {
        const fills = day.c.f.length ? day.c.f.join(',') : 'plain';
        chanParts.push(`${dayKey}:${day.c.t}:${fills}`);
      }
    });

    lazniStr = lazniParts.join('|');
    chanStr = chanParts.join('|');
  }

  // 3. Prepare final payload
  const payload = {
    guest: route.params.id,
    type,
    house: type === 'pool' ? 'family' : house,
    date: fullDateRange,
    meta: JSON.stringify({
      g: meta.g || meta.guests || 0,
      ...(meta.description && { d: meta.description }),
      l: {
        ...(lazniStr && { l: lazniStr }),
        ...(chanStr && { c: chanStr })
      }
    })
  };


  api.bookings.update(editBooking.value.$id, payload).then(res => {
    const index = bookings.value.findIndex(b => b.$id === editBooking.value.$id);
    if (index > -1) bookings.value[index] = res; // 🔥 ВАЖНО
    toastr.success("Бронювання оновлено");
    closeEdit();
  }).catch(err => {
    console.error('Update error:', err);
    toastr.error("Помилка оновлення");
  });

}
function selectTypeEdit(option) {
  if (option == 'pool' && editBooking.value.house) {
    editBooking.value.house = 'family'
  }
  editBooking.value.type = option
}
function selectHouseEdit(option) {
  editBooking.value.house = option;
}

function showPrice() { document.getElementById('addServices').showModal() }
// Reuse your formatDate, fillOptions, time array

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

const formatBirthday = () => {
  let v = guestTemplate.value.birthday.replace(/\D/g, '').slice(0, 8)

  if (v.length >= 5) {
    guestTemplate.value.birthday = `${v.slice(0, 2)}.${v.slice(2, 4)}.${v.slice(4)}`
  } else if (v.length >= 3) {
    guestTemplate.value.birthday = `${v.slice(0, 2)}.${v.slice(2)}`
  } else {
    guestTemplate.value.birthday = v
  }
}

const formatPhone = () => {
  let v = guestTemplate.value.phone.replace(/\D/g, '')

  // Always force +380
  if (!v.startsWith('380')) {
    v = '380' + v.replace(/^380/, '')
  }

  v = v.slice(0, 12) // 380XXXXXXXXX

  const parts = []
  parts.push('+380')

  if (v.length > 3) parts.push(' ' + v.slice(3, 5))
  if (v.length > 5) parts.push(' ' + v.slice(5, 8))
  if (v.length > 8) parts.push(' ' + v.slice(8, 12))

  guestTemplate.value.phone = parts.join('')
}
const emit = defineEmits(['update:guest'])
function handleGuestUpdate(updated) {
  props.guest = updated


   emit('update:guest', updated);
}
function createDogovir() {
  if (JSON.stringify(guestTemplate.value) !== JSON.stringify(props.guest)) {
    api.guests.update(props.guest.$id, {
      name: guestTemplate.value.name,
      phone: guestTemplate.value.phone,
      birthday: guestTemplate.value.birthday,
      document: guestTemplate.value.document
    }).then(e => {
       // console.log(e)
      props.guest = e.guest
      guestTemplate.value = e.guest
      emit
    })
  }
  window.open(
    `/dogovir/${currentBooking.value.$id}?name=${encodeURIComponent(guestTemplate.value.name)}&&birthday=${encodeURIComponent(guestTemplate.value.birthday)}&&phone=${encodeURIComponent(guestTemplate.value.phone)}&&document=${encodeURIComponent(guestTemplate.value.document)}&&in=${encodeURIComponent(currentBooking.value.date.split("-")[0].split("T").join(" "))}&&out=${encodeURIComponent(currentBooking.value.date.split("-")[1].split("T").join(" "))}&&house=${encodeURIComponent({ "family": "Family House", "right": "River View Right", "left": "River View Left" }[currentBooking.value.house])}`,
    '_blank'
  )
}

watch(
  () => services.value?.services,
  (list) => {
    if (!list) return

    list.forEach(service => {
      if (!selectedExtras.services[service.id]) {
        selectedExtras.services[service.id] = {
          qty: 0,
          type: null
        }
      }
    })
  },
  { immediate: true }
)

const selectedExtras = reactive({
  services: {},
  kram: {},
  author: {},
  comp: {}
})

watch(
  () => services.value?.services,
  (list) => {
    if (!list) return

    list.forEach(service => {
      if (!selectedExtras.services[service.id]) {
        if (service.type && service.type.length) {
          selectedExtras.services[service.id] = { types: {} }
        } else {
          selectedExtras.services[service.id] = { qty: 0 }
        }
      }
    })
  },
  { immediate: true }
)

function getServiceTypeQty(serviceId, typeId) {
  if (!selectedExtras.services[serviceId]?.types) return 0
  return selectedExtras.services[serviceId].types[typeId] || 0
}

function increaseServiceType(serviceId, typeId, typeData) {
  if (!selectedExtras.services[serviceId]) {
    selectedExtras.services[serviceId] = { types: {} }
  }
  if (!selectedExtras.services[serviceId].types) {
    selectedExtras.services[serviceId].types = {}
  }

  if (!selectedExtras.services[serviceId].types[typeId]) {
    selectedExtras.services[serviceId].types[typeId] = 0
  }

  selectedExtras.services[serviceId].types[typeId]++
}

// Decrease service type quantity
function decreaseServiceType(serviceId, typeId) {
  if (selectedExtras.services[serviceId]?.types?.[typeId] > 0) {
    selectedExtras.services[serviceId].types[typeId]--
  }
}

// Increase simple service quantity
function increaseService(serviceId) {
  if (!selectedExtras.services[serviceId]) {
    selectedExtras.services[serviceId] = { qty: 0 }
  }
  selectedExtras.services[serviceId].qty++
}

// Decrease simple service quantity
function decreaseService(serviceId) {
  if (selectedExtras.services[serviceId]?.qty > 0) {
    selectedExtras.services[serviceId].qty--
  }
}

// Increase kram item quantity
function increaseKram(kramId) {
  if (!selectedExtras.kram[kramId]) {
    selectedExtras.kram[kramId] = 0
  }
  selectedExtras.kram[kramId]++
}

// Decrease kram item quantity
function decreaseKram(kramId) {
  if (selectedExtras.kram[kramId] > 0) {
    selectedExtras.kram[kramId]--
  }
}

function increaseAuthor(specialId) {
  if (!selectedExtras.author[specialId]) {
    selectedExtras.author[specialId] = 0
  }
  selectedExtras.author[specialId]++
}

function decreaseAuthor(specialId) {
  if (selectedExtras.author[specialId] > 0) {
    selectedExtras.author[specialId]--
  }
}

// Complexes functions
function increaseComplex(complexId) {
  if (!selectedExtras.comp[complexId]) {
    selectedExtras.comp[complexId] = 0
  }
  selectedExtras.comp[complexId]++
}

function decreaseComplex(complexId) {
  if (selectedExtras.comp[complexId] > 0) {
    selectedExtras.comp[complexId]--
  }
}

// Close services modal
function closeServicesModal() {
  document.getElementById('addServices').close()
}

// Save selected services
function saveServices() {
  // Filter out services with qty > 0
  const activeServices = {}

  Object.keys(selectedExtras.services).forEach(id => {
    const service = selectedExtras.services[id]

    // If service has types
    if (service.types) {
      const activeTypes = {}
      Object.keys(service.types).forEach(typeId => {
        if (service.types[typeId] > 0) {
          activeTypes[typeId] = service.types[typeId]
        }
      })
      if (Object.keys(activeTypes).length > 0) {
        activeServices[id] = { types: activeTypes }
      }
    }
    // If service has simple qty
    else if (service.qty > 0) {
      activeServices[id] = { qty: service.qty }
    }
  })

  // Filter out kram with qty > 0
  const activeKram = {}
  Object.keys(selectedExtras.kram).forEach(id => {
    if (selectedExtras.kram[id] > 0) {
      activeKram[id] = selectedExtras.kram[id]
    }
  })

  newBooking.value.meta.poslugy = {
    services: activeServices,
    kram: activeKram
  }

   // console.log('Saved services:', newBooking.value.meta.poslugy)
  toastr.success('Послуги додано')
  closeServicesModal()
}

function getSelectedServicesCount() {
  let count = 0

  Object.values(selectedExtras.services).forEach(service => {
    if (service.types) {
      Object.values(service.types).forEach(qty => {
        if (qty > 0) count++
      })
    } else if (service.qty > 0) {
      count++
    }
  })

  Object.values(selectedExtras.kram).forEach(qty => {
    if (qty > 0) count++
  })

  return count
}

function resetServices() {
  Object.keys(selectedExtras.services).forEach(id => {
    if (selectedExtras.services[id].types) {
      selectedExtras.services[id].types = {}
    } else {
      selectedExtras.services[id].qty = 0
    }
  })

  Object.keys(selectedExtras.kram).forEach(id => {
    selectedExtras.kram[id] = 0
  })
}

function createInvoice(booking) {
  console.log(booking)
  const invoice = {
    booking: {
      id: booking.$id,
      type: booking.type,
      house: booking.house,
      date: booking.date,
      guests: JSON.parse(booking.meta).g
    },
    items: [],
    subtotal: 0,
    total: 0
  }

  // Parse booking meta to get services
  const meta = typeof booking.meta === 'string' ? JSON.parse(booking.meta) : booking.meta
  const poslugy = meta.poslugy || {}

  // Process services with types
  if (poslugy.services) {
    Object.entries(poslugy.services).forEach(([serviceId, serviceData]) => {
      const service = services.value?.services?.find(s => s.id === serviceId)
      if (!service) return

      if (serviceData.types) {
        // Service with types
        Object.entries(serviceData.types).forEach(([typeId, qty]) => {
          const type = service.type?.find(t => t.id === typeId)
          if (type && qty > 0) {
            const price = service.price[0].value
            const itemTotal = price * qty
            invoice.items.push({
              name: `${service.name} - ${type.name}`,
              qty,
              price,
              total: itemTotal
            })
            invoice.subtotal += itemTotal
          }
        })
      } else if (serviceData.qty > 0) {
        // Simple service
        const price = service.price[0].value
        const itemTotal = price * serviceData.qty
        invoice.items.push({
          name: service.name,
          qty: serviceData.qty,
          price,
          total: itemTotal
        })
        invoice.subtotal += itemTotal
      }
    })
  }

  // Process kram items
  if (poslugy.kram) {
    Object.entries(poslugy.kram).forEach(([kramId, qty]) => {
      if (qty <= 0) return

      // Search through all kram categories
      let kramItem = null
      if (services.value?.kram) {
        for (const category of Object.values(services.value.kram)) {
          kramItem = category.find(item => item.id === kramId)
          if (kramItem) break
        }
      }

      if (kramItem) {
        const price = kramItem.price[0].value
        const itemTotal = price * qty
        invoice.items.push({
          name: kramItem.name,
          qty,
          price,
          total: itemTotal
        })
        invoice.subtotal += itemTotal
      }
    })
  }

  // Process author specials
  if (poslugy.author) {
    Object.entries(poslugy.author).forEach(([authorId, qty]) => {
      if (qty <= 0) return

      const special = services.value?.author_specials?.find(s => s.id === authorId)
      if (special) {
        const price = special.price[0].value
        const itemTotal = price * qty
        invoice.items.push({
          name: special.name,
          qty,
          price,
          total: itemTotal
        })
        invoice.subtotal += itemTotal
      }
    })
  }

  // Process complexes
  if (poslugy.comp) {
    Object.entries(poslugy.comp).forEach(([compId, qty]) => {
      if (qty <= 0) return

      const complex = services.value?.complexes?.find(c => c.id === compId)
      if (complex) {
        const price = complex.price[0].value
        const itemTotal = price * qty
        invoice.items.push({
          name: complex.name,
          qty,
          price,
          total: itemTotal
        })
        invoice.subtotal += itemTotal
      }
    })
  }

  invoice.total = invoice.subtotal

  console.log('📄 INVOICE:', invoice)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`Booking ID: ${invoice.booking.id}`)
  console.log(`Type: ${invoice.booking.type} | House: ${invoice.booking.house}`)
  console.log(`Guests: ${invoice.booking.guests}`)
  console.log(`Date: ${invoice.booking.date}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('ITEMS:')
  invoice.items.forEach((item, i) => {
    console.log(`${i + 1}. ${item.name}`)
    console.log(`   Qty: ${item.qty} × ${item.price} UAH = ${item.total} UAH`)
  })
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`SUBTOTAL: ${invoice.subtotal} UAH`)
  console.log(`TOTAL: ${invoice.total} UAH`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  return invoice
}
</script>
