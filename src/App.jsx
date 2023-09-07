import "flowbite";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import MyProvider from "./context/MyContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
    <MyProvider>
      <RouterProvider router={router} />
      <Toaster />
    </MyProvider>
    </>
  );
}
