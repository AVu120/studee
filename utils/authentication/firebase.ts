// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import {
  type UserCredential,
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
// @ts-ignore
import { initializeApp } from "utils/authentication/firebase";
import type { ILoginWithEmailPasswordParams } from "utils/authentication/types";
import handleAsyncErrors from "utils/helpers/errorHandling/errorHandlers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const hi = "";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

// initialize analytics service
// eslint-disable-next-line import/prefer-default-export
export const analytics = getAnalytics(app);

const loginWithEmailPassword = async ({
  email,
  password,
  onSuccess,
  onFail,
  onFinal,
}: ILoginWithEmailPasswordParams) => {
  handleAsyncErrors<UserCredential>({
    func: () => signInWithEmailAndPassword(auth, email, password),
    onSuccess,
    onFail,
    onFinal,
  });
};
