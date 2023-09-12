import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { MyContext } from "../context/MyContext";
import toast from "react-hot-toast";
import { db } from "../db/db";

export default function TaskStatusChange({ task_id, default_value }) {
  const { setRefetch } = useContext(MyContext);
  const [status, setStatus] = useState(default_value);

  function handleStatusChange(value, taskId) {
    setStatus(value);
    const result = db.tasks.update(taskId, {
      status: value,
    });

    if (result) {
      toast.success("Task status change.");
      setRefetch(true);
    } else {
      toast.success("Some errors occurred.");
    }
  }

  return (
    <div className="mt-3">
      <label
        htmlFor="status"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Change task status
      </label>
      <select
        onChange={(e) => handleStatusChange(e.target.value, task_id)}
        id="status"
        value={status}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      >
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

TaskStatusChange.propTypes = {
  task_id: PropTypes.string.isRequired,
  default_value: PropTypes.string.isRequired,
};
