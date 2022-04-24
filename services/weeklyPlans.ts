import { type NextRouter } from "next/router";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { createEmptyWeeklyPlan } from "utils/constants/weeklyPlans";
import { isEmptyObject } from "utils/helpers/lodash";
import { IWeeklyPlan } from "utils/types/weeklyPlans";

/**
 * Save changes made to weekly plan.
 */
export const updateWeeklyPlan = (
  weeklyPlanState: IWeeklyPlan,
  setIsSaving: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  toast: any,
  setHasUnsavedChanged: Dispatch<SetStateAction<boolean>>,
  savedWeeklyPlanRef: MutableRefObject<IWeeklyPlan>
) => {
  let statusText: string;
  setIsSaving(true);
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
    .finally(() => setIsSaving(false));
};

export const getWeeklyPlanOnClient = (
  startDate: string,
  setWeeklyPlanState: Dispatch<SetStateAction<IWeeklyPlan>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  savedWeeklyPlanRef: MutableRefObject<IWeeklyPlan>,
  router: NextRouter,
  setHasUnsavedChanged: Dispatch<SetStateAction<boolean>>
) => {
  let statusText: string;
  setIsLoading(true);
  fetch(`/api/weeklyPlans?startDate=${startDate}`)
    .then((res) => {
      console.log({ res });
      if (!res.ok) {
        throw new Error(statusText);
      }
      return res.json();
    })
    .then((res) => {
      // Empty obj is returned if no weekly plan is found in db.
      console.log({ res2: res });
      if (isEmptyObject(res)) {
        console.log("RUN1");
        savedWeeklyPlanRef.current = createEmptyWeeklyPlan(startDate);
        setWeeklyPlanState(createEmptyWeeklyPlan(startDate));
        setHasUnsavedChanged(false);
        return router.push(`/me/week/${startDate}`, undefined, {
          shallow: true,
        });
      }
      console.log("RUN2");
      savedWeeklyPlanRef.current = res;
      setWeeklyPlanState(res);
      setHasUnsavedChanged(false);
      return router.push(`/me/week/${startDate}`, undefined, { shallow: true });
    })
    .catch((error) => {
      setError(error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
