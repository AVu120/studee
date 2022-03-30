// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "utils/database/mongodb";

type Data = {
  name: string;
};

const query = { name: "Barack Obama" };
const update = { $set: { address: "4 Nassau St" } };
const options = { upsert: true };
// const testQuery = {
//   userId: "AHV",
//   startDay: "30-3-2022",
// };

// const testUpdate = {
//   monday: {
//     userId: "AHV",
//     startDay: "30-3-2022",
//     tasks: [{ name: "Task 1", isComplete: false, time: "9-10am" }],
//     postStudyAward: "",
//     achievements: [""],
//     reflections: [""],
//   },
//   notes: [],
// };

// const options = { upsert: true };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { db } = await connectToDatabase();
  db.collection("weeklySchedules2022").updateOne(query, update, options);
  res.status(200).json({ name: "John Doe" });
}
