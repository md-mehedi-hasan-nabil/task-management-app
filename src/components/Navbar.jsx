import { Link, NavLink } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { db } from "../db/db";

export default function Navbar() {
  const { auth } = useContext(MyContext) || {};

  async function handleLogout() {
    await db.auth.clear();
    toast.success("Logout successfull.");
  }

  return (
    <nav className="sticky top-0 bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800">
            Task Management
          </span>
        </Link>
        {auth && auth.username ? (
          <div className="flex items-center md:order-2">
            <button
              type="button"
              data-dropdown-toggle="profile-dropdown-menu"
              className="inline-flex gap-2 items-center font-medium justify-center text-sm text-gray-900 rounded-full cursor-pointer hover:ring-4"
            >
              <span className="capitalize text-base pl-2">
                {auth?.username}
              </span>
              <img
                className="w-12 h-12 rounded-full border-4 border-white"
                src={auth?.image}
                alt="avatar"
              />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"
              title="logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </button>

            <button
              data-collapse-toggle="navbar-language"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-language"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        ) : (
          <Link to="/login" className="md:order-2">
            Login
          </Link>
        )}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
