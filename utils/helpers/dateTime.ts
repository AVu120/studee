/**
 * Get date string of most recent Monday (aka start of week).
 * @returns Date string in YYYY/MM/DD format.
 */
export const getCurrentStartDate = () => {
  const startDate = new Date();
  // If today's date is not a Monday.
  if (startDate.getDay() !== 1) {
    // Set startDate to the most recent Monday
    let offsetDaysToStartDate = startDate.getDay() - 1;
    if (offsetDaysToStartDate < 0) offsetDaysToStartDate += 7;
    startDate.setDate(startDate.getDate() - offsetDaysToStartDate);
  }

  return `${startDate.getFullYear()}/${
    startDate.getMonth() + 1
  }/${startDate.getDate()}`;
};

export const getDateInUrlPath = (queryParams: string[]) =>
  `${queryParams[0]}/${queryParams[1]}/${queryParams[2]}`;

export const getNextStartDate = ({
  currentYear,
  currentMonth,
  currentDay,
}: {
  currentYear: number;
  currentMonth: number;
  currentDay: number;
}) => {
  const nextStartDateObject = new Date(currentYear, currentMonth, currentDay);

  nextStartDateObject.setDate(nextStartDateObject.getDate() + 6);
  return `${nextStartDateObject.getFullYear()}/${
    nextStartDateObject.getMonth() + 1
  }/${nextStartDateObject.getDate()}`;
};

export const getPreviousStartDate = ({
  currentYear,
  currentMonth,
  currentDay,
}: {
  currentYear: number;
  currentMonth: number;
  currentDay: number;
}) => {
  const nextStartDateObject = new Date(currentYear, currentMonth, currentDay);

  nextStartDateObject.setDate(nextStartDateObject.getDate() - 6);
  return `${nextStartDateObject.getFullYear()}/${
    nextStartDateObject.getMonth() + 1
  }/${nextStartDateObject.getDate()}`;
};
