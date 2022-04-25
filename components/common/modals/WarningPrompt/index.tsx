import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
  prompt: string;
}
export const WarningPrompt = ({
  title,
  prompt,
  onClose,
  isOpen,
  onConfirm,
}: Props) => {
  const cancelRef = useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{prompt}</AlertDialogBody>
          <AlertDialogFooter>
            {/* // @ts-ignore */}
            <Button onClick={onClose} ref={cancelRef}>
              No
            </Button>
            <Button onClick={onConfirm} colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
