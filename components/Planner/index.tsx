import React, { Dispatch, SetStateAction } from "react";
import { daysOfWeek } from "utils/constants/dateTimes";
import { IWeeklyPlan } from "utils/types/weeklyPlans";

import { DailyPlan } from "./DailyPlan";

// TODO1: in me getServerSideProps, fetch the current weeklyPlan data and current newDate() of the most recent Monday.
// TODO2: pass these as props to me component
// TODO3: set this prop as initialState for useState of weeklyPlan
// TODO4: feed Monday data into the single DailyPlan component.
// TODO5: Add 'unsaved changed...' + 'save' button.
// TODO6: add input field to 1st task of the Monday day.
// TODO7: enable this button onBlur when this inputfield changes.
// TODO8: On click this button, update the weeklyPlan data in db.
// TODO9: Update client, refresh and check updated data is there.
// TODO9: Add remainer of inputs in Monday.
// TODO11: Add rest of days.
// TODO12: Add weekly notes.
// TODO: Then MVP1 complete.
// TODO: Deploy to Vercel to start getting user feedback from ee and whoever.
// TODO: Add integration tests at page level.
// TODO: Add cypress tests at e2e level.
// TODO: Do big refactor to make it more modular/maintainable/scalable and use tests to catch regressions.
interface Props {
  weeklyPlan: IWeeklyPlan;
  setWeeklyPlanState: Dispatch<SetStateAction<IWeeklyPlan>>;
}

export const Planner = ({ weeklyPlan, setWeeklyPlanState }: Props) => (
  <div>
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

      const dateString = `${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()}`;
      const dayOfWeek = daysOfWeek[num];
      return (
        <DailyPlan
          dayOfWeek={dayOfWeek}
          date={dateString}
          data={weeklyPlan[dayOfWeek]}
          setWeeklyPlanState={setWeeklyPlanState}
          key={`${dayOfWeek}-daily-plan`}
        />
      );
    })}
  </div>
);
