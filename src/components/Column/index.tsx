import {
  Card,
  CardBody,
  CardHeader,
  Tag,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useStore } from "../../context/store";
import { Task } from "../Task";

interface Props {
  state: string;
}

export const Column = ({ state }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: state });

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const getColorScheme = () => {
    if (state === "PLANNED") return "yellow";
    if (state === "ONGOING") return "blue";
    if (state === "DONE") return "green";
  };

  return (
    <Card
      ref={setNodeRef}
      borderWidth="2px"
      borderStyle={isOver ? "dotted" : "solid"}
      borderColor={useColorModeValue(
        isOver ? "gray" : "inherit",
        isOver ? "gray" : "inherit"
      )}
      width="100%"
      variant={"filled"}
    >
      <CardHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p="0.5rem"
      >
        <Tag colorScheme={getColorScheme()}>{state}</Tag>
      </CardHeader>

      <CardBody display="flex" flexDirection="column" gap="0.5rem" p="0.5rem">
        {tasks.map((task) => (
          <Task key={task.id} id={task.id} />
        ))}
      </CardBody>
    </Card>
  );
};
