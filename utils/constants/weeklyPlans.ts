import { IWeeklyPlan } from "utils/types/weeklyPlans";

/**
 *
 * @param startDate - Current week's start date (Monday) in "YYYY/MM/DD" format.
 * @returns Empty weekly plan.
 */
export const createEmptyWeeklyPlan = (startDate: string): IWeeklyPlan => ({
  startDate,
});
