import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  title: string;
}
const AcknowledgementModal = ({ isOpen, onClose, text, title }: Props) => (
  <>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>{text}</Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

export default AcknowledgementModal;
