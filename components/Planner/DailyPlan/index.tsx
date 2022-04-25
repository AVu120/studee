import {
  Box,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, memo, SetStateAction } from "react";
import { capitalizeWord } from "utils/helpers/lodash";
import { TDayOfWeek } from "utils/types/dateTime";
import { IDayPlan, IWeeklyPlan } from "utils/types/weeklyPlans";

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
    (taskNumber: TTaskNumber, taskProperty: "name" | "time") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setWeeklyPlanState((currentWeeklyPlanState) => ({
        ...currentWeeklyPlanState,
        [dayOfWeek]: {
          ...currentWeeklyPlanState[dayOfWeek],
          tasks: {
            ...currentWeeklyPlanState[dayOfWeek]?.tasks,
            [taskNumber]: {
              ...currentWeeklyPlanState[dayOfWeek]?.tasks?.[taskNumber],
              [taskProperty]: e.target.value,
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
    <Box
      boxShadow="md"
      padding="1rem"
      borderRadius="1rem"
      marginBottom="1rem"
      border="1px"
      borderColor="gray.300"
    >
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th textDecorationLine="underline" fontSize="sm">
                {`${capitalizeWord(dayOfWeek)} ${date}`}
              </Th>
              <Th fontSize="sm">Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 7 }).map((_: any, i: number) => (
              <Tr key={`${dayOfWeek}-task-${i + 1}`}>
                <Td width="70%">
                  <Input
                    variant="unstyled"
                    value={data?.tasks?.[`${i + 1}` as TTaskNumber]?.name || ""}
                    onChange={changeTask(`${i + 1}` as TTaskNumber, "name")}
                    isTruncated
                    fontSize="xs"
                  />
                </Td>
                <Td>
                  <Input
                    variant="unstyled"
                    value={data?.tasks?.[`${i + 1}` as TTaskNumber]?.time || ""}
                    onChange={changeTask(`${i + 1}` as TTaskNumber, "time")}
                    isTruncated
                    fontSize="xs"
                  />
                </Td>
              </Tr>
            ))}
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
    </Box>
  );
};

export const DailyPlan = memo(
  UnmemoizedDailyPlan,
  (prevProps, nextProps) =>
    prevProps.dayOfWeek === nextProps.dayOfWeek &&
    prevProps.date === nextProps.date &&
    prevProps.data === nextProps.data
);
