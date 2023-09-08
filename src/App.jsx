import "flowbite";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import MyProvider from "./context/MyContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";


export default function App() {
  const [loading, setLoasing] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setLoasing(false);
    } else {
      setLoasing(false);
    }
  }, []);

  return (
    <>
      <MyProvider>
        {loading ? (
          "loading..."
        ) : (
          <>
            <RouterProvider router={router} />
            <Toaster />
          </>
        )}
      </MyProvider>
    </>
  );
}
