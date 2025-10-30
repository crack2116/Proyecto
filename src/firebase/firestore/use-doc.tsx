'use client';
    
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  FirestoreError,
  Query
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useFirestore } from '@/firebase';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

/**
 * React hook to subscribe to a Firestore collection in real-time.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {string} collectionName - The name of the Firestore collection.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  collectionName: string,
): UseDocResult<T> {
  type StateDataType = WithId<T>[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start loading immediately
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !collectionName) {
      setIsLoading(false);
      return;
    }

    const collectionRef = collection(firestore, collectionName) as Query;

    const unsubscribe = onSnapshot(
        collectionRef,
        (snapshot) => {
            if (snapshot.empty) {
                setData([]);
            } else {
                const results = snapshot.docs.map(doc => ({ ...doc.data() as T, id: doc.id }));
                setData(results);
            }
            setIsLoading(false);
            setError(null);
        },
        (err: FirestoreError) => {
            const contextualError = new FirestorePermissionError({
                operation: 'list',
                path: collectionName,
            });
            errorEmitter.emit('permission-error', contextualError);
            setError(err);
            setIsLoading(false);
        }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();

  }, [collectionName, firestore]);

  return { data, isLoading, error };
}
