import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { IWeeklyPlan } from "utils/types/weeklyPlan";

export const updateWeeklyPlan = (
  weeklyPlanState: IWeeklyPlan,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  toast: any,
  setHasUnsavedChanged: Dispatch<SetStateAction<boolean>>,
  savedWeeklyPlanRef: MutableRefObject<IWeeklyPlan>
) => {
  let statusText: string;
  setIsLoading(true);
  fetch(`/api/weeklyPlans`, {
    method: "PUT",
    body: JSON.stringify(weeklyPlanState),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(statusText);
      }
      toast({
        title: `Successfully saved`,
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
      setHasUnsavedChanged(false);
      // eslint-disable-next-line no-param-reassign
      savedWeeklyPlanRef.current = weeklyPlanState;
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => setIsLoading(false));
};
