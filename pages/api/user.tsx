import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

const firebaseAdminApp =
  // @ts-ignore
  global.firebaseApp ??
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // replace `\` and `n` character pairs w/ single `\n` character
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });

const adminAuth = firebaseAdminApp.auth();

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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error("No request body");
      }
      const { email, password } = req.body;

      if (!email) {
        throw new Error("No email provided");
      }
      if (!password) {
        throw new Error("No password provided");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      res.statusMessage = "User Account Created";
      return res.status(200).json({
        message:
          "A verification link has been emailed to you. Please verify your account before logging in.",
      });
    } catch (error: any) {
      res.statusMessage = error.message;
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(404).json({ message: "API not found" });
}

export async function getUserData(session: string) {
  let userData;
  let error;
  try {
    userData = await adminAuth.verifySessionCookie(session, true);
  } catch (verifyError) {
    error = verifyError;
  }
  return [userData, error];
}

export const config = {
  api: {
    externalResolver: true,
  },
};

// @ts-ignore
global.firebaseApp = firebaseAdminApp;
