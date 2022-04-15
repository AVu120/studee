import { serialize } from "cookie";
import crypto from "crypto";
import { initializeApp } from "firebase/app";
import {
  type UserCredential,
  connectAuthEmulator,
  getAuth,
  sendEmailVerification,
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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        // await sendEmailVerification(userCredential.user);
        res.statusMessage = "Please Verify Email";
        return res.status(401).json({
          message:
            "You must verify your email from the activation link sent to your email before logging in.",
        });
      }

      const idToken = await userCredential.user.getIdToken();
      const csrfToken = crypto.randomBytes(20).toString("hex");
      res.setHeader(
        "Set-Cookie",
        serialize("csrfToken", csrfToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusMessage = "Authentication successful";
      return res.status(200).json({ idToken, csrfToken });
    } catch (error: any) {
      res.statusMessage = error.message;
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "API not found" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
