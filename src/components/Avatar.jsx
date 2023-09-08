import PropTypes from "prop-types";

export default function Avatar({ src }) {
  return (
    <img
      className="w-10 h-10 rounded-full border-4 border-white"
      src={src}
      alt="avatar"
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
};
