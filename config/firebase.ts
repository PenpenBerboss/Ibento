import { Platform } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  getAuth, 
  // @ts-ignore - getReactNativePersistence est parfois invisible pour TS dans un contexte universel
  getReactNativePersistence,
  Auth
} from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentSingleTabManager,
  memoryLocalCache
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY, // Assurez-vous que ces variables sont dans .env
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN, // ex: EXPO_PUBLIC_FIREBASE_API_KEY="AIza..."
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialisation de l'Auth avec persistance pour React Native
export const auth: Auth = (() => {
  try {
    // On tente d'initialiser proprement avec AsyncStorage en premier pour éviter le warning
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // Si déjà initialisé (Hot Reload), on récupère l'instance existante
    return getAuth(app);
  }
})();

// Initialisation de Firestore avec cache local pour éviter les erreurs offline
export const db = initializeFirestore(app, {
  localCache: Platform.OS === 'web' 
    ? persistentLocalCache({
        tabManager: persistentSingleTabManager({})
      })
    : memoryLocalCache({})
});

export default app;
