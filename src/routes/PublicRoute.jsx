import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isLoggedIn = localStorage.getItem("auth")

  return !isLoggedIn ? children : <Navigate to="/" />;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};