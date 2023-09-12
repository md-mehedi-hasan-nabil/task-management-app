import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";

export default function PublicRoute({ children }) {
  const { auth } = useContext(MyContext);

  return !auth ? children : <Navigate to="/" />;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};