import { initializeApp } from "firebase/app";
import {
  type UserCredential,
  connectAuthEmulator,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// connectAuthEmulator(auth, "http://localhost:9099");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        // TODO1: Never send user creds/access tokens to client so remove this later.
        // TODO2: If email unverified, send back email verification request message & logout user.
        // TODO3: If user is verified, follow https://javascript.plainenglish.io/next-js-firebase-authentication-including-ssr-1045b097ee18
        // & https://firebase.google.com/docs/auth/admin/manage-cookies
        // to create session cookie on client, redirect to /me and then parse req.cookie
        // on getServerSideProps to verify cookie is still valid and get user data to render /me.
        res.status(200).json({
          message: userCredential,
        });
      })
      .catch((error) => {
        res.statusMessage = error.message;
        return res.status(500).json(error);
      });
  } else {
    res.status(200).json({ message: "Hello World" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
