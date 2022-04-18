import { Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { TDayOfWeek } from "utils/types/dateTime";
import { IDayPlan, IWeeklyPlan } from "utils/types/weeklyPlan";

import styles from "./DailyPlan.module.scss";

interface Props {
  dayOfWeek: TDayOfWeek;
  date: string;
  data: IDayPlan | undefined;
  setWeeklyPlanState: Dispatch<SetStateAction<IWeeklyPlan>>;
}

export const DailyPlan = ({
  dayOfWeek,
  date,
  data,
  setWeeklyPlanState,
}: Props) => (
  <div className={styles.container}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{`${dayOfWeek} ${date}`}</th>
          <th className={styles.tableHeaderTimeCell}>Time</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 2 }).map((_: any, i: number) => (
          // Use of index here is fine as there's no sorting and indexes will be
          // linked to input as there will always only be 7 task inputs.
          // eslint-disable-next-line react/no-array-index-key
          <tr key={`${dayOfWeek}-task-${i + 1}`}>
            <td className={styles.tableTaskCell}>
              <Input
                variant="unstyled"
                placeholder={`Task ${i + 1}`}
                // @ts-ignore
                value={data?.tasks?.[`${i + 1}`]?.name}
                onChange={() => {}}
              />
              {/* <span className={styles.tableTaskCellContent}>Task Input</span> */}
            </td>
            <td className={styles.tableTimeCell}>
              <span className={styles.tableTimeCellContent}>Time</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    Placeholder for post-study treat, achievements and reflections.
  </div>
);
