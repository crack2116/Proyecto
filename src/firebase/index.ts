'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const USE_EMULATOR = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

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
    console.log("Connecting to local Firebase emulators.");
    // Asegurarse de que no intentamos conectar los emuladores varias veces.
    if (!(auth as any)._isEmulator) {
        try {
            connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
            connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
            connectStorageEmulator(storage, '127.0.0.1', 9199);
        } catch (e) {
            console.warn('Failed to connect to emulators, falling back to production services.', e);
        }
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
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';