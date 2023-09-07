export default function ChangeTaskStatus() {
  return (
    <div className="mt-3">
      <label
        htmlFor="status"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label>
      <select
        id="status"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      >
        <option value="pending">Pending</option>
        <option value="in Progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
