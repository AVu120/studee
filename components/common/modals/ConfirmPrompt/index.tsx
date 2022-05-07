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
import { RefObject, useRef } from "react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
  title: string;
  prompt: string;
  action: string;
}
export const ConfirmPrompt = ({
  title,
  prompt,
  onClose,
  isOpen,
  onConfirm,
  action,
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
            <Button onClick={onClose} ref={cancelRef} variant="primary">
              Cancel
            </Button>
            <Button onClick={onConfirm} ml={3} variant="secondary">
              {action}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
