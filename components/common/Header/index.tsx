import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import colors from "styles/theme/colors";

import { MenuButtonComponent } from "../MenuButton";
import styles from "./index.module.scss";

interface Props {
  onSave: () => void;
  hasUnsavedChanges: boolean;
  isSaving: boolean;
  CentreComponent: ReactNode;
  isLoggingOut: boolean;
  onLogOut: () => void;
}
export const Header = ({
  onSave,
  hasUnsavedChanges,
  isSaving,
  CentreComponent,
  isLoggingOut,
  onLogOut,
}: Props) => {
  const router = useRouter();
  const toast = useToast();
  const showRedirectToast = () =>
    toast({
      title: `Redirecting...`,
      position: "top",
      isClosable: true,
      duration: 3000,
      status: "info",
    });

  return (
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
      {CentreComponent}
      <MenuButtonComponent
        icon={HamburgerIcon}
        ariaLabel="menu"
        style={{ fontSize: "2rem" }}
        options={[
          {
            title: "Schedule",
            onClick: showRedirectToast,
            href: "/",
          },
          {
            title: "To Do List",
            onClick: showRedirectToast,
            href: "/me/to-do-list",
          },
          {
            title: "Profile",
            onClick: showRedirectToast,
            href: "/me/profile",
          },
          { title: "Log Out", onClick: onLogOut },
        ]}
      />
    </header>
  );
};
