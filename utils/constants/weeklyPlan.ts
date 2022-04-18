import { TDayOfWeek } from "utils/types/dateTime";
import { IDayPlan, IWeeklyPlan } from "utils/types/weeklyPlan";

import { daysOfWeek } from "./dateTimes";

const emptyDayOfWeek = {
  tasks: {
    1: {
      name: "",
      time: "",
      isComplete: false,
    },
    2: {
      name: "",
      time: "",
      isComplete: false,
    },
    3: {
      name: "",
      time: "",
      isComplete: false,
    },
    4: {
      name: "",
      time: "",
      isComplete: false,
    },
    5: {
      name: "",
      time: "",
      isComplete: false,
    },
    6: {
      name: "",
      time: "",
      isComplete: false,
    },
    7: {
      name: "",
      time: "",
      isComplete: false,
    },
  },
  postStudyAward: "",
  achievements: [],
  reflections: [],
};

const getEmptyPlanForDaysOfWeek = () => {
  // @ts-ignore Required properties are added below.
  const emptyDaysOfWeek: { [key in TDayOfWeek]: IDayPlan } = {};

  daysOfWeek.forEach((day) => {
    emptyDaysOfWeek[day] = emptyDayOfWeek;
  });

  return emptyDaysOfWeek;
};
export const emptyWeeklyPlan: IWeeklyPlan = {
  startDate: "",
  notes: "",
  ...getEmptyPlanForDaysOfWeek(),
};
