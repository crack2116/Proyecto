'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const USE_EMULATOR = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

let firebaseApp: FirebaseApp | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let firestore: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;

// Solo inicializar Firebase si no estamos en un modo de "solo datos locales"
// Por ahora, para resolver el bloqueo, desactivaremos la conexión real por defecto.
const CONNECT_TO_FIREBASE = false; 

if (CONNECT_TO_FIREBASE && getApps().length === 0) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);

    if (USE_EMULATOR) {
      console.log('Connecting to Firebase Emulators...');
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      connectFirestoreEmulator(firestore, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
    } else {
      console.log('Connecting to Firebase Production...');
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    firebaseApp = null;
    auth = null;
    firestore = null;
    storage = null;
  }
} else if (CONNECT_TO_FIREBASE) {
  firebaseApp = getApp();
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
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
