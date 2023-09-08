import { useContext, useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskStatusBoard from "./TaskStatusBoard";
import { MyContext } from "../context/MyContext";

export default function TaskBoard() {
  const { getTasks, refetch, setRefetch } = useContext(MyContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const result = getTasks();
    console.log(result)
    const pendingTasksData = result.filter((task) => task.status === "pending");
    const inProgressTasksData = result.filter(
      (task) => task.status === "inprogress"
    );
    const completedTasksData = result.filter(
      (task) => task.status === "completed"
    );

    setPendingTasks(pendingTasksData);
    setInProgressTasks(inProgressTasksData);
    setCompletedTasks(completedTasksData);
    setRefetch(false)
  }, [getTasks, refetch, setRefetch]);

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
