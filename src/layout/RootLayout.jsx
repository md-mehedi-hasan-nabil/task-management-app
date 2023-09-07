import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
