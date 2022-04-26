import { daysOfWeek } from "utils/constants/dateTimes";

/**
 * @param date Date in "YYYY/MM/DD" format.
 * @returns Date Object
 */
const getDateObject = (date: string) => {
  const [year, month, day] = date
    .split("/")
    .map((numString) => Number(numString));

  return new Date(year, month - 1, day);
};

const convertDateObjToStrServerFormat = (dateObj: Date) =>
  `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

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

  return convertDateObjToStrServerFormat(startDate);
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
  const nextStartDateObject = getDateObject(startDate);

  nextStartDateObject.setDate(nextStartDateObject.getDate() + 7);
  return convertDateObjToStrServerFormat(nextStartDateObject);
};

/**
 * @param startDate - Current week's start date (Monday) in "YYYY/MM/DD" format.
 * @returns Previous week's start date (Monday) in "YYYY/MM/DD" format.
 */
export const getPreviousStartDate = (startDate: string) => {
  const previousStartDateObject = getDateObject(startDate);

  previousStartDateObject.setDate(previousStartDateObject.getDate() - 7);
  return convertDateObjToStrServerFormat(previousStartDateObject);
};

/**
 * @returns today's day of the week e.g. "monday".
 */
export const getCurrentDayOfWeek = () => daysOfWeek[new Date().getDay()];
