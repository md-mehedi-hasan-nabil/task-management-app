import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AllTasks from "../pages/AllTasks";
import PublicRoute from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>,
      },
      {
        path: "/tasks",
        element: (
          <PrivateRoute>
            <AllTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
