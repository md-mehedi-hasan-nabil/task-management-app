/**
 * This is taskboard. 
 * There are show task board such as Pending, In Progress, Completed.
 */

import { useEffect, useState, useContext } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskStatusBoard from "./TaskStatusBoard";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { MyContext } from "../context/MyContext";

export default function TaskBoard() {
  const { filterKeyword } = useContext(MyContext);
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const [isOpenTaskAddModal, setIsOpenTaskAddModal] = useState(false);

  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (tasks?.length > 0) {
      /**
       * sort task by date and priority
       */
      const modifyTask = tasks.sort((a, b) => {
        if (filterKeyword === "priority") {
          return b.priority - a.priority;
        } else if (filterKeyword === "due_date") {
          return (
            new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
          );
        } else {
          return 0;
        }
      });

      /**
       * filter tasks by task status
       */
      const pendingTasksData = modifyTask?.filter(
        (task) => task.status === "pending"
      );
      const inProgressTasksData = modifyTask?.filter(
        (task) => task.status === "inprogress"
      );
      const completedTasksData = modifyTask?.filter(
        (task) => task.status === "completed"
      );

      /**
       * set filter tasks in state
       */
      setPendingTasks(pendingTasksData);
      setInProgressTasks(inProgressTasksData);
      setCompletedTasks(completedTasksData);
    }
  }, [tasks, filterKeyword]);

  const openTaskAddModal = () => {
    setIsOpenTaskAddModal(true);
  };
  const closeTaskAddModal = () => {
    setIsOpenTaskAddModal(false);
  };

  return (
    <>
      {isOpenTaskAddModal && <AddTaskModal closeModal={closeTaskAddModal} />}
      <div className="grid grid-cols-12 gap-4">
        <TaskStatusBoard
          openTaskAddModal={openTaskAddModal}
          status="pending"
          tasks={pendingTasks}
        />
        <TaskStatusBoard status="in progress" tasks={inProgressTasks} />
        <TaskStatusBoard status="completed" tasks={completedTasks} />
      </div>
    </>
  );
}
