import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDO-lT09ox7T-kQo2WbXjOUzre9LZlL838",
  authDomain: "lamsa-events-49fa8.firebaseapp.com",
  projectId: "lamsa-events-49fa8",
  storageBucket: "lamsa-events-49fa8.firebasestorage.app",
  messagingSenderId: "573298426506",
  appId: "1:573298426506:web:b215d29c9981f652dce373"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
