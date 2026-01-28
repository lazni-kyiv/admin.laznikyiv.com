import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const ACCESS_CODE = "lk0la";

export function useAppLock() {
  const route = useRoute();

  const getStoredLockState = () => {
    try {
      return localStorage.getItem('app-locked') === 'true';
    } catch {
      return false;
    }
  };

  const locked = ref(getStoredLockState());
  const isUnlocked = ref(false);

  watch(locked, (newValue) => {
    try {
      localStorage.setItem('app-locked', String(newValue));
    } catch {}

    if (newValue && !isUnlocked.value) {
      showLockOverlay();
    } else {
      removeLockOverlay();
      isUnlocked.value = false;
    }
  }, { immediate: true });

  function showLockOverlay() {
    if (route.fullPath.startsWith('/dogovir')) return;
    if (document.getElementById('lock-overlay')) return;

    // 👉 весь твой DOM-код без изменений
  }

  function removeLockOverlay() {
    document.getElementById('lock-overlay')?.remove();
    document.body.style.overflow = '';
  }

  return {
    locked,
    isUnlocked,
    lockApp: () => {
      locked.value = true;
      isUnlocked.value = false;
    },
    unlockApp: () => {
      locked.value = false;
      isUnlocked.value = false;
    },
    isLocked: () => locked.value && !isUnlocked.value
  };
}
