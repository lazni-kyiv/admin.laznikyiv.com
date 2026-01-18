<template>
  <div :class="['form-input', { blured: disabled }]">
    <label>Послуги</label>
    <button @click.prevent="openModal">
      Додати {{ selectedCount > 0 ? `(${selectedCount})` : '' }}
    </button>
  </div>

  <dialog id="addServices" class="modal" ref="modal">
    <form class="modal-box" @submit.prevent="saveServices">

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
                  <button class="component-button" type="button" @click="decreaseServiceType(service.id, type.id)"
                    :disabled="!getServiceTypeQty(service.id, type.id) || getServiceTypeQty(service.id, type.id) <= 0">
                    -
                  </button>
                  <input type="number" :value="getServiceTypeQty(service.id, type.id) || 0" readonly class="w-16 text-center" />
                  <button class="component-button" type="button" @click="increaseServiceType(service.id, type.id)">+</button>
                </div>
              </div>
            </div>

            <!-- Without types -->
            <div v-else class="flex items-center justify-between gap-3">
              <span class="flex-1">Кількість</span>
              <div class="input-row">
                <button class="component-button" type="button" @click="decreaseService(service.id)"
                  :disabled="!selectedExtras.services[service.id]?.qty || selectedExtras.services[service.id].qty <= 0">
                  -
                </button>
                <input type="number" :value="selectedExtras.services[service.id]?.qty || 0" readonly class="w-16 text-center" />
                <button class="component-button" type="button" @click="increaseService(service.id)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kram Section -->
      <div v-if="services.kram && Object.keys(services.kram).length > 0" class="services-section mt-6">
        <div v-for="(items, category) in services.kram" :key="category" class="mb-4">
          <h4 v-if="items && items.length > 0 && items[0]?.category">{{ items[0].category }}</h4>
          <h4 v-else>{{ category }}</h4>
          <div class="items-list" v-if="items && items.length > 0">
            <div v-for="item in items" :key="item.id" class="service-item">
              <span class="flex-1">{{ item.name }}</span>
              <div class="input-row">
                <button class="component-button" type="button" @click="decreaseKram(item.id)"
                  :disabled="!selectedExtras.kram[item.id] || selectedExtras.kram[item.id] <= 0">
                  -
                </button>
                <input type="number" :value="selectedExtras.kram[item.id] || 0" readonly class="w-16 text-center" />
                <button class="component-button" type="button" @click="increaseKram(item.id)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Author Specials Section -->
      <div class="services-section" v-if="services.author_specials && services.author_specials.length">
        <h4 class="font-semibold mb-3">Авторські спеціали</h4>
        <div class="items-list space-y-4">
          <div class="service-item" v-for="special in services.author_specials" :key="special.id">
            <p class="font-medium mb-2">{{ special.name }}</p>
            <div class="flex items-center justify-between gap-3">
              <div class="input-row">
                <button class="component-button" type="button" @click="decreaseAuthor(special.id)"
                  :disabled="!selectedExtras.author[special.id] || selectedExtras.author[special.id] <= 0">
                  -
                </button>
                <input type="number" :value="selectedExtras.author[special.id] || 0" readonly class="w-16 text-center" />
                <button class="component-button" type="button" @click="increaseAuthor(special.id)">+</button>
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
                <button class="component-button" type="button" @click="decreaseComplex(complex.id)"
                  :disabled="!selectedExtras.comp[complex.id] || selectedExtras.comp[complex.id] <= 0">
                  -
                </button>
                <input type="number" :value="selectedExtras.comp[complex.id] || 0" readonly class="w-16 text-center" />
                <button class="component-button" type="button" @click="increaseComplex(complex.id)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-action" style="margin-top: 1.5rem;">
        <button class="secondary" type="button" @click="closeModal">Скасувати</button>
        <button type="submit">Зберегти</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { reactive, ref, watch, computed } from "vue";
import toastr from "toastr";

const props = defineProps({
  services: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update', 'update:modelValue']);

const modal = ref(null);

const selectedExtras = reactive({
  services: {},
  kram: {},
  author: {},
  comp: {}
});

// Initialize services structure
watch(
  () => props.services?.services,
  (list) => {
    if (!list || !Array.isArray(list)) return;
    list.forEach(service => {
      if (!selectedExtras.services[service.id]) {
        if (service.type && service.type.length) {
          selectedExtras.services[service.id] = { types: {} };
        } else {
          selectedExtras.services[service.id] = { qty: 0 };
        }
      }
    });
  },
  { immediate: true }
);

// Watch for modelValue changes (when editing)
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      loadExistingData(newValue);
    }
  },
  { immediate: true, deep: true }
);

function loadExistingData(data) {
  if (!data || typeof data !== 'object') {
    console.warn('Invalid data passed to loadExistingData:', data);
    return;
  }

  console.log('Loading existing services data:', data);

  // Reset first - only if services are initialized
  if (selectedExtras.services && typeof selectedExtras.services === 'object') {
    Object.keys(selectedExtras.services).forEach(key => {
      if (selectedExtras.services[key]?.types) {
        selectedExtras.services[key].types = {};
      } else if (selectedExtras.services[key]?.qty !== undefined) {
        selectedExtras.services[key].qty = 0;
      }
    });
  }
  
  selectedExtras.kram = {};
  selectedExtras.author = {};
  selectedExtras.comp = {};

  // Load services
  if (data.services && typeof data.services === 'object') {
    Object.keys(data.services).forEach(serviceId => {
      const serviceData = data.services[serviceId];
      
      if (!serviceData) return;
      
      if (serviceData.types && typeof serviceData.types === 'object') {
        // Service with types
        if (!selectedExtras.services[serviceId]) {
          selectedExtras.services[serviceId] = { types: {} };
        }
        if (!selectedExtras.services[serviceId].types) {
          selectedExtras.services[serviceId].types = {};
        }
        selectedExtras.services[serviceId].types = { ...serviceData.types };
      } else if (serviceData.qty !== undefined) {
        // Simple service
        if (!selectedExtras.services[serviceId]) {
          selectedExtras.services[serviceId] = { qty: 0 };
        }
        selectedExtras.services[serviceId].qty = serviceData.qty;
      }
    });
  }

  // Load kram
  if (data.kram && typeof data.kram === 'object') {
    selectedExtras.kram = { ...data.kram };
  }

  // Load author specials
  if (data.author && typeof data.author === 'object') {
    selectedExtras.author = { ...data.author };
  }

  // Load complexes
  if (data.comp && typeof data.comp === 'object') {
    selectedExtras.comp = { ...data.comp };
  }

  console.log('Loaded selectedExtras:', JSON.parse(JSON.stringify(selectedExtras)));
}

// Selected count for display
const selectedCount = computed(() => {
  let count = 0;

  Object.values(selectedExtras.services).forEach(service => {
    if (service.types) {
      Object.values(service.types).forEach(qty => {
        if (qty > 0) count++;
      });
    } else if (service.qty > 0) {
      count++;
    }
  });

  Object.values(selectedExtras.kram).forEach(qty => {
    if (qty > 0) count++;
  });

  Object.values(selectedExtras.author).forEach(qty => {
    if (qty > 0) count++;
  });

  Object.values(selectedExtras.comp).forEach(qty => {
    if (qty > 0) count++;
  });

  return count;
});

// Service Type Methods
function getServiceTypeQty(serviceId, typeId) {
  if (!selectedExtras.services[serviceId]?.types) return 0;
  return selectedExtras.services[serviceId].types[typeId] || 0;
}

function increaseServiceType(serviceId, typeId) {
  if (!selectedExtras.services[serviceId]) {
    selectedExtras.services[serviceId] = { types: {} };
  }
  if (!selectedExtras.services[serviceId].types) {
    selectedExtras.services[serviceId].types = {};
  }
  if (!selectedExtras.services[serviceId].types[typeId]) {
    selectedExtras.services[serviceId].types[typeId] = 0;
  }
  selectedExtras.services[serviceId].types[typeId]++;
}

function decreaseServiceType(serviceId, typeId) {
  if (selectedExtras.services[serviceId]?.types?.[typeId] > 0) {
    selectedExtras.services[serviceId].types[typeId]--;
  }
}

// Simple Service Methods
function increaseService(serviceId) {
  if (!selectedExtras.services[serviceId]) {
    selectedExtras.services[serviceId] = { qty: 0 };
  }
  selectedExtras.services[serviceId].qty++;
}

function decreaseService(serviceId) {
  if (selectedExtras.services[serviceId]?.qty > 0) {
    selectedExtras.services[serviceId].qty--;
  }
}

// Kram Methods
function increaseKram(kramId) {
  if (!selectedExtras.kram[kramId]) {
    selectedExtras.kram[kramId] = 0;
  }
  selectedExtras.kram[kramId]++;
}

function decreaseKram(kramId) {
  if (selectedExtras.kram[kramId] > 0) {
    selectedExtras.kram[kramId]--;
  }
}

// Author Methods
function increaseAuthor(specialId) {
  if (!selectedExtras.author[specialId]) {
    selectedExtras.author[specialId] = 0;
  }
  selectedExtras.author[specialId]++;
}

function decreaseAuthor(specialId) {
  if (selectedExtras.author[specialId] > 0) {
    selectedExtras.author[specialId]--;
  }
}

// Complex Methods
function increaseComplex(complexId) {
  if (!selectedExtras.comp[complexId]) {
    selectedExtras.comp[complexId] = 0;
  }
  selectedExtras.comp[complexId]++;
}

function decreaseComplex(complexId) {
  if (selectedExtras.comp[complexId] > 0) {
    selectedExtras.comp[complexId]--;
  }
}

function openModal() {
  if (props.disabled) return;
  modal.value?.showModal();
}

function closeModal() {
  modal.value?.close();
}

function saveServices() {
  const activeServices = {};

  Object.keys(selectedExtras.services).forEach(id => {
    const service = selectedExtras.services[id];

    if (service.types) {
      const activeTypes = {};
      Object.keys(service.types).forEach(typeId => {
        if (service.types[typeId] > 0) {
          activeTypes[typeId] = service.types[typeId];
        }
      });
      if (Object.keys(activeTypes).length > 0) {
        activeServices[id] = { types: activeTypes };
      }
    } else if (service.qty > 0) {
      activeServices[id] = { qty: service.qty };
    }
  });

  const activeKram = {};
  Object.keys(selectedExtras.kram).forEach(id => {
    if (selectedExtras.kram[id] > 0) {
      activeKram[id] = selectedExtras.kram[id];
    }
  });

  const activeAuthor = {};
  Object.keys(selectedExtras.author).forEach(id => {
    if (selectedExtras.author[id] > 0) {
      activeAuthor[id] = selectedExtras.author[id];
    }
  });

  const activeComp = {};
  Object.keys(selectedExtras.comp).forEach(id => {
    if (selectedExtras.comp[id] > 0) {
      activeComp[id] = selectedExtras.comp[id];
    }
  });

  const result = {
    services: activeServices,
    kram: activeKram,
    author: activeAuthor,
    comp: activeComp
  };

  emit('update', result);
  emit('update:modelValue', result);

  toastr.success('Послуги додано');
  closeModal();
}

// Expose method to reset
defineExpose({
  reset: () => {
    Object.keys(selectedExtras.services).forEach(key => {
      if (selectedExtras.services[key].types) {
        selectedExtras.services[key].types = {};
      } else {
        selectedExtras.services[key].qty = 0;
      }
    });
    selectedExtras.kram = {};
    selectedExtras.author = {};
    selectedExtras.comp = {};
  }
});
</script>