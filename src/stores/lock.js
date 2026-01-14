import { ref, watch } from "vue";

const ACCESS_CODE = "lk0la";

const getStoredLockState = () => {
  try {
    const stored = localStorage.getItem('app-locked');
    return stored === 'true';
  } catch (e) {
    return false;
  }
};

export const locked = ref(getStoredLockState());
export const isUnlocked = ref(false);

watch(locked, (newValue) => {
  try {
    localStorage.setItem('app-locked', String(newValue));
  } catch (e) {
    console.error('Failed to save lock state:', e);
  }
  
  if (newValue && !isUnlocked.value) {
    showLockOverlay();
  } else if (!newValue) {
    removeLockOverlay();
    isUnlocked.value = false;

  }
}, { immediate: true });

function showLockOverlay() {
  if (document.getElementById('lock-overlay')) return;
  
  const overlay = document.createElement('div');
  overlay.id = 'lock-overlay';
  overlay.innerHTML = `
    <div class="lock-container">
      <div class="lock-box">
        <i class="hgi hgi-stroke hgi-lock-02" style="font-size: 48px; margin-bottom: 16px;"></i>
        <h2 style="margin-bottom: 8px;">Заблоковано</h2>
        <p style="margin-bottom: 20px; color: #666;">Введіть код доступу для розблокування</p>
        <input 
          type="password" 
          id="access-code-input" 
          placeholder="Код доступу"
          autocomplete="off"
          style="padding: 12px; border-radius: 8px; border: 1px solid #ccc; width: 100%; margin-bottom: 12px; font-size: 16px;"
        />
        <button 
          id="unlock-button"
          style="padding: 12px 24px; border-radius: 8px; background: var(--primary); color: white; border: none; width: 100%; cursor: pointer; font-size: 16px;"
        >
          Розблокувати
        </button>
        <p id="error-message" style="color: red; margin-top: 12px; display: none; font-size: 14px;">Неправильний код доступу</p>
      </div>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #lock-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(230, 230, 230, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      backdrop-filter: blur(10px);
    }
    
    .lock-container {
      max-width: 400px;
      width: 90%;
    }
    
    .lock-box {
      background: white;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    #access-code-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    #unlock-button:hover {
      background: #0056b3;
    }
    #unlock-button {
        padding-top: 0.5rem !important;
        padding-bottom: 0.5rem !important;
    }
    #unlock-button:active {
      transform: scale(0.98);
    }
    
    #unlock-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(overlay);
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  
  // Focus input
  setTimeout(() => {
    document.getElementById('access-code-input')?.focus();
  }, 100);
  
  // Add event listeners
  const input = document.getElementById('access-code-input');
  const button = document.getElementById('unlock-button');
  const errorMsg = document.getElementById('error-message');
  
  let attempts = 0;
  const maxAttempts = 5;
  
  const attemptUnlock = () => {
    const code = input.value.trim();
    
    if (!code) {
      return;
    }
    
    if (code === ACCESS_CODE) {
      isUnlocked.value = true;
      locked.value = false;
      removeLockOverlay();
      attempts = 0;
    } else {
      attempts++;
      errorMsg.textContent = `Неправильний код доступу (${attempts}/${maxAttempts})`;
      errorMsg.style.display = 'block';
      input.value = '';
      input.focus();
      
      // Shake animation
      input.style.animation = 'shake 0.3s';
      setTimeout(() => {
        input.style.animation = '';
      }, 300);
      
      // Lock for 30 seconds after max attempts
      if (attempts >= maxAttempts) {
        button.disabled = true;
        input.disabled = true;
        let countdown = 30;
        errorMsg.textContent = `Забагато спроб. Зачекайте ${countdown} секунд`;
        
        const timer = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            errorMsg.textContent = `Забагато спроб. Зачекайте ${countdown} секунд`;
          } else {
            clearInterval(timer);
            button.disabled = false;
            input.disabled = false;
            attempts = 0;
            errorMsg.style.display = 'none';
            input.focus();
          }
        }, 1000);
      } else {
        // Hide error after 3 seconds
        setTimeout(() => {
          if (attempts < maxAttempts) {
            errorMsg.style.display = 'none';
          }
        }, 3000);
      }
    }
  };
  
  button.addEventListener('click', attemptUnlock);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      attemptUnlock();
    }
  });
  
  // Add shake animation
  if (!document.getElementById('lock-animations')) {
    const animStyle = document.createElement('style');
    animStyle.id = 'lock-animations';
    animStyle.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
    `;
    document.head.appendChild(animStyle);
  }
}

function removeLockOverlay() {
  const overlay = document.getElementById('lock-overlay');
  if (overlay) {
    overlay.remove();
    // window.location.reload()
  }
  
  // Restore body scroll
  document.body.style.overflow = '';
//   window.location.reload()
}

// Function to manually lock
export function lockApp() {
  locked.value = true;
  isUnlocked.value = false;
}

// Function to unlock (use with caution)
export function unlockApp() {
  locked.value = false;
  isUnlocked.value = false;
}

// Function to check if app is locked
export function isLocked() {
  return locked.value && !isUnlocked.value;
}

// Clear lock on app close (optional - remove if you want it to persist across browser sessions)
// window.addEventListener('beforeunload', () => {
//   localStorage.removeItem('app-locked');
// });