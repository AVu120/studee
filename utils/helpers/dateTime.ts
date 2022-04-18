/**
 * Get date string of most recent Monday (aka start of week).
 * @returns Date string in YYYY/MM/DD format.
 */
export const getStartDate = () => {
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
