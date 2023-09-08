import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MyContext } from "../context/MyContext";

export default function AddMemberBox({ color }) {
  const { getUsers, auth } = useContext(MyContext);
  const [addMemberBox, setAddMemberBox] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const users = getUsers();
    const teamMembersData = users.filter((user) => user.userId !== auth.userId);
    if (teamMembersData) {
      setTeamMembers(teamMembersData);
    } else {
      setTeamMembers([]);
    }
    console.log(teamMembersData);
  }, [getUsers, auth]);

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* priority level color */}
        <p className={`w-10 h-2 rounded-md mb-3 ${color}`}></p>
        <button
          onClick={() => setAddMemberBox((prev) => !prev)}
          className="flex justify-center items-center gap-1 rounded-full bg-slate-200 hover:bg-slate-300 px-2 py-1 border border-blue-600"
        >
          <span className="add-member hidden text-sm font-medium">
            {addMemberBox ? "Cancel" : "Add Member"}
          </span>
          {addMemberBox ? (
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
                d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
              />
            </svg>
          ) : (
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
          )}
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
                {teamMembers.map((teamMember) => (
                  <option key={teamMember?.id} value={teamMember?.id}>
                    {teamMember.username}
                  </option>
                ))}
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 py-1.5 px-3 text-white rounded-md">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AddMemberBox.propTypes = {
  color: PropTypes.string.isRequired,
};
