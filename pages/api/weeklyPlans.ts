import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "server-utils/database/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      if (!req.query) {
        return res.status(400).json({ message: "No query params" });
      }

      const { userId, startDate } = req.query;
      if (!userId || !startDate) {
        return res
          .status(400)
          .json({ message: `No ${!userId ? "userId" : "startDate"}` });
      }

      const { db } = await connectToDatabase();
      const weeklyPlan = await db
        .collection("weeklyPlans")
        .findOne({ userId, startDate });
      return weeklyPlan
        ? res.status(200).json(weeklyPlan)
        : res.status(404).json("Not found");
    }

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(400).json({ message: "No body" });
      }
      const { userId, startDate, ...payload } = req.body;

      if (!userId || !startDate) {
        return res
          .status(400)
          .json({ message: `No ${!userId ? "userId" : "startDate"}` });
      }

      const { db } = await connectToDatabase();

      const query = { userId, startDate };
      const update = { $set: payload };
      const options = { upsert: true };

      await db.collection(`weeklyPlans`).updateOne(query, update, options);
      return res.status(200).json({ message: "Update successful" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
