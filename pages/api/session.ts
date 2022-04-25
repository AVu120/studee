import { serialize } from "cookie";
import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

const firebaseApp =
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

const auth = admin.auth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error("No request body");
      }

      const { idToken, csrfToken } = req.body;

      // Prevent CSRF attack.
      if (csrfToken !== req.cookies.csrfToken) {
        res.status(401).json({ message: "Nice try lol!" });
      }

      const decodedIdToken = await auth.verifyIdToken(idToken);
      // Only login if the user just signed in in the last 5 minutes.
      if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60))
        return res.status(401).json({ message: "Recent sign in required!" });

      // Set session expiration to 5 days.
      const expiresIn = 60 * 60 * 24 * 5 * 1000;

      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict" as const,
      };
      res.setHeader("Set-Cookie", serialize("session", sessionCookie, options));
      return res.status(200).json({ message: "Successfully logged in." });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", [
      serialize("session", "", {
        maxAge: -1,
        path: "/",
      }),
      serialize("csrfToken", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);

    return res.status(200).json({ message: "Successfully logged out." });
  }
  return res.status(404).json({ message: "API not found" });
};

// @ts-ignore
global.firebaseApp = firebaseApp;
