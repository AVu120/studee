import { TDayOfWeek } from "utils/types/dateTime";
import { IDayPlan } from "utils/types/weeklyPlan";

import styles from "./DailyPlan.module.scss";

interface Props {
  dayOfWeek: TDayOfWeek;
  date: string;
  data: IDayPlan | undefined;
}

export const DailyPlan = ({ dayOfWeek, date, data }: Props) => (
  <div key={dayOfWeek} className={styles.container}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>{`${dayOfWeek} ${date}`}</th>
          <th className={styles.tableHeaderTimeCell}>Time</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 7 }).map((_, i) => (
          // Use of index here is fine as there's no sorting and indexes will be
          // linked to input as there will always only be 7 task inputs.
          // eslint-disable-next-line react/no-array-index-key
          <tr key={`${dayOfWeek}-task-${i}`}>
            <td className={styles.tableTaskCell}>
              <div className={styles.tableTaskCellContent}>Task Input</div>
            </td>
            <td className={styles.tableTimeCell}>
              <div className={styles.tableTimeCellContent}>Time</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    Placeholder for post-study treat, achievements and reflections.
  </div>
);
