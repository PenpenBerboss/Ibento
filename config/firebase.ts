import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDaFe-KGXDicPLm6rorjOc0Rko6szrV4s4",
  authDomain: "ibento-b9d64.firebaseapp.com",
  projectId: "ibento-b9d64",
  storageBucket: "ibento-b9d64.firebasestorage.app",
  messagingSenderId: "517097646390",
  appId: "1:517097646390:web:0eb5201d59ce0c318f2b97",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
