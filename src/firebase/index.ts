'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Detecta el entorno de desarrollo para usar el emulador automáticamente.
const USE_EMULATOR = process.env.NODE_ENV === 'development';

let firebaseApp: FirebaseApp;
let auth: ReturnType<typeof getAuth>;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

// Inicializar Firebase
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

// Obtener servicios
auth = getAuth(firebaseApp);
firestore = getFirestore(firebaseApp);
storage = getStorage(firebaseApp);

// Conectar a emuladores SOLO en desarrollo y si no está ya conectado.
if (USE_EMULATOR) {
    // Esta comprobación evita reconexiones en HMR (Hot Module Replacement)
    if (!(auth as any)._isEmulator) {
        console.log("🟠 Conectando a los Emuladores de Firebase en localhost...");
        try {
            connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
            connectFirestoreEmulator(firestore, 'localhost', 8080);
            connectStorageEmulator(storage, 'localhost', 9199);
            console.log("✅ Emuladores conectados exitosamente.");
        } catch (error) {
            console.error("🔴 Error al conectar con los emuladores:", error);
        }
    }
} else {
    console.log("🔵 Conectando a Firebase en producción...");
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
