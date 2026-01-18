// Constants
export const BOOKING_TYPES = [
  { value: "house", label: "Будинку" },
  { value: "lazni", label: "Лазні / чану" },
  { value: "pool", label: "Басейну" }
];

export const HOUSE_TYPES = [
  { value: "family", label: "Family House" },
  { value: "right", label: "RV Right" },
  { value: "left", label: "RV Left" }
];

export const FILL_OPTIONS = [
  { value: 'h', label: 'Хвоя' },
  { value: 'c', label: 'Цитрус' },
  { value: 't', label: 'Трави' }
];

export const SOURCES = [
  { label: "Instagram", value: "i" },
  { label: "Telegram", value: "tg" },
  { label: "Viber", value: "v" },
  { label: "WhatsApp", value: "w" },
  { label: "Телефон", value: "t" },
  { label: "Бот", value: "b" }
];

// Generate time slots from 06:00 to 00:00 in 30min intervals
export function generateTimeSlots() {
  const result = [];
  const start = 6 * 60;
  const end = 24 * 60;

  for (let mins = start; mins <= end; mins += 30) {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    result.push(h === "24" ? `00:${m}` : `${h}:${m}`);
  }

  return result;
}

// Date formatting helpers
export function formatKey(date) {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear().toString().slice(-2);
  return `${d}.${m}.${y}`;
}

export function formatDatePart(dateStr, time) {
  const dt = new Date(dateStr);
  const yy = String(dt.getFullYear()).slice(-2);
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${dd}.${mm}.${yy}T${time}`;
}

export function formatDateDisplay(date) {
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: 'short',
    weekday: 'short'
  }).format(date);
}

// Parse booking date string to { in, out } object
export function parseBookingDate(dateStr) {
  const [inStr, outStr] = dateStr.split("-");
  const [inDate, inTime] = inStr.split("T");
  const [outDate, outTime] = outStr.split("T");

  const formatDate = (d) => {
    const [day, month, year] = d.split(".");
    return `20${year}-${month}-${day}`;
  };

  return {
    in: { date: formatDate(inDate), time: inTime },
    out: { date: formatDate(outDate), time: outTime }
  };
}

// Generate daily bookings array from date range
export function generateDailyBookings(startDateStr, endDateStr, type) {
  const startDate = new Date(startDateStr);
  const endDate = type === 'house' 
    ? new Date(new Date(endDateStr).setDate(new Date(endDateStr).getDate() - 1))
    : new Date(startDateStr);

  const days = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    days.push({
      date: new Date(currentDate),
      l: { booked: false, t: 2 },
      c: { booked: false, t: 2, f: [] }
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

// Parse meta lazni/chan data into daily format
export function parseMetaToDaily(metaStr, checkIn, checkOut, type) {
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
    const fills = f === "null" || !f ? [] : f.includes(",") ? f.split(",") : [f];
    cMap[date] = { booked: true, t: Number(t), f: fills };
  });

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (type !== 'pool') end.setDate(end.getDate() - 1);

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

  return days;
}

// Minify daily bookings to string format
export function minifyDailyBookings(dailyBookings) {
  const lazniParts = [];
  const chanParts = [];

  dailyBookings.forEach(day => {
    const dayKey = formatKey(day.date);

    if (day.l.booked && day.l.t > 0) {
      lazniParts.push(`${dayKey}:${day.l.t}`);
    }

    if (day.c.booked && day.c.t > 0) {
      const fills = day.c.f.length ? day.c.f.join(',') : null;
      chanParts.push(`${dayKey}:${day.c.t}:${fills}`);
    }
  });

  return {
    lazni: lazniParts.join('|'),
    chan: chanParts.join('|')
  };
}

// Format full booking date range
export function formatBookingDateRange(dateIn, timeIn, dateOut, timeOut, type) {
  if (type === 'pool' || type === "lazni") {
    return `${formatDatePart(dateIn, timeIn)}-${formatDatePart(dateIn, timeOut)}`;
  }
  return `${formatDatePart(dateIn, timeIn)}-${formatDatePart(dateOut, timeOut)}`;
}

/**
 * Parse booking date range string back to form format
 * @param {string} dateRange - e.g. "2024-01-15 14:00 - 2024-01-16 12:00" or "2024-01-15 14:00-18:00"
 * @param {string} type - booking type
 * @returns {object} - { in: { date, time }, out: { date, time } }
 */
export function parseBookingDateRange(dateRange, type) {
  if (!dateRange) {
    return {
      in: { date: null, time: null },
      out: { date: null, time: null }
    };
  }

  // Split by " - " for multi-day or "-" for same-day
  const parts = dateRange.includes(' - ') 
    ? dateRange.split(' - ') 
    : dateRange.split('-');

  // Parse start date and time
  let [startDate, startTime] = parts[0].trim().split('T');
  startDate = `20${startDate.split(".")[2]}-${startDate.split(".")[1]}-${startDate.split(".")[0]}`
  // Parse end time (and possibly date)
  let endDate = null;
  let endTime = null;

  if (parts[1]) {
    const endPart = parts[1].trim();
    if (endPart.includes('T')) {
      // Multi-day: "2024-01-16 12:00"
      [endDate, endTime] = endPart.split('T');
      endDate =  `20${endDate.split(".")[2]}-${endDate.split(".")[1]}-${endDate.split(".")[0]}`
    } else {
      // Same day: "18:00"
      endDate = startDate;
      endTime = endPart;
    }
  }

  return {
    in: { date: startDate, time: startTime },
    out: { date: endDate, time: endTime }
  };
}

/**
 * Expand minified daily bookings back to full format
 * @param {string} startDate 
 * @param {string} endDate 
 * @param {object} minified - { l: [0,1,0], c: [1,0,1] }
 * @param {string} type 
 * @returns {array} - daily bookings array
 */
export function expandDailyBookings(startDate, endDate, minified, type) {
  const bookings = generateDailyBookings(startDate, endDate, type);
  
  if (!minified) return bookings;

  // Expand lazni
  if (minified.l && Array.isArray(minified.l)) {
    minified.l.forEach((value, index) => {
      if (bookings[index]) {
        bookings[index].lazni = value === 1;
      }
    });
  }

  // Expand chan
  if (minified.c && Array.isArray(minified.c)) {
    minified.c.forEach((value, index) => {
      if (bookings[index]) {
        bookings[index].chan = value === 1;
      }
    });
  }

  return bookings;
}