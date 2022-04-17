import React from "react";
import { daysOfWeek } from "utils/constants/dateTimes";

import { DailyPlan } from "./DailyPlan";

export const Planner = () => (
  <div>
    <DailyPlan dayOfWeek={daysOfWeek[0]} date="17/04/2022" />
  </div>
);
