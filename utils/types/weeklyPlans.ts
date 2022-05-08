interface ITask {
  name: string;
  isComplete: boolean;
}

export interface IDayPlan {
  tasks?: {
    "1"?: ITask;
    "2"?: ITask;
    "3"?: ITask;
    "4"?: ITask;
    "5"?: ITask;
    "6"?: ITask;
    "7"?: ITask;
  };
  postStudyAward?: string;
  achievements?: string[];
  reflections?: string[];
}

export interface IWeeklyPlan {
  startDate: string;
  monday?: IDayPlan;
  tuesday?: IDayPlan;
  wednesday?: IDayPlan;
  thursday?: IDayPlan;
  friday?: IDayPlan;
  saturday?: IDayPlan;
  sunday?: IDayPlan;
  notes?: string;
}
