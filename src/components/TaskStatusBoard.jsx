import PropTypes from "prop-types";
import Task from "./Task";

export default function TaskStatusBoard({ status, openModal }) {
  return (
    <div
      className="col-span-12 md:col-span-4 px-4 pt-4 bg-slate-100 rounded-md"
      style={{ height: "86vh" }}
    >
      <div className="flex justify-between">
        <h2 className="mb-2 font-medium capitalize">{status}</h2>
        {status === "pending" && (
          <button
            onClick={openModal}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-lg"
          >
            Add New Task
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll h-full pt-2">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
}

TaskStatusBoard.propTypes = {
  status: PropTypes.string.isRequired,
  openModal: PropTypes.func,
};
