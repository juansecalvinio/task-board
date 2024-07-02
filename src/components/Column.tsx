import { shallow } from "zustand/shallow";
import { useStore } from "../store";
import { Task } from "./Task";
import "./Column.css";
import { useState } from "react";
import classNames from "classnames";

interface Props {
  state: string;
}

export const Column = ({ state }: Props) => {
  const [text, setText] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);

  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  const { addTask, setDraggedTask, draggedTask, moveTask } = useStore();

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setDrop(false);
        setDraggedTask(null);
        moveTask(draggedTask ? draggedTask : "", state);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpenModal(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {openModal && (
        <div className="modal">
          <div className="modalContent">
            <div className="modalContent__header">
              <span className="closeButton" onClick={() => setOpenModal(false)}>
                X
              </span>
            </div>
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
            />
            <button
              onClick={() => {
                addTask({ title: text, state });
                setText("");
                setOpenModal(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
