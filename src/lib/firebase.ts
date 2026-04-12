import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '@/firebase/config';

/**
 * @fileOverview Core Firebase initialization.
 * - Initializes the Firebase App instance.
 * - Initializes and exports the Firestore database instance.
 * - Initializes and exports the Firebase Storage instance.
 */

// Initialize Firebase only if no apps have been initialized to prevent errors during hot-reloading.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize the Firestore service
const db = getFirestore(app);

// Initialize the Storage service
const storage = getStorage(app);

export { app, db, storage };
