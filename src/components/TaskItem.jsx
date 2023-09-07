import { useState } from "react";
import Avatar from "./Avatar";

export default function TaskItem() {
  const [addMemberBox, setAddMemberBox] = useState(false);

  return (
    <div className="taskitem border-2 rounded-lg p-4 bg-gradient-to-br from-white to-slate-200 hover:border-blue-400">
      <div className="flex justify-between items-center">
        {/* priority level color */}
        <p className="w-10 h-2 bg-blue-600 rounded-md mb-3"></p>
        <button
          onClick={() => setAddMemberBox((prev) => !prev)}
          className="flex justify-center items-center gap-1 rounded-full bg-slate-200 hover:bg-slate-300 px-2 py-1 border border-blue-600"
        >
          <span className="add-member hidden text-sm font-medium">
            {addMemberBox ? "Cancel" : "Add Member"}
          </span>
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
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        </button>
      </div>
      {addMemberBox && (
        <div className=" my-3">
          <div className="">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add team member
            </label>
            <div className="flex items-center gap-1 justify-start">
              <select
                id="status"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              >
                <option value="">Team member 1</option>
                <option value="">Team member 2</option>
                <option value="">Team member 3</option>
                <option value="">Team member 4</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 py-1.5 px-3 text-white rounded-md">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <span className="capitalize bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full border border-red-400">
          pending
        </span>
      </div>
      <h3 className="text-xl font-semibold line-clamp-2 my-2">
        Create todo application
      </h3>
      <p className="mb-4 line-clamp-2">
        description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quia qui odio, fugiat iste debitis iure sint quas explicabo excepturi
        perferendis repudiandae fugit praesentium ratione ab, molestias placeat
        quisquam dolore asperiores!
      </p>

      <div className="flex gap-2 my-2">
        <p className="flex items-center gap-1 text-sm">
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
              d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
          <span>Task 2/3</span>
        </p>

        <p className="flex items-center gap-1 text-sm">
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>April 20</span>
        </p>
      </div>

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

      <div className="flex justify-end items-center mt-3">
        <div className="flex -space-x-4">
          <Avatar />
          <Avatar />
          <Avatar />
          <p className="w-10 h-10 rounded-full border-4 bg-slate-200 border-white text-lg font-medium flex justify-center items-center">
            <span>+3</span>
          </p>
        </div>
      </div>
    </div>
  );
}
