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
import { LegacyRef, MutableRefObject, RefObject, useRef } from "react";

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
  // @ts-ignore
  const cancelRef: RefObject<HTMLButtonElement> = useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
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
