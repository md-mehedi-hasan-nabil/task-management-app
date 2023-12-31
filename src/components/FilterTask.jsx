import { useContext } from "react";
import { MyContext } from "../context/MyContext";

export default function FilterTask() {
  const { filterKeyword, setFilterKeyword } = useContext(MyContext);

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="" className="block text-sm font-medium text-gray-900">
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </label>
      <select
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      >
        <option value="">All</option>
        <option value="due_date">Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}
