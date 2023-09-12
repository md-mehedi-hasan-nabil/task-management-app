import PropTypes from "prop-types";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { MyContext } from "../context/MyContext";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { db } from "../db/db";

export default function AddTaskModal({ closeModal }) {
  const { auth, setRefetch } = useContext(MyContext);
  const { register, handleSubmit, reset } = useForm();
  console.log(auth);

  function getPriorityColor(priority) {
    let color = "";
    if (priority === "high") {
      color = "bg-red-600";
    } else if (priority === "medium") {
      color = "bg-blue-600";
    } else {
      // for low
      color = "bg-green-600";
    }
    return color;
  }

  async function onSubmit(data) {
    const { title, description, due_date, priority } = data;
    const { username, image, id } = auth;
    const color = getPriorityColor(priority);

    if (title && description && due_date && priority) {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        createdAt: new Date().toLocaleDateString(),
        priority,
        color,
        due_date,
        status: "pending",
        user: {
          id,
          username,
          image,
        },
        team_members: [{ id: uuidv4(), username, userId: id, image }],
      };
      const taskResultId = await db.tasks.add(newTask);

      if (taskResultId) {
        reset();
        toast.success("Task add successful.");
        closeModal();
        setRefetch(true);
      } else {
        toast.error("Some errors occurred.");
      }
    } else {
      toast.error("Field required.");
    }
  }
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full flex justify-center backdrop-blur-sm bg-slate-900/60 items-center">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={closeModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add new task
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task title
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task description
                  </label>
                  <textarea
                    {...register("description")}
                    name="description"
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter task description"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Data
                  </label>
                  <input
                    {...register("due_date")}
                    type="date"
                    name="due_date"
                    id="data"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="date"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select priority level
                  </label>
                  <select
                    {...register("priority")}
                    id="priority"
                    name="priority"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AddTaskModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
