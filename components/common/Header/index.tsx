import { Box, Button, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import colors from "styles/theme/colors";

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
}: Props) => (
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
    <Button
      type="submit"
      variant="secondary"
      onClick={onLogOut}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Loading..." : "Log Out "}
    </Button>
  </header>
);
