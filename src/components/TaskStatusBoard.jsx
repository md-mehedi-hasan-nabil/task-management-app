import PropTypes from "prop-types";
import TaskItem from "./TaskItem";
import FilterTask from "./FilterTask";

export default function TaskStatusBoard({ status, openTaskAddModal, tasks }) {
  let content;
  if (tasks?.length === 0) {
    content = <h2>No task here</h2>;
  } else if (tasks?.length > 0) {
    content = tasks?.map((task) => <TaskItem key={task?.id} task={task} />);
  } else {
    content = <h2>Something is wrong.</h2>;
  }

  return (
    <div
      className="col-span-12 md:col-span-4 px-4 pt-4 border bg-slate-100 rounded-md"
      style={{ height: "86vh" }}
    >
      <div className="flex justify-between">
        <h2 className="text-lg ml-1 mb-2 font-medium capitalize">{status}</h2>
        {status === "pending" && (
          <>
            <FilterTask />
            <button
              onClick={openTaskAddModal}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg"
            >
              Add New Task
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll h-full pt-2">
        {content}
      </div>
    </div>
  );
}

TaskStatusBoard.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  openTaskAddModal: PropTypes.func.isRequired,
};
