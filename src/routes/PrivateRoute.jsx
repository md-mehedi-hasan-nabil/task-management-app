import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useContext } from "react";

export default function PrivateRoute({ children }) {
  const { auth } = useContext(MyContext);

  return auth ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
