/**
 * Script de seed Firestore — à exécuter une seule fois
 * Usage: npx ts-node scripts/seedEvents.ts
 */
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { upcomingEvents } from '../data/events';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

async function seed() {
  console.log('🔥 Connexion à Firestore...');

  const existing = await getDocs(collection(db, 'events'));
  for (const d of existing.docs) {
    await deleteDoc(doc(db, 'events', d.id));
  }
  console.log(`🗑️  ${existing.size} événements supprimés`);

  for (const event of upcomingEvents) {
    const { id, ...data } = event;
    await addDoc(collection(db, 'events'), data);
  }

  console.log(`✅ ${upcomingEvents.length} événements insérés dans Firestore`);
}

seed().catch(console.error);
