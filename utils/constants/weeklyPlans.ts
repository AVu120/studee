import { IWeeklyPlan } from "utils/types/weeklyPlans";

export const createEmptyWeeklyPlan = (startDate: string): IWeeklyPlan => ({
  startDate,
});
