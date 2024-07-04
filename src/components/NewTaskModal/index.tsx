import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../context/store";

type Status = "PLANNED" | "ONGOING" | "DONE";

export const NewTaskModal = () => {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<Status>("PLANNED");

  const { isModalNewTaskOpen, addTask, setIsModalNewTaskOpen } = useStore();

  return (
    <Modal
      isOpen={isModalNewTaskOpen}
      onClose={() => setIsModalNewTaskOpen(false)}
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={"0.5rem 0.5rem 0.5rem 1rem"}>New task</ModalHeader>
        <ModalCloseButton />

        <ModalBody p={"1rem"}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              size="sm"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              size={"sm"}
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="PLANNED">PLANNED</option>
              <option value="ONGOING">ONGOING</option>
              <option value="DONE">DONE</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter p={"1rem"}>
          <Button
            colorScheme="gray"
            variant={"outline"}
            mr={"1rem"}
            onClick={() => setIsModalNewTaskOpen(false)}
            size="sm"
          >
            Close
          </Button>
          <Button
            colorScheme="yellow"
            size="sm"
            onClick={() => {
              addTask({ id: uuidv4(), title: text, state: status });
              setText("");
              setIsModalNewTaskOpen(false);
            }}
          >
            Add task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
