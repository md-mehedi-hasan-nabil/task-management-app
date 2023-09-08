import PropTypes from "prop-types";
import Avatar from "./Avatar";

export default function TeamMembersAvatar({ team_members }) {
  let content;

  if (team_members?.length === 0) {
    content = <h2>No team member.</h2>;
  } else if (team_members?.length > 0) {
    content = team_members.map((team_member) => (
      <Avatar key={team_member?.username} src={team_member?.image} />
    ));
  } else {
    content = <h2>Something is wrong.</h2>;
  }
  return (
    <div className="flex justify-end items-center mt-3">
      <div className="flex -space-x-4">{content}</div>
    </div>
  );
}

TeamMembersAvatar.propTypes = {
  team_members: PropTypes.array.isRequired,
};
