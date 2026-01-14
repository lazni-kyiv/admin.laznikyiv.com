import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { api } from "@/assets/js/app";

export function useCalendar() {
  const router = useRouter();
  
  // State
  const selectedBooking = ref(null);
  const bookings = ref([]);
  const guests = ref({});
  const isLoading = ref(true);

  // Calendar options
  const calendarOptions = ref({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'uk',
    firstDay: 1,
    events: [],
    eventClick: handleEventClick,
    height: 'auto',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    buttonText: {
      today: 'Сьогодні',
      month: 'Місяць',
      week: 'Тиждень',
      day: 'День'
    },
    allDayText: 'Весь день',
    noEventsText: 'Немає подій для відображення'
  });

  // Fetch bookings and guests
  onMounted(async () => {
     // console.log('🔵 useCalendar: onMounted triggered');
    
    try {
      // Fetch bookings
       // console.log('📡 Fetching bookings...');
      const bookingsResponse = await api.bookings.list();
       // console.log('📦 Bookings response:', bookingsResponse);
      
      bookings.value = bookingsResponse.bookings || bookingsResponse.documents || bookingsResponse || [];
       // console.log('✅ Bookings loaded:', bookings.value.length, 'bookings');
      
      // Fetch guests
       // console.log('📡 Fetching guests...');
      const guestsResponse = await api.guests.list();
       // console.log('📦 Guests response:', guestsResponse);
      
      const guestsList = guestsResponse.guests || guestsResponse.documents || guestsResponse || [];
       // console.log('✅ Guests loaded:', guestsList.length, 'guests');
      
      // Create guests lookup map
      guestsList.forEach(guest => {
        guests.value[guest.$id] = guest.name;
      });
       // console.log('👥 Guests map created:', Object.keys(guests.value).length, 'entries');

      // Transform bookings to calendar events
      const events = bookings.value.map(booking => {
        const event = transformBookingToEvent(booking);
         // console.log('📅 Transformed booking:', booking.$id, '→', event);
        return event;
      });
      
      calendarOptions.value.events = events;
       // console.log('✅ Calendar events set:', events.length, 'events');
       // console.log('📋 Events array:', events);
      
      isLoading.value = false;
      
      // Force calendar refresh
      await nextTick();
      
    } catch (error) {
      console.error('❌ Error loading calendar data:', error);
      console.error('Error details:', error.message, error.stack);
      isLoading.value = false;
    }
  });

  /**
   * Transform booking object to FullCalendar event format
   */
  function transformBookingToEvent(booking) {
    try {
       // console.log('🔄 Transforming booking:', booking);
      
      const [startStr, endStr] = booking.date.split('-');
      const [startDate, startTime] = startStr.split('T');
      const [endDate, endTime] = endStr.split('T');

       // console.log('📅 Date parts:', { startDate, startTime, endDate, endTime });

      // Parse date from DD.MM.YY to YYYY-MM-DD
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('.');
        // Handle both YY and YYYY formats
        const fullYear = year.length === 2 ? `20${year}` : year;
        return `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      };

      const start = `${parseDate(startDate)}T${startTime}`;
      const end = `${parseDate(endDate)}T${endTime}`;

       // console.log('🕐 Parsed dates:', { start, end });

      // Colors based on house/type
      const colorMap = {
        family: '#3b82f6',   // Blue
        right: '#8b5cf6',    // Purple
        left: '#10b981',     // Green
        pool: '#06b6d4',     // Cyan
        lazni: '#f59e0b'     // Orange
      };

      const color = colorMap[booking.house] || colorMap[booking.type] || '#6b7280';

      const event = {
        id: booking.$id,
        title: getGuestName(booking.guest),
        start: start,
        end: end,
        backgroundColor: color,
        borderColor: color,
        extendedProps: {
          booking: booking
        }
      };

       // console.log('✨ Created event:', event);
      return event;
      
    } catch (error) {
      console.error('❌ Error transforming booking:', booking, error);
      return null;
    }
  }

  /**
   * Handle calendar event click
   */
  function handleEventClick(info) {
     // console.log('🖱️ Event clicked:', info.event);
    selectedBooking.value = info.event.extendedProps.booking;
     // console.log('📝 Selected booking:', selectedBooking.value);
  }

  /**
   * Close booking details modal
   */
  function closeModal() {
     // console.log('❌ Closing modal');
    selectedBooking.value = null;
  }

  /**
   * Get guest name by ID
   */
  function getGuestName(guestId) {
    const name = guests.value[guestId] || 'Невідомий гість';
     // console.log('👤 Getting guest name for:', guestId, '→', name);
    return name;
  }

  /**
   * Get booking type text in Ukrainian
   */
  function getTypeText(type) {
    const types = {
      house: 'Будинок',
      pool: 'Басейн',
      lazni: 'Лазня/Чан'
    };
    return types[type] || type;
  }

  /**
   * Get house name text
   */
  function getHouseText(house) {
    const houses = {
      family: 'Family House',
      right: 'River View Right',
      left: 'River View Left'
    };
    return houses[house] || house;
  }

  /**
   * Extract guest count from meta
   */
  function getGuestsCount(meta) {
    try {
      const metaObj = typeof meta === 'string' ? JSON.parse(meta) : meta;
      return metaObj.g || 0;
    } catch {
      return 0;
    }
  }

  /**
   * Format date range for display
   */
  function formatDateRange(dateStr) {
    const [startStr, endStr] = dateStr.split('-');
    const [startDate, startTime] = startStr.split('T');
    const [endDate, endTime] = endStr.split('T');
    
    return `${startDate} ${startTime} - ${endDate} ${endTime}`;
  }

  /**
   * Get description from meta
   */
  function getDescription(meta) {
    try {
      const metaObj = typeof meta === 'string' ? JSON.parse(meta) : meta;
      return metaObj.d || 'Немає коментаря';
    } catch {
      return 'Немає коментаря';
    }
  }

  /**
   * Get source from meta
   */
  function getSource(meta) {
    try {
      const metaObj = typeof meta === 'string' ? JSON.parse(meta) : meta;
      const sources = {
        i: 'Instagram',
        tg: 'Telegram',
        v: 'Viber',
        w: 'WhatsApp',
        t: 'Телефон'
      };
      return sources[metaObj.s] || 'Не вказано';
    } catch {
      return 'Не вказано';
    }
  }

  /**
   * Parse and format lazni/chan information from meta
   */
  function getLazni(meta) {
    try {
      const metaObj = typeof meta === 'string' ? JSON.parse(meta) : meta;
      
      if (!metaObj.l) return 'Немає';
      
      const { l: lazni, c: chan } = metaObj.l;
      const parts = [];
      
      // Parse lazni entries
      if (lazni) {
        const lazniItems = lazni.split('|').map(item => {
          const [date, hours] = item.split(':');
          return `<div><strong>Лазня:</strong> ${date} - ${hours} год</div>`;
        });
        parts.push(...lazniItems);
      }
      
      // Parse chan entries
      if (chan) {
        const chanItems = chan.split('|').map(item => {
          const [date, hours, fill] = item.split(':');
          
          // Parse fill options
          let fillText = '';
          if (fill && fill !== 'plain') {
            const fillMap = {
              h: 'Хвоя',
              c: 'Цитрус',
              t: 'Трави'
            };
            const fills = fill.split(',').map(f => fillMap[f] || f).join(', ');
            fillText = ` (${fills})`;
          }
          
          return `<div><strong>Чан:</strong> ${date} - ${hours} год${fillText}</div>`;
        });
        parts.push(...chanItems);
      }
      
      return parts.length > 0 ? parts.join('') : 'Немає';
    } catch (error) {
      console.error('Error parsing lazni data:', error);
      return 'Помилка обробки даних';
    }
  }

  /**
   * Parse and display services from meta
   */
  function getServices(meta) {
    try {
      const metaObj = typeof meta === 'string' ? JSON.parse(meta) : meta;
      
      if (!metaObj.services && !metaObj.kram) return 'Немає';
      
      const parts = [];
      
      // Parse services
      if (metaObj.services) {
        Object.entries(metaObj.services).forEach(([serviceId, data]) => {
          const qty = data.q || 0;
          const type = data.t || '';
          parts.push(`<div>Послуга #${serviceId}: ${qty} шт${type ? ` (${type})` : ''}</div>`);
        });
      }
      
      // Parse kram
      if (metaObj.kram) {
        Object.entries(metaObj.kram).forEach(([kramId, qty]) => {
          parts.push(`<div>Крам #${kramId}: ${qty} шт</div>`);
        });
      }
      
      return parts.length > 0 ? parts.join('') : 'Немає';
    } catch (error) {
      console.error('Error parsing services data:', error);
      return 'Помилка обробки даних';
    }
  }

  /**
   * Show QR code modal for contract
   */
  function showQr(guestId, bookingId) {
     // console.log('Show QR for guest:', guestId, 'booking:', bookingId);
  }

  /**
   * Navigate to guest details page
   */
  function goToGuest(guestId) {
    router.push(`/guests/${guestId}`);
  }

  /**
   * Navigate to booking edit page
   */
  function editBooking(bookingId) {
    router.push(`/bookings/${bookingId}/edit`);
  }

  /**
   * Refresh calendar data
   */
  async function refreshCalendar() {
    try {
       // console.log('🔄 Refreshing calendar...');
      const bookingsResponse = await api.bookings.list();
      bookings.value = bookingsResponse.bookings || bookingsResponse.documents || bookingsResponse;
      
      calendarOptions.value.events = bookings.value.map(booking => {
        return transformBookingToEvent(booking);
      }).filter(e => e !== null);
      
       // console.log('✅ Calendar refreshed');
    } catch (error) {
      console.error('❌ Error refreshing calendar:', error);
    }
  }

  /**
   * Filter bookings by type
   */
  function filterByType(type) {
    if (!type) {
      calendarOptions.value.events = bookings.value.map(transformBookingToEvent).filter(e => e !== null);
    } else {
      const filtered = bookings.value.filter(b => b.type === type);
      calendarOptions.value.events = filtered.map(transformBookingToEvent).filter(e => e !== null);
    }
  }

  /**
   * Filter bookings by house
   */
  function filterByHouse(house) {
    if (!house) {
      calendarOptions.value.events = bookings.value.map(transformBookingToEvent).filter(e => e !== null);
    } else {
      const filtered = bookings.value.filter(b => b.house === house);
      calendarOptions.value.events = filtered.map(transformBookingToEvent).filter(e => e !== null);
    }
  }

  // Return all reactive state and methods
  return {
    // State
    selectedBooking,
    bookings,
    guests,
    calendarOptions,
    isLoading,
    
    // Modal methods
    closeModal,
    
    // Helper methods
    getGuestName,
    getTypeText,
    getHouseText,
    getGuestsCount,
    formatDateRange,
    getDescription,
    getSource,
    getLazni,
    getServices,
    
    // Action methods
    showQr,
    goToGuest,
    editBooking,
    refreshCalendar,
    filterByType,
    filterByHouse
  };
}