import React from "react";
import { daysOfWeek } from "utils/constants/dateTimes";

import { DailyPlan } from "./DailyPlan";

// TODO1: in me getServerSideProps, fetch the current weeklyPlan data
// TODO2: pass this as prop to me component
// TODO3: set this prop as initialState for useState of weeklyPlan
// TODO4: feed Sunday data into the single DailyPlan component.
// TODO5: Add 'unsaved changed...' + 'save' button.
// TODO6: add input field to 1st task of the Sunday day.
// TODO7: enable this button onBlur when this inputfield changes.
// TODO8: On click this button, update the weeklyPlan data in db.
// TODO9: Update client, refresh and check updated data is there.
// TODO9: Add remainer of inputs in Sunday.
// TODO10: retest by saving and refreshing to see updates.
// TODO11: Add rest of days.
// TODO12: Add weekly notes.
export const Planner = () => (
  <div>
    <DailyPlan dayOfWeek={daysOfWeek[0]} date="17/04/2022" />
  </div>
);
