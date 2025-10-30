'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage }from 'firebase/storage';

// Eliminar la lógica del emulador y conectar siempre a producción.
// La configuración del emulador estaba causando problemas de red persistentes.
let firebaseApp: FirebaseApp;
if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

console.log("🔵 Conectado a los servicios de Firebase en producción.");

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
