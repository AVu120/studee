import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "server-utils/database/mongodb";
import { IWeeklyPlan } from "utils/types/weeklyPlan";

import { getUserData } from "./user";
/**
 *
 * @param startdate Most recent Monday in "YYYY/MM/DD" format.
 * @param userId ID of logged in user.
 * @returns Plan data for the week starting on startDate.
 */
export const getWeeklyPlan = async ({
  startDate,
  userId,
}: {
  startDate: string;
  userId: string;
}): Promise<IWeeklyPlan | null> => {
  const { db } = await connectToDatabase();
  const year = startDate.split("/")[0];
  const weeklyPlan = await db
    .collection(`weeklyPlans${year}`)
    .findOne({ userId, startDate });

  if (!weeklyPlan) return null;
  // Remove mongoDB's document _id and duplicate userId field.
  // @ts-ignore
  const {
    _id,
    userId: userIdRemoved,
    ...weeklyPlanData
  }: IWeeklyPlan & { _id: ObjectId; userId: string } = weeklyPlan;

  return weeklyPlanData;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userData = await getUserData(req.cookies.session);
    const { user_id: userId } = userData;

    if (req.method === "GET") {
      if (!req.query) {
        return res.status(400).json({ message: "No query params" });
      }

      const { startDate } = req.query as {
        startDate: string;
      };
      if (!userId || !startDate) {
        return res
          .status(400)
          .json({ message: `No ${!userId ? "userId" : "startDate"}` });
      }

      const weeklyPlan = await getWeeklyPlan({ userId, startDate });
      return weeklyPlan
        ? res.status(200).json(weeklyPlan)
        : res.status(404).json("Not found");
    }

    if (req.method === "PUT") {
      if (!req.body) {
        return res.status(400).json({ message: "No body" });
      }
      const { startDate, ...payload } = req.body;
      if (!userId || !startDate) {
        return res
          .status(400)
          .json({ message: `No ${!userId ? "userId" : "startDate"}` });
      }

      const { db } = await connectToDatabase();

      const query = { userId, startDate };
      const update = { $set: payload };
      const options = { upsert: true };
      const year = startDate.split("/")[0];

      await db
        .collection(`weeklyPlans${year}`)
        .updateOne(query, update, options);
      return res.status(200).json({ message: "Update successful" });
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
