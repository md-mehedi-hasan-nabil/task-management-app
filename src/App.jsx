import "flowbite";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import MyProvider, { MyContext } from "./context/MyContext";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";

export default function App() {
  const { loading } = useContext(MyContext);
  return (
    <>
      <MyProvider>
        {loading ? (
          "loading"
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
