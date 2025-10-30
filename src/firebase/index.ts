'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Detecta el entorno de desarrollo para usar el emulador automáticamente.
// Esto es más robusto que depender de variables de entorno.
const USE_EMULATOR = process.env.NODE_ENV === 'development';

let firebaseApp: FirebaseApp;
let auth: ReturnType<typeof getAuth>;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

auth = getAuth(firebaseApp);
firestore = getFirestore(firebaseApp);
storage = getStorage(firebaseApp);

// Solo conectar a emuladores en entorno de desarrollo.
if (USE_EMULATOR) {
    // Asegurarse de que no intentamos conectar los emuladores varias veces.
    // Esto previene un error de "hot reload" en Next.js.
    if (!(auth as any)._isEmulator) {
        console.log('Connecting to Firebase Emulators at localhost...');
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        connectFirestoreEmulator(firestore, 'localhost', 8080);
        connectStorageEmulator(storage, 'localhost', 9199);
    }
} else {
    console.log('Connecting to Firebase Production...');
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