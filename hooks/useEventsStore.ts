import { create } from 'zustand';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Event } from '@/data/events';

interface EventsStore {
  events: Event[];
  isLoading: boolean;
  fetchEvents: () => Promise<void>;
  getEvent: (id: string) => Promise<Event | null>;
  createEvent: (data: Omit<Event, 'id'>) => Promise<string>;
}

export const useEventsStore = create<EventsStore>((set, get) => ({
  events: [],
  isLoading: false,

  fetchEvents: async () => {
    set({ isLoading: true });
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const snap = await getDocs(q);
      const events: Event[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Event));
      set({ events });
    } finally {
      set({ isLoading: false });
    }
  },

  getEvent: async (id: string) => {
    // check cache first
    const cached = get().events.find((e) => e.id === id);
    if (cached) return cached;

    const snap = await getDoc(doc(db, 'events', id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Event;
  },

  createEvent: async (data) => {
    const ref = await addDoc(collection(db, 'events'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    // refresh list
    await get().fetchEvents();
    return ref.id;
  },
}));
