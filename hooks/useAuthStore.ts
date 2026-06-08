import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    address: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  updateUser: (data: Partial<Omit<User, 'id' | 'email'>>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  restoreSession: async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
          const data = snap.data();
          const user: User = {
            id: firebaseUser.uid,
            firstName: data?.firstName ?? '',
            lastName: data?.lastName ?? '',
            email: firebaseUser.email ?? '',
            phone: data?.phone ?? '',
            country: data?.country ?? '',
            address: data?.address ?? '',
            avatar: data?.avatar,
          };
          set({ user, isAuthenticated: true, isLoading: false });
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
        unsubscribe();
        resolve();
      });
    });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      const data = snap.data();
      const user: User = {
        id: firebaseUser.uid,
        firstName: data?.firstName ?? '',
        lastName: data?.lastName ?? '',
        email: firebaseUser.email ?? '',
        phone: data?.phone ?? '',
        country: data?.country ?? '',
        address: data?.address ?? '',
        avatar: data?.avatar,
      };
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const { firstName, lastName, email, password, phone, country, address } = userData;
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(firebaseUser, { displayName: `${firstName} ${lastName}` });

      const user: User = {
        id: firebaseUser.uid,
        firstName,
        lastName,
        email,
        phone,
        country,
        address,
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, isAuthenticated: false });
  },

  updateUser: async (data) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    await setDoc(doc(db, 'users', currentUser.uid), data, { merge: true });
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
