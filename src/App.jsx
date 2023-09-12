import "flowbite";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import MyProvider from "./context/MyContext";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db/db";

export default function App() {
  const auth = useLiveQuery(() => db.auth.toArray());
  const [loading, setLoasing] = useState(true);

  useEffect(() => {
    if (auth?.length > 0) {
      setLoasing(false);
    } else {
      setLoasing(false);
    }
  }, [auth]);

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
