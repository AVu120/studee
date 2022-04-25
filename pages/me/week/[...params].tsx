import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { WarningPrompt } from "components/common/modals/WarningPrompt";
import { Planner } from "components/pages/me/week/Planner";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { logOut } from "services/auth";
import { getWeeklyPlanOnClient, updateWeeklyPlan } from "services/weeklyPlans";
import styles from "styles/pages/me/week.module.scss";
import colors from "styles/theme/colors";
import { createEmptyWeeklyPlan } from "utils/constants/weeklyPlans";
import {
  formatDateForClient,
  getCurrentStartDate,
  getDateInUrlPath,
  getNextStartDate,
  getPreviousStartDate,
} from "utils/helpers/dateTime";
import { IWeeklyPlan } from "utils/types/weeklyPlans";

import { getUserData } from "../../api/user";
import { getWeeklyPlanOnServer } from "../../api/weeklyPlans";

interface Props {
  weeklyPlan: IWeeklyPlan | null;
}

type TDiscardUnsavedChangesActions = "showNextWeek" | "showLastWeek" | "logOut";

const Me: NextPage<Props> = ({ weeklyPlan }) => {
  const router = useRouter();

  /** Start date that is set when the page is loaded but weeklyPlan can't be found in the db.
   * Server start date is in format "YYYY/MM/DD".
   */
  let serverStartDate: string;
  if (Array.isArray(router?.query?.params)) {
    serverStartDate = getDateInUrlPath(router?.query?.params);
  } else {
    serverStartDate = getCurrentStartDate();
  }

  /** Last weeklyPlan record that user saved, used to determine if there's any local unsaved changes. */
  const savedWeeklyPlanRef = useRef(
    weeklyPlan || createEmptyWeeklyPlan(serverStartDate)
  );
  const [weeklyPlanState, setWeeklyPlanState] = useState(
    weeklyPlan || createEmptyWeeklyPlan(serverStartDate)
  );
  const [hasUnsavedChanges, setHasUnsavedChanged] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoadingNextWeekData, setIsLoadingNextWeekData] = useState(false);
  const [isLoadingPriorWeekData, setIsLoadingPriorWeekData] = useState(false);
  const [discardUnsavedChangesAction, setDiscardUnsavedChangesAction] =
    useState<TDiscardUnsavedChangesActions | "">("");

  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (
      !hasUnsavedChanges &&
      JSON.stringify(weeklyPlanState) !==
        JSON.stringify(savedWeeklyPlanRef.current)
    ) {
      setHasUnsavedChanged(true);
    }
  }, [weeklyPlanState]);

  const clientStartDate = formatDateForClient(serverStartDate);

  const onLogOut = () => logOut(setIsLoggingOut, router, toast);
  const onSave = () =>
    updateWeeklyPlan(
      weeklyPlanState,
      setIsSaving,
      toast,
      setHasUnsavedChanged,
      savedWeeklyPlanRef
    );

  const onShowNextWeek = () => {
    const nextStartDate = getNextStartDate(serverStartDate);
    getWeeklyPlanOnClient(
      nextStartDate,
      setWeeklyPlanState,
      setIsLoadingNextWeekData,
      savedWeeklyPlanRef,
      router,
      setHasUnsavedChanged
    );
  };

  const onShowPreviousWeek = () => {
    const previousStartDate = getPreviousStartDate(serverStartDate);
    getWeeklyPlanOnClient(
      previousStartDate,
      setWeeklyPlanState,
      setIsLoadingPriorWeekData,
      savedWeeklyPlanRef,
      router,
      setHasUnsavedChanged
    );
  };

  const discardUnsavedChangesActions = {
    showNextWeek: onShowNextWeek,
    showLastWeek: onShowPreviousWeek,
    logOut: onLogOut,
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Studee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header
        className={styles.header}
        // @ts-ignore
        style={{ "--bgColor": colors.secondary }}
      >
        <Box position="relative">
          <Button
            type="submit"
            variant="primary"
            onClick={onSave}
            disabled={!hasUnsavedChanges || isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          {hasUnsavedChanges && (
            <Text fontSize="xs" width="max-content" position="absolute">
              You have unsaved changes...
            </Text>
          )}
        </Box>
        <HStack>
          <IconButton
            variant="outline"
            aria-label="Show last week"
            isRound
            borderColor="transparent"
            position="relative"
            right={{
              base: "-4",
              md: "-3",
              lg: "-2",
              xl: "-1",
            }}
            _hover={{ bg: "transparent" }}
            icon={
              <ChevronLeftIcon
                fontSize={{
                  base: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                }}
              />
            }
            onClick={
              hasUnsavedChanges
                ? () => setDiscardUnsavedChangesAction("showLastWeek")
                : onShowPreviousWeek
            }
            isLoading={isLoadingPriorWeekData}
          />
          <Text
            as="h1"
            textAlign="center"
            margin="0px"
          >{`Week of ${clientStartDate}`}</Text>
          <IconButton
            variant="outline"
            aria-label="Show next week"
            borderColor="transparent"
            isRound
            position="relative"
            left={{
              base: "-4",
              md: "-3",
              lg: "-2",
              xl: "-1",
            }}
            _hover={{ bg: "transparent" }}
            icon={
              <ChevronRightIcon
                fontSize={{
                  base: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                }}
              />
            }
            onClick={
              hasUnsavedChanges
                ? () => setDiscardUnsavedChangesAction("showNextWeek")
                : onShowNextWeek
            }
            isLoading={isLoadingNextWeekData}
          />
        </HStack>
        <Button
          type="submit"
          variant="secondary"
          onClick={
            hasUnsavedChanges
              ? () => setDiscardUnsavedChangesAction("logOut")
              : onLogOut
          }
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Loading..." : "Log Out "}
        </Button>
      </header>

      <main className={styles.main}>
        <Planner
          weeklyPlan={weeklyPlanState}
          setWeeklyPlanState={setWeeklyPlanState}
        />
        <WarningPrompt
          isOpen={!!discardUnsavedChangesAction}
          onClose={() => setDiscardUnsavedChangesAction("")}
          onConfirm={() => {
            discardUnsavedChangesActions[
              discardUnsavedChangesAction as TDiscardUnsavedChangesActions
            ]();
            setDiscardUnsavedChangesAction("");
          }}
          title="Discard unsaved changes?"
          prompt="Your changes will be lost. Do you want to proceed anyway?"
        />
      </main>

      <footer
        className={styles.footer}
        // @ts-ignore
        style={{ "--bgColor": colors.secondary }}
      >
        <span>Studee App</span>
        <span>
          Created by{" "}
          <a
            href="https://www.linkedin.com/in/anthony-hien-vu/"
            target="_blank"
            rel="noreferrer"
          >
            Anthony Hien Vu
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Me;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { cookies } = req;

  if (cookies.session) {
    const userData = await getUserData(cookies.session);

    if (userData) {
      const { user_id: userId } = userData;

      const { params } = query as { params: string[] };
      const startDate = `${params[0]}/${params[1]}/${params[2]}`;

      const weeklyPlan = await getWeeklyPlanOnServer({ userId, startDate });

      return {
        props: { weeklyPlan },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
