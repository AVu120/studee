/**
 * Get date string of most recent Monday (aka start of week).
 * @returns Date in "YYYY/MM/DD" format.
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

/**
 * Dates are formatted as "YYYY/MM/DD" on the server but on the client need to be displayed as "DD/MM/YYYY" to reflect the Australian date format.
 * @param date - Date in "YYYY/MM/DD" format.
 * @returns Date in "DD/MM/YYYY" format.
 */
export const formatDateForClient = (date: string) => {
  const [startDateYear, startDateMonth, startDateDay] = date.split("/");

  return `${startDateDay}/${startDateMonth}/${startDateYear}`;
};
/**
 *
 * @param queryParams - NextRouter.query.params
 * @returns Date in "YYYY/MM/DD" format.
 */
export const getDateInUrlPath = (queryParams: string[]) =>
  `${queryParams[0]}/${queryParams[1]}/${queryParams[2]}`;

/**
 * @param startDate - Current week's start date (Monday) in "YYYY/MM/DD" format.
 * @returns Next week's start date (Monday) in "YYYY/MM/DD" format.
 */
export const getNextStartDate = (startDate: string) => {
  const [startDateYear, startDateMonth, startDateDay] = startDate
    .split("/")
    .map((numString) => Number(numString));

  const nextStartDateObject = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );

  nextStartDateObject.setDate(nextStartDateObject.getDate() + 7);
  return `${nextStartDateObject.getFullYear()}/${
    nextStartDateObject.getMonth() + 1
  }/${nextStartDateObject.getDate()}`;
};

/**
 * @param startDate - Current week's start date (Monday) in "YYYY/MM/DD" format.
 * @returns Previous week's start date (Monday) in "YYYY/MM/DD" format.
 */
export const getPreviousStartDate = (startDate: string) => {
  const [startDateYear, startDateMonth, startDateDay] = startDate
    .split("/")
    .map((numString) => Number(numString));

  const previousStartDateObject = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );

  previousStartDateObject.setDate(previousStartDateObject.getDate() - 7);
  return `${previousStartDateObject.getFullYear()}/${
    previousStartDateObject.getMonth() + 1
  }/${previousStartDateObject.getDate()}`;
};
