import { Client, ID, Account, Functions } from "appwrite";
import { ref } from "vue";
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("lazni-kyiv");

const realtime = client;
const account = new Account(client);
const functions = new Functions(client);

const token = ref(null);

const auth = {
  register: async (email, password, name = "") => {
    const id = ID.unique();

    return account.create(id, email, password, name);
  },
  login: async (email, password) => {
    return account.createEmailPasswordSession(email, password);
  },
  logout: async () => {
    return account.deleteSession("current");
  },
  getCurrent: async () => {
    return account.get();
  },
  getSession: async () => {
    return account.getSession("current");
  },
};

const API_URL = "https://api.laznikyiv.com/v2";

const cache = {
  guests: null,
  bookings: null,
};

const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return res.json();
  },
  verify: async () => {
  const res = await fetch(`${API_URL}/auth/verify`, {
    method: "GET",
    credentials: "include",
     headers: {
      "Accept": "application/json"
    }
  });

  return res.json();
},

  logout: async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return res.json();
  },
   dogovir: {
    update: async (bookingId, dogovirData) => {
      // Update cache immediately for instant UI update
      if (cache.bookings?.bookings) {
        const booking = cache.bookings.bookings.find(b => b.$id === bookingId);
        if (booking) {
          booking.dogovir = JSON.stringify(dogovirData);
        }
      }
      
      // Return the data so component can use it
      return { success: true, data: dogovirData };
    }
  },

  guests: {
    list: async () => {
      if (cache.guests) return cache.guests;
      const res = await fetch(`${API_URL}/guests`, {
        method: "GET",
        credentials: "include", // send cookie to delete it
      });

      cache.guests = await res.json();

      return cache.guests;
    },
    get: async (id) => {
      // console.log(cache.bookings);
      const cachedGuest = cache.guests?.guests?.find((g) => g.$id == id);
      // Always default to an empty array if there are no bookings
      const bookingsCache = cache.bookings
        ? await cache.bookings
        : { bookings: [] };
      const cachedBookings = bookingsCache.bookings.filter(
        (b) => b.guest == id
      );

      if (cachedGuest) {
        return {
          guest: cachedGuest,
          bookings: cachedBookings,
        };
      }

      const res = await fetch(`${API_URL}/guests/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Failed to fetch guest ${id}`);

      const guest = await res.json();

      // Optionally, cache this guest
      cache.guests?.guests?.push(guest);

      return guest;
    },

    update: async (id, data) => {
      const res = await fetch(`${API_URL}/guests/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Failed to update guest ${id}`);

      const updatedGuest = await res.json();

      // Update the guest in the cache if it exists
      if (cache.guests?.guests) {
        const index = cache.guests.guests.findIndex((g) => g.$id === id);
        if (index !== -1) {
          cache.guests.guests[index] = updatedGuest.guest;
        } else {
          // If not found in cache, optionally push it
          cache.guests.guests.push(updatedGuest.guest);
        }
      }

      return updatedGuest;
    },
    create: async (alias) => {
      const res = await fetch(`${API_URL}/guests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(alias),
      });

      if (!res.ok) throw new Error("Failed to create guest");

      const newGuest = await res.json();

      // Update cache if it exists
      if (cache.guests?.guests) {
        cache.guests.guests.push(newGuest.guest);
      }

      return newGuest;
    },
  },

  bookings: {
    list: async () => {
      if (cache.bookings) return cache.bookings;

      const res = await fetch(`${API_URL}/bookings`, {
        method: "GET",
        credentials: "include", // send cookie to delete it
      });
      cache.bookings = await res.json();
      return cache.bookings;
    },
    create: async (data) => {
      const res = await fetch(`${API_URL}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      data = res.json();
      if (cache.bookings) {
        try {
          cache.bookings.push(data);
        } catch {
          //
        }
      }

      return data;
    },
    update: async (id, data) => {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();
      const updatedBooking = json.booking;
      // console.log(updatedBooking);
      if (cache.bookings?.bookings) {
        const index = cache.bookings.bookings.findIndex((b) => b.$id === id);

        if (index !== -1) {
          cache.bookings.bookings[index] = updatedBooking;
        }
      }

      return updatedBooking;
    },
  },
  qr: {
    get: async (uid, bid) => {
      const res = await fetch(`${API_URL}/qr/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: uid, bid: bid }),
        credentials: "include", // send cookie to delete it
      });

      return res.json();
    },
    verify: async (token) => {
      const res = await fetch(`${API_URL}/qr/verify/${token}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      return res.json();
    },
    send: async (uid, bid, caption) => {
      const res = await fetch(`${API_URL}/qr/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: uid, bid: bid, caption: caption }),
        credentials: "include", // send cookie to delete it
      });

      return res.json();
    },
  },
  reports: {
     list: async () => {

      const res = await fetch(`${API_URL}/reports`, {
        method: "GET",
        credentials: "include", // send cookie to delete it
      });
      const response = await res.json();
      return response;
    },
     get: async (name) => {
     
     const res = await fetch(`${API_URL}/reports/${name}`, {
        method: "GET",
        credentials: "include", // send cookie to delete it
      });
      const response = await res.json();
      return response;
    },
  }
};
const pwa = ref(null);
if (window.location.href.includes("localhost")) {
  pwa.value = true;
} else {
  pwa.value = window.matchMedia("(display-mode: standalone)").matches;
}

export { api, realtime, auth, client, functions, pwa };

export const v = "2.0-01.01.26";
