import { IWeeklyPlan } from "utils/types/weeklyPlan";

export const getEmptyWeeklyPlan = (startDate: string): IWeeklyPlan => ({
  startDate,
});
