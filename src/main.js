import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'

const app = createApp(App)
const head = createHead()
app.use(createPinia())
app.use(router)
app.use(head)
app.mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');

  // Register Firebase Messaging SW separately
  // navigator.serviceWorker.register('/firebase-messaging-sw.js')
  //   .then(registration => {
  //      // console.log('Firebase SW registered', registration);
  //   })
  //   .catch(err => console.error('Firebase SW registration failed', err));
}
