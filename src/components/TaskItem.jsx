import PropTypes from "prop-types";
import AddMemberBox from "./AddMemberBox";
import ChangeTaskStatus from "./TaskStatusChange";
import TeamMembersAvatar from "./TeamMembersAvatar";

export default function TaskItem({ task }) {
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

  return (
    <div className="taskitem border-2 rounded-lg p-4 bg-gradient-to-br from-white to-slate-200 hover:border-blue-400 hover:cursor-pointer">
      {status !== "completed" && <AddMemberBox color={color} />}

      <div>
        <span className="capitalize bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full border border-red-400">
          {status}
        </span>
      </div>
      <h3 className="text-xl font-semibold line-clamp-2 my-2 capitalize">{title}</h3>
      <p className="mb-4 line-clamp-2">{description}</p>

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
          <span
            className={`${color} text-slate-100 px-1.5 font-medium rounded-lg`}
          >
            {priority}
          </span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 ${priority === "high" ? "animate-spin" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{due_date}</span>
        </p>
      </div>

      <ChangeTaskStatus task_id={id} default_value={status} />

      <TeamMembersAvatar team_members={team_members} />
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};
