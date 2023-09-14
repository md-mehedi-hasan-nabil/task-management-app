import PropTypes from "prop-types";
import AddMemberBox from "./AddMemberBox";
import ChangeTaskStatus from "./TaskStatusChange";
import { useForm } from "react-hook-form";

export default function TaskItemModal({ closeModal, task }) {
  const {
    id,
    title,
    description,
    status,
    due_date,
    team_members,
    color,
    priority,
  } = task;
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0  flex justify-center bg-slate-900/60 items-center">
      <div className="relative w-full max-w-3xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
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
          <div className="grid grid-cols-12 py-4">
            <div className="col-span-6 p-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Task title
                  </label>
                  <input
                    {...register("title")}
                    defaultValue={title}
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Task description
                  </label>
                  <textarea
                    {...register("description")}
                    defaultValue={description}
                    name="description"
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter task description"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Data
                  </label>
                  <input
                    {...register("due_date")}
                    defaultValue={due_date}
                    type="date"
                    name="due_date"
                    id="data"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="date"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select priority level
                  </label>
                  <select
                    {...register("priority")}
                    defaultValue={priority}
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
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save change Task
                </button>
              </form>
            </div>
            <div className="col-span-6 px-6 py-6 lg:px-8">
              {/* <h3 className="flex items-center gap-2 mb-4 text-xl font-medium text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                  />
                </svg>

                <span>{title}</span>
              </h3> */}
              <div className="mt-6"></div>
              {status !== "completed" && (
                <AddMemberBox
                  taskId={id}
                  color={color}
                  team_members={team_members}
                />
              )}

              <ChangeTaskStatus task_id={id} default_value={status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TaskItemModal.propTypes = {
  task: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
};
