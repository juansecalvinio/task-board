import { useEffect } from "react";

import { Store, useStore } from "./index";
import { render } from "@testing-library/react";

function TestComponent({ selector, effect }: any) {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}

test("should return default value at the start", () => {
  const selector = (store: Store) => store.tasks;
  const effect = jest.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test("should add an items to the store and re-run the effect", () => {
  const selector = (store: Store) => ({
    tasks: store.tasks,
    addTask: store.addTask,
    deleteTask: store.deleteTask,
  });

  let createdTask = false;

  const effect = jest.fn().mockImplementation((items) => {
    if (!createdTask) {
      items.addTask({ title: "a", state: "b" });
      createdTask = true;
    } else if (items.tasks.length === 1) {
      items.deleteTask("a");
    }
  });

  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(2);
  expect(effect).toHaveBeenCalledWith(
    expect.objectContaining({
      tasks: [{ title: "a", state: "b" }],
    })
  );
});
