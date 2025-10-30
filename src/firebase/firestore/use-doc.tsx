'use client';
    
import { useState, useEffect } from 'react';
import {
  onSnapshot,
  FirestoreError,
  Query,
  DocumentReference,
  DocumentSnapshot,
  QuerySnapshot,
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
 * React hook to subscribe to a Firestore collection or a specific document in real-time.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {Query | DocumentReference | null} target - A Firestore Query, DocumentReference, or null.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  target: Query | DocumentReference | null,
): UseDocResult<T> {
  type StateDataType = WithId<T>[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore || !target) {
      setIsLoading(false);
      setData(null);
      return;
    }

    const handleSnapshot = (snapshot: DocumentSnapshot<any> | QuerySnapshot<any>) => {
      if ('docs' in snapshot) { // It's a QuerySnapshot
        if (snapshot.empty) {
          setData([]);
        } else {
          const results = snapshot.docs.map(doc => ({ ...doc.data() as T, id: doc.id }));
          setData(results);
        }
      } else { // It's a DocumentSnapshot
        if (snapshot.exists()) {
          setData([{ ...snapshot.data() as T, id: snapshot.id }]);
        } else {
          setData([]);
        }
      }
      setIsLoading(false);
      setError(null);
    };

    const handleError = (err: FirestoreError) => {
      const isCollectionQuery = 'docs' in target;
      const path = 'path' in target ? target.path : (target as any)._query?.path?.toString() || 'unknown path';

      const contextualError = new FirestorePermissionError({
        operation: isCollectionQuery ? 'list' : 'get',
        path: path,
      });
      errorEmitter.emit('permission-error', contextualError);
      setError(err);
      setIsLoading(false);
    };

    const unsubscribe = onSnapshot(target as any, handleSnapshot, handleError);

    // Cleanup subscription on unmount
    return () => unsubscribe();

  }, [target, firestore]);

  return { data, isLoading, error };
}
