import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error("No request body");
      }
      const { email } = req.body;

      if (!email) {
        throw new Error("No email provided");
      }

      await sendPasswordResetEmail(auth, email);
      res.statusMessage = "Reset password email sent";
      return res.status(200).json({
        message: "A reset pasword link has been sent to your email.",
      });
    } catch (error: any) {
      res.statusMessage = error.message;
      return res.status(500).json({ message: error.message });
    }
  }

  return res.status(404).json({ message: "API not found" });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
