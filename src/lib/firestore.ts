import { cert, initializeApp, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Ensure the Firebase Admin SDK is only initialized once
const firebaseAdminConfig = {
   credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle multiline private keys
   }),
};

export const firebaseAdminApp = getApps().length
   ? getApp()
   : initializeApp(firebaseAdminConfig);

export const firestore = getFirestore(firebaseAdminApp);
export const auth = getAuth(firebaseAdminApp);
