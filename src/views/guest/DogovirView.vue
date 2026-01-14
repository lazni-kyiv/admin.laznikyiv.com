<template>
  <button @click="exit" class="exit">
    <i class="hgi hgi-stroke hgi-logout-02"></i>
  </button>
<section class="dogovir__wrapper" v-if="state == null">
  <div class="dogovir__container">
    <div class="dogovir__header">
      <h1 class="company-name">LAZNI KYIV</h1>
      <div class="header__info">
        <h2 class="dogovir-title">ДОГОВІР</h2>
        <p class="dogovir-id">№ LK-{{ year }}-{{ id }}</p>
        <p>м. Київ</p>
        <p>{{ date }}</p>
      </div>
    </div>
    <section class="dogovir__intro">
      <p>
        Цей Договір укладено між Lazni Kyiv (далі — «Комплекс»)
        та {{ name }} (далі — «Гість»).
      </p>

      <div class="guest-info">
        <h4>Дані про гостя</h4>
        <small>ПІБ</small>
        <p>{{ name }}</p>

        <small>Дата народження</small>
        <p>{{ birthday }}</p>

        <small>Номер телефону</small>
        <p>{{ phone }}</p>

        <small>Паспортні дані</small>
        <p>{{ document }}</p>
      </div>
        <div class="guest-info">
        <h4>Дані про бронювання</h4>
        <small>Дата та час заїзду</small>
        <p>{{ checkIn.split("T").join(" ") }}</p>

        <small>Дата та час виїзду</small>
        <p>{{ checkOut.split("T").join(" ") }}</p>

        <small>Будинок</small>
        <p>{{ house }}</p>
      </div>
    </section>

    <section class="dogovir__section">
      <div v-for="t in text">
        <h2 v-if="blockId(t.title) == 1">{{ t.title }}</h2>
        <h3 v-if="blockId(t.title) == 2">{{ t.title }}</h3>
        <p v-if="blockId(t.title) == 3">{{ t.title }}</p>
      </div>
    </section>
    <!-- <section class="dogovir__section">
      <h2>1. Предмет договору</h2>
      <p>
        1.1 Комплекс зобов’язується надати Гостю послуги (користування будинком,
        банними послугами, басейном, додатковими послугами відповідно до бронювання),
        а Гість — прийняти та оплатити такі послуги.
      </p>
    </section>

    <section class="dogovir__section">
      <h2>2. Права та обов’язки сторін</h2>

      <p>
        2.1 Гість зобов’язується дотримуватися правил проживання, техніки безпеки та
        громадського порядку.
      </p>

      <p>
        2.2 Комплекс гарантує належний санітарний та технічний стан приміщень та
        обладнання.
      </p>
    </section>

    <section class="dogovir__section">
      <h2>3. Обробка персональних даних</h2>

      <p>
        3.1 Підписуючи цей договір, Гість надає згоду на обробку своїх персональних
        даних відповідно до Закону України «Про захист персональних даних».
      </p>

      <p>
        3.2 Дані використовуються виключно для надання послуг і не передаються
        третім особам, окрім випадків, передбачених законом.
      </p>
    </section>

    <section class="dogovir__section">
      <h2>4. Строк дії договору</h2>

      <p>
        4.1 Цей договір діє з моменту підписання в електронній формі і до завершення
        терміну проживання, визначеного у бронюванні.
      </p>
    </section>

    <section class="dogovir__section">
      <h2>5. Правила проживання</h2>

      <h3>5.1 Виконання вимог воєнного стану</h3>
      <p>5.1.1 Гість зобов’язується дотримуватися вимог чинного законодавства України.</p>
      <p>5.1.2 На території комплексу відсутнє обладнане укриття. Найближче укриття — вул. Райдужна, 12.</p>
      <p>5.1.3 Комплекс оснащений генераторами, що забезпечують безперебійну роботу.</p>

      <h3>5.2 Безпека та поведінка</h3>
      <p>5.2.1 Заборонено приносити зброю, вибухові та небезпечні предмети.</p>
      <p>5.2.2 Заборонено порушувати громадський порядок.</p>
      <p>5.2.3 Куріння дозволено лише у спеціально відведених місцях. Кальян заборонено.</p>

      <h3>5.3 Стан здоров’я</h3>
      <p>5.3.1 Гість несе відповідальність за свій стан здоров’я.</p>
      <p>5.3.2 Комплекс не несе відповідальності за погіршення здоров’я через протипоказання.</p>
      <p>5.3.3 У разі погіршення самопочуття Гість зобов’язаний повідомити персонал.</p>

      <h3>5.4 Відповідальність за майно</h3>
      <p>5.4.1 Комплекс не відповідає за особисті речі Гостя.</p>
      <p>5.4.2 У разі пошкодження майна Гість відшкодовує збитки.</p>

      <h3>5.5 Діти</h3>
      <p>5.5.1 Гості несуть повну відповідальність за дітей.</p>
      <p>5.5.2 Дітям до 14 років заборонено перебувати в сауні або басейні без нагляду.</p>

      <h3>5.6 Виселення</h3>
      <p>5.6.1 Комплекс має право достроково виселити Гостя без повернення коштів у разі порушення правил.</p>
    </section> -->
<br>
    <section class="dogovir__signature">
      <p><strong>Підпис Гостя:</strong></p>
      <div class="signature-box">
        <canvas ref="canvasRef"></canvas>
      </div>
    </section>
    <button @click="clearSignature" class="clear">Очистити підпис</button>
    <br>
    <div class="dogovir-agree" @click="agree = !agree">
      <!-- <input type="checkbox" id="agree" v-model="agree" /> -->
      <div class="agree-icon":class="{agree: agree}">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/tick-02-stroke-rounded.svg?v=1.0.1" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
<path d="M5 14L8.5 17.5L19 6.5" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>
      </div>
        <p>Я ознайомлений(а) та погоджуюся з умовами договору</p>
      
    </div>

    <button :disabled="!agree" @click="signContract">
      Підписати договір
    </button>

  </div>
</section>
<section class="dogovir__wrapper" v-if="state == 'placeholder'">
  <div class="dogovir__container">
    <div class="dogovir__header">
      <h1 class="company-name">LAZNI KYIV</h1>
      
    </div>
    <div class="placeholder-loading">
      <p>Обробка даних</p>
      <span class="loader"></span>
    </div>
    </div>
    
  
</section>
<section class="dogovir__wrapper" v-if="state == 'signed'">
   <div class="dogovir__container">
    <div class="dogovir__header">
      <h1 class="company-name">LAZNI KYIV</h1>
      
    </div>
    <div class="signed-view">
      <h2>
    Дякуємо за підписання договіру
  
  </h2>
  <p>Відскануйте QR-код, щоб завантажити договір</p>
   <img :src="`https://api.qrserver.com/v1/create-qr-code/?data=${downloadUrl}`">
    </div>
    </div>
    
</section>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import SignaturePad from "signature_pad"
import { api } from "@/assets/js/app"

const route = useRoute()
const router = useRouter()

const agree = ref(false)
const id = ref("")
const canvasRef = ref(null)
let signaturePad = null

const name = new URLSearchParams(window.location.search).get("name") || "—"
const birthday = new URLSearchParams(window.location.search).get("birthday") || "—"
const phone = new URLSearchParams(window.location.search).get("phone") || "—"
const document = new URLSearchParams(window.location.search).get("document") || "—"

const checkIn = new URLSearchParams(window.location.search).get("in") || "—"
const checkOut = new URLSearchParams(window.location.search).get("out") || "—"
const house = new URLSearchParams(window.location.search).get("house") || "—"

const date = new Date().toLocaleDateString("uk-UA")
const year = new Date().getFullYear()

const text = ref({})
const downloadUrl = ref(null)
const state = ref(null)
const error = ref(null)
const loading = ref(false)

async function customCode(inputStr, length = 6) {
  const encoder = new TextEncoder()
  const data = encoder.encode(inputStr)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  let num = BigInt("0x" + hex.slice(0, 16))

  const alphabet = "01234567890123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const base = BigInt(alphabet.length)

  let code = ""
  while (num > 0n) {
    const i = num % base
    code = alphabet[Number(i)] + code
    num = num / base
  }

  return `${code.slice(0, length)}`
}

function sendDogovirToParent(bookingId, dogovirData) {
  // Send message to parent window (admin panel)
  if (window.opener && !window.opener.closed) {
    try {
      window.opener.postMessage({
        type: 'dogovir-created',
        bookingId: bookingId,
        dogovirData: dogovirData
      }, window.location.origin)
      
      console.log('✓ Dogovir data sent to admin panel', dogovirData)
    } catch (err) {
      console.error('Failed to send message to parent:', err)
    }
  } else {
    console.log('No parent window available to send message')
  }
}

onMounted(async () => {
  try {
    // Fetch contract text
    const response = await fetch("https://api.laznikyiv.com/v2/dogovir/text")
    const data = await response.json()
    text.value = data.text
  } catch (err) {
    console.error("Failed to load contract text:", err)
    error.value = "Не вдалося завантажити текст договору"
  }

  // Generate contract ID
  id.value = await customCode(route.params.id)

  // Initialize signature pad
  const canvas = canvasRef.value
  if (canvas) {
    canvas.width = canvas.offsetWidth
    canvas.height = 200

    signaturePad = new SignaturePad(canvas, {
      penColor: "#102724",
      backgroundColor: "#ffffff"
    })
  }
})

function blockId(text) {
  return text.split(' ')[0].split('.').filter(w => w !== '').length
}

function clearSignature() {
  if (signaturePad) {
    signaturePad.clear()
  }
}

async function signContract() {
  if (!signaturePad) {
    alert("Помилка: підпис не ініціалізовано")
    return
  }

  if (signaturePad.isEmpty()) {
    alert("Будь ласка, підпишіться")
    return
  }

  if (!agree.value) {
    alert("Будь ласка, погодьтеся з умовами договору")
    return
  }

  loading.value = true
  state.value = "placeholder"
  error.value = null

  try {
    const signature = signaturePad.toDataURL("image/png")

    console.log("Signing contract:", {
      contractId: id.value,
      bookingId: route.params.id,
      name,
      date
    })

    const response = await fetch("https://api.laznikyiv.com/v2/dogovir/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id.value,
        booking_id: route.params.id,
        guest_name: name,
        guest_phone: phone,
        guest_birthday: birthday,
        guest_document: document,
        house: house,
        check_in: checkIn.split("T").join(" "),
        check_out: checkOut.split("T").join(" "),
        signature: signature
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Не вдалося створити договір")
    }

    const data = await response.json()
    console.log("✓ Contract created successfully:", data)

    // Set download URL
    downloadUrl.value = `https://dogovir.laznikyiv.com/${data.pdf}.pdf`

    // Send data back to admin panel
    sendDogovirToParent(route.params.id, data)

    // Update state to signed
    state.value = "signed"

    // Optional: Auto-close after 3 seconds
    // setTimeout(() => {
    //   if (window.opener && !window.opener.closed) {
    //     window.close()
    //   }
    // }, 3000)

  } catch (err) {
    console.error("Error signing contract:", err)
    error.value = err.message || "Сталася помилка при підписанні договору"
    state.value = null
  } finally {
    loading.value = false
  }
}

function downloadPDF() {
  if (downloadUrl.value) {
    window.open(downloadUrl.value, '_blank')
  }
}

function exit() {
  const code = prompt("Введіть PIN для виходу")
  if (code === "204983") {
    router.push("/dashboard")
  }
}

// Handle page unload - unlock admin panel if needed
window.addEventListener('beforeunload', () => {
  if (window.opener && !window.opener.closed && state.value !== 'signed') {
    try {
      window.opener.postMessage({
        type: 'dogovir-cancelled',
        bookingId: route.params.id
      }, window.location.origin)
    } catch (err) {
      console.error('Failed to send cancel message:', err)
    }
  }
})
</script>

<style scoped>
.dogovir__wrapper {
  position: relative;
  min-height: 100dvh;
  background: url("/512x512.png") center / cover no-repeat;
}

/* .dogovir__wrapper::before {
  content: "";
  position: fixed;
  inset: 0;
  backdrop-filter: blur(1px);
  background: rgba(255, 255, 255, 0.977);
  z-index: 0;
} */

.dogovir__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.dogovir__header * {
  margin: 0px !important;
}
.header__info {
  align-items: end;
  text-align: end;
}

.dogovir__container {
  position: relative;
  z-index: 1;
  padding: 1rem;
  padding: 2rem !important;
  height: 100dvh;
  overflow: auto;
  max-width: 800px;
  margin: auto;
  box-sizing: border-box !important;
  flex-direction: column !important;
}
.dogovir__container h1 {
  font-family: "Lazni";
}
.signature-box {
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  background: #fff;
  margin: 1rem 0;
}

.signature-box canvas {
  width: 100%;
  height: 200px;
  touch-action: none;
}

.dogovir-agree {
  display: flex;
  gap: 1rem;
  border: solid 1px #ccc;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
}
.dogovir-agree * {
  margin: 0;
}
button.exit {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  color: var(--primary);
  z-index: 10;
  opacity: 0;
}
h2 {
  margin-bottom: 0.5rem;
}
input {
  flex: 0 0 !important;
  accent-color: var(--primary);
}
button {
  padding: 1rem !important;
}

.clear {
  background-color: var(--primary-hover);
}

h3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.guest-info {
    margin-top: 1rem;
}

.guest-info h4 {
  margin-bottom: 0.5rem;
}
.guest-info small {
  opacity: 0.5
}
.guest-info p {
  margin-top: .125rem !important;
  margin-bottom: 0.25rem;
}
.agree-icon svg {
  transform: scaleX(0);
  transition: all 0.75s ease;
}
.agree-icon {
  color: white;
  border: solid 1px var(--primary);
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1/1;
  transition: all 0.5s ease;
  border-radius: 0.375rem;
}
.agree-icon.agree {
  background-color: var(--primary);
}

.agree-icon.agree svg {
  transform:  scaleX(1);
}

/* HTML: <div class="loader"></div> */
.loader {
	justify-self: center;
	margin-top: 5rem;
	margin-bottom: 5rem;
  width: 50px;

  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  border-right-color: var(--primary);
  animation: l15 1s infinite linear;

}
.loader::before,
.loader::after {    
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}
.loader::after {
  margin: 8px;
  animation-duration: 3s;
}
@keyframes l15{ 
  100%{transform: rotate(1turn)}
}
.signed-view {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}
    
</style>
