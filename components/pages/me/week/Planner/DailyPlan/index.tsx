import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { MenuButtonComponent } from "components/common/MenuButton";
import { ChangeEvent, Dispatch, memo, SetStateAction } from "react";
import { capitalizeWord } from "utils/helpers/lodash";
import { TDayOfWeek } from "utils/types/dateTime";
import { IDayPlan, IWeeklyPlan } from "utils/types/weeklyPlans";

import { Card } from "../../../../../common/Card";

interface Props {
  dayOfWeek: TDayOfWeek;
  date: string;
  data: IDayPlan | undefined;
  setWeeklyPlanState: Dispatch<SetStateAction<IWeeklyPlan>>;
}

const taskNumbers = ["1", "2", "3", "4", "5", "6", "7"] as const;
type TTaskNumber = typeof taskNumbers[number];

const UnmemoizedDailyPlan = ({
  dayOfWeek,
  date,
  data,
  setWeeklyPlanState,
}: Props) => {
  const changeTask =
    (taskNumber: TTaskNumber) => (e: ChangeEvent<HTMLInputElement>) => {
      setWeeklyPlanState((currentWeeklyPlanState) => ({
        ...currentWeeklyPlanState,
        [dayOfWeek]: {
          ...currentWeeklyPlanState[dayOfWeek],
          tasks: {
            ...currentWeeklyPlanState[dayOfWeek]?.tasks,
            [taskNumber]: {
              ...currentWeeklyPlanState[dayOfWeek]?.tasks?.[taskNumber],
              name: e.target.value,
              ...(e.target.value === "" && { isComplete: false }),
            },
          },
        },
      }));
    };

  const toggleTaskCompleteness = (taskNumber: TTaskNumber) => {
    setWeeklyPlanState((currentWeeklyPlanState) => ({
      ...currentWeeklyPlanState,
      [dayOfWeek]: {
        ...currentWeeklyPlanState[dayOfWeek],
        tasks: {
          ...currentWeeklyPlanState[dayOfWeek]?.tasks,
          [taskNumber]: {
            ...currentWeeklyPlanState[dayOfWeek]?.tasks?.[taskNumber],
            isComplete: !(
              currentWeeklyPlanState[dayOfWeek]?.tasks?.[taskNumber]
                ?.isComplete ?? false
            ),
          },
        },
      },
    }));
  };

  const clearTask = (taskNumber: TTaskNumber) => {
    setWeeklyPlanState((currentWeeklyPlanState) => ({
      ...currentWeeklyPlanState,
      [dayOfWeek]: {
        ...currentWeeklyPlanState[dayOfWeek],
        tasks: {
          ...currentWeeklyPlanState[dayOfWeek]?.tasks,
          [taskNumber]: {
            ...currentWeeklyPlanState[dayOfWeek]?.tasks?.[taskNumber],
            isComplete: false,
            name: "",
            time: "",
          },
        },
      },
    }));
  };

  const changeNotes =
    (section: "postStudyAward" | "achievements" | "reflections") =>
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setWeeklyPlanState((currentWeeklyPlanState) => ({
        ...currentWeeklyPlanState,
        [dayOfWeek]: {
          ...currentWeeklyPlanState[dayOfWeek],
          [section]: e.target.value,
        },
      }));
    };
  return (
    <Card>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th textDecorationLine="underline" fontSize="sm">
                {`${capitalizeWord(dayOfWeek)} ${date}`}
              </Th>
              <Th fontSize="sm">
                <Text position="relative" right="-2">
                  Action
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 7 }).map((_: any, i: number) => {
              const taskNumberString = `${i + 1}`;
              const isComplete =
                data?.tasks?.[taskNumberString as TTaskNumber]?.isComplete;
              return (
                <Tr key={`${dayOfWeek}-task-${i + 1}`}>
                  <Td width="100%">
                    <Input
                      variant="unstyled"
                      value={
                        data?.tasks?.[taskNumberString as TTaskNumber]?.name ||
                        ""
                      }
                      onChange={changeTask(taskNumberString as TTaskNumber)}
                      isTruncated
                      fontSize="sm"
                      textDecorationLine={isComplete ? "line-through" : "none"}
                      width="calc(100% + 40px)"
                    />
                  </Td>
                  <Td isNumeric>
                    {data?.tasks?.[taskNumberString as TTaskNumber]?.name && (
                      <MenuButtonComponent
                        ariaLabel="Task actions menu button"
                        icon={HamburgerIcon}
                        options={[
                          {
                            title: "Clear task",
                            onClick: () =>
                              clearTask(taskNumberString as TTaskNumber),
                          },
                          {
                            title: `${
                              isComplete ? "Uncomplete" : "Complete"
                            } task`,
                            onClick: () =>
                              toggleTaskCompleteness(
                                taskNumberString as TTaskNumber
                              ),
                            isHidden:
                              !data?.tasks?.[taskNumberString as TTaskNumber]
                                ?.name,
                          },
                        ]}
                        boxSize="1rem"
                        style={{ position: "relative", right: "-10px" }}
                      />
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <VStack pb="3">
        <Heading as="h3" size="xs" mt="2">
          Post-Study Award
        </Heading>
        <Textarea
          resize="none"
          value={data?.postStudyAward || ""}
          onChange={changeNotes("postStudyAward")}
        />
        <Heading as="h3" size="xs">
          Achievements
        </Heading>
        <Textarea
          resize="none"
          value={data?.achievements || ""}
          onChange={changeNotes("achievements")}
        />
        <Heading as="h3" size="xs">
          Reflections
        </Heading>
        <Textarea
          resize="none"
          value={data?.reflections || ""}
          onChange={changeNotes("reflections")}
        />
      </VStack>
    </Card>
  );
};

export const DailyPlan = memo(
  UnmemoizedDailyPlan,
  (prevProps, nextProps) =>
    prevProps.dayOfWeek === nextProps.dayOfWeek &&
    prevProps.date === nextProps.date &&
    prevProps.data === nextProps.data
);
