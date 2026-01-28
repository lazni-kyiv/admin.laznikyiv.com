<template>
  <!-- Dogovir Modal -->
  <dialog id="showDogovir" ref="dogovirModal" class="modal">
    <form class="modal-box" @submit.prevent="createDogovir">
      <h3 class="text-lg font-bold mb-4">Договір</h3>

      <div class="form-input">
        <label>ПІБ</label>
        <input type="text" v-model="guestTemplate.name" placeholder="ПІБ" required />
      </div>

      <div class="form-input">
        <label>Дата народження</label>
        <input
          type="text"
          v-model="guestTemplate.birthday"
          @input="formatBirthday"
          placeholder="ДД.ММ.РРРР"
          required
        />
      </div>

      <div class="form-input">
        <label>Номер телефону</label>
        <input
          type="text"
          v-model="guestTemplate.phone"
          @input="formatPhone"
          placeholder="+380 XX XXX XXXX"
          required
        />
      </div>

      <div class="form-input">
        <label>Документ</label>
        <input type="text" v-model="guestTemplate.document" placeholder="Паспорт/ID" required />
      </div>

      <div class="modal-action" style="margin-top: 0.5rem;">
        <button class="secondary" type="button" @click="closeDogovir">Скасувати</button>
        <button type="submit">Відкрити</button>
      </div>
    </form>
  </dialog>

  <div class="actions" v-if="!props.booking.dogovir">
    <button @click="openDogovirModal">
      <i class="hgi hgi-stroke hgi-signature"></i>
    </button>
  </div>
  <div class="actions" v-else>
    <button @click="openPDF">
      <i class="hgi hgi-stroke hgi-pdf-01"></i>
    </button>
    <button @click="openContract">
       <i class="hgi hgi-stroke hgi-google-drive"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { api } from '@/assets/js/app';
import router from '@/router';
import { useAppLock } from '@/stores/lock';
const { lockApp, isLocked } = useAppLock()


const guestTemplate = ref({});
const dogovirModal = ref(null);
const bookingCode = ref('');

const props = defineProps({
  guest: { type: Object, required: true },
  booking: { type: Object, required: true }
});

async function customCode(inputStr, length = 6) {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputStr);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  let num = BigInt("0x" + hex.slice(0, 16));

  const alphabet = "01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const base = BigInt(alphabet.length);

  let code = "";
  while (num > 0n) {
    const i = num % base;
    code = alphabet[Number(i)] + code;
    num = num / base;
  }

  return `${code.slice(0, length)}`;
}

async function updateBookingCode() {
  if (props.booking.$id) {
    bookingCode.value = await customCode(props.booking.$id);
  }
}

async function openPDF() {
  const driveUrl = `https://dogovir.laznikyiv.com/${JSON.parse(props.booking.dogovir).pdf}.pdf`;
  window.open(driveUrl, '_blank');
}

function openContract() {
  const dogovirData = JSON.parse(props.booking.dogovir);
  const driveUrl = `https://drive.google.com/file/d/${dogovirData.link}/view`;
  window.open(driveUrl, '_blank');
}

const emit = defineEmits(['update:guest']);
function normalizeGuest(g) {
  return {
    name: g.name?.trim() || '',
    phone: g.phone?.replace(/\s+/g, '') || '',
    birthday: g.birthday || '',
    document: g.document?.trim() || ''
  }
}

const originalGuest = ref(null)

function initializeGuestTemplate() {
  const normalized = normalizeGuest(props.guest)

  guestTemplate.value = { ...normalized }
  originalGuest.value = { ...normalized }
}
function hasGuestChanged() {
  const current = normalizeGuest(guestTemplate.value)
  const original = originalGuest.value

  return (
    current.name !== original.name ||
    current.phone !== original.phone ||
    current.birthday !== original.birthday ||
    current.document !== original.document
  )
}

onMounted(() => {
  initializeGuestTemplate();
  updateBookingCode();
});

watch(() => props.guest, (newGuest) => {
  if (newGuest) {
    initializeGuestTemplate();
  }
}, { deep: true });

watch(() => props.booking.$id, () => {
  updateBookingCode();
});

function formatBirthday(event) {
  let value = event.target.value.replace(/\D/g, '');
  if (value.length >= 2) value = value.slice(0, 2) + '.' + value.slice(2);
  if (value.length >= 5) value = value.slice(0, 5) + '.' + value.slice(5, 9);
  guestTemplate.value.birthday = value;
}

function formatPhone(event) {
  let value = event.target.value.replace(/\D/g, '');
  if (!value.startsWith('380')) value = '380' + value;
  value = value.slice(0, 12);
  
  let formatted = '+380';
  if (value.length > 3) formatted += ' ' + value.slice(3, 5);
  if (value.length > 5) formatted += ' ' + value.slice(5, 8);
  if (value.length > 8) formatted += ' ' + value.slice(8, 12);
  
  guestTemplate.value.phone = formatted;
}

async function openDogovirModal() {
  initializeGuestTemplate();
  await nextTick();
  
  const modal = dogovirModal.value || document.getElementById('showDogovir');
  
  if (modal) {
    try {
      modal.showModal();
    } catch (error) {
      console.error('Error opening modal:', error);
      modal.style.display = 'block';
    }
  } else {
    console.error('Modal element not found');
  }
}

function closeDogovir() {
  const modal = dogovirModal.value || document.getElementById('showDogovir');
  if (modal) {
    modal.close();
  }
}

async function createDogovir() {
  if (!props.booking || !props.booking.date) {
    console.error('Booking or date is missing', props.booking);
    return;
  }
  
  const [checkIn, checkOut] = props.booking.date.split('-');
  
  const changed =
    JSON.stringify(guestTemplate.value) !== JSON.stringify({
      name: props.guest.name,
      phone: props.guest.phone,
      birthday: props.guest.birthday,
      document: props.guest.document
    });

  if (hasGuestChanged()) {
    try {
      const res = await api.guests.update(props.guest.$id, {
        name: guestTemplate.value.name,
        phone: guestTemplate.value.phone,
        birthday: guestTemplate.value.birthday,
        document: guestTemplate.value.document
      });

      guestTemplate.value = { ...res.guest };
      emit('update:guest', res.guest);
    } catch (err) {
      console.error('Failed to update guest:', err);
      return;
    }
  }

  const houseNames = {
    family: 'Family House',
    right: 'River View Right',
    left: 'River View Left'
  };
  
  const url = `/dogovir/${props.booking.$id}?` +
    `name=${encodeURIComponent(guestTemplate.value.name)}&` +
    `birthday=${encodeURIComponent(guestTemplate.value.birthday)}&` +
    `phone=${encodeURIComponent(guestTemplate.value.phone)}&` +
    `document=${encodeURIComponent(guestTemplate.value.document)}&` +
    `in=${encodeURIComponent(checkIn)}&` +
    `out=${encodeURIComponent(checkOut)}&` +
    `house=${encodeURIComponent(houseNames[props.booking.house] || '')}`;

 
  
  // Open the dogovir page which will call backend and update
  router.push(url)
  lockApp()
  
  //  locked.value = true;
  // Listen for messages from the dogovir window
  const messageHandler = async (event) => {
    // Verify origin for security
    if (event.origin !== window.location.origin) return;
    
    if (event.data.bookingId === props.booking.$id) {
      if (event.data.type === 'dogovir-created') {
        // Update local cache without refetching
        await api.dogovir.update(props.booking.$id, event.data.dogovirData);
        
        // // Unlock admin panel
        // locked.value = false;
        
        // Close modal
        // closeDogovir();
        
     
      } else if (event.data.type === 'dogovir-cancelled') {
        // Unlock admin panel if user closed without signing
        lockApp()
        console.log('Dogovir cancelled by user');
      }
      
      // Remove listener after handling
      window.removeEventListener('message', messageHandler);
    }
  };
  
  window.addEventListener('message', messageHandler);
}
</script>

<style scoped>
.actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.modal-box {
  border-radius: 16px;
  padding: 20px;
}

.form-input {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.form-input label {
  margin-bottom: 4px;
  font-weight: 500;
}

.form-input input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button.secondary {
  background-color: #eee;
  padding: 10px 16px;
  border-radius: 12px;
  margin-right: 8px;
}
</style>