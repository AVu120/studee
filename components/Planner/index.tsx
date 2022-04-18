import React from "react";
import { daysOfWeek } from "utils/constants/dateTimes";

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
export const Planner = () => (
  <div>
    <DailyPlan dayOfWeek={daysOfWeek[0]} date="17/04/2022" />
  </div>
);
