import {
  Card,
  CardHeader,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { FaTrash } from "react-icons/fa";
import { useStore } from "../../context/store";

interface Props {
  id: string;
}

export const Task = ({ id }: Props) => {
  const task = useStore((store) => store.tasks.find((task) => task.id === id));

  const { setDraggedTask, setIsModalDeleteTaskOpen, setTaskToDelete } =
    useStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const handleClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Detener la propagación del evento de arrastre
    if (!!task) setTaskToDelete(task.id);
    setIsModalDeleteTaskOpen(true);
  };

  const draggableStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={draggableStyle}
      variant={useColorModeValue("elevated", "outline")}
      _hover={{ cursor: "move" }}
      onDragStart={() => setDraggedTask(id)}
    >
      <CardHeader
        p={"0.5rem"}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"md"}>{task?.title}</Text>
        <IconButton
          aria-label="delete"
          icon={<FaTrash />}
          size={"sm"}
          onMouseDown={handleClickDelete}
        />
      </CardHeader>
    </Card>
  );
};
