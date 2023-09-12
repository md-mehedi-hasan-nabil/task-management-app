import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MyContext } from "../context/MyContext";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import toast from "react-hot-toast";

export default function AddMemberBox({ color, taskId, team_members }) {
  const users = useLiveQuery(() => db.users.toArray());
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const { auth, setRefetch } = useContext(MyContext);
  const [addMemberBox, setAddMemberBox] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamMemberId, setTeamMemberId] = useState("");
  
  //TODO: change no team member found ui.
  useEffect(() => {
    const existingTeamMembers = team_members?.map(
      (team_member) => team_member.username
    );

    const teamMembersData = users?.filter(
      (user) => !existingTeamMembers.includes(user.username)
    );

    if (teamMembersData) {
      teamMembersData[0]?.id
        ? setTeamMemberId(teamMembersData[0]?.id)
        : setTeamMemberId("");
      setTeamMembers(teamMembersData);
    } else {
      setTeamMembers([]);
    }
  }, [users, auth, team_members]);

  function handleAddTeamMember() {
    const task = tasks.find((task) => task.id === taskId);
    const member = users.find((user) => user.id === teamMemberId);
    delete member.password;

    const teamMemberObj = {
      ...member,
      userId: member.id + "-" + member.username,
    };

    const team_membersArray = [...task.team_members, teamMemberObj];

    const result = db.tasks.update(taskId, {
      team_members: team_membersArray,
    });

    if (result) {
      toast.success("New team member add.");
      setRefetch(true);
      setAddMemberBox(false);
    } else {
      toast.success("Some errors occurred.");
    }
  }

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
          <>
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Add team member
            </label>
            <div className="flex items-center gap-1 justify-start">
              {teamMembers?.length > 0 ? (
                <>
                  <select
                    value={teamMemberId}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTeamMemberId(e.target.value);
                    }}
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                    {teamMembers.map((teamMember) => (
                      <option key={teamMember.id} value={teamMember.id}>
                        {teamMember.username}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddTeamMember}
                    className="bg-blue-600 hover:bg-blue-700 py-1.5 px-3 text-white rounded-md"
                  >
                    Add
                  </button>
                </>
              ) : (
                <p className="mt-2 font-medium text-red-600 text-sm bg-red-200 rounded-lg py-1 px-2 animate-bounce border-2 border-red-400">
                  No users have been created yet in this system. Please register
                  multiple users.
                </p>
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
}

AddMemberBox.propTypes = {
  color: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  team_members: PropTypes.array.isRequired,
};
