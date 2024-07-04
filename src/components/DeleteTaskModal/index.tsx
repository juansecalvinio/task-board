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
import { useStore } from "../../context/store";

export const DeleteTaskModal = () => {
  const {
    isModalDeleteTaskOpen,
    taskToDelete,
    deleteTask,
    setIsModalDeleteTaskOpen,
  } = useStore();

  const handleConfirmDelete = () => {
    deleteTask(taskToDelete);
    setIsModalDeleteTaskOpen(false);
  };

  return (
    <Modal
      isOpen={isModalDeleteTaskOpen}
      onClose={() => setIsModalDeleteTaskOpen(false)}
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={"0.5rem 0.5rem 0.5rem 1rem"}>Delete task</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={"1rem"}>
          <Text>Do you want to delete this task?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            variant={"outline"}
            mr={3}
            size="sm"
            onClick={() => setIsModalDeleteTaskOpen(false)}
          >
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleConfirmDelete} size="sm">
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
