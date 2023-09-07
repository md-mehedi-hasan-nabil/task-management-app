import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  const location = useLocation();

  return (
    <>
     <ScrollRestoration />
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
