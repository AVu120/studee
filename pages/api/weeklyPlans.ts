import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "server-utils/database/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400).json({ message: "No body" });
  }

  if (req.method === "PUT") {
    try {
      const { db } = await connectToDatabase();

      const { userId, startDate, ...payload } = req.body;

      const query = { userId, startDate };
      const update = { $set: payload };
      const options = { upsert: true };

      await db.collection(`weeklyPlans`).updateOne(query, update, options);
      return res.status(200).json({ message: "Update successful" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  return res.status(404).json({ message: "Not found" });
};
