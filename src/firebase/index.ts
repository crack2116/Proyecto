'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    // Important! initializeApp() is called without any arguments because Firebase App Hosting
    // integrates with the initializeApp() function to provide the environment variables needed to
    // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
    // without arguments.
    let firebaseApp;
    try {
      // Attempt to initialize via Firebase App Hosting environment variables
      firebaseApp = initializeApp();
    } catch (e) {
      // Only warn in production because it's normal to use the firebaseConfig to initialize
      // during development
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    // Connect to emulators ONLY if running
    // Usa Firebase producción (real) si no quieres usar emulador
    const USE_EMULATOR = false; // Cambia a true si quieres usar emulador
    
    if (USE_EMULATOR && process.env.NODE_ENV === 'development') {
      try {
        connectAuthEmulator(getAuth(firebaseApp), 'http://localhost:9099', { disableWarnings: true });
        connectFirestoreEmulator(getFirestore(firebaseApp), 'localhost', 8080);
        connectStorageEmulator(getStorage(firebaseApp), 'localhost', 9199);
        console.log('✅ Firebase Emulator connected');
      } catch (e) {
        console.log('⚠️ Emulator not running. Using Firebase production.');
      }
    } else {
      console.log('🌐 Using Firebase production (not emulator)');
    }

    return getSdks(firebaseApp);
  }

  // If already initialized, return the SDKs with the already initialized App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    storage: getStorage(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
