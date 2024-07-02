import classNames from "classnames";
import { useStore } from "../store";
import trashIcon from "../assets/trash-icon.svg";

import "./Task.css";

interface Props {
  title?: string;
}

export const Task = ({ title = "" }: Props) => {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const { deleteTask, setDraggedTask } = useStore();

  return (
    <div
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task?.title)}
    >
      <div>{task?.title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            src={trashIcon}
            alt="delete-icon"
            onClick={() => deleteTask(task?.title || title)}
          />
        </div>
        <div className={classNames("status", task?.state)}>{task?.state}</div>
      </div>
    </div>
  );
};
