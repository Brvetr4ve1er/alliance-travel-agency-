import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

/**
 * @fileOverview Core Firebase initialization.
 * - Initializes the Firebase App instance.
 * - Initializes and exports the Firestore database instance.
 */

// Initialize Firebase only if no apps have been initialized to prevent errors during hot-reloading.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize the Firestore service
const db = getFirestore(app);

export { app, db };
