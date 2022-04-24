import { Grid } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { daysOfWeek } from "utils/constants/dateTimes";
import type { IWeeklyPlan } from "utils/types/weeklyPlans";

import { DailyPlan } from "./DailyPlan";

interface Props {
  weeklyPlan: IWeeklyPlan;
  setWeeklyPlanState: Dispatch<SetStateAction<IWeeklyPlan>>;
}

export const Planner = ({ weeklyPlan, setWeeklyPlanState }: Props) => (
  <Grid
    templateColumns={{
      base: "auto",
      md: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
      xl: "repeat(4, 1fr)",
    }}
    gridColumnGap="1rem"
  >
    {/* This order of numbers is used to ensure Monday is the first day of the week. */}
    {[1, 2, 3, 4, 5, 6, 0].map((num, i) => {
      const { startDate } = weeklyPlan;
      const startDateParams = startDate.split("/");
      const [startDateYear, startDateMonth, startDateDay] = startDateParams.map(
        (numString) => Number(numString)
      );
      const dateObject = new Date(
        startDateYear,
        startDateMonth - 1,
        startDateDay
      );

      dateObject.setDate(dateObject.getDate() + i);

      const clientDate = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      const dayOfWeek = daysOfWeek[num];
      return (
        <DailyPlan
          dayOfWeek={dayOfWeek}
          date={clientDate}
          data={weeklyPlan[dayOfWeek]}
          setWeeklyPlanState={setWeeklyPlanState}
          key={`${dayOfWeek}-daily-plan`}
        />
      );
    })}
  </Grid>
);
