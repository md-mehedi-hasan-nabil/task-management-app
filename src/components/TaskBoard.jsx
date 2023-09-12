import { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskStatusBoard from "./TaskStatusBoard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";

export default function TaskBoard() {
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (tasks?.length > 0) {
      const pendingTasksData = tasks?.filter(
        (task) => task.status === "pending"
      );
      const inProgressTasksData = tasks?.filter(
        (task) => task.status === "inprogress"
      );
      const completedTasksData = tasks?.filter(
        (task) => task.status === "completed"
      );

      setPendingTasks(pendingTasksData);
      setInProgressTasks(inProgressTasksData);
      setCompletedTasks(completedTasksData);
    }
  }, [tasks]);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      {isOpenModal && <AddTaskModal closeModal={closeModal} />}
      <div className="grid grid-cols-12 gap-4">
        <TaskStatusBoard
          openModal={openModal}
          status="pending"
          tasks={pendingTasks}
        />
        <TaskStatusBoard status="in progress" tasks={inProgressTasks} />
        <TaskStatusBoard status="completed" tasks={completedTasks} />
      </div>
    </>
  );
}
