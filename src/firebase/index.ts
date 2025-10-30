'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const USE_EMULATOR = process.env.NODE_ENV === 'development';

let firebaseApp: FirebaseApp;
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

if (USE_EMULATOR) {
  console.log("🟠 Conectando a los emuladores de Firebase...");
  try {
    connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectStorageEmulator(storage, "localhost", 9199);
    console.log("✅ Emuladores de Firebase conectados.");
  } catch (error) {
    console.error("❌ Error al conectar con los emuladores:", error);
  }
} else {
    console.log("🔵 Conectado a los servicios de Firebase en producción.");
}

const getFirebaseServices = () => {
    return { firebaseApp, auth, firestore, storage };
};

export function initializeFirebase() {
    return getFirebaseServices();
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
