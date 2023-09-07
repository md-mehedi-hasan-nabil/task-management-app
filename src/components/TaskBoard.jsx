import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskStatusBoard from "./TaskStatusBoard";

export default function TaskBoard() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true)
  }
  const closeModal = () => {
    setIsOpenModal(false)
  }
  return (
    <>
      {isOpenModal && <AddTaskModal closeModal={closeModal} />}
      <div className="grid grid-cols-12 gap-4">
        <TaskStatusBoard openModal={openModal} status="pending" />
        <TaskStatusBoard status="in progress" />
        <TaskStatusBoard status="completed" />
      </div>
    </>
  );
}
