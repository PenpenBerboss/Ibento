/**
 * Script de seed Firestore — à exécuter une seule fois
 * Usage: npx ts-node scripts/seedEvents.ts
 */
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { upcomingEvents } from '../data/events';

const firebaseConfig = {
  apiKey: "AIzaSyDaFe-KGXDicPLm6rorjOc0Rko6szrV4s4",
  authDomain: "ibento-b9d64.firebaseapp.com",
  projectId: "ibento-b9d64",
  storageBucket: "ibento-b9d64.firebasestorage.app",
  messagingSenderId: "517097646390",
  appId: "1:517097646390:web:0eb5201d59ce0c318f2b97",
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
