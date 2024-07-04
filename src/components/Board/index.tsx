import { Box } from "@chakra-ui/react";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useStore } from "../../context/store";
import { Column } from "../Column";
import { Task } from "../Task";

export const Board = () => {
  const { moveTask, draggedTask, setDraggedTask } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(active.id.toString(), over.id.toString());
    }
    setDraggedTask(null);
  };

  return (
    <DndContext
      onDragStart={(event) => setDraggedTask(event.active.id.toString())}
      onDragEnd={handleDragEnd}
    >
      <Box
        as="main"
        display={{ base: "flex", md: "flex", lg: "flex" }}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        alignItems="flex-start"
        justifyContent="space-between"
        mt="1rem"
        gap="1rem"
      >
        <Column state="PLANNED" />
        <Column state="ONGOING" />
        <Column state="DONE" />
      </Box>
      <DragOverlay>
        {draggedTask ? <Task id={draggedTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
